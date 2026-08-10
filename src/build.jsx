import React from "react";
import {
  ArrowRight,
  Building2,
  Boxes,
  Brush,
  Headphones,
  Lightbulb,
  PackageCheck,
  RotateCcw,
  Rocket,
  ShoppingCart,
} from "lucide-react";
const items = [
  [
    Building2,
    "01",
    "Business Websites",
    "Professional websites that explain what you do, establish trust and turn visitors into customers.",
  ],
  [
    ShoppingCart,
    "02",
    "E-commerce Stores",
    "Fast, intuitive online stores built around your products and sales journey.",
  ],
  [
    Boxes,
    "03",
    "Custom Web Platforms",
    "Dashboards, portals, booking systems and custom applications.",
  ],
  [
    Rocket,
    "04",
    "Landing Pages",
    "Focused, high-converting pages for campaigns, products and new ideas.",
  ],
  [
    Brush,
    "05",
    "Website Redesigns",
    "Modern, faster and more effective digital experiences.",
  ],
  [
    Lightbulb,
    "06",
    "Something Different?",
    "Tell us about it. We’ll figure out how to build it.",
  ],
];
export default function Build() {
  return (
    <section className="build">
      <header>
        <p>WHAT WE BUILD</p>
        <h2>
          Whatever your idea needs, <em>we can build it.</em>
        </h2>
        <span>
          From a focused company website to a custom digital platform, every
          project is planned around your goals, audience and required features.
        </span>
      </header>
      <div className="build-grid">
        <div>
          {items.slice(0, 3).map(([I, n, t, d]) => (
            <article key={n}>
              <i>
                <I />
              </i>
              <div>
                <b>{n}</b>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="build-browser">
          <div className="bbbar">
            ●　●　● <span>🔒 yourbrand.com</span>
          </div>
          <div className="bbnav">
            <b>YourBrand</b>
            <span>Home　 Shop　 About　 Blog　 Contact</span>
            <ShoppingCart />
          </div>
          <div className="bbmain">
            <div>
              <small>New collection</small>
              <h3>
                Quality products,
                <br />
                made for <em>you.</em>
              </h3>
              <p>
                A website built around your products, your customers and your
                next opportunity.
              </p>
              <button>Shop Now</button>
            </div>
            <aside>
              <i></i>
              <b>Modern product</b>
            </aside>
          </div>
        </div>
        <div>
          {items.slice(3).map(([I, n, t, d]) => (
            <article key={n}>
              <i>
                <I />
              </i>
              <div>
                <b>{n}</b>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
      <div className="build-categories"><span className="selected">All</span><span>Furniture</span><span>Lighting</span><span>Decor</span><span>Textiles</span><span>Blog</span></div>
      <div className="build-benefits">
        <span><PackageCheck /> <b>Clear product pages</b><small>Easy to browse</small></span>
        <span><CheckShield /> <b>Secure checkout</b><small>Trusted payment flow</small></span>
        <span><RotateCcw /> <b>Helpful policies</b><small>Easy to understand</small></span>
        <span><Headphones /> <b>Customer support</b><small>Easy to reach</small></span>
      </div>
      <div className="build-cta">
        <div><i><Lightbulb /></i><p><b>Not sure what kind of website you need?</b><span>That’s our job. Tell us what you want to achieve, and we’ll recommend what to build.</span></p></div>
        <a href="/contact.html">Tell Us Your Idea <ArrowRight size={18}/></a>
      </div>
    </section>
  );
}
function CheckShield(){return <span className="shield-mark">✓</span>}
