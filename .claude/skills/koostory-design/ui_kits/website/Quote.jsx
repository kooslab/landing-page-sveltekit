// Quote.jsx — pull-quote with attribution
function Quote() {
  return (
    <section className="ks-section">
      <div className="ks-section-inner ks-quote-wrap">
        <span className="ks-eyebrow">What clients say</span>
        <blockquote className="ks-quote">
          They didn't sell us a transformation. They sat with our ops lead for two days, watched her work, and built her three small things that she now refuses to give back.
        </blockquote>
        <div className="ks-quote-attr">
          <div className="ks-quote-name">Lena Weber</div>
          <div className="ks-quote-role">COO · mid-sized logistics company · Hamburg</div>
        </div>
      </div>
    </section>
  );
}
window.Quote = Quote;
