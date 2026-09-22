import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import type { Plugin } from "vite";

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
  const siteUrl = resolveSiteUrl(env);
  const googleVerification = env.VITE_GOOGLE_SITE_VERIFICATION?.trim() || "";

  return {
    plugins: [react(), tailwindcss(), seoPlugin(siteUrl, googleVerification)],
  };
});
