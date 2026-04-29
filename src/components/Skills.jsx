import { useScrollReveal } from '../hooks/useScrollReveal';

const skills = [
  {
    icon: '🤖',
    title: 'AI / ML',
    tags: ['LLMs', 'Agentic AI', 'RAG', 'Vector Search', 'NLP', 'Fine-Tuning', 'Transformers', 'Prompt Engineering'],
  },
  {
    icon: '🧪',
    title: 'ML Frameworks',
    tags: ['PyTorch', 'PEFT', 'TRL', 'bitsandbytes', 'FAISS', 'sentence-transformers', 'Weights & Biases'],
  },
  {
    icon: '🐍',
    title: 'Languages',
    tags: ['Python', 'JavaScript', 'TypeScript', 'Java', 'SQL', 'C', 'C++'],
  },
  {
    icon: '⚙️',
    title: 'Frameworks & APIs',
    tags: ['FastAPI', 'React', 'Flask', 'Streamlit', 'Gradio', 'HuggingFace', 'Groq API', 'Gemini API'],
  },
  {
    icon: '☁️',
    title: 'Cloud & DevOps',
    tags: ['Docker', 'Kubernetes', 'AWS', 'Vercel', 'HuggingFace Spaces', 'Git', 'CI/CD'],
  },
  {
    icon: '📊',
    title: 'Data & Evaluation',
    tags: ['scikit-learn', 'NumPy', 'Pandas', 'Matplotlib', 'Ablation Studies', 'pytest'],
  },
];

export default function Skills() {
  const ref = useScrollReveal();

  return (
    <section id="skills" className="section" ref={ref}>
      <div className="container">
        <p className="section-label">What I work with</p>
        <h2 className="section-title">Technical <span className="grad-text">Skills</span></h2>
        <p className="section-subtitle">
          A curated stack built through real project experience — from autonomous agent pipelines to production cloud deployments.
        </p>
        <div className="skills-grid">
          {skills.map((s, i) => (
            <div className="skill-card visible" key={s.title} style={{ animationDelay: `${i * 0.08}s` }}>
              <div className="skill-card-header">
                <span className="skill-icon">{s.icon}</span>
                <span className="skill-title">{s.title}</span>
              </div>
              <div className="skill-tags">
                {s.tags.map(t => <span key={t} className="skill-tag">{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
