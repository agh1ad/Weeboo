import React from "react";
import {
  Braces,
  Check,
  FileText,
  LayoutTemplate,
  PenTool,
  Search,
  Sparkles,
} from "lucide-react";

const deliverables = [
  [
    Sparkles,
    "Direction",
    "Goals, audience, positioning and the right type of website.",
  ],
  [
    LayoutTemplate,
    "Architecture",
    "Pages, navigation and a clear journey through the content.",
  ],
  [
    FileText,
    "Website copy",
    "Headlines, page content and calls to action based on your facts.",
  ],
  [
    PenTool,
    "Custom design",
    "A responsive visual direction made for your brand and audience.",
  ],
  [
    Braces,
    "Development",
    "Professional implementation of the agreed pages and functionality.",
  ],
  [
    Search,
    "Launch foundations",
    "Testing, metadata, search-friendly structure and launch setup.",
  ],
];

export default function Included() {
  return (
    <section className="home-included" id="included">
      <header className="included-heading">
        <p>
          <i></i> EVERYTHING HANDLED UNDER ONE ROOF <i></i>
        </p>
        <h2>
          A complete website—not a list of <em>unfinished tasks.</em>
        </h2>
        <span>
          We combine the strategic, creative and technical work so you do not
          have to coordinate different providers or decide what comes next.
        </span>
      </header>
      <div className="included-grid">
        <div
          className="included-art"
          aria-label="Illustration showing a short idea becoming a complete website"
        >
          <div className="included-bar">
            <i></i>
            <i></i>
            <i></i>
            <span>weeboo / complete-build</span>
            <b>ACTIVE</b>
          </div>
          <div className="included-brief">
            <small>YOUR STARTING POINT</small>
            <strong>“I need a professional website for my idea.”</strong>
            <span>brief.md</span>
          </div>
          <div className="included-map">
            <small>PROJECT MAP</small>
            <p>
              <b>01</b> Strategy
            </p>
            <p>
              <b>02</b> Pages + content
            </p>
            <p>
              <b>03</b> Design system
            </p>
            <p>
              <b>04</b> Development
            </p>
          </div>
          <div className="included-site">
            <header>
              <i></i>
              <i></i>
              <i></i>
            </header>
            <nav>
              <b>YourBrand</b>
              <span>About　Services　Contact</span>
            </nav>
            <div>
              <small>THE FINISHED RESULT</small>
              <h3>
                Clear ideas.
                <br />
                <em>Beautifully built.</em>
              </h3>
              <p></p>
              <p></p>
              <b>Get started →</b>
            </div>
          </div>
          <div className="included-ready">
            <Check />
            <span>
              <b>Ready for review</b>
              <small>Every part brought together</small>
            </span>
          </div>
        </div>
        <div className="included-list">
          {deliverables.map(([Icon, title, text], index) => (
            <article key={title}>
              <i>
                <Icon />
              </i>
              <div>
                <span>0{index + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
      <div className="included-note">
        <span>
          <Check /> Exact deliverables are confirmed in your proposal
        </span>
        <span>
          <Check /> Domain and monthly platform subscription are shown
          separately
        </span>
        <a href="/services.html">
          Explore all services <b>↗</b>
        </a>
      </div>
    </section>
  );
}
