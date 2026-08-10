import React, { useEffect, useState } from "react";
import { hydrateRoot } from "react-dom/client";
import {
  ArrowRight,
  BarChart3,
  Check,
  Code2,
  Lightbulb,
  Layers3,
  Menu,
  Play,
  Rocket,
  Search,
  ShieldCheck,
  Smartphone,
  Users,
  X,
} from "lucide-react";
import "./site.css";
import { initMotion } from "../motion.js";
import Rest from "./rest.jsx";
import How from "./how.jsx";
import Build from "./build.jsx";
import Tech from "./tech.jsx";
import Pricing from "./pricing.jsx";
import FAQ from "./faq.jsx";
import FinalCTA from "./final-cta.jsx";
import Included from "./included.jsx";
import brandMarkUrl from "../assets/weeboo-brand-mark.webp";
import logoMasterUrl from "../assets/weeboo-logo-master.webp";
const Metric = ({ icon, number, label }) => (
  <div className="metric">
    <i>{icon}</i>
    <div>
      <b>{number}</b>
      <small>{label}</small>
    </div>
  </div>
);
const Process = ({ icon, title, text }) => (
  <div className="process-item">
    <i>{icon}</i>
    <b>{title}</b>
    <small>{text}</small>
  </div>
);
const Brand = ({ label }) => (
  <span className="brand-placeholder">
    <i></i>
    {label}
  </span>
);
const InternalPaths = () => (
  <section className="internal-paths" aria-labelledby="home-paths-title">
    <div className="internal-paths-head">
      <span>KEEP EXPLORING / 03 ROUTES</span>
      <h2 id="home-paths-title">
        Understand the service.
        <br />
        Then <em>choose your next step.</em>
      </h2>
    </div>
    <div className="internal-paths-grid">
      <a href="/services.html#service-options">
        <span>WEBSITE SERVICES</span>
        <h3>Compare the websites and platforms we can build</h3>
        <p>
          Explore complete websites, stores, landing pages, redesigns and custom
          platforms.
        </p>
        <span className="path-arrow">↗</span>
      </a>
      <a href="/how-it-works.html#steps">
        <span>PROJECT PROCESS</span>
        <h3>Follow the complete journey from idea to launch</h3>
        <p>
          See what you provide, what our team handles and when approvals and
          payments happen.
        </p>
        <span className="path-arrow">↗</span>
      </a>
      <a href="/work/counselo.html">
        <span>REAL PROJECT</span>
        <h3>See how we planned and built the CounselO platform</h3>
        <p>
          Review a documented delivery covering architecture, content, design
          and development.
        </p>
        <span className="path-arrow">↗</span>
      </a>
    </div>
  </section>
);
export function App() {
  const [menu, setMenu] = useState(false);
  useEffect(() => {
    initMotion();
  }, []);
  return (
    <main className="home-v2">
      <header>
        <a className="master-logo" href="/" aria-label="Weeboo home">
          <img src={brandMarkUrl} alt="" width="640" height="427" decoding="async" fetchPriority="high" />
        </a>
        <nav aria-label="Main navigation">
          {[
            "Home",
            "About Us",
            "Services",
            "Our Work",
            "Process",
            "Pricing",
          ].map((x, i) => (
            <a
              key={x}
              className={i === 0 ? "active" : ""}
              href={
                i === 0
                  ? "#top"
                  : i === 1
                    ? "/about.html"
                    : i === 2
                      ? "/services.html"
                      : i === 3
                        ? "/our-work.html"
                        : i === 4
                          ? "#process"
                          : "#pricing"
              }
            >
              {x}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <a className="nav-cta" href="/contact.html">
            Start a project <ArrowRight size={18} />
          </a>
        </div>
        <button
          type="button"
          className="menu"
          aria-label="Toggle navigation"
          aria-expanded={menu}
          onClick={() => setMenu(!menu)}
        >
          {menu ? <X /> : <Menu />}
        </button>
      </header>
      {menu && (
        <div className="mobile">
          <a href="/about.html">About Us</a>
          <a href="/services.html">Services</a>
          <a href="/our-work.html">Our work</a>
          <a href="#process">How it works</a>
          <a href="#pricing">Pricing</a>
          <a href="/contact.html">Let’s build yours</a>
        </div>
      )}
      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="pill">FROM IDEA TO ONLINE</p>
          <h1>
            One Small Idea.<span>We Build It Online.</span>
          </h1>
          <p className="lead">
            Whether you are an individual with a new idea or a company ready to
            grow, tell us the goal. Our team handles the strategy, pages, copy,
            design, development and launch—then stays nearby after you go live.
          </p>
          <div className="actions">
            <a href="/contact.html">
              Let’s Build Your Website <ArrowRight size={20} />
            </a>
            <a className="secondary" href="#process">
              <i>
                <Play size={10} fill="currentColor" />
              </i>{" "}
              How it works
            </a>
          </div>
          <div className="metrics">
            <Metric
              icon={<Lightbulb size={20} />}
              number="Start simple"
              label="a short idea is enough"
            />
            <Metric
              icon={<Users size={20} />}
              number="We handle it"
              label="strategy, content and code"
            />
            <Metric
              icon={<Rocket size={20} />}
              number="You approve"
              label="before your website launches"
            />
          </div>
          <div className="trusted">
            <p>Everything needed to move from idea to a working website</p>
            <div>
              <Brand label="Human-led" />
              <Brand label="Custom-built" />
              <Brand label="Search-ready" />
              <Brand label="Editor access" />
            </div>
          </div>
        </div>
        <div className="visual">
          <div className="process">
            <Process
              icon={<Lightbulb />}
              title="1. Your idea"
              text="Share what you know. No formal brief needed."
            />
            <Process
              icon={<Code2 />}
              title="2. We build"
              text="We plan, write, design and develop every page."
            />
            <Process
              icon={<Rocket />}
              title="3. You launch"
              text="You review, approve and receive your private admin link."
            />
          </div>
          <div className="browser">
            <div className="browser-top">
              <b>Your brand</b>
              <span>
                Home　 About　 Services　 Work　 Contact　 <em>Get started</em>
              </span>
            </div>
            <div className="browser-main">
              <div>
                <h2>
                  We Help Brands
                  <br />
                  Grow <b>Online</b>
                </h2>
                <p>
                  Clear messaging, thoughtful design and a fast website built
                  around your customers.
                </p>
                <button>Get started</button>
                <button className="ghost">Learn more</button>
              </div>
              <div className="browser-shape">
                <i></i>
                <i></i>
              </div>
            </div>
            <div className="browser-foot">
              Built around your idea. Ready for your customers.
            </div>
          </div>
          <div className="editor">
            <div className="editor-bar">
              <i></i>
              <i></i>
              <i></i>
              <span>website.jsx</span>
            </div>
            <div className="editor-body">
              <aside>
                src
                <br />⌄ components
                <br />
                　Hero.jsx
                <br />
                　Navbar.jsx
                <br />
                services
                <br />
                contact
                <br />
                assets
              </aside>
              <pre>
                <b>01</b> import React from 'react';{`\n`}
                <b>02</b> import Hero from './Hero';{`\n\n`}
                <b>04</b> function <em>Website</em>() {"{"}
                {`\n`}
                <b>05</b>　return ({`\n`}
                <b>06</b>　　&lt;Hero /&gt;{`\n`}
                <b>07</b>　);{`\n`}
                <b>08</b> {"}"}
              </pre>
            </div>
          </div>
          <div className="clean">
            <b>
              <Check size={13} /> Clean code
            </b>
            <span>Performance</span>
            <span>Security</span>
            <span>Scalability</span>
          </div>
          <div className="score">
            <small>Built for</small>
            <div>
              <b>Speed</b>
              <BarChart3 size={43} />
            </div>
          </div>
          <div className="benefits">
            <span>
              <Layers3 /> Modern stack
            </span>
            <span>
              <Search /> SEO ready
            </span>
            <span>
              <Smartphone /> Mobile first
            </span>
            <span>
              <ShieldCheck /> Fast & secure
            </span>
          </div>
        </div>
      </section>
      <Rest />
      <Included />
      <How />
      <Build />
      <Tech />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <InternalPaths />
      <section className="under">
        <p>YOUR IDEA</p>
        <span></span>
        <p>OUR EXPERTISE</p>
        <span></span>
        <p>A WEBSITE THAT WORKS</p>
      </section>
      <footer className="wb-footer">
        <div className="wb-footer-shell">
          <div className="wb-footer-lead">
            <div className="wb-footer-brand">
              <a href="/" aria-label="Weeboo home">
                <img src={logoMasterUrl} alt="Weeboo" width="640" height="427" loading="lazy" decoding="async" />
              </a>
              <p>
                Your idea, handled from first brief to launch—and supported
                after it goes live.
              </p>
              <span className="wb-footer-status">
                <i></i> Accepting new website projects
              </span>
            </div>
            <div className="wb-footer-cta">
              <span>START WITH WHAT YOU KNOW</span>
              <h2>Have an idea? We’ll shape everything else.</h2>
              <p>
                No finished brief, sitemap or website copy required. Tell us the
                goal and our team will plan the right way forward.
              </p>
              <div>
                <a className="wb-footer-primary" href="/contact.html">
                  Start your project <ArrowRight />
                </a>
                <a className="wb-footer-secondary" href="/how-it-works.html">
                  See how it works
                </a>
              </div>
            </div>
          </div>

          <div className="wb-footer-links">
            <div>
              <h3>Company</h3>
              <a href="/about.html">About us</a>
              <a href="/our-work.html">Our work</a>
              <a href="/contact.html">Contact</a>
            </div>
            <div>
              <h3>What we do</h3>
              <a href="/services.html#service-options">New websites</a>
              <a href="/services.html#improve">Website improvements</a>
              <a href="/services.html#seo">SEO foundations</a>
            </div>
            <div>
              <h3>Work with Weeboo</h3>
              <a href="/how-it-works.html">Our process</a>
              <a href="/#pricing">Pricing approach</a>
              <a href="/#faq">Questions & answers</a>
            </div>
            <div className="wb-footer-client">
              <span>CLIENT ADMIN ACCESS</span>
              <h3>Your website has its own private admin link.</h3>
              <p>
                We provide it when your website is ready. Need the link again?
              </p>
              <a href="/contact.html">
                Contact support <ArrowRight />
              </a>
            </div>
          </div>

          <div className="wb-footer-bottom">
            <small>© 2026 Weeboo. All rights reserved.</small>
            <small>
              Platform subscription covers hosting, maintenance and editor
              access. Domain registration and renewal are separate.
            </small>
            <span className="wb-footer-legal">
              <a href="/terms.html">Terms</a>
              <a href="/privacy.html">Privacy</a>
              <a href="/contact.html">Support ↗</a>
            </span>
          </div>
        </div>
      </footer>
    </main>
  );
}
if (typeof document !== "undefined") {
  hydrateRoot(document.getElementById("root"), <App />);
}
