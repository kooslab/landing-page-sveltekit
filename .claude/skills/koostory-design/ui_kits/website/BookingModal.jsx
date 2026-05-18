// BookingModal.jsx — fake booking confirmation
function BookingModal({ open, onClose }) {
  const [step, setStep] = React.useState("form");
  React.useEffect(() => { if (open) setStep("form"); }, [open]);
  if (!open) return null;
  return (
    <div className="ks-modal-scrim" onClick={onClose}>
      <div className="ks-modal" onClick={(e) => e.stopPropagation()}>
        {step === "form" ? (
          <>
            <span className="ks-eyebrow">30-min call · with Johnny Koo</span>
            <h3>What's the work?</h3>
            <p>Tell us the team, the project, and what stalled. We read everything before the call.</p>
            <div className="ks-field-row">
              <label className="ks-field">
                <span>Work email</span>
                <input type="email" placeholder="you@company.de" />
              </label>
              <label className="ks-field">
                <span>Team size</span>
                <select><option>6–10</option><option>10–25</option><option>25–60</option><option>60+</option></select>
              </label>
            </div>
            <label className="ks-field">
              <span>What's the project, in two sentences?</span>
              <textarea rows="3" placeholder="The ops team has been trying to..."></textarea>
            </label>
            <div className="ks-modal-actions">
              <button className="ks-btn ks-btn-secondary-outline" onClick={onClose}>Cancel</button>
              <button className="ks-btn ks-btn-primary-dark" onClick={() => setStep("done")}>Send & pick a time</button>
            </div>
          </>
        ) : (
          <>
            <div className="ks-check">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <h3>We'll be in touch by Tuesday.</h3>
            <p>
              Johnny reads everything personally. You'll get a calendar link and a short note about what we'd cover. No automated sales sequence — we hate those too.
            </p>
            <div className="ks-modal-actions">
              <button className="ks-btn ks-btn-primary-dark" onClick={onClose}>Close</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
window.BookingModal = BookingModal;
