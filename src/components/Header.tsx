import hermanScienceLogo from '../../assets/AI_confident_logo.png';

export function Header() {
  return (
    <header className="hero-card">
      <div className="brand-row">
        <div className="brand-lockup">
          <img src={hermanScienceLogo} alt="Herman Science logo" className="brand-mark-image" />
          <div className="brand-subtitle">Prompt CQI Alignment ROI Calculator</div>
        </div>
      </div>
      <h1>Calculate the ROI of better LLM prompting.</h1>
    </header>
  );
}
