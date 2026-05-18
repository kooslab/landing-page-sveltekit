// ClosingCTA.jsx — every page resolves in the deep-teal band
function ClosingCTA({ onBook }) {
  return (
    <section className="ks-closing">
      <div className="ks-closing-inner">
        <span className="ks-closing-eyebrow">Scale or Fade.</span>
        <h2>
          Most B2B teams in Europe will spend the next eighteen months either learning to use AI or losing to teams that did.
        </h2>
        <p className="ks-closing-body">
          We help with the first one. Workshops in Berlin and remote. Custom builds for teams ready to ship.
        </p>
        <div className="ks-closing-ctas">
          <button className="ks-btn ks-btn-on-teal" onClick={onBook}>
            Book a 30-minute call
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </button>
          <a className="ks-btn ks-btn-on-teal-ghost" href="mailto:hi@koostory.de">hi@koostory.de</a>
        </div>
      </div>
    </section>
  );
}
window.ClosingCTA = ClosingCTA;
