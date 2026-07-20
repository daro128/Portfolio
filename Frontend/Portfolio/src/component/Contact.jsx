
import { useState, useEffect } from "react";
import Reveal from "./Reveal.jsx";
import { sendContactMessage, isEmailConfigured } from "../services/emailService.js";
import { fetchComments, postComment, isSupabaseConfigured } from "../services/commentsService.js";

const Icon = {
  user: (c = "") => (
    <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
  ),
  mail: (c = "") => (
    <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
  ),
  message: (c = "") => (
    <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
  ),
  send: (c = "") => (
    <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
  ),
  share: (c = "") => (
    <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.59 13.51 6.83 3.98"/><path d="m15.41 6.51-6.82 3.98"/></svg>
  ),
  photo: (c = "") => (
    <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
  ),
  github: (c = "") => (
    <svg className={c} viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-2.17c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.75 2.69 1.25 3.34.95.1-.74.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.26 5.66.41.36.78 1.05.78 2.13v3.16c0 .3.2.67.8.55A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z"/></svg>
  ),
  linkedin: (c = "") => (
    <svg className={c} viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zM7.12 20.45H3.55V9h3.57v11.45z"/></svg>
  ),
  facebook: (c = "") => (
  <svg className={c} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07c0 6.03 4.39 11.03 10.13 11.93v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.54-4.69 1.31 0 2.68.24 2.68.24v2.96h-1.51c-1.49 0-1.95.93-1.95 1.88v2.27h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07z"/>
  </svg>
),
  telegram: (c = "") => (
  <svg className={c} viewBox="0 0 24 24" fill="currentColor">
    <path d="M9.999 15.17l-.398 5.607c.57 0 .816-.245 1.11-.54l2.664-2.544 5.52 4.04c1.012.558 1.73.265 2.003-.93l3.63-17.02c.347-1.607-.58-2.236-1.566-1.87L1.73 9.405c-1.548.603-1.525 1.468-.264 1.86l5.432 1.695L19.5 5.01c.594-.38 1.136-.17.692.21L9.999 15.17z"/>
  </svg>
),
  tiktok: (c = "") => (
    <svg className={c} viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.9 2.9 0 0 1-5.2 1.74 2.9 2.9 0 0 1 2.31-4.64c.3 0 .58.04.86.13V9.4a6.33 6.33 0 0 0-.86-.05A6.34 6.34 0 0 0 5 22.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.45a4.85 4.85 0 0 1-1.04-.05z"/></svg>
  ),
  chat: (c = "") => (
    <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>
  ),
};

/* ---------- reusable pieces ---------- */
const glass = "bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-2xl";

function SocialCard({ icon, title, handle, href, wide }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      style={{ "--glow-color": "rgba(168,85,247,0.5)" }}
      className={`${glass} hover-glow flex items-center gap-3 p-3 transition-all duration-300 hover:translate-x-1 hover:border-purple-500/40 hover:bg-white/[0.07] ${wide ? "col-span-2" : ""}`}
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/[0.06] text-slate-200">{icon}</span>
      <span className="min-w-0">
        <span className="block truncate text-sm font-semibold text-slate-100">{title}</span>
        <span className="block truncate text-xs text-slate-400">{handle}</span>
      </span>
    </a>
  );
}

