import React from "react";
import {
  ArrowRight,
  CheckCircle2,
  Code2,
  FileText,
  Rocket,
  Sparkles,
} from "lucide-react";
const steps = [
  [
    Sparkles,
    "01",
    "Share your idea",
    "Tell us what you do, who you serve and what you want the website to achieve.",
  ],
  [
    FileText,
    "02",
    "Receive a clear plan",
    "We recommend the pages, content, features, timeline and fixed project price.",
  ],
  [
    Code2,
    "03",
    "We create everything",
    "After your first payment, our writers, designers and developers build the site.",
  ],
  [
    CheckCircle2,
    "04",
    "Review, approve and launch",
    "Approve the finished website, make the final payment and receive your private website admin link.",
  ],
];
export default function How() {
  return (
    <section className="how" id="process">
      <header>
        <p>HOW WE WORK</p>
        <h2>
          From small spark to <em>a website that works.</em>
        </h2>
        <span>
          Four clear steps. One team takes your project from a short brief to a
          finished website you can review before launch.
        </span>
      </header>
      <div className="how-steps">
        {steps.map(([I, n, t, d], i) => (
          <article key={n}>
            <i>
              <I />
            </i>
            <b>{n}</b>
            <h3>{t}</h3>
            <p>{d}</p>
            {i < 3 && <ArrowRight className="how-arrow" />}
          </article>
        ))}
      </div>
      <div className="how-showcase">
        <div className="how-code">
          <b>PROJECT</b>
          <pre>
            ▾ src{`\n`}　▾ components{`\n`}　　Header.tsx{`\n`}　　Hero.tsx
            {`\n`}　　Features.tsx{`\n`}　　Footer.tsx{`\n`}▸ pages{`\n`}▸
            styles
          </pre>
        </div>
        <div className="how-site">
          <div className="sitebar">
            ●　●　● <span>🔒 yourbrand.com</span>
          </div>
          <div className="sitenav">
            <b>YourBrand</b>
            <span>Home　 About　 Services　 Work　 Contact</span>
            <em>
              Launch <Rocket size={14} />
            </em>
          </div>
          <div className="sitehero">
            <div>
              <h3>
                We Help Brands <b>Grow Online</b>
              </h3>
              <p>
                A modern website that tells your story, builds trust and helps
                your business grow.
              </p>
              <button>Get Started</button>
              <button className="site-learn">Learn More</button>
            </div>
            <aside>
              <i></i>
              <i></i>
              <span className="site-mini">
                <i></i>
                <i></i>
              </span>
              <span className="site-chart">
                <svg viewBox="0 0 120 60">
                  <path d="M3 48 L25 30 L45 39 L65 18 L82 26 L110 8" />
                </svg>
              </span>
            </aside>
          </div>
        </div>
        <div className="how-palette">
          <b>Aa</b>
          <i></i>
          <i></i>
          <i></i>
          <i></i>
        </div>
        <div className="how-detail">
          <Code2 />
          <span></span>
          <span></span>
        </div>
      </div>
    </section>
  );
}
