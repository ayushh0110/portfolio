export function AgentDeepDive() {
  return (
    <div className="dd">
      <div className="dd-section">
        <div className="dd-section-label">System Architecture</div>
        <div className="dd-arch-flow">
          {[
            { icon: '🎯', name: 'Decision Layer', desc: '4-path routing via compiled regex (<1ms). Paths: direct_answer, needs_search, memory_sufficient, autonomous_task. Priority cascade: tool-intent → personal → recency → knowledge → factual → autonomous → fallback' },
            { icon: '📝', name: 'Planner', desc: 'Adaptive task decomposition into PlanStep objects (tool or reasoning). Fast-path: direct_answer & memory_sufficient skip LLM entirely → single reasoning step. Eliminates planning for ~40% of queries' },
            { icon: '⚡', name: 'Executor', desc: 'Pipeline: Classify → Plan → Execute → Synthesize → Critique → Refine. ToolForge integration: is_toolforge_available() → ML router, else heuristic fallback. Logs router source per query' },
            { icon: '🔍', name: 'Critic', desc: '5-axis evaluation: Grounding, Completeness, Specificity, Redundancy, Faithfulness. Severity tags: critical/major/minor. Early stopping on pass. Reduces unnecessary LLM re-executions by ~60%' },
          ].map((n, i) => (
            <div className="dd-arch-node" key={n.name}>
              <div className="dd-arch-icon">{n.icon}</div>
              <div className="dd-arch-name">{n.name}</div>
              <div className="dd-arch-desc">{n.desc}</div>
              {i < 3 && <div className="dd-arch-arrow">→</div>}
            </div>
          ))}
        </div>
      </div>

      <div className="dd-section">
        <div className="dd-section-label">Key Metrics</div>
        <div className="dd-metrics">
          {[
            { val: '<2s', label: 'End-to-end latency', color: '#22d3ee' },
            { val: '<1ms', label: 'Decision layer routing', color: '#8b5cf6' },
            { val: '~40%', label: 'Queries skip planning', color: '#34d399' },
            { val: '~60%', label: 'Fewer LLM re-executions', color: '#f59e0b' },
            { val: '90+', label: 'Unit tests', color: '#22d3ee' },
            { val: '9', label: 'Integrated tools', color: '#8b5cf6' },
            { val: '4', label: 'Decision paths', color: '#34d399' },
            { val: '5', label: 'Critic evaluation axes', color: '#f59e0b' },
          ].map(m => (
            <div className="dd-metric-card" key={m.label}>
              <span className="dd-metric-val" style={{ color: m.color }}>{m.val}</span>
              <span className="dd-metric-label">{m.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="dd-section">
        <div className="dd-section-label">Agent Loop — ReAct Pattern with Guardrails</div>
        <div className="dd-eng-grid">
          {[
            { icon: '🔄', title: 'Iteration Budget', desc: 'Configurable max iterations per step — prevents runaway loops. Hard cap on total tool calls across the session' },
            { icon: '🛑', title: 'Forced Termination', desc: 'Last iteration always forces final_answer action — guarantees the agent produces output even in edge cases' },
            { icon: '🔧', title: 'Parse Recovery', desc: 'Feeds parse errors back to LLM for self-correction. Automatic retry on malformed JSON with error feedback to the model' },
            { icon: '📋', title: 'Dynamic Prompts', desc: 'System prompt dynamically constructed with tool schemas, memory context, conversation history, and behavioral constraints' },
          ].map(e => (
            <div className="dd-eng-card" key={e.title}>
              <div className="dd-eng-icon">{e.icon}</div>
              <div className="dd-eng-title">{e.title}</div>
              <div className="dd-eng-desc">{e.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="dd-section">
        <div className="dd-section-label">Fault-Tolerant Parser (246 lines)</div>
        <div className="dd-eng-grid">
          {[
            { icon: '🧩', title: 'Brace-Depth Counting', desc: 'Custom JSON extractor using brace-depth tracking (not regex). Handles nested objects, markdown fences, preamble text, and mixed text/JSON output' },
            { icon: '📝', title: 'Typed Output Union', desc: 'Three output types: ToolCallAction, FinalAnswerAction, ParseError — strongly typed for downstream processing' },
            { icon: '🔀', title: 'Answer Coercion', desc: 'Converts list → bullet points, dict → key-value format, single-key dict unwrap. Handles escaped characters inside JSON strings' },
            { icon: '✅', title: '>95% Parse Rate', desc: 'Achieves >95% parse success rate on production traffic by handling malformed LLM outputs that break naive json.loads()' },
          ].map(e => (
            <div className="dd-eng-card" key={e.title}>
              <div className="dd-eng-icon">{e.icon}</div>
              <div className="dd-eng-title">{e.title}</div>
              <div className="dd-eng-desc">{e.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="dd-section">
        <div className="dd-section-label">Autonomous Executor — Goal-Driven Tasks (615 lines)</div>
        <div className="dd-pipeline">
          {[
            { step: '01', icon: '🧩', name: 'Aspect Decomposition', desc: 'Breaks complex tasks (e.g. "plan a 10-day Japan trip") into independently executable sub-goals', color: '#8b5cf6' },
            { step: '02', icon: '⚡', name: 'Iterative Execution', desc: 'Execute each aspect → check coverage → continue or synthesize. Each aspect can trigger its own tool calls', color: '#22d3ee' },
            { step: '03', icon: '📊', name: 'Coverage Gate', desc: 'Tracks which aspects have been addressed. Prevents premature synthesis — ensures completeness across all sub-goals', color: '#34d399' },
            { step: '04', icon: '📝', name: 'Structured Synthesis', desc: 'Combines all aspect results into a coherent final answer with proper structure and cross-referencing', color: '#f59e0b' },
          ].map((s, i) => (
            <div className="dd-pipe-stage" key={s.step}>
              <div className="dd-pipe-step" style={{ background: s.color + '22', borderColor: s.color, color: s.color }}>{s.step}</div>
              <div className="dd-pipe-icon">{s.icon}</div>
              <div className="dd-pipe-name">{s.name}</div>
              <div className="dd-pipe-desc">{s.desc}</div>
              {i < 3 && <div className="dd-pipe-arrow" style={{ color: s.color }}>↓</div>}
            </div>
          ))}
        </div>
      </div>

      <div className="dd-section">
        <div className="dd-section-label">Integrated Tool Suite</div>
        <div className="dd-tool-grid">
          {[
            { icon: '🌤️', name: 'Weather', api: 'OpenWeatherMap' },
            { icon: '📰', name: 'News / Web Search', api: 'DuckDuckGo' },
            { icon: '📧', name: 'Email', api: 'Gmail SMTP' },
            { icon: '🔗', name: 'URL Reader', api: 'BeautifulSoup' },
            { icon: '📊', name: 'Stock Price', api: 'yfinance' },
            { icon: '🧮', name: 'Calculator', api: 'math engine' },
            { icon: '📚', name: 'Wikipedia', api: 'Wikipedia API' },
            { icon: '💱', name: 'Unit Converter', api: 'pint library' },
            { icon: '📖', name: 'Dictionary', api: 'Free Dictionary API' },
          ].map(t => (
            <div className="dd-tool-card" key={t.name}>
              <span className="dd-tool-icon">{t.icon}</span>
              <span className="dd-tool-name">{t.name}</span>
              <span className="dd-tool-api">{t.api}</span>
            </div>
          ))}
        </div>
        <p className="dd-note">Schema-validated execution with structured error messages for missing tools, missing inputs, and type mismatches. get_schemas() provides dynamic prompt construction.</p>
      </div>

      <div className="dd-section">
        <div className="dd-section-label">Hybrid Memory System</div>
        <div className="dd-memory">
          <div className="dd-mem-block">
            <div className="dd-mem-title">🔮 Semantic Memory — FAISS Vector Store</div>
            <ul className="dd-mem-list">
              <li>all-MiniLM-L6-v2 embeddings (384-dim, sentence-transformers)</li>
              <li>FAISS IndexFlatIP with IndexIDMap — NumPy fallback for zero-dep</li>
              <li>L2 normalization converts inner-product to cosine similarity</li>
              <li>Hybrid retrieval: vector similarity + keyword overlap gating</li>
              <li>Recency-based decay — older memories lose relevance weight</li>
              <li>Confidence gating — only stores memories above threshold</li>
              <li>Semantic deduplication prevents redundant context</li>
              <li>Thread-safe: threading.Lock on all mutations</li>
            </ul>
          </div>
          <div className="dd-mem-connector">⟷</div>
          <div className="dd-mem-block">
            <div className="dd-mem-title">💬 Memory Analyzer + Conversation Buffer</div>
            <ul className="dd-mem-list">
              <li>LLM-based extraction of profile/session facts from conversations</li>
              <li>Rejects speculative language ("I think", "maybe")</li>
              <li>Confidence scoring per extracted fact</li>
              <li>Memory types: Profile (persistent) + Session (contextual)</li>
              <li>Sliding-window context (last N turns)</li>
              <li>Token-aware truncation for context window management</li>
              <li>Injected into every planner prompt</li>
              <li>Lazy loading with double-checked locking pattern</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="dd-section">
        <div className="dd-section-label">Test Coverage Breakdown</div>
        <div className="dd-data-bars">
          {[
            { cat: 'Query Classifier', pct: 19, count: 17 },
            { cat: 'Calculator Tool', pct: 16, count: 14 },
            { cat: 'Unit Converter', pct: 12, count: 11 },
            { cat: 'DateTime Tool', pct: 10, count: 9 },
            { cat: 'Translation Tool', pct: 6, count: 5 },
            { cat: 'Dictionary Tool', pct: 4, count: 4 },
            { cat: 'Wikipedia Tool', pct: 4, count: 4 },
            { cat: 'Parser', pct: 4, count: 4 },
            { cat: 'Tool Registry', pct: 4, count: 4 },
            { cat: 'Key Rotation', pct: 4, count: 4 },
            { cat: 'Memory Store', pct: 3, count: 3 },
            { cat: 'Planner', pct: 3, count: 3 },
            { cat: 'Config', pct: 3, count: 3 },
            { cat: 'Service Layer', pct: 3, count: 3 },
            { cat: 'Executor Fast-Path', pct: 2, count: 2 },
          ].map(d => (
            <div className="dd-bar-row" key={d.cat}>
              <span className="dd-bar-label">{d.cat}</span>
              <div className="dd-bar-track"><div className="dd-bar-fill" style={{ width: `${d.pct * 5}%` }} /></div>
              <span className="dd-bar-count">{d.count}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="dd-section">
        <div className="dd-section-label">Infrastructure & Engineering</div>
        <div className="dd-eng-grid">
          {[
            { icon: '🔄', title: 'Streaming UI', desc: 'Real-time SSE token streaming with React 19 — shows agent thinking process live as it reasons through tool calls' },
            { icon: '🔑', title: 'Proactive Rate Limiting', desc: '"Most-rested-key" selection across N API keys with per-key timestamp tracking. Eliminates 429 errors before they happen' },
            { icon: '📦', title: 'Docker Ready', desc: 'Full Docker Compose with hot-reload for dev. Environment-based secrets management, no hardcoded keys' },
            { icon: '🚀', title: 'Production Deployed', desc: 'Vercel (React frontend) + HuggingFace Spaces (FastAPI backend). CORS-enabled, environment-based config' },
            { icon: '⚙️', title: 'Tech Stack', desc: 'Python 3.12, FastAPI, React 19, Vite, Groq API (Llama 3.1 70B), FAISS, sentence-transformers' },
            { icon: '🛡️', title: 'Error Recovery', desc: 'Exponential backoff with jitter on API failures. Structured error messages for all tool execution failures' },
          ].map(e => (
            <div className="dd-eng-card" key={e.title}>
              <div className="dd-eng-icon">{e.icon}</div>
              <div className="dd-eng-title">{e.title}</div>
              <div className="dd-eng-desc">{e.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ToolForgeDeepDive() {
  return (
    <div className="dd">
      <div className="dd-section">
        <div className="dd-section-label">The Problem & Solution</div>
        <div className="dd-ablation">
          <div className="dd-abl-header">
            <div className="dd-abl-cell dd-abl-corner">Aspect</div>
            <div className="dd-abl-cell dd-abl-col">Heuristic (Before)</div>
            <div className="dd-abl-cell dd-abl-col">ToolForge (After)</div>
          </div>
          {[
            ['Accuracy', '~75%', '86.2%'],
            ['Approach', '200+ lines regex', 'QLoRA Qwen2.5-7B'],
            ['Edge cases', 'Constant regressions', 'Learned from data'],
            ['Maintenance', 'High (new regex per bug)', 'Low (retrain)'],
            ['Latency', '0ms (regex)', '~200ms (GPU)'],
          ].map(([aspect, before, after], i) => (
            <div className="dd-abl-row" key={i}>
              <div className="dd-abl-cell dd-abl-row-label">{aspect}</div>
              <div className="dd-abl-cell dd-abl-val">{before}</div>
              <div className={`dd-abl-cell dd-abl-val ${i === 0 ? 'dd-abl-best' : ''}`}>{after}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="dd-section">
        <div className="dd-section-label">Training Pipeline — End to End</div>
        <div className="dd-pipeline">
          {[
            { step: '01', icon: '📝', name: 'Template Generation (566 lines)', desc: 'Produces ~2K examples with ZERO label noise. Covers: 30 cities, 20 topics, 20 vocabulary words, 15 math expressions, 15 unit conversions. 3 difficulty levels. Categories: single-tool, multi-tool chains, no-tool, ambiguous', color: '#8b5cf6' },
            { step: '02', icon: '🎓', name: 'Teacher Distillation (534 lines)', desc: 'Gemini 2.5 Flash as teacher model. ClientPool with round-robin API rotation and "most rested slot" selection. Crash-proof incremental JSONL saving — every N examples flushed to disk', color: '#22d3ee' },
            { step: '03', icon: '🧹', name: 'Quality Filtering', desc: 'Valid JSON schema validation, no hallucinated tool names, correct argument structure. Filters down to 1,173 clean labeled examples balanced across 9 tool categories', color: '#34d399' },
            { step: '04', icon: '⚡', name: 'QLoRA Fine-Tuning (361 lines)', desc: '4-bit NF4 quantization with double quantization (saves ~0.4GB). Qwen2.5-7B-Instruct base. LoRA rank=64, α=128, targeting ALL attention + MLP layers (q,k,v,o,gate,up,down projections)', color: '#f59e0b' },
            { step: '05', icon: '📊', name: 'Evaluation (335 lines)', desc: '5-axis metrics: Tool Selection Accuracy, Per-Category Accuracy, Sequence Accuracy, Argument Matching, Latency (ms). Per-inference timing for production readiness', color: '#ef4444' },
          ].map((s, i) => (
            <div className="dd-pipe-stage" key={s.step}>
              <div className="dd-pipe-step" style={{ background: s.color + '22', borderColor: s.color, color: s.color }}>{s.step}</div>
              <div className="dd-pipe-icon">{s.icon}</div>
              <div className="dd-pipe-name">{s.name}</div>
              <div className="dd-pipe-desc">{s.desc}</div>
              {i < 4 && <div className="dd-pipe-arrow" style={{ color: s.color }}>↓</div>}
            </div>
          ))}
        </div>
      </div>

      <div className="dd-section">
        <div className="dd-section-label">QLoRA Training Configuration</div>
        <div className="dd-eng-grid">
          {[
            { icon: '🧠', title: 'Base Model', desc: 'Qwen2.5-7B-Instruct — selected for superior structured output (JSON tool-call format) over Mistral' },
            { icon: '📦', title: '4-bit NF4 Quantization', desc: 'bitsandbytes double quantization. Fits 7B model in ~6GB VRAM on free-tier Kaggle T4 GPU' },
            { icon: '🎛️', title: 'LoRA Config', desc: 'rank=64, alpha=128 (2×r). Targets: q_proj, k_proj, v_proj, o_proj, gate_proj, up_proj, down_proj. Dropout: 0.05' },
            { icon: '📈', title: 'Training Setup', desc: '3 epochs, batch=4 × 4 grad_accum = 16 effective. LR: 2e-4, cosine scheduler, 10% warmup. Max seq: 1024 tokens' },
            { icon: '✅', title: 'Best Model Selection', desc: 'load_best_model_at_end=True on eval_loss. Eval loss converges by epoch 2, epoch 3 shows slight overfitting' },
            { icon: '📊', title: 'Experiment Tracking', desc: 'All 4 ablation runs tracked on Weights & Biases with loss curves, eval metrics, and hyperparameter sweeps' },
          ].map(e => (
            <div className="dd-eng-card" key={e.title}>
              <div className="dd-eng-icon">{e.icon}</div>
              <div className="dd-eng-title">{e.title}</div>
              <div className="dd-eng-desc">{e.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="dd-section">
        <div className="dd-section-label">Ablation Study — 4 Runs on W&B</div>
        <div className="dd-ablation">
          <div className="dd-abl-header">
            <div className="dd-abl-cell dd-abl-corner">Run</div>
            <div className="dd-abl-cell dd-abl-col">Base Model</div>
            <div className="dd-abl-cell dd-abl-col">LoRA Rank</div>
            <div className="dd-abl-cell dd-abl-col">Accuracy</div>
          </div>
          {[
            ['1', 'Mistral-7B-v0.3', 'r=16', '78.4%', false],
            ['2', 'Mistral-7B-v0.3', 'r=64', '81.7%', false],
            ['3', 'Qwen2.5-7B', 'r=16', '83.1%', false],
            ['4', 'Qwen2.5-7B', 'r=64', '86.2% ★', true],
          ].map(([run, model, rank, acc, best]) => (
            <div className="dd-abl-row" key={run}>
              <div className="dd-abl-cell dd-abl-row-label">{run}</div>
              <div className="dd-abl-cell dd-abl-val">{model}</div>
              <div className="dd-abl-cell dd-abl-val">{rank}</div>
              <div className={`dd-abl-cell dd-abl-val ${best ? 'dd-abl-best' : ''}`}>{acc}</div>
            </div>
          ))}
        </div>
        <p className="dd-abl-note">Qwen outperforms Mistral (+4.5%) — Qwen&apos;s chat template naturally handles tool-call JSON. r=64 beats r=16 (+3-4%) — 9-category routing requires higher adapter capacity.</p>
      </div>

      <div className="dd-section">
        <div className="dd-section-label">Dataset Distribution — 1,173 Examples</div>
        <div className="dd-data-bars">
          {[
            { cat: 'web_search', pct: 24, count: 287 },
            { cat: 'calculator', pct: 13, count: 156 },
            { cat: 'weather', pct: 12, count: 143 },
            { cat: 'translate', pct: 11, count: 132 },
            { cat: 'wikipedia', pct: 11, count: 128 },
            { cat: 'no_tool', pct: 10, count: 119 },
            { cat: 'dictionary', pct: 7, count: 78 },
            { cat: 'datetime', pct: 6, count: 68 },
            { cat: 'unit_converter', pct: 5, count: 62 },
          ].map(d => (
            <div className="dd-bar-row" key={d.cat}>
              <span className="dd-bar-label">{d.cat}</span>
              <div className="dd-bar-track"><div className="dd-bar-fill" style={{ width: `${d.pct * 3.5}%` }} /></div>
              <span className="dd-bar-count">{d.count}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="dd-section">
        <div className="dd-section-label">Production Metrics</div>
        <div className="dd-metrics">
          {[
            { val: '86.2%', label: 'Best routing accuracy', color: '#34d399' },
            { val: '1,173', label: 'Clean training examples', color: '#8b5cf6' },
            { val: '9', label: 'Tool categories', color: '#22d3ee' },
            { val: '75→86%', label: 'Accuracy improvement', color: '#f59e0b' },
            { val: '~6GB', label: 'VRAM (free T4)', color: '#34d399' },
            { val: '646MB', label: 'Adapter size', color: '#8b5cf6' },
            { val: '~200ms', label: 'Inference latency', color: '#22d3ee' },
            { val: '4', label: 'Ablation runs', color: '#f59e0b' },
          ].map(m => (
            <div className="dd-metric-card" key={m.label}>
              <span className="dd-metric-val" style={{ color: m.color }}>{m.val}</span>
              <span className="dd-metric-label">{m.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="dd-section">
        <div className="dd-section-label">Production Integration (249 lines)</div>
        <div className="dd-eng-grid">
          {[
            { icon: '🔀', title: 'Feature Flag', desc: 'TOOLFORGE_ENABLED env var. Lazy adapter loading — only loaded on first query. Adapter path configurable via TOOLFORGE_ADAPTER_PATH' },
            { icon: '🎛️', title: 'Deterministic Decoding', desc: 'Greedy decoding (do_sample=False) for consistent tool-call formatting. No randomness in production routing decisions' },
            { icon: '🛡️', title: 'Graceful Fallback', desc: 'Returns None on any failure → heuristic classifier takes over automatically. Zero downtime on GPU unavailability' },
            { icon: '📝', title: 'Published Technical Article', desc: 'Full ML engineering loop documented on DEV.to: problem → data generation → training → ablation → evaluation → production integration' },
          ].map(e => (
            <div className="dd-eng-card" key={e.title}>
              <div className="dd-eng-icon">{e.icon}</div>
              <div className="dd-eng-title">{e.title}</div>
              <div className="dd-eng-desc">{e.desc}</div>
            </div>
          ))}
        </div>
        <div className="dd-code-block">
          <code>
            {`// Integration in executor.py
if is_toolforge_available():
    decision = toolforge_classify(query, memory_hits, has_memory)
    router_source = "toolforge"
if decision is None:
    decision = classify_query(query, memory_hits, has_memory)  // fallback`}
          </code>
        </div>
      </div>
    </div>
  );
}
