import React from "react";
import {
  BarChart3,
  Clock3,
  Code2,
  Headphones,
  Lightbulb,
  MessageSquare,
  PenTool,
  Search,
  ShieldCheck,
  Users,
} from "lucide-react";
const cards = [
  [
    Lightbulb,
    "01",
    "Built around your idea",
    "We turn the facts you share into a clear, considered website plan.",
  ],
  [
    PenTool,
    "02",
    "Written & designed by us",
    "Content, visual direction and every key page are made by our team.",
  ],
  [
    Search,
    "03",
    "Launched to be found",
    "SEO foundations and thoughtful site structure help people discover you.",
  ],
  [
    ShieldCheck,
    "04",
    "Yours to run, with us nearby",
    "A friendly editor, hosting and maintenance stay within reach.",
  ],
];
const benefits = [
  [MessageSquare, "No confusing jargon"],
  [Users, "Clear communication"],
  [Clock3, "Scope-based timeline"],
  [Headphones, "Long-term support"],
];
export default function Rest() {
  return (
    <section className="professional" id="about">
      <div className="professional-top">
        <div>
          <p>MORE THAN A WEBSITE BUILDER</p>
          <h2>
            You don’t need a finished plan to get a website you’re
            <em> proud of.</em>
          </h2>
          <span>
            Share the facts you know. We turn them into a clear strategy,
            persuasive content, thoughtful design and a professional build.
          </span>
        </div>
        <div className="pro-art">
          <div className="pro-browser">
            <i></i>
            <i></i>
            <i></i>
            <div>
              <span></span>
              <span></span>
              <span></span>
              <b></b>
            </div>
          </div>
          <div className="pro-code">
            <header>
              <i></i>
              <i></i>
              <i></i>
            </header>
            <pre>
              <b>1</b> &lt;header class="hero"&gt;{`\n`}
              <b>2</b>　&lt;h1&gt;We build digital&lt;/h1&gt;{`\n`}
              <b>3</b>　&lt;p&gt;Performance first&lt;/p&gt;{`\n`}
              <b>4</b>　&lt;a&gt;Get started&lt;/a&gt;{`\n`}
              <b>5</b> &lt;/header&gt;
            </pre>
          </div>
          <div className="pro-badge">
            <Code2 />
          </div>
          <div className="pro-score">
            <BarChart3 />
            <span>
              Built for
              <b>
                Speed
              </b>
            </span>
          </div>
        </div>
      </div>
      <div className="pro-cards">
        {cards.map(([Icon, no, title, text]) => (
          <article key={no}>
            <div className="pro-icon">
              <Icon size={48} />
            </div>
            <div>
              <header>
                <b>{no}</b>
                <h3>{title}</h3>
              </header>
              <i></i>
              <p>{text}</p>
            </div>
          </article>
        ))}
      </div>
      <div className="pro-benefits">
        {benefits.map(([Icon, text]) => (
          <div key={text}>
            <i>
              <Icon size={18} />
            </i>
            <b>{text}</b>
          </div>
        ))}
      </div>
    </section>
  );
}
