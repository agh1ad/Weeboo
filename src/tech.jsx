import React from "react";
import {
  Cloud,
  Code2,
  Headphones,
  LockKeyhole,
  Search,
  Server,
  Smartphone,
  TrendingUp,
  Zap,
} from "lucide-react";
const side = [
  [Zap, "Fast by Design", "Performance is considered from the first build."],
  [
    LockKeyhole,
    "Security-Minded",
    "Sensible safeguards, maintained dependencies and managed updates.",
  ],
  [
    TrendingUp,
    "Ready to Evolve",
    "Maintainable architecture makes future changes easier.",
  ],
];
const caps = [
  [Server, "Modern stack", "Stable technologies that remain maintainable."],
  [Code2, "Clean code", "Well-structured code built to be extended."],
  [Smartphone, "Mobile first", "Responsive by design across devices."],
  [Search, "Search foundations", "Semantic structure, metadata and on-page basics."],
  [Cloud, "Reliable hosting", "Managed hosting with platform monitoring and care."],
  [Headphones, "Ongoing care", "Updates and support to keep your site healthy."],
];
export default function Tech() {
  return (
    <section className="tech">
      <header>
        <p>TECHNICAL BY DEFAULT</p>
        <h2>
          Built to Work Well, <em>Not Just Look Good</em>
        </h2>
        <span>
          Clean code and careful testing support faster loading, easier use,
          reliable maintenance and stronger search foundations.
        </span>
      </header>
      <div className="techgrid">
        <div>
          {side.map(([I, t, d]) => (
            <article key={t}>
              <i>
                <I />
              </i>
              <div>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="techcode">
          <div>
            ●　●　●　 <span>Hero.tsx</span>
          </div>
          <pre>
            01　import React from 'react';{`\n`}02　export default function
            Hero() {"{"}
            {`\n`}03　　return ({`\n`}04　　　&lt;section className="hero"&gt;
            {`\n`}05　　　　We build fast, modern{`\n`}06　　　　and scalable
            websites{`\n`}07　　　&lt;/section&gt;{`\n`}08　　);{`\n`}09　{"}"}
          </pre>
          <footer>React　 Vite　 SEO　 Responsive　 Accessible</footer>
        </div>
        <aside className="techscore">
          <div className="techscore-head"><h3>Build quality goals</h3><span>Every project</span></div>
          <div className="score-circles"><Score value="Fast" label="Performance"/><Score value="AA" label="Accessibility"/><Score value="Clean" label="Best practices"/><Score value="Ready" label="SEO"/></div>
          <div className="vitals"><b>Experience priorities <em>Built in ✓</em></b><span>Fast loading <i>Optimized</i></span><span>Responsive interaction <i>Planned</i></span><span>Stable page layout <i>Checked</i></span></div>
        </aside>
      </div>
      <div className="caps">
        {caps.map(([I, t, d]) => (
          <span key={t}>
            <I />
            <b>{t}</b><small>{d}</small>
          </span>
        ))}
      </div>
      <p className="tech-closing">Great design gets attention. Great development keeps it. <b>We build both.</b></p>
    </section>
  );
}
const Score=({value,label})=><span><b>{value}</b><small>{label}</small></span>;
