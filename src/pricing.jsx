import React from "react";
import {
  ArrowRight,
  Check,
  Cloud,
  FilePenLine,
  Headphones,
  LockKeyhole,
  MessageSquareMore,
  NotebookTabs,
  ShieldCheck,
} from "lucide-react";

const Feature = ({ children }) => (
  <li>
    <Check size={16} />
    {children}
  </li>
);
const Subscription = ({ icon, children }) => (
  <li>
    <i>{icon}</i>
    <span>{children}</span>
  </li>
);
const PaymentStep = ({ number, children, text }) => (
  <article>
    <i>{number}</i>
    <div>
      <b>{children}</b>
      <span>{text}</span>
    </div>
  </article>
);

export default function Pricing() {
  return (
    <section className="pricing" id="pricing">
      <header className="pricing-heading">
        <p>
          <i></i> PRICING <i></i>
        </p>
        <h2>
          A clear quote before <em>we begin.</em>
        </h2>
        <span>
          We price the agreed scope—not a generic package. You receive the full
          project price, deliverables and timeline before the build starts.
        </span>
        <b></b>
      </header>
      <div className="pricing-grid">
        <article className="price-card scope-card">
          <div className="price-title">
            <i>
              <NotebookTabs />
            </i>
            <div>
              <h3>
                Pricing depends on the <em>size of your request</em>
              </h3>
              <b></b>
            </div>
          </div>
          <p>
            Once we understand your goals, features, content and timeline, we’ll
            give you a clear, fixed project price before work begins.
          </p>
          <ul>
            <Feature>Custom scope &amp; timeline</Feature>
            <Feature>Professional design &amp; development</Feature>
            <Feature>SEO-ready &amp; mobile-friendly</Feature>
            <Feature>Admin panel &amp; easy editing</Feature>
            <Feature>Ongoing support</Feature>
          </ul>
          <aside>
            <i>
              <MessageSquareMore size={22} />
            </i>
            <div>
              <strong>Not sure what you need?</strong>
              <span>Tell us about your idea and we’ll guide you.</span>
            </div>
          </aside>
        </article>
        <article className="price-card payment-card">
          <div className="payment-head">
            <h3>How Pricing Works</h3>
            <p>A simple, fair payment structure with two easy steps.</p>
          </div>
          <div className="fifty">
            <div>
              <b>50%</b>
              <h4>
                After Request
                <br />
                Submission
              </h4>
              <p>We begin the project after receiving the first payment.</p>
            </div>
            <i>
              <ArrowRight size={23} />
            </i>
            <div className="green">
              <b>50%</b>
              <h4>
                After Final
                <br />
                Approval
              </h4>
              <p>
                Pay the remaining amount after you review and approve the
                finished website.
              </p>
            </div>
          </div>
          <aside className="safe">
            <i>
              <ShieldCheck size={28} />
            </i>
            <div>
              <strong>Transparent &amp; clear</strong>
              <span>
                You’ll know the agreed deliverables, timeline and project price
                before we begin. Domain costs are listed separately.
              </span>
            </div>
          </aside>
        </article>
        <article className="price-card subscription-card">
          <div className="price-title">
            <i>
              <Cloud />
            </i>
            <div>
              <h3>
                Monthly subscription for <em>hosting &amp; more</em>
              </h3>
              <b></b>
            </div>
          </div>
          <p>
            Once your website is live, a monthly subscription keeps your Weeboo
            platform running smoothly.
          </p>
          <ul className="subscription-list">
            <Subscription icon={<Cloud size={17} />}>
              <b>Hosting &amp; maintenance</b>
              <small>
                Managed hosting with regular platform updates and monitoring.
              </small>
            </Subscription>
            <Subscription icon={<FilePenLine size={17} />}>
              <b>Access to your admin panel</b>
              <small>Manage your content, pages, images and more.</small>
            </Subscription>
            <Subscription icon={<Check size={17} />}>
              <b>Easy website editing</b>
              <small>
                Update text, images and sections anytime. No coding needed.
              </small>
            </Subscription>
            <Subscription icon={<Headphones size={17} />}>
              <b>Support when you need it</b>
              <small>
                We’re here when you need us with email and chat support.
              </small>
            </Subscription>
          </ul>
          <aside className="domain-note">
            <i>
              <LockKeyhole size={21} />
            </i>
            <div>
              <strong>Know what is billed separately</strong>
              <span>
                The subscription covers Weeboo platform care. Domain purchase
                and renewal are billed separately.
              </span>
            </div>
          </aside>
        </article>
      </div>
      <div className="payment-flow">
        <h3>How Payments Work</h3>
        <div>
          <PaymentStep
            number="01"
            text="Share your idea, goals and anything you already have."
          >
            Send Your Request
          </PaymentStep>
          <i>
            <ArrowRight />
          </i>
          <PaymentStep
            number="50%"
            text="Approve the proposal, then pay 50% so work can begin."
          >
            Start the Build
          </PaymentStep>
          <i>
            <ArrowRight />
          </i>
          <PaymentStep
            number="02"
            text="Review the completed website and request agreed revisions."
          >
            Review &amp; Approve
          </PaymentStep>
          <i>
            <ArrowRight />
          </i>
          <PaymentStep
            number="50%"
            text="Pay the remaining 50%, receive your private admin link and launch."
          >
            Final Payment
          </PaymentStep>
        </div>
        <p>
          <LockKeyhole size={15} /> Payment instructions and project terms are
          provided in your proposal.
        </p>
      </div>
      <a className="pricing-cta" href="/contact.html">
        Tell us about your project <ArrowRight size={18} />
      </a>
    </section>
  );
}
