// Nav.jsx — top navigation, dark variant over indigo hero
function Nav({ onBook }) {
  return (
    <header className="ks-nav">
      <a href="#top" className="ks-brand is-on-dark" aria-label="KooStory">
        <span>KooStory</span><span className="dot">.</span>
      </a>
      <nav className="ks-nav-links">
        <a href="#workshops">Workshops</a>
        <a href="#build">Build</a>
        <a href="#case-studies">Case studies</a>
        <a href="#about">About</a>
      </nav>
      <div className="ks-nav-right">
        <button className="ks-lang" aria-label="Switch language">EN · DE</button>
        <button className="ks-btn ks-btn-on-dark-pill" onClick={onBook}>
          Get started
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12 5 19 12 12 19"/>
          </svg>
        </button>
      </div>
    </header>
  );
}
window.Nav = Nav;
