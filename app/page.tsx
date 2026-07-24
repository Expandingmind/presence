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
          <div className="pill"><span className="live" /> Your content strategist, living in your DMs</div>
          <h1>The agent that<br /><em>studies your feed</em></h1>
          <p className="sub">Send Presence your videos. It watches what actually goes viral, finds the patterns hiding across your best posts, and tells you exactly what to make next.</p>
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
                <div className="vidchip"><span className="pl">▶</span> reel_gym_morning.mp4 · 0:34</div>
              </div>
              <div className="msg bot">Got it. This one hit <b>210K views</b> — 3.4× your median. The hook works because you pattern-interrupt in the first 0.8s before anyone reads the caption.</div>
              <div className="msg me">why did it beat my others?</div>
              <div className="msg bot">Your top 5 all share one thing: <b>a visual payoff by second 2</b>, no slow intro. Your flops all open with talking. Want 3 hook ideas built off this pattern for tomorrow?</div>
              <div className="msg me">yes</div>
            </div>
          </div>
        </section>

        <section id="how" className="wrap">
          <div className="center" style={{ maxWidth: 640 }}>
            <div className="eyebrow">How it works</div>
            <h2>You already know it.<br /><em>Just send it a video.</em></h2>
            <p className="lead">No dashboard to learn. No spreadsheet to fill. It works the way you already use your phone.</p>
          </div>
          <div className="steps">
            <div className="card"><div className="n">01</div><h3>Send it your posts</h3><p>Drop a video or a link into the chat, like texting a friend. Clipmind watches it and pulls the metrics that matter.</p></div>
            <div className="card"><div className="n">02</div><h3>It finds the pattern</h3><p>Across everything you send, it learns what your winners have in common — hooks, pacing, format, sound, structure.</p></div>
            <div className="card"><div className="n">03</div><h3>It feeds you what's next</h3><p>Concrete next moves: hooks to steal from yourself, angles that are underused, and the format most likely to hit again.</p></div>
          </div>
        </section>

        <section className="wrap">
          <div className="center" style={{ maxWidth: 640 }}>
            <div className="eyebrow">What it actually does</div>
            <h2>A memory for <em>what works</em></h2>
            <p className="lead">Most creators forget their own wins. Presence never does.</p>
          </div>
          <div className="feat">
            <div className="card"><h3><span className="ico">🎬</span> Watches the video, not just the numbers</h3><p>It sees the hook, the cut rhythm, the on-screen text, the payoff — the craft, not only the view count.</p></div>
            <div className="card"><h3><span className="ico">📈</span> Connects craft to performance</h3><p>Links what you did to what happened. "This edit choice is why it went viral" — with your data, not generic advice.</p></div>
            <div className="card"><h3><span className="ico">🧬</span> Learns your unique signature</h3><p>The more you send, the sharper it gets. It builds a model of what works for <em>you</em>, not the average creator.</p></div>
            <div className="card"><h3><span className="ico">⚡</span> Turns insight into the next post</h3><p>Ends every session with something makeable today: a hook, a format, an angle — ranked by odds of hitting.</p></div>
          </div>
        </section>

        <section className="wrap">
          <div className="center" style={{ maxWidth: 640 }}>
            <div className="eyebrow">Where it lives</div>
            <h2>It meets you <em>where you already are</em></h2>
            <p className="lead">Presence is an agent, not another app to open. It lives in the messaging you already use.</p>
          </div>
          <div className="chan center" style={{ justifyContent: "center", maxWidth: 640 }}>
            <div className="tag">💬 Telegram <span className="st">at launch</span></div>
            <div className="tag">🟢 WhatsApp <span className="st">at launch</span></div>
            <div className="tag soon">📸 Instagram DM <span className="st">soon</span></div>
            <div className="tag soon">🎵 TikTok <span className="st">soon</span></div>
          </div>
        </section>

        <section id="waitlist" className="wrap">
          <div className="waitlist">
            <div className="eyebrow">Early access</div>
            <h2 style={{ maxWidth: 520, margin: "0 auto 10px" }}>Be first to give your content <em>a brain</em></h2>
            <p className="lead center">We're onboarding a small first group of creators. Get in early.</p>
            <Waitlist />
            <div className="note">No spam. Just a heads-up when your spot opens.</div>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap foot">
          <div className="brand" style={{ fontSize: 18 }}><span className="dot" style={{ width: 15, height: 15 }} />Presence</div>
          <div>© 2026 Presence · the marketing brain for app founders</div>
        </div>
      </footer>
    </>
  );
}
