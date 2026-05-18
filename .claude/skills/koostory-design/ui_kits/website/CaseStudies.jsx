// CaseStudies.jsx — three case-study cards
const KS_CASES = [
  {
    industry: "Logistics · 40 people",
    title: "From spreadsheet to system",
    body: "Quote prep dropped from 18 minutes to 90 seconds. The win wasn't the model — it was getting the ops team to trust it.",
    meta: "8 min read",
  },
  {
    industry: "B2B SaaS · 12 people",
    title: "An AI tool the support team actually opens",
    body: "We rebuilt three abandoned internal tools as one. Daily usage went from 0 to 94% inside a month.",
    meta: "6 min read",
  },
  {
    industry: "Manufacturing · 220 people",
    title: "Procurement that drafts its own RFQs",
    body: "Six weeks. One agent. €380k of quarterly time recovered, audited monthly by the finance lead.",
    meta: "11 min read",
  },
];

function CaseStudies() {
  return (
    <section className="ks-section alt" id="case-studies">
      <div className="ks-section-inner">
        <div className="ks-section-head">
          <span className="ks-eyebrow">Case studies</span>
          <h2>What it looks like in production.</h2>
        </div>
        <div className="ks-cases">
          {KS_CASES.map((c, i) => (
            <article key={i} className="ks-case">
              <span className="ks-case-industry">{c.industry}</span>
              <h3 className="ks-case-title">{c.title}</h3>
              <p className="ks-case-body">{c.body}</p>
              <span className="ks-case-meta">{c.meta} · <a href="#">Read</a></span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
window.CaseStudies = CaseStudies;
