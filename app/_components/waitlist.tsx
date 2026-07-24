"use client";
import { useState } from "react";

export default function Waitlist() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    try {
      const list = JSON.parse(localStorage.getItem("presence_waitlist") || "[]");
      list.push({ email, ts: Date.now() });
      localStorage.setItem("presence_waitlist", JSON.stringify(list));
    } catch {}
    setDone(true);
  }

  if (done) return <div style={{ color: "var(--green)", fontWeight: 600, marginTop: 18, fontSize: 17 }}>You're on the list. We'll be in touch soon. ⚡</div>;

  return (
    <form onSubmit={submit}>
      <input type="email" placeholder="you@email.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
      <button className="btn btn-primary" type="submit">Request access</button>
    </form>
  );
}
