# 🧠 Clipmind

**The agent that studies your feed.**

Send Clipmind your videos. It watches what actually goes viral, finds the patterns hiding across your best posts, and tells you exactly what to make next. A content strategist that lives in your DMs, not another dashboard to open.

> Working name. Alternatives on the table: Hookline, Slipstream, Muse, Vira.

---

## The idea

Every creator forgets their own wins. You have a post that hit 200K and you can't say *why* it beat the one that flopped. Clipmind is the memory and the pattern-finder:

1. **You send it a post** — a video or a link, like texting a friend.
2. **It watches the actual video** — hook, pacing, on-screen text, payoff — not just the view count.
3. **It connects craft to performance** — "this edit choice is why it hit," using *your* data.
4. **It learns your signature** — the more you send, the sharper its model of what works for *you*.
5. **It hands you the next post** — a hook, a format, an angle, ranked by odds of hitting.

The packaging is the differentiator: an **agent that lives in messaging**, not a SaaS dashboard. You already send yourself videos. Now they land somewhere that gets smarter.

---

## The one hard constraint (read this)

The dream pitch is "send it videos on Instagram." Instagram's Messaging API is the blocker:

- Requires an Instagram **Business/Creator** account connected to a Meta app.
- Requires **Meta App Review**, and Meta routinely rejects "bot receives and analyzes your content" use cases.
- Rate-limited and fragile even once approved.

So the **delivery surface** is the risk, not the idea. The plan ships the same magic through channels that allow it *today*:

| Channel | Status | Why |
|---|---|---|
| **Telegram Bot** | Launch | Open Bot API, receives video files directly, zero review. Fastest path to a real product. |
| **WhatsApp (Cloud API)** | Launch | Meta Cloud API, receives media, well-documented. Some onboarding but doable. |
| **Instagram DM** | Later, gated | Add once there's traction to justify App Review. |
| **TikTok** | Later | No inbound-DM API; likely link-based ingestion instead. |

Build for Telegram first. It's the cheapest way to prove the loop works before spending months in Meta review.

---

## Architecture (planned)

```
Creator ──sends video──▶ Messaging channel (Telegram / WhatsApp)
                              │  webhook
                              ▼
                        Ingestion API  (Next.js route / edge)
                              │
              ┌───────────────┼────────────────┐
              ▼               ▼                 ▼
     Video understanding   Metrics enrich   Store
     (frames, transcript,  (views, watch    (Postgres +
      hook, pacing via     time, saves)      vector index
      a vision model)                        of past posts)
              └───────────────┬────────────────┘
                              ▼
                     Pattern engine  (LLM + retrieval over
                     the creator's own history)
                              │
                              ▼
                   Reply in the same DM thread
```

**Likely stack:** Next.js (App Router) on Vercel · Postgres (Neon/Supabase) · a vector store for post history · a vision-capable model for video understanding · a Telegram bot as the first channel.

This repo currently ships the **landing page + waitlist**. Backend is the next milestone.

---

## Roadmap

- [x] Concept + name
- [x] Landing page + waitlist (this repo, live on Vercel)
- [ ] Telegram bot that receives a video and echoes back basic analysis
- [ ] Video understanding pass (transcript, hook detection, pacing)
- [ ] Per-creator history store + retrieval
- [ ] Pattern engine: "here's what your winners share"
- [ ] Next-post suggestions ranked by predicted performance
- [ ] WhatsApp channel
- [ ] Instagram DM (after App Review)

---

## Local dev

The landing page is a single static file. No build step.

```bash
# just open it
open index.html
# or serve it
npx serve .
```

## Deploy

Hosted on Vercel as a static site (auto-detected, no config needed).

---

*Waitlist emails are currently stored in the visitor's browser only (`localStorage`) — wire up a real capture endpoint before running paid traffic.*
