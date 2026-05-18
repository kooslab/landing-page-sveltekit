// Hero.jsx — indigo navy canvas with violet-sky backdrop and half-bleed portrait
function Hero({ onBook }) {
  return (
    <section className="ks-hero" id="top">
      <div className="ks-hero-backdrop" aria-hidden="true"></div>
      <div className="ks-hero-inner">
        <div className="ks-hero-text">
          <span className="ks-eyebrow">Berlin · AI adoption for B2B teams</span>
          <h1>
            Get your team <em>using</em> AI by Friday.
          </h1>
          <p className="ks-hero-lede">
            We run hands-on workshops and build the custom tools that follow. For 6–40 person teams who'd rather see the work than read about it.
          </p>
          <div className="ks-hero-ctas">
            <button className="ks-btn ks-btn-on-dark-pill" onClick={onBook}>
              Book a 30-minute call
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </button>
          </div>
          <div className="ks-hero-meta">
            <span>4-hour workshops</span>
            <span>·</span>
            <span>German + English</span>
            <span>·</span>
            <span>On-site or remote</span>
          </div>
        </div>
        <image-slot
          id="hero-portrait"
          class="ks-hero-portrait"
          placeholder="Drop a portrait photo here"
          shape="rounded"
          radius="16"
        ></image-slot>
      </div>
    </section>
  );
}
window.Hero = Hero;
