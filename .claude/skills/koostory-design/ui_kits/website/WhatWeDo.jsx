// WhatWeDo.jsx — two-column feature cards on canvas-soft
function WhatWeDo() {
  return (
    <section className="ks-section alt" id="what-we-do">
      <div className="ks-section-inner">
        <div className="ks-section-head">
          <span className="ks-eyebrow">What we do</span>
          <h2>Two ways in.</h2>
          <p className="ks-section-lede">
            Workshops get your team moving. Custom builds turn the bits that work into systems. Most clients do both, in that order.
          </p>
        </div>
        <div className="ks-twocol">
          <div className="ks-offer">
            <h3>Workshops</h3>
            <p className="ks-offer-body">
              Two-day hands-on for 6–12 people. Your team brings real work; we build with them. By the end of day two, something useful is in production.
            </p>
            <ul className="ks-list">
              <li>Operations, sales, support, finance teams</li>
              <li>Bring 3 real problems; leave with 3 working tools</li>
              <li>From €4,800 · Berlin or your office</li>
            </ul>
            <div className="ks-offer-foot">
              <a className="ks-link" href="#workshops">
                See upcoming dates
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </a>
            </div>
          </div>
          <div className="ks-offer">
            <h3>Build</h3>
            <p className="ks-offer-body">
              Custom internal tools, agents, and integrations. We pick up where your team's experiments stalled and ship something maintainable.
            </p>
            <ul className="ks-list">
              <li>4–12 week engagements</li>
              <li>You own the code. We document everything.</li>
              <li>TypeScript, Python, whatever fits the integration</li>
            </ul>
            <div className="ks-offer-foot">
              <a className="ks-link" href="#build">
                How we scope a build
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
window.WhatWeDo = WhatWeDo;
