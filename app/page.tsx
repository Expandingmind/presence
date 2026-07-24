import Waitlist from "./_components/waitlist";

export default function Home() {
  return (
    <>
      <header>
        <nav>
          <div className="brand">
            <span className="dot" />
            Presence
          </div>
          <a className="nav-cta" href="#waitlist">Get early access</a>
        </nav>
      </header>

      <main>
        <section className="hero wrap">
          <div className="pill"><span className="live" /> The marketing brain for indie app founders</div>
          <h1>The <em>presence</em><br />your app deserves.</h1>
          <p className="sub">You built something worth showing. Presence is how you show it — a marketing brain that studies what's winning in your niche, hands you the next post to shoot, manages your UGC creators, and never lets a good idea die in your notes app.</p>
          <div className="cta-row">
            <a className="btn btn-primary" href="#waitlist">Join the waitlist →</a>
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
