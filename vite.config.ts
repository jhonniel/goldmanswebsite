import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import type { Connect, Plugin } from "vite";
import { handleInquiry, parsePayload } from "./api/sendInquiry.js";

function writeSeoFiles(siteUrl: string) {
  const publicDir = path.resolve(process.cwd(), "public");
  if (!existsSync(publicDir)) {
    mkdirSync(publicDir, { recursive: true });
  }

  const lastmod = new Date().toISOString().slice(0, 10);

  writeFileSync(
    path.join(publicDir, "robots.txt"),
    `User-agent: *
Allow: /

User-agent: Googlebot
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`,
    "utf8",
  );

  writeFileSync(
    path.join(publicDir, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`,
    "utf8",
  );
}

function seoPlugin(siteUrl: string, googleVerification: string): Plugin {
  return {
    name: "gold-mans-seo",
    buildStart() {
      writeSeoFiles(siteUrl);
    },
    configureServer() {
      writeSeoFiles(siteUrl);
    },
    transformIndexHtml(html) {
      let next = html.replaceAll("%SITE_URL%", siteUrl);

      if (googleVerification) {
        next = next.replaceAll("%GOOGLE_SITE_VERIFICATION%", googleVerification);
      } else {
        next = next.replace(
          /\s*<meta name="google-site-verification" content="%GOOGLE_SITE_VERIFICATION%" \/>/,
          "",
        );
      }

      return next;
    },
  };
}

function applyContactEnv(env: Record<string, string | undefined>) {
  for (const key of [
    "RESEND_API_KEY",
    "CONTACT_TO_EMAIL",
    "CONTACT_FROM_EMAIL",
  ] as const) {
    if (env[key]) {
      process.env[key] = env[key];
    }
  }
}

function readJsonBody(req: Connect.IncomingMessage): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on("data", (chunk) => {
      chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
    });
    req.on("end", () => {
      const raw = Buffer.concat(chunks).toString("utf8");
      if (!raw) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(raw));
      } catch (error) {
        reject(error);
      }
    });
    req.on("error", reject);
  });
}

function contactApiPlugin(): Plugin {
  return {
    name: "gold-mans-contact-api",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url?.split("?")[0];
        if (req.method !== "POST" || url !== "/api/contact") {
          next();
          return;
        }

        try {
          const body = await readJsonBody(req);
          const ip =
            typeof req.headers["x-forwarded-for"] === "string"
              ? req.headers["x-forwarded-for"].split(",")[0].trim()
              : req.socket.remoteAddress || "unknown";
          const result = await handleInquiry(parsePayload(body), ip);
          res.statusCode = result.code;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(result.body));
        } catch {
          res.statusCode = 502;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: "Unable to send inquiry." }));
        }
      });
    },
  };
}

function resolveSiteUrl(env: Record<string, string | undefined>): string {
  const explicit = env.VITE_SITE_URL?.trim();
  if (explicit) {
    return explicit.replace(/\/+$/, "");
  }

  const withHttps = (value: string) =>
    `https://${value.replace(/^https?:\/\//, "")}`.replace(/\/+$/, "");

  const production = env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (env.VERCEL_ENV === "production" && production) {
    return withHttps(production);
  }

  const preview = env.VERCEL_URL?.trim();
  if (preview) {
    return withHttps(preview);
  }

  if (production) {
    return withHttps(production);
  }

  return "https://www.example.com";
}

export default defineConfig(({ mode }) => {
  const env = { ...process.env, ...loadEnv(mode, process.cwd(), "") };
  applyContactEnv(env);
  const siteUrl = resolveSiteUrl(env);
  const googleVerification = env.VITE_GOOGLE_SITE_VERIFICATION?.trim() || "";

  return {
    plugins: [
      react(),
      tailwindcss(),
      seoPlugin(siteUrl, googleVerification),
      contactApiPlugin(),
    ],
  };
});
