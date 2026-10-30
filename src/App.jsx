import { useEffect, useMemo, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CreditCard,
  Menu,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  SlidersHorizontal,
  Sparkles,
  Upload,
  X,
  Package,
  ClipboardList,
  LayoutDashboard,
  MessageSquare,
  Truck,
} from "lucide-react";
import GrindConstellation from "./components/GrindConstellation.jsx";
import "./index.css";

/* =========================================================
   DATA
========================================================= */

const divisions = [
  {
    name: "GRIND ON",
    path: "/grind-on",
    tag: "TEAMWEAR / CUSTOM MANUFACTURING",
    description: "Built for teams. Made to compete.",
    number: "01",
  },
  {
    name: "GRIND DAILY",
    path: "/grind-daily",
    tag: "EVERYDAY COTTON / RETAIL",
    description: "Everyday essentials. Unordinary identity.",
    number: "02",
  },
  {
    name: "GRIND ORIGINALS",
    path: "/grind-originals",
    tag: "STORY-DRIVEN JERSEYS / RETAIL",
    description: "Wear the story. Own the version.",
    number: "03",
  },
  {
    name: "GRIND LABS",
    path: "/grind-labs",
    tag: "CLOTHING PRODUCTION / MANUFACTURING",
    description: "Ideas engineered into garments.",
    number: "04",
  },
];

const dailyProducts = [
  {
    id: 1,
    name: "Essential Tee / Black",
    category: "ESSENTIALS",
    price: 850,
    oldPrice: 990,
    color: "black",
    code: "GD-001",
    sizes: ["S", "M", "L", "XL", "XXL"],
    description:
      "A clean everyday cotton essential built around comfort, fit, and understated identity.",
  },
  {
    id: 2,
    name: "Essential Tee / Bone",
    category: "ESSENTIALS",
    price: 850,
    color: "bone",
    code: "GD-002",
    sizes: ["S", "M", "L", "XL"],
    description:
      "A versatile cotton tee with a minimal silhouette and a soft neutral finish.",
  },
  {
    id: 3,
    name: "Heavyweight Tee",
    category: "SIGNATURE",
    price: 1150,
    color: "gray",
    code: "GD-003",
    sizes: ["S", "M", "L", "XL", "XXL"],
    description:
      "A structured heavyweight concept for a more substantial everyday fit.",
  },
  {
    id: 4,
    name: "Daily Oversized",
    category: "NEW ARRIVAL",
    price: 1250,
    oldPrice: 1450,
    color: "olive",
    code: "GD-004",
    sizes: ["S", "M", "L", "XL"],
    description:
      "An oversized cotton silhouette designed for relaxed daily movement.",
  },
];

const originalProducts = [
  {
    id: 11,
    name: "ORIGIN / V01",
    category: "CHAPTER 001",
    price: 1890,
    color: "black",
    code: "GO-001",
    sizes: ["S", "M", "L", "XL"],
    description:
      "A story-led jersey concept exploring identity, movement, and the beginning of a new chapter.",
  },
  {
    id: 12,
    name: "AFTERIMAGE / V02",
    category: "CHAPTER 002",
    price: 1990,
    color: "silver",
    code: "GO-002",
    sizes: ["S", "M", "L", "XL"],
    description:
      "A visual study of motion and memory translated into a retail jersey.",
  },
  {
    id: 13,
    name: "NO SIGNAL / V03",
    category: "CHAPTER 003",
    price: 1890,
    color: "red",
    code: "GO-003",
    sizes: ["S", "M", "L", "XL"],
    description:
      "A concept built around disruption, signal noise, and digital culture.",
  },
];

/* =========================================================
   SHARED COMPONENTS
========================================================= */

function BrandMark({ small = false }) {
  return (
    <span
      className={`brand-mark ${small ? "brand-mark-small" : ""}`}
      aria-label="GRIND"
    >
      <span className="brand-mark-symbol">
        G<span>/</span>
      </span>
      <span className="brand-mark-word">GRIND</span>
    </span>
  );
}

