import React from "react";
import {
  ArrowRight,
  BadgeCheck,
  Check,
  Clock3,
  Handshake,
  Headphones,
  MessageSquareMore,
  PenLine,
  Rocket,
  Send,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

const benefits = ["A short idea is enough", "Clear scope and price", "Review before launch", "No obligation to enquire"];
const bottom = [
  [Rocket, "Simple Start", "Tell us what you know. We’ll identify what the website needs."],
  [BadgeCheck, "Complete Service", "Strategy, content, design and development from one team."],
  [TrendingUp, "Built for Your Goals", "Pages and features selected for your audience and business."],
  [Handshake, "Support After Launch", "Hosting, maintenance, editor access and human help."],
];
const floats = [
  [Clock3, "Clear Delivery Plan", "A timeline shaped to your scope", "fc-one"],
  [ShieldCheck, "Security-Minded", "Careful build and maintenance", "fc-two"],
  [PenLine, "Custom Approach", "Content and design for your goals", "fc-three"],
  [Headphones, "Ongoing Support", "Help after your website launches", "fc-four"],
];

export default function FinalCTA() {
  return (
    <section className="final-section">
      <div className="final-card">
        <div className="final-main">
          <div className="final-copy">
            <p className="final-pill"><i><Rocket /></i> START WITH WHAT YOU KNOW</p>
            <h2>Ready to turn your <span><em>idea</em> into a website?</span></h2>
            <p>Send a few details. We’ll reply with the right questions, then prepare a clear plan, timeline and price for you to review.</p>
            <div className="final-checks">
              {benefits.map((item) => <span key={item}><i><Check /></i>{item}</span>)}
            </div>
            <div className="final-actions">
              <a href="/contact.html"><Send /> Tell Us Your Idea <ArrowRight /></a>
              <a href="#process"><MessageSquareMore /> See How It Works</a>
            </div>
            <div className="final-trust">
              <div>{["I", "D", "E", "A"].map((item) => <i key={item}>{item}</i>)}<i>+</i></div>
              <p>No sitemap, technical brief or finished content is required to start the conversation.</p>
            </div>
          </div>
          <div className="final-visual" aria-label="Illustration of a website created by Weeboo">
            <div className="final-browser">
              <header><i></i><i></i><i></i></header>
              <nav><b>YourBrand</b><span>Home　 About　 Services　 Contact</span><em>Get Started</em></nav>
              <div>
                <section>
                  <h3>Modern websites <span>made <b>for people.</b></span></h3>
                  <p>Clear. Fast. Easy to use.<br />Ready for your audience.</p>
                  <a href="/our-work.html">Explore Concepts</a>
                </section>
                <aside><i></i><b></b></aside>
              </div>
            </div>
            {floats.map(([Icon, title, text, className]) => (
              <article className={`floating-card ${className}`} key={title}>
                <i><Icon /></i><div><b>{title}</b><span>{text}</span></div>
              </article>
            ))}
            <strong>Let’s build it together!</strong>
          </div>
        </div>
        <div className="final-benefits">
          {bottom.map(([Icon, title, text]) => (
            <article key={title}><i><Icon /></i><div><h3>{title}</h3><p>{text}</p></div></article>
          ))}
        </div>
      </div>
    </section>
  );
}
