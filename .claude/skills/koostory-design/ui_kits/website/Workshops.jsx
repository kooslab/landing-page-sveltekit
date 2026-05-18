// Workshops.jsx — upcoming workshop list
const KS_WORKSHOPS = [
  { date: "12 Jun 2026", city: "Berlin", title: "AI for operations teams", lang: "DE + EN", spots: "3 spots left", state: "limited" },
  { date: "26 Jun 2026", city: "Hamburg", title: "AI for sales & customer-facing teams", lang: "DE", spots: "Open", state: "open" },
  { date: "10 Jul 2026", city: "Remote", title: "AI for finance & back-office", lang: "EN", spots: "Open", state: "open" },
  { date: "24 Jul 2026", city: "Berlin", title: "Leadership intensive · half-day", lang: "DE + EN", spots: "Waitlist", state: "wait" },
];

function Workshops({ onBook }) {
  const [selected, setSelected] = React.useState(null);
  return (
    <section className="ks-section" id="workshops">
      <div className="ks-section-inner">
        <div className="ks-section-head">
          <span className="ks-eyebrow">Upcoming workshops · summer 2026</span>
          <h2>Four dates. Pick one.</h2>
        </div>
        <ul className="ks-workshops">
          {KS_WORKSHOPS.map((w, i) => (
            <li
              key={i}
              className={`ks-workshop-row ${selected === i ? "is-selected" : ""}`}
              onClick={() => setSelected(selected === i ? null : i)}
            >
              <span className="ks-workshop-date">{w.date}</span>
              <span className="ks-workshop-city">{w.city}</span>
              <span className="ks-workshop-title">{w.title}</span>
              <span className="ks-workshop-lang">{w.lang}</span>
              <span className={`ks-badge ks-badge-${w.state}`}>{w.spots}</span>
            </li>
          ))}
        </ul>
        <div className="ks-workshop-cta">
          {selected !== null ? (
            <button className="ks-btn ks-btn-primary-dark" onClick={onBook}>
              Reserve {KS_WORKSHOPS[selected].city} · {KS_WORKSHOPS[selected].date}
            </button>
          ) : (
            <p className="ks-faint">Pick a date to reserve. Or <a href="#" onClick={(e) => { e.preventDefault(); onBook(); }}>book a private workshop</a> for just your team.</p>
          )}
        </div>
      </div>
    </section>
  );
}
window.Workshops = Workshops;