function timeAgo(ts) {
  const s = Math.floor((Date.now() - ts) / 1000);
  if (s < 60) return "Just now";
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  return `${Math.floor(s / 86400)}d ago`;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const COMMENTS_KEY = "portfolio.comments";

/* ---------- main component ---------- */
export default function Contact() {
  // Get in Touch form
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [sendError, setSendError] = useState("");

  // Comments
  const [comments, setComments] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(COMMENTS_KEY));
      if (Array.isArray(stored) && stored.length) return stored;
    } catch {
      // ignore malformed storage
    }
    return [{ id: 1, name: "Eki", message: "Ngelag kaga bang?", photo: null, ts: Date.now() - 3600_000 }];
  });
  const [comment, setComment] = useState({ name: "", message: "" });
  const [commentError, setCommentError] = useState("");
  const [photo, setPhoto] = useState(null);
  const [photoName, setPhotoName] = useState("");

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    fetchComments()
      .then((data) => {
        if (!data) return;
        setComments(
          data.map((c) => ({
            id: c.id,
            name: c.name,
            message: c.message,
            photo: c.photo_url,
            ts: new Date(c.created_at).getTime(),
          }))
        );
      })
      .catch(() => {
        // Supabase configured but unreachable — keep whatever is already loaded.
      });
  }, []);

  useEffect(() => {
    if (isSupabaseConfigured) return; // Supabase is the source of truth once configured
    localStorage.setItem(COMMENTS_KEY, JSON.stringify(comments));
  }, [comments]);

  const validateForm = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Name is required";
    if (!form.email.trim()) next.email = "Email is required";
    else if (!EMAIL_RE.test(form.email)) next.email = "Enter a valid email address";
    if (!form.message.trim()) next.message = "Message is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setSending(true);
    setSendError("");
    try {
      if (isEmailConfigured) {
        await sendContactMessage(form);
      } else {
        // EmailJS not configured yet (see Frontend/.env.example) — simulate so the UI still works.
        await new Promise((resolve) => setTimeout(resolve, 1200));
      }
      setSent(true);
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setSent(false), 3000);
    } catch (err) {
      setSendError(err.message || "Failed to send message. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const handlePhoto = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) return alert("Max file size: 5MB");
    setPhotoName(file.name);
    const reader = new FileReader();
    reader.onload = () => setPhoto(reader.result);
    reader.readAsDataURL(file);
  };

  const handlePost = async (e) => {
    e.preventDefault();
    if (!comment.name.trim() || !comment.message.trim()) {
      setCommentError("Name and message are required");
      return;
    }
    setCommentError("");

    if (isSupabaseConfigured) {
      try {
        const saved = await postComment({ name: comment.name, message: comment.message, photoUrl: photo });
        setComments([
          { id: saved.id, name: saved.name, message: saved.message, photo: saved.photo_url, ts: new Date(saved.created_at).getTime() },
          ...comments,
        ]);
      } catch (err) {
        setCommentError(err.message || "Failed to post comment. Please try again.");
        return;
      }
    } else {
      setComments([{ id: Date.now(), name: comment.name, message: comment.message, photo, ts: Date.now() }, ...comments]);
    }

    setComment({ name: "", message: "" });
    setPhoto(null);
    setPhotoName("");
  };

  const inputCls =
    "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition-all duration-300 focus:border-purple-500/60 focus:ring-2 focus:ring-purple-500/20";

  return (
    <section id="contact" className="relative mx-auto max-w-6xl px-6 py-20">
      {/* header */}
      <div className="mb-12 text-center">
        <h2 className="bg-gradient-to-r from-[#c084fc] to-[#6366f1] bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
          Contact Me
        </h2>
        <p className="mt-3 text-sm text-slate-400">
          Got a question? Send me a message, and I'll get back to you soon.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[5fr_7fr]">
        {/* ===== LEFT column ===== */}
        <Reveal direction="left" className="flex flex-col gap-6">
          {/* Get in Touch */}
          <div className={`${glass} p-7`}>
            <div className="flex items-start justify-between">
              <h3 className="bg-gradient-to-r from-[#c084fc] to-[#6366f1] bg-clip-text text-2xl font-bold text-transparent">
                Get in Touch
              </h3>
              {Icon.share("h-5 w-5 text-purple-400")}
            </div>
            <p className="mt-2 mb-6 text-sm text-slate-400">
              Have something to discuss? Send me a message and let's talk.
            </p>

            <form onSubmit={handleSend} noValidate className="flex flex-col gap-4">
              {sendError && <p className="text-xs text-red-400">{sendError}</p>}
              <div>
                <div className="relative">
                  <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">{Icon.user("h-4 w-4")}</span>
                  <input className={`${inputCls} pl-11 ${errors.name ? "border-red-500/60" : ""}`} placeholder="Your Name" value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </div>
                {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
              </div>
              <div>
                <div className="relative">
                  <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">{Icon.mail("h-4 w-4")}</span>
                  <input type="email" className={`${inputCls} pl-11 ${errors.email ? "border-red-500/60" : ""}`} placeholder="Your Email" value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })} />
                </div>
                {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
              </div>
              <div>
                <div className="relative">
                  <span className="pointer-events-none absolute left-4 top-4 text-slate-500">{Icon.message("h-4 w-4")}</span>
                  <textarea rows={5} className={`${inputCls} resize-none pl-11 ${errors.message ? "border-red-500/60" : ""}`} placeholder="Your Message" value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })} />
                </div>
                {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message}</p>}
              </div>
              <button
                type="submit"
                disabled={sending}
                style={{ "--glow-color": "rgba(168,85,247,0.6)" }}
                className="hover-glow hover-shine flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#6366f1] to-[#a855f7] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-600/25 transition-all duration-300 disabled:opacity-60"
              >
                {sent ? "Message Sent ✓" : sending ? "Sending..." : (<>{Icon.send("h-4 w-4")} Send Message</>)}
              </button>
            </form>
          </div>

          {/* Connect With Me */}
          <div className={`${glass} p-7`}>
            <h4 className="mb-5 flex items-center gap-2 text-base font-semibold text-slate-100">
              <span className="h-[3px] w-6 rounded bg-gradient-to-r from-[#6366f1] to-[#a855f7]" />
              Connect With Me
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {/* CHANGE THESE LINKS + HANDLES TO YOURS */}
              <SocialCard wide icon={Icon.linkedin("h-5 w-5 text-sky-400")} title="Let's Connect" handle="on LinkedIn" href="https://linkedin.com/in/yourname" />
              <SocialCard icon={Icon.facebook("h-5 w-5 text-sky-500")} title="Facebook" handle="@darorat" href="https://www.facebook.com/share/14hxD87t8qW/?mibextid=wwXIfr" />
              <SocialCard icon={Icon.telegram("h-5 w-5 text-sky-500")} title="Telegram" handle="@DARO" href="https://t.me/daroRat" />
              <SocialCard icon={Icon.github("h-5 w-5 text-slate-200")} title="Github" handle="@Daro Rat" href="https://github.com/daro128" />
              <SocialCard icon={Icon.tiktok("h-5 w-5 text-slate-200")} title="Tiktok" handle="@darorat113" href="https://www.tiktok.com/@darorat113?is_from_webapp=1&sender_device=pc" />
            </div>
          </div>
        </Reveal>

        {/* ===== RIGHT column: Comments ===== */}
        <Reveal direction="right" className={`${glass} flex flex-col p-7`}>
          <h3 className="mb-6 flex items-center gap-3 text-lg font-bold text-slate-100">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-500/15 text-purple-400">{Icon.chat("h-5 w-5")}</span>
            Comments <span className="text-purple-400">({comments.length})</span>
          </h3>

          <form onSubmit={handlePost} noValidate className="flex flex-col gap-4">
            {commentError && <p className="text-xs text-red-400">{commentError}</p>}
            <div>
              <label className="mb-2 block text-xs font-semibold text-slate-300">
                Name <span className="text-red-400">*</span>
              </label>
              <input className={inputCls} placeholder="Enter your name" value={comment.name}
                onChange={(e) => setComment({ ...comment, name: e.target.value })} />
            </div>
            <div>
              <label className="mb-2 block text-xs font-semibold text-slate-300">
                Message <span className="text-red-400">*</span>
              </label>
              <textarea rows={4} className={`${inputCls} resize-none`} placeholder="Write your message here..." value={comment.message}
                onChange={(e) => setComment({ ...comment, message: e.target.value })} />
            </div>
            <div>
              <label className="mb-2 block text-xs font-semibold text-slate-300">
                Profile Photo <span className="font-normal text-slate-500">(optional)</span>
              </label>
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-purple-500/30 bg-purple-500/15 px-4 py-2.5 text-sm font-medium text-purple-300 transition-all duration-300 hover:bg-purple-500/25">
                  {Icon.photo("h-4 w-4")}
                  {photoName || "Choose Profile Photo"}
                  <input type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
                </label>
                <p className="mt-2 text-center text-[11px] text-slate-500">Max file size: 5MB</p>
              </div>
            </div>
            <button
              type="submit"
              style={{ "--glow-color": "rgba(168,85,247,0.6)" }}
              className="hover-glow hover-shine flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#6366f1] to-[#a855f7] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-600/25 transition-all duration-300"
            >
              {Icon.send("h-4 w-4")} Post Comment
            </button>
          </form>

          {/* comment list */}
          <div className="mt-6 flex flex-col gap-3 overflow-y-auto pr-1" style={{ maxHeight: 340 }}>
            {comments.map((c) => (
              <div key={c.id} className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.03] p-4">
                {c.photo ? (
                  <img src={c.photo} alt={c.name} className="h-9 w-9 shrink-0 rounded-full object-cover" />
                ) : (
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-700 text-slate-300">{Icon.user("h-4 w-4")}</span>
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-sm font-semibold text-slate-100">{c.name}</span>
                    <span className="shrink-0 text-[11px] text-slate-500">{timeAgo(c.ts)}</span>
                  </div>
                  <p className="mt-0.5 break-words text-sm text-slate-400">{c.message}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
