import { useState } from 'react';
import { projects } from '../data/projects';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { ScreenMindDeepDive, AgentDeepDive, ToolForgeDeepDive } from './ProjectDeepDive';

// Tag-based categories derived from actual project tech stacks
const categories = [
  { label: 'All', filter: () => true },
  { label: 'Agentic AI', filter: p => [1, 2, 3].includes(p.id) },
  { label: 'Computer Vision', filter: p => p.tags.some(t => ['CNN', 'GradCAM', 'OpenCV', 'LBPH'].includes(t)) },
  { label: 'NLP', filter: p => p.tags.some(t => ['BART', 'T5', 'PEGASUS', 'CodeBERT'].includes(t)) },
  { label: 'Full Stack', filter: p => p.tags.some(t => ['React', 'React 19', 'FastAPI', 'Flask', 'Android'].includes(t)) },
  { label: 'Deployed', filter: p => !!p.live },
];

export default function Projects() {
  const [active, setActive] = useState('All');
  const [expanded, setExpanded] = useState(null);
  const [sleepPopup, setSleepPopup] = useState(null); // { url, title }
  const ref = useScrollReveal();

  const activeCat = categories.find(c => c.label === active) || categories[0];
  const filtered = projects.filter(activeCat.filter);

  const renderDetails = (project) => {
    if (project.id === 1) return <ScreenMindDeepDive />;
    if (project.id === 2) return <AgentDeepDive />;
    if (project.id === 3) return <ToolForgeDeepDive />;
    if (!project.highlights || project.highlights.length === 0) return null;
    return (
      <div className="project-highlights">
        {project.highlights.map((h, idx) => (
          <div className="project-highlight" key={idx}>
            <span className="project-highlight-arrow">▹</span>
            <span>{h}</span>
          </div>
        ))}
      </div>
    );
  };

  const handleLiveClick = (e, p) => {
    if (p.sleepNote) {
      e.preventDefault();
      setSleepPopup({ url: p.live, title: p.title });
    }
  };

  const rows = [];
  for (let i = 0; i < filtered.length; i += 2) {
    rows.push(filtered.slice(i, i + 2));
  }

  return (
    <section id="projects" className="section" ref={ref}>
      <div className="container">
        <p className="section-label">What I've built</p>
        <h2 className="section-title">Featured <span className="grad-text">Projects</span></h2>
        <p className="section-subtitle">
          A collection of AI, ML, and full-stack projects — from autonomous agentic pipelines to deployed ML models with explainability.
        </p>

        <div className="projects-filters">
          {categories.map(cat => (
            <button key={cat.label} className={`filter-btn ${active === cat.label ? 'active' : ''}`} onClick={() => setActive(cat.label)}>
              {cat.label}
            </button>
          ))}
        </div>

        <div className="projects-rows">
          {rows.map((row, ri) => {
            const expandedInRow = row.find(p => p.id === expanded);
            return (
              <div key={ri}>
                <div className="projects-grid">
                  {row.map((p, ci) => (
                    <div className="project-card visible" key={p.id} style={{ animationDelay: `${(ri * 2 + ci) * 0.08}s` }}>
                      {p.featured && <span className="project-featured">★ Featured</span>}
                      <div className="project-card-top">
                        <div className="project-card-icon">{p.icon}</div>
                        <div className="project-card-links">
                          {p.article && (
                            <a href={p.article} target="_blank" rel="noreferrer" className="project-link" title="Article">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
                            </a>
                          )}
                          {p.live && (
                            <a href={p.live} target="_blank" rel="noreferrer" className="project-link" title="Live Demo" onClick={(e) => handleLiveClick(e, p)}>
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                            </a>
                          )}
                          {p.github && (
                            <a href={p.github} target="_blank" rel="noreferrer" className="project-link" title="GitHub">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
                            </a>
                          )}
                        </div>
                      </div>
                      <h3 className="project-title">{p.title}</h3>
                      <p className="project-desc">{p.desc}</p>
                      <button
                        className={`project-expand-btn ${expanded === p.id ? 'project-expand-btn-active' : ''}`}
                        onClick={() => setExpanded(expanded === p.id ? null : p.id)}
                      >
                        {expanded === p.id
                          ? (p.id <= 3 ? '▾ Close deep dive' : '▾ Hide details')
                          : (p.id <= 3 ? '▸ Explore architecture & metrics' : '▸ Show technical details')
                        }
                      </button>
                      <div className="project-tags">
                        {p.tags.map(t => <span key={t} className="project-tag">{t}</span>)}
                      </div>
                    </div>
                  ))}
                </div>
                {expandedInRow && (
                  <div className="project-detail-panel">
                    <div className="project-detail-panel-header">
                      <span className="project-detail-panel-icon">{expandedInRow.icon}</span>
                      <span className="project-detail-panel-title">{expandedInRow.title}</span>
                      <button className="project-detail-close" onClick={() => setExpanded(null)}>✕</button>
                    </div>
                    {renderDetails(expandedInRow)}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* HuggingFace sleep popup */}
      {sleepPopup && (
        <div className="hf-popup-overlay" onClick={() => setSleepPopup(null)}>
          <div className="hf-popup" onClick={e => e.stopPropagation()}>
            <div className="hf-popup-icon">⏳</div>
            <h3 className="hf-popup-title">{sleepPopup.title}</h3>
            <p className="hf-popup-msg">
              This app is hosted on <strong>HuggingFace Spaces</strong> (free tier). It sleeps after inactivity and may take <strong>~30–60 seconds</strong> to wake up on first visit.
            </p>
            <div className="hf-popup-actions">
              <button className="hf-popup-cancel" onClick={() => setSleepPopup(null)}>Cancel</button>
              <a href={sleepPopup.url} target="_blank" rel="noreferrer" className="hf-popup-go" onClick={() => setSleepPopup(null)}>
                Continue to App →
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
