// Footer.jsx
function Footer() {
  return (
    <footer className="ks-footer">
      <div className="ks-footer-inner">
        <div className="ks-footer-brand">
          <span className="ks-brand"><span>KooStory</span><span className="dot">.</span></span>
          <p className="ks-footer-tag">A Kooslab consultancy. Berlin, since 2024.</p>
        </div>
        <div className="ks-footer-cols">
          <div>
            <div className="ks-footer-h">Work</div>
            <a href="#workshops">Workshops</a>
            <a href="#build">Build</a>
            <a href="#case-studies">Case studies</a>
          </div>
          <div>
            <div className="ks-footer-h">Company</div>
            <a href="#about">About</a>
            <a href="#">Writing</a>
            <a href="mailto:hi@koostory.de">Contact</a>
          </div>
          <div>
            <div className="ks-footer-h">Legal</div>
            <a href="#">Impressum</a>
            <a href="#">Datenschutz</a>
            <a href="#">Terms</a>
          </div>
        </div>
      </div>
      <div className="ks-footer-base">
        <span>© 2026 Kooslab GmbH</span>
        <span>Made in Berlin · Mitte</span>
      </div>
    </footer>
  );
}
window.Footer = Footer;
