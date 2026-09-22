import { m, useReducedMotion } from "framer-motion";
import { MessageCircle, Send, X } from "lucide-react";
import {
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import { company } from "../config/company";
import {
  answerCompanyQuestion,
  buildWelcomeMessage,
  chatSuggestions,
  composePrompt,
  isSendRequest,
  replyPauseMs,
  replyTypeMs,
  unknownAnswer,
} from "../lib/chat";
import { submitInquiry } from "../lib/contact";
import { revealTransition } from "../lib/motion";

type ChatMessage = {
  id: string;
  role: "bot" | "user";
  text: string;
};

type Compose = {
  fullName: string;
  email: string;
  message: string;
  website: string;
};

const initialCompose: Compose = {
  fullName: "",
  email: "",
  message: "",
  website: "",
};

function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function userMessage(text: string): ChatMessage {
  return { id: createId(), role: "user", text };
}

function wait(ms: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

export default function ChatWidget() {
  const reduce = useReducedMotion();
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const replyGen = useRef(0);
  const openedOnce = useRef(false);
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [composing, setComposing] = useState(false);
  const [compose, setCompose] = useState<Compose>(initialCompose);
  const [composeError, setComposeError] = useState("");
  const [sending, setSending] = useState(false);
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const speak = async (text: string) => {
    const gen = ++replyGen.current;

    if (reduce) {
      setTyping(false);
      setMessages((current) => [
        ...current,
        { id: createId(), role: "bot", text },
      ]);
      return;
    }

    setTyping(true);
    await wait(replyPauseMs(text, reduce));
    if (gen !== replyGen.current) return;

    setTyping(false);
    const id = createId();
    setMessages((current) => [...current, { id, role: "bot", text: "" }]);

    const step = replyTypeMs(text);
    const chunk = text.length > 180 ? 6 : 4;
    for (let index = chunk; index < text.length; index += chunk) {
      await wait(step);
      if (gen !== replyGen.current) return;
      const slice = text.slice(0, index);
      setMessages((current) =>
        current.map((message) =>
          message.id === id ? { ...message, text: slice } : message,
        ),
      );
    }
    setMessages((current) =>
      current.map((message) =>
        message.id === id ? { ...message, text } : message,
      ),
    );
  };

  const speakRef = useRef<(text: string) => Promise<void>>(async () => {});

  useEffect(() => {
    speakRef.current = speak;
  });

  useEffect(() => {
    if (!open) return;

    const previous = launcherRef.current;
    inputRef.current?.focus();

    if (!openedOnce.current) {
      openedOnce.current = true;
      void speakRef.current(buildWelcomeMessage());
    }

    const onKey = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      previous?.focus();
    };
  }, [open]);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [messages, composing, open, typing]);

  const close = () => setOpen(false);

  const openComposer = (seed = "") => {
    setComposing(true);
    setComposeError("");
    setCompose((current) => ({
      ...current,
      message: seed || current.message,
    }));
    void speak(composePrompt());
  };

  const handleVisitorText = (raw: string) => {
    const text = raw.trim();
    if (!text || sending) return;

    replyGen.current += 1;
    setTyping(false);
    setDraft("");
    setMessages((current) => [...current, userMessage(text)]);

    if (isSendRequest(text)) {
      const canned =
        /^(send a message|send message|send info|send information|leave a message)$/i.test(
          text,
        );
      openComposer(canned ? "" : text);
      return;
    }

    const answer = answerCompanyQuestion(text);
    if (answer) {
      void speak(answer);
      return;
    }

    if (text.length >= 80) {
      openComposer(text);
      return;
    }

    void speak(unknownAnswer());
    setCompose((current) => ({ ...current, message: current.message || text }));
  };

  const onDraftKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleVisitorText(draft);
    }
  };

  const onSendInfo = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (sending) return;

    if (compose.website.trim()) {
      setComposing(false);
      setCompose(initialCompose);
      void speak(
        "Thank you. Your message has been received by Gold Mans Supply Corporation.",
      );
      return;
    }

    if (compose.fullName.trim().length < 2) {
      setComposeError("Please enter your name.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(compose.email.trim())) {
      setComposeError("Please enter a valid email address.");
      return;
    }

    if (compose.message.trim().length < 4) {
      setComposeError("Please enter the information you would like to send.");
      return;
    }

    setComposeError("");
    setSending(true);

    try {
      const result = await submitInquiry(
        {
          fullName: compose.fullName.trim(),
          email: compose.email.trim(),
          organization: "",
          phone: "",
          subject: "Website chat message",
          message: compose.message.trim(),
          source: "website-chat",
        },
        company.email,
      );

      setComposing(false);
      setCompose(initialCompose);
      void speak(
        result.status === "sent"
          ? "Thank you. Your message has been sent to Gold Mans Supply Corporation."
          : `If your email application did not open, please send your message to ${company.email}.`,
      );
    } catch {
      void speak(
        `We could not send your message from here. Please email ${company.email}.`,
      );
    } finally {
      setSending(false);
    }
  };

  const showSuggestions = !composing && !typing && messages.length < 4;

  return (
    <div
      className={
        open
          ? "pointer-events-none fixed inset-x-3 z-[62] bottom-[max(0.75rem,env(safe-area-inset-bottom,0px))] sm:inset-x-auto sm:right-6 sm:bottom-6"
          : "pointer-events-none fixed z-[62] right-[max(1rem,env(safe-area-inset-right,0px))] bottom-[max(1rem,env(safe-area-inset-bottom,0px))]"
      }
    >
      {open ? (
        <m.div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          initial={reduce ? false : { opacity: 0, y: 12, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={revealTransition(0)}
          id="company-chat"
          className="pointer-events-auto flex h-[min(36rem,calc(100dvh-6.5rem-env(safe-area-inset-top,0px)-env(safe-area-inset-bottom,0px)))] w-full flex-col overflow-hidden rounded-3xl surface-card sm:h-[min(36rem,calc(100dvh-5.5rem))] sm:w-[24rem]"
        >
          <header className="flex items-start justify-between gap-3 border-b border-white/50 px-4 py-3">
            <div className="min-w-0">
              <p id={titleId} className="text-sm font-medium text-pretty text-ink">
                <span className="sm:hidden">Company chat</span>
                <span className="hidden sm:inline">
                  Chat with Gold Mans Supply Corporation
                </span>
              </p>
              <p className="mt-0.5 text-xs text-ink-muted">
                Ask about the company or send a message
              </p>
            </div>
            <button
              type="button"
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-ink-muted hover:bg-white/50 hover:text-ink"
              onClick={close}
              aria-label="Close chat"
            >
              <X size={18} strokeWidth={1.8} />
            </button>
          </header>

          <div
            ref={logRef}
            className="flex-1 space-y-3 overflow-y-auto overscroll-contain px-4 py-4"
            aria-live="polite"
          >
            {messages.map((message) =>
              message.text ? (
                <p
                  key={message.id}
                  className={
                    message.role === "user"
                      ? "ml-8 rounded-2xl rounded-br-md bg-gold/25 px-3 py-2 text-sm leading-relaxed text-ink"
                      : "mr-8 rounded-2xl rounded-bl-md bg-white/55 px-3 py-2 text-sm leading-relaxed text-ink"
                  }
                >
                  {message.text}
                </p>
              ) : (
                <p key={message.id} className="sr-only">
                  Reply started
                </p>
              ),
            )}

            {typing ? (
              <div
                className="mr-8 rounded-2xl rounded-bl-md bg-white/55 px-3 py-3"
                aria-label="Gold Mans Supply Corporation is typing"
              >
                <span className="chat-typing" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </span>
              </div>
            ) : null}

            {showSuggestions ? (
              <div className="flex flex-wrap gap-2 pt-1">
                {chatSuggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    className="glass-chip rounded-full px-3 py-1.5 text-xs text-ink hover:text-gold-bright"
                    onClick={() => handleVisitorText(suggestion)}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          {composing ? (
            <form
              className="border-t border-white/50 px-4 py-3"
              onSubmit={onSendInfo}
              noValidate
            >
              <div className="sr-only" aria-hidden="true">
                <label htmlFor="chat-website">Website</label>
                <input
                  id="chat-website"
                  name="chat-website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={compose.website}
                  onChange={(event) =>
                    setCompose((current) => ({
                      ...current,
                      website: event.target.value,
                    }))
                  }
                />
              </div>
              <div className="grid gap-2">
                <label className="sr-only" htmlFor="chat-name">
                  Name
                </label>
                <input
                  id="chat-name"
                  className="field min-h-11"
                  placeholder="Your name"
                  autoComplete="name"
                  value={compose.fullName}
                  onChange={(event) =>
                    setCompose((current) => ({
                      ...current,
                      fullName: event.target.value,
                    }))
                  }
                  required
                />
                <label className="sr-only" htmlFor="chat-email">
                  Email
                </label>
                <input
                  id="chat-email"
                  type="email"
                  className="field min-h-11"
                  placeholder="Your email"
                  autoComplete="email"
                  value={compose.email}
                  onChange={(event) =>
                    setCompose((current) => ({
                      ...current,
                      email: event.target.value,
                    }))
                  }
                  required
                />
                <label className="sr-only" htmlFor="chat-info">
                  Message
                </label>
                <textarea
                  id="chat-info"
                  rows={3}
                  className="field min-h-20 resize-none"
                  placeholder="Any information you would like to send"
                  value={compose.message}
                  onChange={(event) =>
                    setCompose((current) => ({
                      ...current,
                      message: event.target.value,
                    }))
                  }
                  required
                />
              </div>
              {composeError ? (
                <p className="mt-2 text-xs text-[#c45c5c]">{composeError}</p>
              ) : null}
              <div className="mt-3 flex gap-2">
                <button
                  type="submit"
                  className="btn-primary min-h-10 flex-1 px-4 text-sm disabled:opacity-60"
                  disabled={sending}
                >
                  {sending ? "Sending..." : "Send to the company"}
                </button>
                <button
                  type="button"
                  className="btn-secondary min-h-10 px-4 text-sm"
                  onClick={() => setComposing(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="border-t border-white/50 px-3 py-3">
              <form
                className="flex items-end gap-2"
                onSubmit={(event) => {
                  event.preventDefault();
                  handleVisitorText(draft);
                }}
              >
                <label className="sr-only" htmlFor="chat-draft">
                  Message
                </label>
                <textarea
                  id="chat-draft"
                  ref={inputRef}
                  rows={1}
                  className="field min-h-11 max-h-28 flex-1 resize-none py-2.5"
                  placeholder="Ask a question or type a message"
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  onKeyDown={onDraftKeyDown}
                />
                <button
                  type="submit"
                  className="btn-primary h-11 w-11 min-h-11 shrink-0 rounded-full p-0"
                  aria-label="Send message"
                  disabled={!draft.trim()}
                >
                  <Send size={16} strokeWidth={1.9} />
                </button>
              </form>
              <button
                type="button"
                className="mt-2 text-xs text-gold-bright underline-offset-2 hover:underline"
                onClick={() => openComposer(draft.trim())}
              >
                Send information to the company
              </button>
            </div>
          )}
        </m.div>
      ) : null}

      {open ? null : (
        <button
          ref={launcherRef}
          type="button"
          className="pointer-events-auto btn-primary h-14 w-14 min-h-14 rounded-full p-0 shadow-[0_16px_32px_-12px_rgb(196_163_90_/_0.8)]"
          aria-expanded={false}
          aria-label="Open company chat"
          onClick={() => setOpen(true)}
        >
          <MessageCircle size={22} strokeWidth={1.8} />
        </button>
      )}
    </div>
  );
}
