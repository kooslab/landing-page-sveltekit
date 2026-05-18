// Manifesto.jsx
const KS_PRINCIPLES = [
  { n: "01", title: "We ship on day two.", body: "Not a roadmap. Not a memo. A working thing the team uses next week." },
  { n: "02", title: "We don't pitch the model.", body: "Whatever fits the job. The model is the cheapest part of the work." },
  { n: "03", title: "Adoption is the deliverable.", body: "An unused tool is worse than no tool. We measure who opens it on Friday." },
  { n: "04", title: "Honest about limits.", body: "We will tell you when AI is the wrong answer. Most weeks, for most problems, it still is." },
];

function Manifesto() {
  return (
    <section className="ks-section" id="about">
      <div className="ks-section-inner">
        <div className="ks-section-head">
          <span className="ks-eyebrow">How we work</span>
          <h2>Four things we believe.</h2>
        </div>
        <ol className="ks-principles">
          {KS_PRINCIPLES.map(p => (
            <li key={p.n} className="ks-principle">
              <span className="ks-principle-n">{p.n}</span>
              <div>
                <h4 className="ks-principle-title">{p.title}</h4>
                <p className="ks-principle-body">{p.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
window.Manifesto = Manifesto;
