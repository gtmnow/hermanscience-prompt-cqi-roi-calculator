import { observations } from '../data/evalData';

export function MethodologyPanel() {
  return (
    <section className="panel full-width">
      <div className="panel-header">Notes and methodology</div>
      <div className="notes-grid">
        <div>
          <div className="subsection-title">What this model does</div>
          <ul className="notes-list">
            <li>Uses the initial prompt-eval results as the coefficient source.</li>
            <li>Selected CQI lift is the weighted selected-profile win rate across the task mix.</li>
            <li>Best observed headroom is the weighted best profile win rate seen for each task.</li>
            <li>Hours and value outputs scale from weekly LLM usage and hourly value assumptions.</li>
            <li>Latency is shown as a directional reference only and is not part of the ROI math.</li>
          </ul>
        </div>
        <div>
          <div className="subsection-title">Current observations</div>
          <ul className="notes-list">
            {observations.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="footnote">
        Prototype note: profile labels currently reflect the initial evaluation set. The app is ready
        to swap in true CQI-labeled results when that dataset is available.
      </div>
    </section>
  );
}
