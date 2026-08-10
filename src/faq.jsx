import React, { useState } from "react";
import {
  ArrowRight,
  Clock3,
  Headphones,
  LockKeyhole,
  Mail,
  MessageCircleQuestion,
  MessageSquareMore,
  Minus,
  Plus,
  ShieldCheck,
} from "lucide-react";

const faqs = [
  [
    "01",
    "What do I need to send to get started?",
    "A short description of your business or idea, who the website is for and what you want it to achieve is enough. Share any existing logo, content or examples if you have them—but you do not need a finished brief.",
  ],
  [
    "02",
    "How much will my website cost?",
    "The price depends on the agreed pages, content, features and complexity. We send a clear proposal with the full project price and timeline before you decide to begin.",
  ],
  [
    "03",
    "How long does a website take?",
    "A focused website may be completed within a few days. Larger or more complex projects take longer. Your proposal includes a realistic timeline based on the actual scope.",
  ],
  [
    "04",
    "Do I need to write the content or plan the pages?",
    "No. Our team can recommend the site structure, write the page content and define the visual direction using the facts and goals you share. You review the finished work before launch.",
  ],
  [
    "05",
    "Can I edit the website after launch?",
    "Yes. We give you a private admin link for your website, where you can update everyday text, images and pages. If you would rather not make a change yourself, you can ask our support team.",
  ],
  [
    "06",
    "What does the monthly subscription include?",
    "It covers Weeboo platform hosting, maintenance, editor access and support. Domain registration and renewal are separate, and the exact subscription terms are included in your proposal.",
  ],
];

const support = [
  [ShieldCheck, "Clear scope", "Know what is included before work begins."],
  [
    Clock3,
    "Clear timeline",
    "Receive dates based on the agreed project scope.",
  ],
  [
    LockKeyhole,
    "Careful delivery",
    "Review the finished website before launch.",
  ],
  [Headphones, "Human support", "Reach the Weeboo team by email or chat."],
];

export default function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section className="faq-section" id="faq">
      <header className="faq-heading">
        <p>
          <i></i>
          <MessageCircleQuestion size={19} /> FAQ <i></i>
        </p>
        <h2>
          Clear answers before <em>you begin.</em>
        </h2>
        <span>
          Understand the process, payments and ongoing service before you send a
          request.
        </span>
        <b></b>
      </header>
      <div className="faq-grid">
        <aside className="faq-support">
          <div className="faq-support-title">
            <i>
              <MessageSquareMore />
            </i>
            <h3>
              Still have a <em>question?</em>
            </h3>
          </div>
          <p>Ask us directly. We’ll explain the next step in plain language.</p>
          <div className="support-points">
            {support.map(([Icon, title, text]) => (
              <article key={title}>
                <i>
                  <Icon />
                </i>
                <div>
                  <b>{title}</b>
                  <span>{text}</span>
                </div>
              </article>
            ))}
          </div>
          <div className="support-art" aria-hidden="true">
            <div className="support-window">
              <i></i>
              <i></i>
              <i></i>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div className="support-chat">
              <i></i>
              <i></i>
              <i></i>
            </div>
          </div>
        </aside>
        <div className="faq-list">
          {faqs.map(([number, question, answer], index) => {
            const active = open === index;
            return (
              <article className={active ? "open" : ""} key={number}>
                <button
                  type="button"
                  onClick={() => setOpen(active ? -1 : index)}
                  aria-expanded={active}
                >
                  <i>{number}</i>
                  <div>
                    <h3>{question}</h3>
                    <span>{answer}</span>
                  </div>
                  {active ? <Minus /> : <Plus />}
                </button>
              </article>
            );
          })}
        </div>
      </div>
      <div className="faq-cta">
        <i>
          <span>
            <MessageSquareMore />
          </span>
        </i>
        <div>
          <h3>Need an answer about your specific idea?</h3>
          <p>
            Send the question with your request and we’ll address it before you
            commit.
          </p>
        </div>
        <a href="/contact.html">
          <Mail /> Ask Your Question <ArrowRight />
        </a>
      </div>
    </section>
  );
}
