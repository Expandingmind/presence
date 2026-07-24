import Waitlist from "./_components/waitlist";

export default function Home() {
  return (
    <>
      <header className="site-header">
        <nav className="site-nav">
          <a href="/" className="brand"><span className="dot" />Presence</a>
          <div className="site-nav-links">
            <a href="#analyzer">Analyzer</a>
            <a href="#creators">For creators</a>
            <a href="#faq">FAQ</a>
          </div>
          <div className="site-nav-cta">
            <a href="/login" className="nav-signin">Sign in</a>
            <a className="btn btn-primary btn-sm" href="/login">Get started free</a>
          </div>
        </nav>
      </header>

      <main>
        <section className="hero wrap">
          <div className="pill"><span className="live" /> The marketing brain for indie app founders</div>
          <h1>The <em>presence</em><br />your app deserves.</h1>
          <p className="sub">You built something worth showing. Presence is how you show it — a marketing brain that studies what's winning in your niche, hands you the next post to shoot, manages your UGC creators, and never lets a good idea die in your notes app.</p>
          <div className="cta-row">
            <a className="btn btn-primary" href="/login">Get started free →</a>
            <a className="btn btn-ghost" href="/analyze">Try the analyzer</a>
          </div>

          <div className="demo">
            <div className="phone">
              <div className="phone-top">
                <div className="av">🧠</div>
                <div><b>Presence</b><br /><span>● active</span></div>
              </div>
              <div className="msg me">
                <div className="vidchip"><span className="pl">▶</span> productivity_app_demo.mp4 · 0:41</div>
              </div>
              <div className="msg bot">Got it — <b>2.4M views</b>. In your niche (indie productivity apps), payoff-first hooks like this outperform by <b>3.1×</b>. The first 1.2s shows the finished dashboard, not the problem.</div>
              <div className="msg me">give me 3 hooks like this for my app</div>
              <div className="msg bot">On it. Feeding your app profile + the pattern → <b>3 shootable ideas</b> incoming.</div>
              <div className="msg me">🔥</div>
            </div>
          </div>
        </section>

        {/* Social proof strip */}
        <section className="wrap proof">
          <div className="proof-strip">
            <span className="proof-item">✦ Built for indie iOS + web app founders</span>
            <span className="proof-item">✦ Powered by Gemini + Claude</span>
            <span className="proof-item">✦ Early access open</span>
          </div>
        </section>

        <section id="how" className="wrap">
          <div className="center" style={{ maxWidth: 640 }}>
            <div className="eyebrow">How it works</div>
            <h2>Feed it what's winning.<br /><em>Ship what's next.</em></h2>
            <p className="lead">Presence turns the videos already going viral in your space into the exact next post you should shoot.</p>
          </div>
          <div className="steps">
            <div className="card"><div className="n">01</div><h3>Send it what's winning</h3><p>Paste a link to any short-form video hitting in your niche — or drop one of your own. Presence watches the actual video, not just the numbers.</p></div>
            <div className="card"><div className="n">02</div><h3>It learns your niche</h3><p>It maps the hook, cut rhythm, on-screen beats, and the pattern to what's outperforming for indie software right now.</p></div>
            <div className="card"><div className="n">03</div><h3>It hands you the next post</h3><p>Five shootable ideas, ranked by fit to your app. Hook, format, outline, CTA. Ready to film today.</p></div>
          </div>
        </section>

        <section className="wrap">
          <div className="center" style={{ maxWidth: 640 }}>
            <div className="eyebrow">What's inside</div>
            <h2>Everything you were <em>duct-taping together</em></h2>
            <p className="lead">One tool for the three things every app founder is doing at 11pm on a Tuesday.</p>
          </div>
          <div className="feat">
            <div className="card"><h3><span className="ico">🎬</span> Video intelligence, tuned for software</h3><p>Analyzes short-form with the frameworks that actually move installs — not generic creator advice built for lifestyle brands.</p></div>
            <div className="card"><h3><span className="ico">⚡</span> One winner → ten next posts</h3><p>Every video you feed it becomes five ranked, shootable ideas. Hook, format, outline, CTA — ready today.</p></div>
            <div className="card"><h3><span className="ico">👥</span> Your UGC creators, one place</h3><p>Invite creators, send briefs, track deliverables. Stop losing threads in DMs and spreadsheets.</p></div>
            <div className="card"><h3><span className="ico">🧠</span> The idea inbox that finally works</h3><p>Every hook, every draft, every "what if…" — captured and organized. Ready when you sit down to shoot.</p></div>
          </div>
        </section>

        {/* Analyzer showcase */}
        <section id="analyzer" className="wrap">
          <div className="center" style={{ maxWidth: 640 }}>
            <div className="eyebrow">Analyzer</div>
            <h2>What you actually <em>get back.</em></h2>
            <p className="lead">Not a summary. Not a vibe. A structured breakdown you can act on today.</p>
          </div>
          <div className="showcase">
            <div className="showcase-card">
              <div className="showcase-label">Hook analysis</div>
              <div className="showcase-title">Payoff-first · <span style={{ color: "var(--green)" }}>4.5/5</span></div>
              <p>The first 1.2s shows the end state — a fully-organized dashboard — before the problem. Pattern-interrupts the "another productivity app" bias.</p>
            </div>
            <div className="showcase-card">
              <div className="showcase-label">Idea #1 for your niche</div>
              <div className="showcase-title">"Everyone's calendar app looks the same. Mine has one weird feature."</div>
              <p style={{ color: "var(--muted)", fontSize: 14 }}>Screen recording · Hook (0-3s): show feature in action · Body (3-10s): the "why" · Payoff (10s+): CTA to try. Fit: 5/5.</p>
            </div>
          </div>
          <div className="center" style={{ marginTop: 32 }}>
            <a className="btn btn-primary" href="/analyze">Try it on a video →</a>
          </div>
        </section>

        {/* For creators */}
        <section id="creators" className="wrap">
          <div className="two-col">
            <div>
              <div className="eyebrow">For creators</div>
              <h2>Working with <em>UGC creators?</em></h2>
              <p className="lead">Your roster, briefs, and deliverables — organized in one place, not scattered across DMs and Notion pages you'll never open again.</p>
              <ul className="check-list">
                <li>Invite creators and track status (prospect · active · paused · dropped)</li>
                <li>Attach platforms, contact info, notes, and past work</li>
                <li>Brief them on the exact next post — informed by what Presence's analyzer found working</li>
                <li>Never lose a creator conversation again</li>
              </ul>
              <a className="btn btn-primary" href="/login" style={{ marginTop: 20 }}>Get started free →</a>
            </div>
            <div className="two-col-visual">
              <div className="mini-list">
                <div className="mini-row">
                  <div>
                    <div style={{ fontWeight: 600 }}>@laura_makesreels</div>
                    <div className="mini-meta">TikTok · Instagram · Active</div>
                  </div>
                  <span className="chip-static">Active</span>
                </div>
                <div className="mini-row">
                  <div>
                    <div style={{ fontWeight: 600 }}>@codywithacamera</div>
                    <div className="mini-meta">YouTube Shorts · Prospect</div>
                  </div>
                  <span className="chip-static muted">Prospect</span>
                </div>
                <div className="mini-row">
                  <div>
                    <div style={{ fontWeight: 600 }}>@theappreviewer</div>
                    <div className="mini-meta">TikTok · Delivered 3 videos</div>
                  </div>
                  <span className="chip-static">Active</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Ingest channels */}
        <section className="wrap">
          <div className="center" style={{ maxWidth: 640 }}>
            <div className="eyebrow">How videos get in</div>
            <h2>Send it a link. <em>Or don't.</em></h2>
            <p className="lead">However you already save videos, Presence catches them. No new habits to build.</p>
          </div>
          <div className="chan center" style={{ justifyContent: "center", maxWidth: 640 }}>
            <div className="tag">🔗 Paste a link <span className="st">live</span></div>
            <div className="tag">💬 Telegram bot <span className="st">at launch</span></div>
            <div className="tag soon">📲 iOS share sheet <span className="st">soon</span></div>
            <div className="tag soon">🧩 Browser extension <span className="st">soon</span></div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="wrap">
          <div className="center" style={{ maxWidth: 640 }}>
            <div className="eyebrow">FAQ</div>
            <h2>Common <em>questions.</em></h2>
          </div>
          <div className="faq">
            <details className="faq-item">
              <summary>What exactly does Presence do?</summary>
              <p>It analyzes short-form videos (TikTok, Reels, YouTube Shorts) using frameworks tuned for software marketing — hook type, pacing, on-screen beats — then hands you 5 next-post ideas ranked by fit to your niche. It also has a UGC creator CRM and an organic idea inbox so your whole marketing brain lives in one place.</p>
            </details>
            <details className="faq-item">
              <summary>What videos can I feed it?</summary>
              <p>Any short-form URL. YouTube Shorts work today; TikTok and Instagram Reels support is landing next. Feed it competitors' viral posts, your own past hits, or anything a friend sent you.</p>
            </details>
            <details className="faq-item">
              <summary>Is this only for indie iOS apps?</summary>
              <p>Presence is niched to software and digital products — indie iOS/Android apps, web tools, SaaS, browser extensions, browser games, AI tools. If your product is downloadable software or a signup-driven web product, the analysis is calibrated for you.</p>
            </details>
            <details className="faq-item">
              <summary>What's the pricing?</summary>
              <p>Free during early access. Paid tiers are coming as we get closer to public launch — early-access founders lock in launch pricing.</p>
            </details>
            <details className="faq-item">
              <summary>How is this different from a content calendar or a Notion template?</summary>
              <p>Content calendars are storage. Presence is the brain that tells you <em>what</em> to put in the calendar — grounded in what's actually working in your niche right now, not generic creator advice from 2022.</p>
            </details>
            <details className="faq-item">
              <summary>Is there a mobile app?</summary>
              <p>Web app first (works on mobile browsers). A Telegram bot ships next — forward any video to it and get the analysis back in the same thread. Native iOS share-sheet integration is planned.</p>
            </details>
          </div>
        </section>

        <section id="waitlist" className="wrap">
          <div className="waitlist">
            <div className="eyebrow">Early access</div>
            <h2 style={{ maxWidth: 560, margin: "0 auto 10px" }}>Give your app the <em>presence</em> it deserves.</h2>
            <p className="lead center">We're onboarding a small first batch of indie app founders. Bring your app, bring your niche.</p>
            <Waitlist />
            <div className="note">No spam. Just a heads-up when your spot opens.</div>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap foot">
          <div className="brand" style={{ fontSize: 18 }}><span className="dot" style={{ width: 15, height: 15 }} />Presence</div>
          <div>© 2026 Presence · the marketing brain for indie app founders</div>
        </div>
      </footer>
    </>
  );
}