function Navbar({ cartCount }) {
  const [open, setOpen] = useState(false);

  const navItems = [
    { label: "GRIND", path: "/" },
    { label: "GRIND ON", path: "/grind-on" },
    { label: "DAILY", path: "/grind-daily" },
    { label: "ORIGINALS", path: "/grind-originals" },
    { label: "LABS", path: "/grind-labs" },
  ];

  return (
    <header className="site-header">
      <div className="nav-inner">
        <Link to="/" className="nav-brand" onClick={() => setOpen(false)}>
          <BrandMark />
        </Link>

        <button
          className="mobile-menu-button"
          onClick={() => setOpen((current) => !current)}
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          {open ? <X /> : <Menu />}
        </button>

        <nav className={`main-nav ${open ? "main-nav-open" : ""}`}>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `nav-link ${isActive ? "nav-link-active" : ""}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="nav-actions">
          <Link to="/cart" className="nav-cart" aria-label="Open cart">
            <ShoppingBag size={17} />
            <span>CART</span>
            <b>{cartCount}</b>
          </Link>

          <Link to="/contact" className="nav-contact">
            LET'S TALK <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>

      <div className="nav-progress">
        <span />
      </div>
    </header>
  );
}

function PageIntro({ eyebrow, title, text, number }) {
  return (
    <div className="page-intro">
      <div>
        <div className="eyebrow">
          <span className="eyebrow-line" />
          {eyebrow}
        </div>

        <h1>{title}</h1>
        <p>{text}</p>
      </div>

      {number && (
        <div className="intro-number">
          {number}
          <span> / GRIND PH</span>
        </div>
      )}
    </div>
  );
}

function SectionHeading({ eyebrow, title, text, light = false }) {
  return (
    <div className={`section-heading ${light ? "section-heading-light" : ""}`}>
      <div className="eyebrow">
        <span className="eyebrow-line" />
        {eyebrow}
      </div>

      <h2>{title}</h2>

      {text && <p>{text}</p>}
    </div>
  );
}

function AbstractGarment({
  variant = "tee",
  tone = "dark",
  label = "GRIND",
}) {
  return (
    <div className={`abstract-garment garment-${variant} tone-${tone}`}>
      <div className="garment-shadow" />

      <div className="garment-shape">
        <div className="garment-neck" />
        <div className="garment-seam seam-left" />
        <div className="garment-seam seam-right" />
        <div className="garment-stripe stripe-one" />
        <div className="garment-stripe stripe-two" />
        <div className="garment-emblem">{label}</div>
        <div className="garment-number">00</div>
      </div>

      <span className="garment-caption">
        CONCEPT VISUAL / NOT FINAL ARTWORK
      </span>
    </div>
  );
}

function DivisionCard({ division, index }) {
  return (
    <Link
      to={division.path}
      className={`division-card division-card-${index + 1}`}
    >
      <div className="division-card-top">
        <span>{division.number} / 04</span>
        <ArrowUpRight size={19} />
      </div>

      <div className="division-card-graphic">
        <div className="division-orbit orbit-a" />
        <div className="division-orbit orbit-b" />

        <div className="division-card-glyph">
          {division.name.split(" ").at(-1).slice(0, 1)}
        </div>
      </div>

      <div className="division-card-bottom">
        <span className="eyebrow">{division.tag}</span>
        <h3>{division.name}</h3>
        <p>{division.description}</p>
      </div>
    </Link>
  );
}

/* =========================================================
   HOME PAGE
========================================================= */

function HomePage() {
  return (
    <main>
      <section className="hero hero-home">
        <GrindConstellation />
        <div className="hero-grid" />

        <div className="hero-topline">
          <span>INDEPENDENT APPAREL & MANUFACTURING</span>
          <span>PHILIPPINES / EST. GRIND</span>
        </div>

        <div className="hero-content">
          <div className="hero-kicker">
            <span className="status-dot" />
            BUILT AROUND THE CULTURE
          </div>

          <h1>
            YOUR VISION.
            <br />
            <em>OUR CRAFT.</em>
            <br />
            GET IT DONE<span className="hero-period">.</span>
          </h1>

          <p className="hero-description">
            A creative apparel and manufacturing company shaping identity
            through custom teamwear, everyday clothing, and original concepts.
          </p>

          <div className="hero-buttons">
            <a href="#divisions" className="button button-light">
              EXPLORE GRIND <ArrowUpRight size={16} />
            </a>

            <Link to="/contact" className="button button-outline">
              WORK WITH US <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        <div className="hero-side-index">
          <span>01</span>
          <i />
          05
        </div>

        <div className="hero-bottom">
          <span>APPAREL / CULTURE / PRODUCTION</span>

          <a href="#about">
            SCROLL TO EXPLORE <ArrowDown size={14} />
          </a>

          <span>GRIND PHILIPPINES</span>
        </div>

        <div className="hero-coordinate">14°35' N / 120°58' E</div>
      </section>

      <section className="ticker-strip">
        <div className="ticker-track">
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i}>
              YOUR VISION <b>✳</b> OUR CRAFT <b>✳</b> GET IT DONE <b>✳</b>
            </span>
          ))}
        </div>
      </section>

      <section className="section about-section" id="about">
        <div className="section-index">
          01 <span>/ ABOUT GRIND</span>
        </div>

        <div className="about-grid">
          <SectionHeading
            eyebrow="THE MOTHER COMPANY"
            title={
              <>
                MORE THAN
                <br />
                <em>APPAREL.</em>
              </>
            }
          />

          <div className="about-copy">
            <p className="about-lead">
              GRIND is a creative apparel and manufacturing brand built to turn
              ideas into things people can wear.
            </p>

            <p>
              From custom esports teamwear to everyday cotton clothing and
              story-driven jersey collections, we bring design, craftsmanship,
              and identity into one connected ecosystem.
            </p>

            <p>
              One brand. Different expressions. A shared commitment to making
              every detail count.
            </p>

            <Link to="/grind-on" className="text-link">
              DISCOVER WHAT WE DO <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>

        <div className="about-stats">
          <div>
            <strong>04</strong>
            <span>CREATIVE DIVISIONS</span>
          </div>

          <div>
            <strong>01</strong>
            <span>CONNECTED BRAND</span>
          </div>

          <div>
            <strong>∞</strong>
            <span>WAYS TO CREATE</span>
          </div>

          <div className="stats-note">
            YOUR VISION.
            <br />
            OUR CRAFT.
          </div>
        </div>
      </section>

      <section className="section divisions-section" id="divisions">
        <div className="section-index">
          02 <span>/ THE GRIND ECOSYSTEM</span>
        </div>

        <SectionHeading
          eyebrow="FOUR WAYS TO GRIND"
          title={
            <>
              ONE IDENTITY.
              <br />
              <em>FOUR EXPRESSIONS.</em>
            </>
          }
          text="Explore the divisions built around the way people create, compete, and express themselves."
        />

        <div className="division-grid">
          {divisions.map((division, index) => (
            <DivisionCard
              key={division.path}
              division={division}
              index={index}
            />
          ))}
        </div>
      </section>

      <section className="manifesto-section">
        <div className="manifesto-bg-word">GRIND</div>

        <div className="manifesto-content">
          <span className="eyebrow">THE GRIND STANDARD / 001</span>

          <h2>
            MADE WITH
            <br />
            <em>INTENTION.</em>
            <br />
            BUILT TO LAST.
          </h2>

          <p>
            We believe the details matter. The idea, the material, the
            construction, and the experience should all work together.
          </p>

          <Link to="/contact" className="button button-light">
            START A CONVERSATION <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>

      <section className="section process-section">
        <div className="section-index">
          03 <span>/ HOW WE WORK</span>
        </div>

        <SectionHeading
          eyebrow="FROM IDEA TO FORM"
          title="THE PROCESS IS THE PRODUCT"
        />

        <div className="process-grid">
          {[
            [
              "01",
              "DISCOVER",
              "We understand the vision, the purpose, and the people behind every project.",
            ],
            [
              "02",
              "DESIGN",
              "Ideas become direction through design exploration and creative decisions.",
            ],
            [
              "03",
              "CREATE",
              "We bring the approved direction into production with attention to detail.",
            ],
            [
              "04",
              "DELIVER",
              "The finished work reaches the people it was made for.",
            ],
          ].map((step) => (
            <div className="process-step" key={step[0]}>
              <span>{step[0]}</span>
              <h3>{step[1]}</h3>
              <p>{step[2]}</p>
              <ArrowUpRight size={17} />
            </div>
          ))}
        </div>
      </section>

      <ContactBand />
    </main>
  );
}

function ContactBand() {
  return (
    <section className="contact-band">
      <div>
        <span className="eyebrow">HAVE A PROJECT IN MIND?</span>

        <h2>
          LET'S MAKE
          <br />
          <em>SOMETHING REAL.</em>
        </h2>
      </div>

      <Link to="/contact" className="round-link">
        <ArrowUpRight size={25} />
      </Link>
    </section>
  );
}

/* =========================================================
   GRIND ON PAGE
========================================================= */

function OnPage() {
  const [stage, setStage] = useState("inquiry");

  const [form, setForm] = useState({
    team: "",
    contact: "",
    email: "",
    quantity: "",
    notes: "",
  });

  const [design, setDesign] = useState({
    teamName: "",
    colors: "",
    style: "",
    notes: "",
  });

  const [revision, setRevision] = useState("");
  const [approved, setApproved] = useState(false);

  const updateForm = (e) =>
    setForm((current) => ({
      ...current,
      [e.target.name]: e.target.value,
    }));

  const updateDesign = (e) =>
    setDesign((current) => ({
      ...current,
      [e.target.name]: e.target.value,
    }));

  const stages = [
    ["inquiry", "01", "INITIAL INQUIRY"],
    ["discussion", "02", "SALES DISCUSSION"],
    ["payment", "03", "PAYMENT"],
    ["intake", "04", "DESIGN INTAKE"],
    ["submitted", "05", "SUBMISSION"],
    ["review", "06", "DESIGN REVIEW"],
    ["approval", "07", "APPROVAL"],
    ["tracking", "08", "ORDER TRACKER"],
  ];

  return (
    <main className="division-page on-page">
      <section className="division-hero on-hero">
        <div className="division-hero-grid" />

        <div className="division-hero-content">
          <span className="eyebrow">
            <span className="eyebrow-line" />
            GRIND DIVISION / 01 — TEAMWEAR
          </span>

          <h1>
            BUILT FOR
            <br />
            <em>THE TEAM.</em>
          </h1>

          <p>
            Custom esports jerseys designed around your team identity. From
            first concept to final production, every detail is made to represent
            your squad.
          </p>

          <a href="#on-process" className="button button-light">
            EXPLORE THE PROCESS <ArrowDown size={15} />
          </a>
        </div>

        <div className="division-hero-art">
          <AbstractGarment variant="jersey" tone="dark" label="ON" />
          <div className="art-orbit" />
          <span className="art-index">CUSTOM TEAMWEAR / 001</span>
        </div>

        <div className="division-hero-foot">
          <span>TEAM IDENTITY / PERFORMANCE / CRAFT</span>
          <span>GRIND ON®</span>
        </div>
      </section>

      <section className="section on-intro">
        <div className="section-index">
          01 <span>/ THE DIVISION</span>
        </div>

        <div className="two-column-intro">
          <SectionHeading
            eyebrow="CUSTOM ESPORTS MANUFACTURING"
            title={
              <>
                YOUR TEAM.
                <br />
                <em>YOUR COLORS.</em>
                <br />
                YOUR JERSEY.
              </>
            }
          />

          <div className="about-copy">
            <p className="about-lead">
              Your jersey is more than a uniform. It is the identity your team
              brings into every match.
            </p>

            <p>
              GRIND ON creates custom team jerseys for esports organizations,
              gaming communities, and competitive teams. Each project begins
              with your vision and moves through a guided design and production
              journey.
            </p>

            <a href="#on-process" className="text-link">
              HOW IT WORKS <ArrowDown size={15} />
            </a>
          </div>
        </div>
      </section>

      <section className="section on-capabilities">
        <div className="section-index">
          02 <span>/ DESIGN POSSIBILITIES</span>
        </div>

        <SectionHeading
          eyebrow="MAKE IT YOURS"
          title="DESIGNED AROUND YOUR IDENTITY."
          text="Explore the design directions and customization possibilities. Final options are confirmed during project discussion."
        />

        <div className="on-feature-grid">
          <div className="on-feature-large">
            <AbstractGarment variant="jersey" tone="dark" label="TEAM" />

            <div>
              <span>01 / CUSTOM DESIGN</span>
              <h3>YOUR TEAM, YOUR VISUAL LANGUAGE.</h3>
              <p>
                Colors, patterns, typography, player names, numbers, and team
                identity.
              </p>
            </div>
          </div>

          <div className="on-feature-small">
            <div className="feature-graphic graphic-pattern">
              <span>G</span>
              <span>O</span>
              <span>01</span>
            </div>

            <span>02 / VISUAL DIRECTION</span>
            <h3>BUILT TO STAND OUT.</h3>
            <p>Explore different design directions and graphic treatments.</p>
          </div>

          <div className="on-feature-small">
            <div className="feature-graphic graphic-material">
              <i />
              <i />
              <i />
            </div>

            <span>03 / MATERIAL & DETAILS</span>
            <h3>DETAILS THAT MATTER.</h3>
            <p>
              Discuss fabric, print, finishing, and other production
              specifications.
            </p>
          </div>
        </div>
      </section>

      <section className="section on-process-section" id="on-process">
        <div className="section-index">
          03 <span>/ PROJECT JOURNEY</span>
        </div>

        <SectionHeading
          eyebrow="FROM INQUIRY TO DELIVERY"
          title="A CLEAR PATH TO YOUR TEAM KIT."
          text="A proposed customer journey for custom jersey projects. Select a step to preview the concept experience."
        />

        <div className="journey-layout">
          <div className="journey-steps">
            {stages.map(([id, number, label]) => (
              <button
                key={id}
                className={`journey-step ${
                  stage === id ? "journey-step-active" : ""
                }`}
                onClick={() => setStage(id)}
              >
                <span>{number}</span>
                <b>{label}</b>
                <ChevronRight size={16} />
              </button>
            ))}
          </div>

          <div className="journey-panel">
            {stage === "inquiry" && (
              <>
                <span className="eyebrow">STEP 01 / INITIAL INQUIRY</span>

                <h3>
                  LET'S BUILD
                  <br />
                  <em>YOUR TEAM KIT.</em>
                </h3>

                <p>
                  Tell us a little about your team and what you have in mind.
                  This demo form shows the proposed first point of contact.
                </p>

                <form
                  className="demo-form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setStage("discussion");
                  }}
                >
                  <label>
                    TEAM / ORGANIZATION NAME
                    <input
                      name="team"
                      value={form.team}
                      onChange={updateForm}
                      placeholder="Enter your team name"
                      required
                    />
                  </label>

                  <label>
                    CONTACT PERSON
                    <input
                      name="contact"
                      value={form.contact}
                      onChange={updateForm}
                      placeholder="Your name"
                      required
                    />
                  </label>

                  <label>
                    EMAIL ADDRESS
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={updateForm}
                      placeholder="you@example.com"
                      required
                    />
                  </label>

                  <label>
                    ESTIMATED QUANTITY
                    <select
                      name="quantity"
                      value={form.quantity}
                      onChange={updateForm}
                      required
                    >
                      <option value="">Select quantity</option>
                      <option>10–20 pieces</option>
                      <option>21–50 pieces</option>
                      <option>51–100 pieces</option>
                      <option>100+ pieces</option>
                    </select>
                  </label>

                  <label className="full-field">
                    PROJECT DETAILS
                    <textarea
                      name="notes"
                      value={form.notes}
                      onChange={updateForm}
                      placeholder="Tell us about your project..."
                      rows="3"
                    />
                  </label>

                  <button className="button button-light" type="submit">
                    SEND DEMO INQUIRY <ArrowRight size={15} />
                  </button>
                </form>
              </>
            )}

            {stage === "discussion" && (
              <>
                <span className="eyebrow">STEP 02 / SALES DISCUSSION</span>

                <h3>
                  LET'S ALIGN
                  <br />
                  <em>THE DETAILS.</em>
                </h3>

                <p>
                  In the proposed flow, the GRIND sales team reviews the
                  inquiry and discusses quantity, design direction,
                  specifications, timeline, and quotation with the customer.
                </p>

                <div className="journey-info">
                  <b>DISCUSSION CHECKLIST</b>
                  <span>Project requirements</span>
                  <span>Quantity and sizing</span>
                  <span>Design direction</span>
                  <span>Production details and timeline</span>
                  <span>Quotation and next steps</span>
                </div>

                <button
                  className="button button-light"
                  onClick={() => setStage("payment")}
                >
                  CONTINUE DEMO <ArrowRight size={15} />
                </button>
              </>
            )}

            {stage === "payment" && (
              <>
                <span className="eyebrow">STEP 03 / PAYMENT</span>

                <h3>
                  PROJECT
                  <br />
                  <em>CONFIRMATION.</em>
                </h3>

                <p>
                  After the sales discussion and quotation approval, the
                  customer proceeds with the agreed payment arrangement. This
                  is a visual demonstration only.
                </p>

                <div className="demo-payment">
                  <CreditCard size={24} />

                  <div>
                    <b>PAYMENT STATUS</b>
                    <span>Awaiting confirmation from sales</span>
                  </div>

                  <span className="status-pill">DEMO ONLY</span>
                </div>

                <button
                  className="button button-light"
                  onClick={() => setStage("intake")}
                >
                  SIMULATE PAYMENT CONFIRMED <ArrowRight size={15} />
                </button>
              </>
            )}

            {stage === "intake" && (
              <>
                <span className="eyebrow">STEP 04 / DESIGN INTAKE</span>

                <h3>
                  DEFINE YOUR
                  <br />
                  <em>TEAM IDENTITY.</em>
                </h3>

                <p>
                  After payment confirmation, the customer receives access to
                  the design intake form.
                </p>

                <form
                  className="demo-form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setStage("submitted");
                  }}
                >
                  <label>
                    TEAM NAME
                    <input
                      name="teamName"
                      value={design.teamName}
                      onChange={updateDesign}
                      placeholder="Team name"
                      required
                    />
                  </label>

                  <label>
                    TEAM COLORS
                    <input
                      name="colors"
                      value={design.colors}
                      onChange={updateDesign}
                      placeholder="e.g. Black, red, silver"
                      required
                    />
                  </label>

                  <label>
                    DESIGN STYLE
                    <select
                      name="style"
                      value={design.style}
                      onChange={updateDesign}
                      required
                    >
                      <option value="">Choose a direction</option>
                      <option>Minimal / Clean</option>
                      <option>Futuristic / Tech</option>
                      <option>Aggressive / Competitive</option>
                      <option>Classic / Athletic</option>
                      <option>Custom direction</option>
                    </select>
                  </label>

                  <label className="full-field">
                    DESIGN NOTES
                    <textarea
                      name="notes"
                      value={design.notes}
                      onChange={updateDesign}
                      rows="3"
                      placeholder="Describe your preferred design..."
                    />
                  </label>

                  <button className="button button-light" type="submit">
                    SUBMIT DESIGN INTAKE <ArrowRight size={15} />
                  </button>
                </form>
              </>
            )}

            {stage === "submitted" && (
              <>
                <span className="eyebrow">STEP 05 / SUBMISSION</span>

                <div className="success-icon">
                  <Check size={30} />
                </div>

                <h3>
                  INTAKE
                  <br />
                  <em>RECEIVED.</em>
                </h3>

                <p>
                  Your demo intake has been submitted. In the proposed live
                  system, this step would create a project record and send the
                  customer to a tracking page.
                </p>

                <div className="reference-card">
                  <span>DEMO PROJECT REFERENCE</span>
                  <b>GR-ON-0001</b>
                  <small>Sample reference only</small>
                </div>

                <button
                  className="button button-light"
                  onClick={() => setStage("review")}
                >
                  VIEW DESIGN REVIEW <ArrowRight size={15} />
                </button>
              </>
            )}

            {stage === "review" && (
              <>
                <span className="eyebrow">STEP 06 / DESIGN REVIEW</span>

                <h3>
                  REVIEW THE
                  <br />
                  <em>DESIGN DIRECTION.</em>
                </h3>

                <p>
                  This is a sample design-review area. A real project would
                  display the design file provided by the GRIND design team.
                </p>

                <div className="review-preview">
                  <AbstractGarment variant="jersey" tone="dark" label="TEAM" />
                </div>

                <label className="review-comment">
                  REVISION COMMENTS
                  <textarea
                    rows="3"
                    value={revision}
                    onChange={(e) => setRevision(e.target.value)}
                    placeholder="Describe the changes you want..."
                  />
                </label>

                <div className="review-actions">
                  <button
                    className="button button-outline"
                    onClick={() => setStage("intake")}
                  >
                    BACK TO INTAKE
                  </button>

                  <button
                    className="button button-light"
                    onClick={() => setStage("approval")}
                  >
                    SUBMIT REVIEW <ArrowRight size={15} />
                  </button>
                </div>
              </>
            )}

            {stage === "approval" && (
              <>
                <span className="eyebrow">STEP 07 / FINAL APPROVAL</span>

                <h3>
                  READY FOR
                  <br />
                  <em>PRODUCTION?</em>
                </h3>

                <p>
                  Once the customer is satisfied with the final design, they
                  can approve it to move the project forward.
                </p>

                <div className="approval-card">
                  <CheckCircle2 size={25} />

                  <div>
                    <b>FINAL DESIGN PREVIEW</b>
                    <span>Sample concept awaiting customer approval</span>
                  </div>
                </div>

                <button
                  className="button button-light"
                  onClick={() => {
                    setApproved(true);
                    setStage("tracking");
                  }}
                >
                  APPROVE DESIGN <Check size={15} />
                </button>
              </>
            )}

            {stage === "tracking" && (
              <>
                <span className="eyebrow">STEP 08 / ORDER TRACKER</span>

                <h3>
                  YOUR PROJECT.
                  <br />
                  <em>IN MOTION.</em>
                </h3>

                <p>
                  A proposed tracking view showing the progress of a custom
                  jersey order.
                </p>

                <div className="tracker-list">
                  {[
                    "Inquiry received",
                    "Project discussion",
                    "Payment confirmed",
                    "Design intake submitted",
                    "Design review",
                    "Final design approved",
                    "Production",
                    "Ready for delivery",
                  ].map((item, i) => (
                    <div
                      className={`tracker-item ${
                        i < (approved ? 6 : 2) ? "tracker-done" : ""
                      }`}
                      key={item}
                    >
                      <span>
                        {i < (approved ? 6 : 2) ? (
                          <Check size={13} />
                        ) : (
                          i + 1
                        )}
                      </span>

                      <b>{item}</b>

                      <small>
                        {i < (approved ? 6 : 2) ? "COMPLETED" : "PENDING"}
                      </small>
                    </div>
                  ))}
                </div>

                <button
                  className="button button-outline"
                  onClick={() => {
                    setStage("inquiry");
                    setApproved(false);
                    setForm({
                      team: "",
                      contact: "",
                      email: "",
                      quantity: "",
                      notes: "",
                    });
                    setDesign({
                      teamName: "",
                      colors: "",
                      style: "",
                      notes: "",
                    });
                    setRevision("");
                  }}
                >
                  RESET DEMO <ArrowRight size={15} />
                </button>
              </>
            )}
          </div>
        </div>
      </section>

      <ContactBand />
    </main>
  );
}

/* =========================================================
   PRODUCT CARD
========================================================= */

function ProductCard({ product, onOpen, original = false }) {
  return (
    <article className="product-card">
      <button
        type="button"
        className="product-visual-button"
        onClick={() => onOpen(product)}
        aria-label={`View ${product.name}`}
      >
        <div className={`product-visual product-tone-${product.color}`}>
          <span className="product-label">{product.category}</span>

          <AbstractGarment
            variant={original ? "jersey" : "tee"}
            tone={product.color === "bone" ? "light" : "dark"}
            label={original ? "ORIGINAL" : "DAILY"}
          />

          {product.oldPrice && (
            <span className="sale-label">SPECIAL PRICE</span>
          )}

          <span className="product-quick">
            VIEW PRODUCT <ArrowUpRight size={14} />
          </span>
        </div>
      </button>

      <div className="product-meta">
        <span>{product.code}</span>
        <span>{product.category}</span>
      </div>

      <div className="product-title-row">
        <button
          type="button"
          onClick={() => onOpen(product)}
          aria-label={`View details for ${product.name}`}
        >
          {product.name}
        </button>

        <button
          type="button"
          className="product-add"
          onClick={() => onOpen(product)}
          aria-label={`Choose options for ${product.name}`}
          title="Choose size and options"
        >
          <Plus size={17} />
        </button>
      </div>

      <div className="product-price">
        {product.oldPrice && (
          <del>₱{product.oldPrice.toLocaleString()}</del>
        )}{" "}
        ₱{product.price.toLocaleString()}
      </div>
    </article>
  );
}

/* =========================================================
   SHOP PAGES
========================================================= */

function ShopPage({ original = false, onAdd }) {
  const products = original ? originalProducts : dailyProducts;

  const [selected, setSelected] = useState(null);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("ALL");
  const [sort, setSort] = useState("featured");
  const [size, setSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
  const [collar, setCollar] = useState("Standard");
  const [nickname, setNickname] = useState("");
  const [logoOption, setLogoOption] = useState("None");
  const [logoFile, setLogoFile] = useState(null);
  const [uploadError, setUploadError] = useState("");

  const filtered = useMemo(() => {
    let list = products.filter(
      (p) =>
        (category === "ALL" || p.category === category) &&
        p.name.toLowerCase().includes(query.toLowerCase())
    );

    if (sort === "low") {
      list = [...list].sort((a, b) => a.price - b.price);
    }

    if (sort === "high") {
      list = [...list].sort((a, b) => b.price - a.price);
    }

    return list;
  }, [products, category, query, sort]);

  const openProduct = (product) => {
    setSelected(product);
    setSize("M");
    setQuantity(1);
    setCollar("Standard");
    setNickname("");
    setLogoOption("None");
    setLogoFile(null);
    setUploadError("");
  };

  const closeProduct = () => {
    setSelected(null);
    setUploadError("");
  };

  const addSelected = () => {
    if (!selected) return;

    if (
      original &&
      logoOption === "Upload custom logo" &&
      !logoFile
    ) {
      setUploadError("Please select a logo file before adding this item.");
      return;
    }

    const cartKey = [
      selected.id,
      size,
      collar,
      nickname.trim(),
      logoOption,
      logoFile?.name || "",
    ].join("-");

    onAdd({
      ...selected,
      cartKey,
      size,
      quantity,
      collar: original ? collar : undefined,
      nickname: original ? nickname.trim() : undefined,
      logoOption: original ? logoOption : undefined,
      logoFileName: logoFile?.name || undefined,
    });

    closeProduct();
  };

  return (
    <main
      className={`division-page shop-page ${
        original ? "originals-page" : "daily-page"
      }`}
    >
      <section className="shop-hero">
        <div className="shop-hero-copy">
          <span className="eyebrow">
            <span className="eyebrow-line" />
            GRIND DIVISION /{" "}
            {original ? "03 — STORY JERSEYS" : "02 — COTTON RETAIL"}
          </span>

          <h1>
            {original ? (
              <>
                WEAR THE
                <br />
                <em>STORY.</em>
              </>
            ) : (
              <>
                MADE FOR
                <br />
                <em>EVERY DAY.</em>
              </>
            )}
          </h1>

          <p>
            {original
              ? "Story-driven jersey concepts, released as wearable chapters. Each version carries its own visual language."
              : "Everyday cotton essentials designed around comfort, simplicity, and a distinct point of view."}
          </p>

          <a href="#collection" className="button button-light">
            EXPLORE COLLECTION <ArrowDown size={15} />
          </a>
        </div>

        <div className="shop-hero-graphic">
          <div className="shop-graphic-ring" />

          <div className="shop-graphic-type">
            {original ? "CHAPTER" : "DAILY"}
            <b>{original ? "001" : "ESSENTIALS"}</b>
          </div>

          <AbstractGarment
            variant={original ? "jersey" : "tee"}
            tone="dark"
            label={original ? "ORIGINAL" : "DAILY"}
          />

          <span className="shop-graphic-note">CONCEPT SERIES / 2026</span>
        </div>
      </section>

      <section className="promo-strip">
        <Sparkles size={16} />

        <span>
          {original
            ? "NEW CHAPTERS. NEW VERSIONS. SAME GRIND."
            : "EVERYDAY PIECES. MADE WITH INTENTION."}
        </span>

        <span>
          EXPLORE THE DROP <ArrowRight size={14} />
        </span>
      </section>

      <section className="section collection-section" id="collection">
        <div className="section-index">
          01 <span>/ THE COLLECTION</span>
        </div>

        <div className="collection-heading">
          <SectionHeading
            eyebrow={
              original ? "THE ORIGINALS SERIES" : "THE DAILY COLLECTION"
            }
            title={
              original ? (
                <>
                  THE NEXT
                  <br />
                  <em>CHAPTER.</em>
                </>
              ) : (
                <>
                  FIND YOUR
                  <br />
                  <em>EVERYDAY.</em>
                </>
              )
            }
            text={
              original
                ? "A collection of concept jerseys with their own story, design direction, and identity."
                : "Discover the pieces made to become part of your everyday rotation."
            }
          />

          <div className="collection-search">
            <Search size={17} />

            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search collection..."
            />
          </div>
        </div>

        <div className="collection-toolbar">
          <div className="filter-tabs">
            {["ALL", ...new Set(products.map((p) => p.category))].map((c) => (
              <button
                key={c}
                className={category === c ? "filter-active" : ""}
                onClick={() => setCategory(c)}
              >
                {c}
              </button>
            ))}
          </div>

          <label>
            <SlidersHorizontal size={15} />

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="featured">Featured</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
            </select>
          </label>
        </div>

        <div className="product-grid">
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onOpen={openProduct}
              original={original}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="empty-state">
            NO PRODUCTS FOUND. TRY ANOTHER SEARCH.
          </div>
        )}
      </section>

      <section className="shop-editorial">
        <div className="editorial-graphic">
          <div className="editorial-cross">✳</div>

          <span>
            {original
              ? "A STORY IN EVERY THREAD."
              : "THE EVERYDAY STANDARD."}
          </span>
        </div>

        <div>
          <span className="eyebrow">THE GRIND APPROACH</span>

          <h2>
            {original ? (
              <>
                NOT JUST A
                <br />
                <em>JERSEY.</em>
              </>
            ) : (
              <>
                THE DETAILS
                <br />
                <em>MAKE IT.</em>
              </>
            )}
          </h2>

          <p>
            {original
              ? "Each Originals release starts with an idea. A visual story is translated into a jersey concept designed for individual expression."
              : "Comfort, silhouette, and the small details come together to create everyday pieces that feel considered."}
          </p>
        </div>
      </section>

      {selected && (
        <div
          className="modal-backdrop"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeProduct();
          }}
        >
          <div
            className="product-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="product-modal-title"
          >
            <button
              className="modal-close"
              onClick={closeProduct}
              aria-label="Close product details"
            >
              <X />
            </button>

            <div className="modal-product-art">
              <AbstractGarment
                variant={original ? "jersey" : "tee"}
                tone={selected.color === "bone" ? "light" : "dark"}
                label={original ? "ORIGINAL" : "DAILY"}
              />
            </div>

            <div className="modal-product-info">
              <span className="eyebrow">
                {selected.code} / {selected.category}
              </span>

              <h2 id="product-modal-title">{selected.name}</h2>

              <div className="modal-price">
                ₱{selected.price.toLocaleString()}
              </div>

              <p>{selected.description}</p>

              <label className="field-label">SELECT SIZE</label>

              <div className="size-options">
                {selected.sizes.map((itemSize) => (
                  <button
                    type="button"
                    key={itemSize}
                    className={size === itemSize ? "size-active" : ""}
                    aria-pressed={size === itemSize}
                    onClick={() => setSize(itemSize)}
                  >
                    {itemSize}
                  </button>
                ))}
              </div>

              {original && (
                <>
                  <label className="field-label">COLLAR STYLE</label>

                  <div className="select-wrap">
                    <select
                      value={collar}
                      onChange={(e) => setCollar(e.target.value)}
                    >
                      <option>Standard</option>
                      <option>V-Neck</option>
                      <option>Round Neck</option>
                      <option>Custom Collar (subject to confirmation)</option>
                    </select>

                    <ChevronDown size={15} />
                  </div>

                  <label className="field-label">GAMING LOGO OPTION</label>

                  <div className="select-wrap">
                    <select
                      value={logoOption}
                      onChange={(e) => {
                        setLogoOption(e.target.value);
                        setLogoFile(null);
                        setUploadError("");
                      }}
                    >
                      <option>None</option>
                      <option>Left sleeve logo</option>
                      <option>Right sleeve logo</option>
                      <option>Both sleeve logos</option>
                      <option>Upload custom logo</option>
                    </select>

                    <ChevronDown size={15} />
                  </div>

                  {logoOption === "Upload custom logo" && (
                    <label className="upload-field">
                      <Upload size={16} />

                      {logoFile
                        ? logoFile.name
                        : "UPLOAD HIGH-QUALITY LOGO"}

                      <input
                        type="file"
                        accept="image/*,.svg,.pdf"
                        onChange={(e) => {
                          setLogoFile(e.target.files?.[0] || null);
                          setUploadError("");
                        }}
                      />
                    </label>
                  )}

                  {uploadError && (
                    <small className="upload-error" role="alert">
                      {uploadError}
                    </small>
                  )}

                  <label className="field-label">OPTIONAL NICKNAME</label>

                  <input
                    className="text-input"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    placeholder="Enter nickname"
                  />
                </>
              )}

              <label className="field-label">QUANTITY</label>

              <div className="quantity-control">
                <button
                  type="button"
                  onClick={() =>
                    setQuantity((current) => Math.max(1, current - 1))
                  }
                  aria-label="Decrease quantity"
                >
                  <Minus size={14} />
                </button>

                <b>{quantity}</b>

                <button
                  type="button"
                  onClick={() => setQuantity((current) => current + 1)}
                  aria-label="Increase quantity"
                >
                  <Plus size={14} />
                </button>
              </div>

              <button
                type="button"
                className="button button-dark modal-add"
                onClick={addSelected}
              >
                ADD TO CART — ₱
                {(selected.price * quantity).toLocaleString()}
                <ShoppingBag size={16} />
              </button>

              <small className="prototype-note">
                Concept product. Final specifications and options are subject
                to confirmation.
              </small>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

/* =========================================================
   CART PAGE
========================================================= */

function CartPage({ cart, updateQuantity, removeItem }) {
  const navigate = useNavigate();

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <main className="simple-page">
      <PageIntro
        eyebrow="YOUR SELECTION"
        title="YOUR CART."
        text="Review your selected concept products before proceeding to the demo checkout."
        number="CART / 01"
      />

      {cart.length === 0 ? (
        <div className="empty-cart">
          <ShoppingBag size={34} />

          <h2>YOUR CART IS EMPTY.</h2>

          <p>Explore the GRIND collections and find your next piece.</p>

          <Link to="/grind-daily" className="button button-light">
            EXPLORE DAILY <ArrowRight size={15} />
          </Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items">
            {cart.map((item) => (
              <div
                className="cart-item"
                key={item.cartKey || item.id}
              >
                <div className="cart-item-art">
                  <AbstractGarment
                    variant={
                      item.code?.startsWith("GO") ? "jersey" : "tee"
                    }
                    tone="dark"
                    label="GRIND"
                  />
                </div>

                <div className="cart-item-info">
                  <span>{item.code}</span>

                  <h3>{item.name}</h3>

                  <p>
                    Size: {item.size}
                    {item.collar ? ` · Collar: ${item.collar}` : ""}
                    {item.nickname ? ` · Nickname: ${item.nickname}` : ""}
                    {item.logoOption && item.logoOption !== "None"
                      ? ` · Logo: ${item.logoOption}`
                      : ""}
                  </p>

                  {item.logoFileName && (
                    <small>Uploaded file: {item.logoFileName}</small>
                  )}

                  <b>₱{item.price.toLocaleString()}</b>

                  <button
                    className="remove-item"
                    onClick={() =>
                      removeItem(item.cartKey || item.id)
                    }
                  >
                    REMOVE
                  </button>
                </div>

                <div className="cart-quantity">
                  <button
                    onClick={() =>
                      updateQuantity(
                        item.cartKey || item.id,
                        Math.max(1, item.quantity - 1)
                      )
                    }
                    aria-label="Decrease item quantity"
                  >
                    <Minus size={13} />
                  </button>

                  <b>{item.quantity}</b>

                  <button
                    onClick={() =>
                      updateQuantity(
                        item.cartKey || item.id,
                        item.quantity + 1
                      )
                    }
                    aria-label="Increase item quantity"
                  >
                    <Plus size={13} />
                  </button>
                </div>

                <strong>
                  ₱{(item.price * item.quantity).toLocaleString()}
                </strong>
              </div>
            ))}
          </div>

          <aside className="cart-summary">
            <span className="eyebrow">ORDER SUMMARY</span>

            <h3>SUMMARY</h3>

            <div>
              <span>Subtotal</span>
              <b>₱{subtotal.toLocaleString()}</b>
            </div>

            <div>
              <span>Shipping</span>
              <span>Calculated in checkout</span>
            </div>

            <div className="summary-total">
              <span>ESTIMATED TOTAL</span>
              <b>₱{subtotal.toLocaleString()}</b>
            </div>

            <button
              className="button button-light"
              onClick={() => navigate("/checkout")}
            >
              PROCEED TO CHECKOUT <ArrowRight size={15} />
            </button>

            <small>Demo checkout only. No payment will be collected.</small>
          </aside>
        </div>
      )}
    </main>
  );
}

/* =========================================================
   CHECKOUT PAGE
========================================================= */

function CheckoutPage({ cart, onOrderComplete }) {
  const [done, setDone] = useState(false);

  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postal: "",
    payment: "Cash on Delivery (demo)",
  });

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const update = (e) =>
    setCustomer((current) => ({
      ...current,
      [e.target.name]: e.target.value,
    }));

  if (done) {
    return (
      <main className="simple-page">
        <div className="checkout-success">
          <div className="success-icon">
            <Check size={30} />
          </div>

          <span className="eyebrow">DEMO ORDER CREATED</span>

          <h1>
            THANK YOU.
            <br />
            <em>YOU'RE ALL SET.</em>
          </h1>

          <p>
            This is a prototype confirmation. No real order or payment has
            been processed.
          </p>

          <div className="reference-card">
            <span>DEMO ORDER NUMBER</span>
            <b>GR-ORD-2026-001</b>
          </div>

          <Link to="/" className="button button-light">
            BACK TO GRIND <ArrowRight size={15} />
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="simple-page">
      <PageIntro
        eyebrow="CHECKOUT / DEMO"
        title="COMPLETE YOUR DETAILS."
        text="This sample checkout demonstrates the proposed customer experience."
        number="CHECKOUT / 02"
      />

      {cart.length === 0 ? (
        <div className="empty-state">
          YOUR CART IS EMPTY.{" "}
          <Link to="/grind-daily">EXPLORE THE COLLECTION</Link>
        </div>
      ) : (
        <div className="checkout-layout">
          <form
            className="checkout-form"
            onSubmit={(e) => {
              e.preventDefault();
              setDone(true);
              onOrderComplete?.();
            }}
          >
            <span className="eyebrow">01 / CUSTOMER INFORMATION</span>

            <label>
              FULL NAME
              <input
                name="name"
                value={customer.name}
                onChange={update}
                required
                placeholder="Full name"
              />
            </label>

            <label>
              EMAIL ADDRESS
              <input
                type="email"
                name="email"
                value={customer.email}
                onChange={update}
                required
                placeholder="Email address"
              />
            </label>

            <label>
              PHONE NUMBER
              <input
                name="phone"
                value={customer.phone}
                onChange={update}
                required
                placeholder="09XX XXX XXXX"
              />
            </label>

            <span className="eyebrow form-spacer">
              02 / SHIPPING DETAILS
            </span>

            <label className="full-field">
              DELIVERY ADDRESS
              <input
                name="address"
                value={customer.address}
                onChange={update}
                required
                placeholder="House number, street, barangay"
              />
            </label>

            <label>
              CITY / MUNICIPALITY
              <input
                name="city"
                value={customer.city}
                onChange={update}
                required
                placeholder="City"
              />
            </label>

            <label>
              POSTAL CODE
              <input
                name="postal"
                value={customer.postal}
                onChange={update}
                required
                placeholder="Postal code"
              />
            </label>

            <span className="eyebrow form-spacer">
              03 / PAYMENT METHOD
            </span>

            <label className="full-field">
              DEMO PAYMENT OPTION
              <select
                name="payment"
                value={customer.payment}
                onChange={update}
              >
                <option>Cash on Delivery (demo)</option>
                <option>Online payment (demo only)</option>
                <option>Bank transfer (demo only)</option>
              </select>
            </label>

            <button className="button button-light" type="submit">
              PLACE DEMO ORDER <ArrowRight size={15} />
            </button>
          </form>

          <aside className="cart-summary">
            <span className="eyebrow">YOUR ORDER</span>

            <h3>ORDER SUMMARY</h3>

            {cart.map((item) => (
              <div key={item.cartKey || item.id}>
                <span>
                  {item.name} × {item.quantity}
                </span>

                <b>
                  ₱{(item.price * item.quantity).toLocaleString()}
                </b>
              </div>
            ))}

            <div className="summary-total">
              <span>TOTAL</span>
              <b>₱{total.toLocaleString()}</b>
            </div>

            <small>
              Prototype only. This form does not transmit or store payment
              information.
            </small>
          </aside>
        </div>
      )}
    </main>
  );
}

/* =========================================================
   GRIND LABS PAGE
========================================================= */

function LabsPage() {
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    service: "GRIND provides the shirts",
    quantity: "",
    shirt: "",
    details: "",
  });

  const update = (e) =>
    setForm((current) => ({
      ...current,
      [e.target.name]: e.target.value,
    }));

  return (
    <main className="division-page labs-page">
      <section className="division-hero labs-hero">
        <div className="division-hero-grid" />

        <div className="division-hero-content">
          <span className="eyebrow">
            <span className="eyebrow-line" />
            GRIND DIVISION / 04 — MANUFACTURING
          </span>

          <h1>
            IDEAS INTO
            <br />
            <em>GARMENTS.</em>
          </h1>

          <p>
            GRIND LABS explores cotton clothing production for brands,
            businesses, organizations, and creative projects.
          </p>

          <a href="#labs-quote" className="button button-light">
            GET A QUOTATION <ArrowDown size={15} />
          </a>
        </div>

        <div className="division-hero-art labs-art">
          <div className="labs-technical">
            <span>FABRIC / 001</span>
            <b>G</b>

            <i>
              100%
              <br />
              IDEA
            </i>

            <small>PRODUCTION STUDY</small>
          </div>
        </div>

        <div className="division-hero-foot">
          <span>APPAREL PRODUCTION / COTTON / CRAFT</span>
          <span>GRIND LABS®</span>
        </div>
      </section>

      <section className="section">
        <div className="section-index">
          01 <span>/ WHAT WE DO</span>
        </div>

        <div className="two-column-intro">
          <SectionHeading
            eyebrow="CLOTHING MANUFACTURING"
            title={
              <>
                YOUR IDEA.
                <br />
                <em>OUR PRODUCTION.</em>
              </>
            }
          />

          <div className="about-copy">
            <p className="about-lead">
              From a blank shirt to a finished concept, GRIND LABS is built
              around turning clothing ideas into tangible products.
            </p>

            <p>
              For this concept, customers can request a quotation whether they
              want GRIND to provide the shirts or prefer to supply their own
              garments.
            </p>
          </div>
        </div>

        <div className="labs-options">
          <div>
            <span>01 / OPTION A</span>
            <h3>GRIND-PROVIDED SHIRTS</h3>
            <p>
              Discuss shirt options, fabric direction, quantity, and finishing
              requirements with the GRIND team.
            </p>
          </div>

          <div>
            <span>02 / OPTION B</span>
            <h3>CUSTOMER-PROVIDED SHIRTS</h3>
            <p>
              Bring your own garments and discuss the production or
              customization requirements.
            </p>
          </div>
        </div>
      </section>

      <section className="section quote-section" id="labs-quote">
        <div className="section-index">
          02 <span>/ START A PROJECT</span>
        </div>

        <div className="quote-layout">
          <div>
            <SectionHeading
              eyebrow="PROJECT INQUIRY"
              title={
                <>
                  LET'S TALK
                  <br />
                  <em>PRODUCTION.</em>
                </>
              }
              text="Share the basic details of your project. The form below is a visual quotation-request prototype."
            />

            <div className="quote-note">
              <ClipboardList size={20} />

              <p>
                Final pricing, materials, minimum quantities, and production
                timelines would be discussed and confirmed by the GRIND team.
              </p>
            </div>
          </div>

          {submitted ? (
            <div className="quote-success">
              <div className="success-icon">
                <Check size={28} />
              </div>

              <span className="eyebrow">DEMO REQUEST SUBMITTED</span>

              <h3>
                WE HAVE YOUR
                <br />
                <em>PROJECT DETAILS.</em>
              </h3>

              <p>
                This is a sample confirmation only. No request has been sent
                to a live system.
              </p>

              <button
                className="button button-outline"
                onClick={() => setSubmitted(false)}
              >
                SUBMIT ANOTHER
              </button>
            </div>
          ) : (
            <form
              className="demo-form quote-form"
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
            >
              <label>
                YOUR NAME
                <input
                  name="name"
                  value={form.name}
                  onChange={update}
                  required
                  placeholder="Full name"
                />
              </label>

              <label>
                COMPANY / BRAND
                <input
                  name="company"
                  value={form.company}
                  onChange={update}
                  placeholder="Company name"
                />
              </label>

              <label>
                EMAIL ADDRESS
                <input
                  name="email"
                  value={form.email}
                  onChange={update}
                  required
                  type="email"
                  placeholder="you@example.com"
                />
              </label>

              <label>
                PHONE NUMBER
                <input
                  name="phone"
                  value={form.phone}
                  onChange={update}
                  placeholder="Contact number"
                />
              </label>

              <label className="full-field">
                SHIRT SUPPLY
                <select
                  name="service"
                  value={form.service}
                  onChange={update}
                >
                  <option>GRIND provides the shirts</option>
                  <option>Customer provides the shirts</option>
                  <option>Open to recommendation</option>
                </select>
              </label>

              <label>
                ESTIMATED QUANTITY
                <input
                  name="quantity"
                  value={form.quantity}
                  onChange={update}
                  placeholder="e.g. 50 pieces"
                />
              </label>

              <label>
                SHIRT TYPE
                <input
                  name="shirt"
                  value={form.shirt}
                  onChange={update}
                  placeholder="e.g. Oversized cotton tee"
                />
              </label>

              <label className="full-field">
                PROJECT DETAILS
                <textarea
                  name="details"
                  value={form.details}
                  onChange={update}
                  rows="4"
                  placeholder="Tell us about the project, design, and requirements..."
                />
              </label>

              <button className="button button-light" type="submit">
                SUBMIT DEMO INQUIRY <ArrowRight size={15} />
              </button>
            </form>
          )}
        </div>
      </section>

      <ContactBand />
    </main>
  );
}

/* =========================================================
   CONTACT PAGE
========================================================= */

function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <main className="simple-page">
      <PageIntro
        eyebrow="CONTACT GRIND"
        title="LET'S MAKE IT HAPPEN."
        text="Have a project, collaboration, or question? Start a conversation with the GRIND team."
        number="CONTACT / 05"
      />

      {sent ? (
        <div className="quote-success">
          <div className="success-icon">
            <Check size={28} />
          </div>

          <h2>MESSAGE READY.</h2>

          <p>This is a concept interaction. No message was sent.</p>

          <button
            className="button button-outline"
            onClick={() => setSent(false)}
          >
            BACK
          </button>
        </div>
      ) : (
        <form
          className="contact-form demo-form"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          <label>
            YOUR NAME
            <input required placeholder="Full name" />
          </label>

          <label>
            EMAIL ADDRESS
            <input type="email" required placeholder="you@example.com" />
          </label>

          <label>
            WHAT ARE YOU INTERESTED IN?
            <select>
              <option>General inquiry</option>
              <option>Custom esports jerseys / GRIND ON</option>
              <option>Cotton retail / GRIND DAILY</option>
              <option>Originals jersey / GRIND ORIGINALS</option>
              <option>Manufacturing / GRIND LABS</option>
            </select>
          </label>

          <label className="full-field">
            MESSAGE
            <textarea rows="5" placeholder="Tell us about your project..." />
          </label>

          <button className="button button-light" type="submit">
            SEND DEMO MESSAGE <ArrowRight size={15} />
          </button>
        </form>
      )}
    </main>
  );
}

/* =========================================================
   STAFF DEMO
========================================================= */

function StaffDemo() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="staff-demo-trigger"
        onClick={() => setOpen(true)}
      >
        <LayoutDashboard size={15} />
        STAFF DEMO
      </button>

      {open && (
        <div
          className="modal-backdrop staff-backdrop"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <div className="staff-modal">
            <button
              className="modal-close"
              onClick={() => setOpen(false)}
              aria-label="Close staff demo"
            >
              <X />
            </button>

            <span className="eyebrow">GRIND / INTERNAL CONCEPT</span>

            <h2>
              STAFF
              <br />
              <em>DEMO ACCESS.</em>
            </h2>

            <p>
              A visual preview of the proposed internal staff workspace. Not
              connected to a live admin system.
            </p>

            <div className="staff-demo-grid">
              <div>
                <LayoutDashboard />
                <b>OVERVIEW</b>
                <span>Dashboard concept</span>
              </div>

              <div>
                <Package />
                <b>ORDERS</b>
                <span>Order management</span>
              </div>

              <div>
                <MessageSquare />
                <b>INQUIRIES</b>
                <span>Customer requests</span>
              </div>

              <div>
                <Truck />
                <b>TRACKING</b>
                <span>Production status</span>
              </div>
            </div>

            <button
              className="button button-light"
              onClick={() => setOpen(false)}
            >
              CLOSE DEMO <X size={14} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

/* =========================================================
   FOOTER
========================================================= */

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div>
          <BrandMark />

          <p>
            YOUR VISION. OUR CRAFT.
            <br />
            GET IT DONE.
          </p>
        </div>

        <div className="footer-links">
          <div>
            <span>EXPLORE</span>
            <Link to="/">GRIND</Link>
            <Link to="/grind-on">GRIND ON</Link>
            <Link to="/grind-daily">GRIND DAILY</Link>
            <Link to="/grind-originals">GRIND ORIGINALS</Link>
            <Link to="/grind-labs">GRIND LABS</Link>
          </div>

          <div>
            <span>CONNECT</span>
            <Link to="/contact">CONTACT</Link>
            <a href="#top">BACK TO TOP ↑</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 GRIND PHILIPPINES. CONCEPT PRESENTATION.</span>
        <span>DESIGNED TO MAKE AN IMPACT.</span>
      </div>
    </footer>
  );
}

/* =========================================================
   APP SHELL
========================================================= */

function AppShell() {
  const [cart, setCart] = useState([]);
  const [cartNotice, setCartNotice] = useState("");
  const [cartNoticeKey, setCartNoticeKey] = useState(0);

  const location = useLocation();

  /* =======================================================
     CART NOTICE AUTO DISMISS
  ======================================================= */

  useEffect(() => {
    if (!cartNotice) return undefined;

    const timeout = window.setTimeout(() => {
      setCartNotice("");
    }, 2600);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [cartNotice, cartNoticeKey]);

  /* =======================================================
     1. SCROLL-TRIGGERED REVEAL
  ======================================================= */

  useEffect(() => {
    const revealSelectors = [
      ".page-intro",
      ".section-heading",
      ".hero-content",
      ".hero-side-index",
      ".hero-bottom",
      ".about-copy",
      ".about-stats > div",
      ".division-card",
      ".manifesto-content",
      ".process-step",
      ".division-hero-content",
      ".division-hero-art",
      ".on-feature-large",
      ".on-feature-small",
      ".journey-step",
      ".journey-panel",
      ".shop-hero-copy",
      ".shop-hero-graphic",
      ".product-card",
      ".editorial-graphic",
      ".labs-technical",
      ".labs-options > div",
      ".cart-item",
      ".cart-summary",
      ".checkout-form",
      ".quote-note",
      ".quote-form",
      ".contact-form",
      ".contact-band > div",
    ];

    const elements = document.querySelectorAll(
      revealSelectors.join(",")
    );

    if (!elements.length) return undefined;

    elements.forEach((element) => {
      element.classList.add("scroll-reveal");
    });

    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => {
        element.classList.add("is-visible");
      });

      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -45px 0px",
      }
    );

    elements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, [location.pathname]);

  /* =======================================================
     2. 3D HOVER INTERACTION
  ======================================================= */

  useEffect(() => {
    const targetSelector = [
      ".division-card",
      ".product-card",
      ".on-feature-large",
      ".on-feature-small",
      ".process-step",
      ".journey-panel",
      ".journey-step",
      ".shop-hero-graphic",
      ".editorial-graphic",
      ".labs-technical",
      ".labs-options > div",
      ".cart-item",
      ".cart-summary",
      ".checkout-form",
      ".checkout-success",
      ".quote-success",
      ".quote-note",
      ".staff-modal",
      ".staff-demo-grid > div",
      ".contact-band > div",
      ".about-stats > div",
      ".manifesto-content",
      ".review-preview",
      ".approval-card",
      ".demo-payment",
      ".reference-card",
      ".empty-cart",
      ".button",
      ".round-link",
      ".product-add",
      ".nav-cart",
      ".nav-contact",
      ".text-link",
      ".staff-demo-trigger",
    ].join(",");

    const clearTarget = (element) => {
      if (!element) return;

      element.classList.remove(
        "is-3d-active",
        "grind-3d-target"
      );

      element.style.removeProperty("--tilt-x");
      element.style.removeProperty("--tilt-y");
      element.style.removeProperty("--pointer-x");
      element.style.removeProperty("--pointer-y");
    };

    const getTarget = (event) => {
      if (!(event.target instanceof Element)) return null;

      return event.target.closest(targetSelector);
    };

    const handlePointerMove = (event) => {
      if (event.pointerType !== "mouse") return;

      const target = getTarget(event);

      if (!target) return;

      const rect = target.getBoundingClientRect();

      if (!rect.width || !rect.height) return;

      const x = Math.max(
        0,
        Math.min(1, (event.clientX - rect.left) / rect.width)
      );

      const y = Math.max(
        0,
        Math.min(1, (event.clientY - rect.top) / rect.height)
      );

      const isButton = target.matches(
        [
          ".button",
          ".round-link",
          ".product-add",
          ".nav-cart",
          ".nav-contact",
          ".text-link",
          ".staff-demo-trigger",
          ".journey-step",
        ].join(",")
      );

      const intensity = isButton ? 3 : 5;

      const rotateY = (x - 0.5) * intensity * 2;
      const rotateX = (0.5 - y) * intensity * 2;

      target.style.setProperty("--tilt-x", `${rotateX}deg`);
      target.style.setProperty("--tilt-y", `${rotateY}deg`);
      target.style.setProperty("--pointer-x", `${x * 100}%`);
      target.style.setProperty("--pointer-y", `${y * 100}%`);

      target.classList.add(
        "grind-3d-target",
        "is-3d-active"
      );
    };

    const handlePointerOut = (event) => {
      if (event.pointerType !== "mouse") return;

      const target = getTarget(event);

      if (!target) return;

      if (
        event.relatedTarget instanceof Node &&
        target.contains(event.relatedTarget)
      ) {
        return;
      }

      clearTarget(target);
    };

    const handlePointerDown = (event) => {
      if (event.pointerType !== "mouse") return;

      const target = getTarget(event);

      if (target) {
        clearTarget(target);
      }
    };

    document.addEventListener("pointermove", handlePointerMove);
    document.addEventListener("pointerout", handlePointerOut);
    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerout", handlePointerOut);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, []);

  /* =======================================================
     3. CART FUNCTIONS
  ======================================================= */

  const addToCart = (product) => {
    setCart((current) => {
      const key = product.cartKey || product.id;

      const found = current.find(
        (item) => (item.cartKey || item.id) === key
      );

      if (found) {
        return current.map((item) =>
          (item.cartKey || item.id) === key
            ? {
                ...item,
                quantity: item.quantity + (product.quantity || 1),
              }
            : item
        );
      }

      return [
        ...current,
        {
          ...product,
          quantity: product.quantity || 1,
        },
      ];
    });

    setCartNotice(`${product.name} added to cart`);
    setCartNoticeKey((current) => current + 1);
  };

  const updateQuantity = (key, quantity) => {
    setCart((current) =>
      current.map((item) =>
        (item.cartKey || item.id) === key
          ? { ...item, quantity }
          : item
      )
    );
  };

  const removeItem = (key) => {
    setCart((current) =>
      current.filter(
        (item) => (item.cartKey || item.id) !== key
      )
    );
  };

  const cartCount = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  /* =======================================================
     4. APP RENDER
  ======================================================= */

  return (
    <>
      <div id="top" />

      <Navbar cartCount={cartCount} />

      {cartNotice && (
        <div
          key={cartNoticeKey}
          className="cart-feedback"
          role="status"
          aria-live="polite"
        >
          <span className="cart-feedback-icon">
            <Check size={16} />
          </span>

          <span>
            <b>ADDED TO CART</b>
            <small>{cartNotice}</small>
          </span>

          <Link
            to="/cart"
            onClick={() => setCartNotice("")}
          >
            VIEW CART <ArrowUpRight size={13} />
          </Link>
        </div>
      )}

      <div key={location.pathname} className="route-shell">
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/grind-on" element={<OnPage />} />

          <Route
            path="/grind-daily"
            element={<ShopPage onAdd={addToCart} />}
          />

          <Route
            path="/grind-originals"
            element={
              <ShopPage
                original
                onAdd={addToCart}
              />
            }
          />

          <Route path="/grind-labs" element={<LabsPage />} />

          <Route
            path="/cart"
            element={
              <CartPage
                cart={cart}
                updateQuantity={updateQuantity}
                removeItem={removeItem}
              />
            }
          />

          <Route
            path="/checkout"
            element={
              <CheckoutPage
                cart={cart}
                onOrderComplete={() => setCart([])}
              />
            }
          />

          <Route path="/contact" element={<ContactPage />} />

          <Route path="*" element={<HomePage />} />
        </Routes>
      </div>

      <Footer />
      <StaffDemo />
    </>
  );
}

/* =========================================================
   APP ENTRY
========================================================= */

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}