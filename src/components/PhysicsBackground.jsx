import { useRef, useEffect } from 'react';

/* ── Tech labels for the floating orbs ─────────────────────── */
const TECH_LABELS = [
  'Python', 'PyTorch', 'FAISS', 'React', 'FastAPI',
  'QLoRA', 'HuggingFace', 'Docker', 'W&B', 'LLMs',
  'RAG', 'PEFT', 'NLP', 'Transformers', 'Groq',
  'Git', 'AWS', 'Vite', 'Gemini', 'bitsandbytes',
  'AST', 'CodeBERT', 'Gemma 4', 'llama.cpp', 'MCP',
  'SQLite', 'Kubernetes', 'SSE',
];

/* ── Palette matching the site's purple/cyan gradient ──────── */
const COLORS = [
  { r: 139, g: 92, b: 246 },   // purple
  { r: 99, g: 102, b: 241 },   // indigo
  { r: 34, g: 211, b: 238 },   // cyan
  { r: 79, g: 172, b: 254 },   // blue
  { r: 168, g: 85, b: 247 },   // violet
  { r: 59, g: 130, b: 246 },   // sky
];

/* ── 2D Vector helpers ─────────────────────────────────────── */
function v(x, y) { return { x, y }; }
function vAdd(a, b) { return v(a.x + b.x, a.y + b.y); }
function vSub(a, b) { return v(a.x - b.x, a.y - b.y); }
function vMul(a, s) { return v(a.x * s, a.y * s); }
function vMag(a) { return Math.sqrt(a.x * a.x + a.y * a.y); }
function vNorm(a) { const m = vMag(a) || 1; return v(a.x / m, a.y / m); }
function vDot(a, b) { return a.x * b.x + a.y * b.y; }

/* ── Particle factory ──────────────────────────────────────── */
function createParticle(w, h, label, index) {
  const radius = 28 + Math.random() * 24;        // 28–52px
  const color = COLORS[index % COLORS.length];
  return {
    pos: v(radius + Math.random() * (w - 2 * radius), radius + Math.random() * (h - 2 * radius)),
    vel: v((Math.random() - 0.5) * 0.6, (Math.random() - 0.5) * 0.6),
    radius,
    mass: radius * radius,                         // area-proportional
    label,
    color,
    alpha: 0.12 + Math.random() * 0.08,           // subtle transparency
  };
}

/* ── Elastic collision between two circles ─────────────────── */
function resolveCollision(a, b) {
  const diff = vSub(a.pos, b.pos);
  const dist = vMag(diff);
  const minDist = a.radius + b.radius;
  if (dist >= minDist || dist === 0) return;

  const normal = vNorm(diff);
  // Separate overlapping particles
  const overlap = (minDist - dist) / 2;
  a.pos = vAdd(a.pos, vMul(normal, overlap));
  b.pos = vSub(b.pos, vMul(normal, overlap));

  // Elastic impulse (mass-weighted)
  const relVel = vSub(a.vel, b.vel);
  const velAlongNormal = vDot(relVel, normal);
  if (velAlongNormal > 0) return;                  // moving apart

  const restitution = 0.85;
  const impulse = -(1 + restitution) * velAlongNormal / (1 / a.mass + 1 / b.mass);
  a.vel = vAdd(a.vel, vMul(normal, impulse / a.mass));
  b.vel = vSub(b.vel, vMul(normal, impulse / b.mass));
}

export default function PhysicsBackground() {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const mouse = useRef({ x: -9999, y: -9999 });
  const raf = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let w, h;

    /* ── Resize handler ──────────────────────────────────────── */
    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    /* ── Spawn particles ─────────────────────────────────────── */
    particles.current = TECH_LABELS.map((label, i) => createParticle(w, h, label, i));

    /* ── Mouse tracking ──────────────────────────────────────── */
    function onMouseMove(e) { mouse.current = v(e.clientX, e.clientY); }
    function onMouseLeave() { mouse.current = v(-9999, -9999); }
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);

    /* ── Physics + render loop ────────────────────────────────── */
    function tick() {
      ctx.clearRect(0, 0, w, h);
      const pts = particles.current;
      const mx = mouse.current;

      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];

        // — Buoyancy: gentle upward drift
        p.vel.y -= 0.003;

        // — Slight horizontal wander
        p.vel.x += (Math.random() - 0.5) * 0.008;

        // — Mouse repulsion
        const toMouse = vSub(p.pos, mx);
        const mouseDist = vMag(toMouse);
        const repulseRadius = 180;
        if (mouseDist < repulseRadius && mouseDist > 0) {
          const strength = (1 - mouseDist / repulseRadius) * 0.8;
          const push = vMul(vNorm(toMouse), strength);
          p.vel = vAdd(p.vel, push);
        }

        // — Damping (prevents runaway speeds)
        p.vel = vMul(p.vel, 0.993);

        // — Speed cap
        const speed = vMag(p.vel);
        if (speed > 2.5) p.vel = vMul(vNorm(p.vel), 2.5);

        // — Integrate position
        p.pos = vAdd(p.pos, p.vel);

        // — Wall collisions (wrap with bounce)
        if (p.pos.x - p.radius < 0) { p.pos.x = p.radius; p.vel.x = Math.abs(p.vel.x) * 0.6; }
        if (p.pos.x + p.radius > w) { p.pos.x = w - p.radius; p.vel.x = -Math.abs(p.vel.x) * 0.6; }
        if (p.pos.y - p.radius < 0) { p.pos.y = p.radius; p.vel.y = Math.abs(p.vel.y) * 0.6; }
        if (p.pos.y + p.radius > h) { p.pos.y = h - p.radius; p.vel.y = -Math.abs(p.vel.y) * 0.6; }

        // — Particle-particle collisions
        for (let j = i + 1; j < pts.length; j++) {
          resolveCollision(p, pts[j]);
        }

        // — Render: filled circle with gradient
        const { r, g, b } = p.color;
        const grad = ctx.createRadialGradient(
          p.pos.x, p.pos.y, 0,
          p.pos.x, p.pos.y, p.radius
        );
        grad.addColorStop(0, `rgba(${r},${g},${b},${p.alpha + 0.06})`);
        grad.addColorStop(0.7, `rgba(${r},${g},${b},${p.alpha})`);
        grad.addColorStop(1, `rgba(${r},${g},${b},0)`);

        ctx.beginPath();
        ctx.arc(p.pos.x, p.pos.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // — Border ring
        ctx.beginPath();
        ctx.arc(p.pos.x, p.pos.y, p.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${r},${g},${b},${p.alpha + 0.05})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // — Label text
        const fontSize = Math.max(9, p.radius * 0.32);
        ctx.font = `500 ${fontSize}px 'Outfit', sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = `rgba(${r},${g},${b},${p.alpha * 3 + 0.15})`;
        ctx.fillText(p.label, p.pos.x, p.pos.y);
      }

      raf.current = requestAnimationFrame(tick);
    }

    raf.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
      /* pointer-events: none lets clicks pass through to content below,
         but we still need mousemove — handled via window listener */
    />
  );
}
