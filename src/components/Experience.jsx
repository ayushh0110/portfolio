import { useScrollReveal } from '../hooks/useScrollReveal';

const experience = [
  {
    company: 'Cognizant Technology Solutions',
    role: 'Programmer Analyst',
    date: 'Oct 2025 – Present',
    icon: '🏢',
    bullets: [
      'Designed edge-case test matrices across 50+ critical data workflows for Abbott Healthcare in HIPAA-regulated environments, reducing production defect leakage by ~30%.',
      'Cut defect resolution cycle by ~40% via structured log-analysis workflows tracing root causes across distributed service layers.',
      'Increased test coverage from ~60% to ~85% by building regression suites targeting high-risk data pipelines.',
      'Collaborated with cross-functional teams (development, QA, product) to define acceptance criteria and validate data integrity across ETL pipelines.',
      'Maintained defect triage and reporting workflows using Jira, contributing to sprint retrospectives and continuous process improvements.',
    ],
  },
  {
    company: 'Cognizant Technology Solutions',
    role: 'Engineer Trainee',
    date: 'Jun 2025 – Sep 2025',
    icon: '🎓',
    bullets: [
      'Completed intensive training in Java, Selenium test automation, and API testing with Postman — building automated end-to-end test suites.',
      'Gained hands-on experience with containerization (Docker, Kubernetes) for deploying and managing microservices in test environments.',
      'Practiced Agile/Scrum methodologies including sprint planning, daily standups, backlog grooming, and CI/CD pipeline workflows.',
      'Trained in defect lifecycle management using Jira, including bug reporting, severity classification, and resolution tracking.',
    ],
  },
  {
    company: 'CERELABS',
    role: 'Software Development Engineer (Intern)',
    date: 'Jun 2024 – Aug 2024',
    icon: '🚀',
    bullets: [
      'Built Llamate — a full-stack LLM interaction platform achieving <500ms first-token latency via Server-Sent Events (SSE) streaming inference.',
      'Developed React/TypeScript frontend with responsive chat UI, code syntax highlighting, and real-time Markdown rendering of AI responses.',
      'Designed FastAPI backend with multi-turn conversation management, session persistence using SQLite, and conversation branching for exploring alternative response paths.',
      'Implemented runtime parameter control panel allowing users to adjust temperature, top-p, max tokens, and model selection on-the-fly during conversations.',
      'Deployed the application on cloud infrastructure with environment-based configuration management and CORS-enabled API architecture.',
    ],
  },
];

export default function Experience() {
  const ref = useScrollReveal();

  return (
    <section id="experience" className="section" ref={ref}>
      <div className="container">
        <p className="section-label">Where I've worked</p>
        <h2 className="section-title">Work <span className="grad-text">Experience</span></h2>
        <p className="section-subtitle">
          Industry exposure across enterprise software validation and AI product development.
        </p>
        <div className="exp-timeline">
          {experience.map((exp, i) => (
            <div className="exp-item visible" key={i} style={{ animationDelay: `${i * 0.15}s` }}>
              <div className="exp-dot">{exp.icon}</div>
              <div className="exp-content">
                <div className="exp-meta">
                  <span className="exp-company">{exp.company}</span>
                  <span className="exp-date">{exp.date}</span>
                </div>
                <div className="exp-role">{exp.role}</div>
                <div className="exp-bullets">
                  {exp.bullets.map((b, j) => (
                    <div className="exp-bullet" key={j}>{b}</div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
