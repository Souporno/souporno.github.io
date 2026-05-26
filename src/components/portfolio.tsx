import { useEffect, useRef, useState } from "react";
import {
  Mail,
  Github,
  Linkedin,
  MapPin,
  ArrowUpRight,
  ArrowRight,
  Award,
  Menu,
  X,
  ImagePlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type CaseStudySection = { heading: string; body: string };

type Category =
  | "People Analytics"
  | "Data Visualization"
  | "Product Strategy"
  | "Data Engineering";

type Project = {
  id: string;
  number: string;
  title: string;
  tagline: string;
  tags: string[];
  categories: Category[];
  status: string;
  featured?: boolean;
  award?: string;
  badge?: string;
  summary: string;
  sections: CaseStudySection[];
  tools: string;
  links?: { label: string; href: string }[];
  team?: string;
};

const projects: Project[] = [
  {
    number: "01",
    title: "Synthetic Data Generation using GANs",
    tagline: "Privacy-safe people analytics through generative models.",
    tags: ["People Analytics", "Machine Learning", "Python"],
    status: "Completed",
    summary:
      "Generated statistically faithful synthetic employee survey data for a Colombian construction company — preserving analytical value while protecting individual privacy.",
    sections: [
      {
        heading: "The Problem",
        body: "Organizations routinely collect sensitive employee survey data — but sharing or analyzing it externally carries real privacy risks. Traditional anonymization often destroys the statistical properties that make the data useful. How do you preserve analytical value while protecting individual employees?",
      },
      {
        heading: "What I Built",
        body: "Using Generative Adversarial Networks (CTGAN from the SDV library), I generated synthetic employee survey datasets for Arquitectura y Concreto as part of UW's People Analytics Lab. The synthetic data is statistically indistinguishable from the real data — but no real employee's information is in it.",
      },
      {
        heading: "My Approach",
        body: "I built a 4-test validation framework: distributional similarity, correlation preservation, feature importance parity, and a machine-learning utility test. I also replicated the original SEM and CFA analyses to confirm the synthetic data reproduces the same theoretical relationships.",
      },
      {
        heading: "Outcome",
        body: "A validated synthetic dataset and replication pipeline enabling privacy-safe people analytics research — with documented methodology adaptable to other organizational datasets.",
      },
    ],
    tools: "Python · CTGAN/SDV · R (lavaan) · Statistical validation",
    links: [
      {
        label: "View on GitHub",
        href: "https://github.com/Souporno/SyntheticData_OrganizationalScience",
      },
    ],
  },
  {
    number: "02",
    title: "Foodprints — Restaurant Market Intelligence",
    tagline: "Turning 30,000+ Uber Eats records into a market-entry decision tool.",
    tags: ["Data Visualization", "Tableau", "UX Research"],
    status: "Completed · DATA 511, UW",
    summary:
      "Interactive Tableau dashboard helping aspiring restaurateurs decide where to open, what cuisine to serve, and how to price competitively.",
    sections: [
      {
        heading: "The Problem",
        body: "Restaurant entrepreneurship has notoriously high failure rates — yet most market entry decisions are made on intuition, not data. Aspiring owners have no accessible, data-driven tool to understand where to open, what cuisine to serve, or how to price.",
      },
      {
        heading: "What I Built",
        body: "Foodprints transforms 30,000+ Uber Eats records into a decision-support tool. Users drill down from a national US map → state → city → cuisine type, and explore a correlation matrix showing which factors (menu complexity, pricing, rating, location) predict restaurant success.",
      },
      {
        heading: "My Role",
        body: "Project Manager & Visualization Lead. I coordinated a 4-person team across concept pitch, user research (3 personas, guerrilla usability testing), paper prototyping, and Tableau build. I led the data pipeline: cleaning 63,469 raw records down to 30,149 quality entries across 946 cities in 19 states, standardizing 200+ cuisine descriptors into 70 categories, and engineering a pre-computed correlation scaffold to enable heatmap visualization in Tableau.",
      },
      {
        heading: "Design Principles",
        body: "Bertin & Mackinlay's visual encoding, Tufte's data-ink ratio, and Ben Fry's 7-stage visualization process guided every decision — from colorblind-accessible palettes to plain-English hover tooltips.",
      },
      {
        heading: "Professor's Feedback",
        body: "\"Overall, well done. The correlation comparison on page three is a really interesting way to look at different restaurants and how the factors relate.\"",
      },
    ],
    tools: "Tableau Public · Python (pandas) · Excel · User research",
  },
  {
    number: "03",
    title: "Store Analysis — Retail Business Intelligence",
    tagline: "An end-to-end BI stack from raw transactions to executive dashboards.",
    tags: ["Data Warehousing", "SQL", "Snowflake", "Tableau"],
    status: "Completed · IMT 577, UW",
    summary:
      "Built a Snowflake warehouse, SQL ETL pipeline, and Tableau dashboard to move a retail chain from ad-hoc reporting to scalable analytics.",
    sections: [
      {
        heading: "The Problem",
        body: "A mid-sized retail chain needed to move from ad-hoc reporting to a scalable, analytics-ready data infrastructure — one that could answer business questions about store performance, customer behavior, and operational efficiency without requiring one-off SQL queries every time.",
      },
      {
        heading: "What I Built",
        body: "An end-to-end BI solution: a Snowflake cloud data warehouse with a star-schema dimensional model, a SQL-based ETL pipeline to load and transform raw transactional data, and a Tableau dashboard for executive-level store performance analysis.",
      },
      {
        heading: "Key Analyses",
        body: "Comparative performance between Stores 10 and 21 across revenue, customer transactions, and basket size · Revenue trend analysis by product category and time period · Customer segmentation and retention patterns.",
      },
      {
        heading: "Outcome",
        body: "A production-ready BI stack that turns raw retail data into actionable operational insights — built to scale as the data grows.",
      },
    ],
    tools: "Snowflake · SQL (ETL & dimensional modeling) · Tableau · Python",
    links: [{ label: "View on GitHub", href: "https://github.com/Souporno/store-analysis" }],
  },
  {
    number: "04",
    title: "OpenAlex Faculty Trend Analysis + LPA",
    tagline: "Does publication output actually predict academic promotion?",
    tags: ["People Analytics", "Python", "I/O Psychology", "Tableau"],
    status: "Ongoing",
    summary:
      "Analyzing 34 I/O Psychology faculty across 8 R1 universities — using OpenAlex publication data and Latent Profile Analysis to surface distinct career trajectories.",
    sections: [
      {
        heading: "The Research Question",
        body: "Does publication output actually predict academic promotion? I'm analyzing 34 I/O Psychology faculty members across 8 R1 universities to find out.",
      },
      {
        heading: "What I'm Building",
        body: "Using the OpenAlex API, I retrieve year-by-year publication counts for each faculty member from 2014 to 2026. A Python pipeline matches faculty names to OpenAlex author IDs (with a confidence-scoring system to flag uncertain matches), reshapes the data into a long-format Tableau-ready CSV, and flags promotion events with a Promoted_This_Year indicator. The resulting Tableau dashboard lets users explore publication trajectories by faculty member and institution — with promotion events overlaid as colored dots.",
      },
      {
        heading: "Latent Profile Analysis",
        body: "Using R, I'm applying LPA to identify distinct career trajectory profiles — clustering researchers by their publication patterns and promotion timelines, rather than treating all faculty as homogeneous.",
      },
      {
        heading: "The Bigger Picture",
        body: "This project explores one of the most understudied dynamics in academia: what does the path to full professor actually look like, quantitatively? The findings could inform graduate students, junior faculty, and departments about the real drivers of academic career progression.",
      },
    ],
    tools: "Python (OpenAlex API, pandas) · R (LPA/mclust) · Tableau Public · Excel",
    links: [
      { label: "View on GitHub", href: "https://github.com/Souporno/OpenAlex-Faculty-Trend" },
    ],
  },
  {
    number: "05",
    title: "OkiDoki — Healthcare Worker Well-being Platform",
    tagline: "Detecting burnout before it becomes attrition.",
    tags: ["People Analytics", "Product Design", "Case Competition"],
    status: "Deloitte iEngage People Analytics Case Competition, UW",
    featured: true,
    award: "3rd Place — Deloitte iEngage",
    summary:
      "An AI-powered continuous well-being platform for healthcare workers — combining mood check-ins, passive EHR/HRIS signals, and leadership heatmaps to detect burnout early.",
    sections: [
      {
        heading: "The Problem",
        body: "The U.S. healthcare industry employs over 22 million people — and is facing a quiet crisis. 76% of healthcare workers report mental health symptoms, 44% planned to leave their jobs in 2022, and the industry loses $4.6B annually to burnout-related turnover. Yet most organizations respond with periodic surveys and reactive policies that are too slow and too blunt.",
      },
      {
        heading: "Our Solution: OkiDoki",
        body: "A continuous AI-powered well-being platform built for healthcare workers — designed to detect burnout before it becomes attrition, and intervene with precision.",
      },
      {
        heading: "Key Features",
        body: "Clinical Shift Mood Check-In/Out (emoji-based, incentivized with wellness points) · Generative AI Wellness Assistant — HIPAA-compliant chatbot for emotional support and burnout-prevention nudges · Passive Data Integration with EHR, HRIS, and scheduling to detect skipped breaks, after-hours charting, and shift overload · Hospital Leadership Dashboard with real-time cohort heatmaps and A/B testing of interventions · Rapid Feedback Capture analyzed for emerging operational stress · SMART KPI Framework: 18 measurable metrics across 6 well-being dimensions.",
      },
      {
        heading: "Impact Projections",
        body: "30% reduction in burnout-related turnover · 12× ROI from improved retention and reduced sick leave · 20% boost in wellness program participation.",
      },
      {
        heading: "Recognition",
        body: "Deloitte judges personally highlighted our SMART KPI framework — Susan Cantrell (Deloitte) photographed our KPI slide to keep. Prof. Richard Sturman and Prof. Heather Whiteman also praised the solution's rigor and practicality.",
      },
    ],
    tools: "Strategic frameworks · Product design · GenAI concepts · HIPAA compliance design",
    team: "Souporno Ghosh, Ananya Sharma, Shanivi Kaul (Team 15: OkiDoki)",
  },
  {
    number: "06",
    title: "Workday — Global Growth Strategy",
    tagline: "From $8.45B to $13.22B by FY2027 — a three-OKR product strategy.",
    tags: ["Product Strategy", "SaaS", "People Analytics"],
    status: "IMT 589 B · Product Strategy and Leadership, UW",
    featured: true,
    award: "Best of Quarter",
    summary:
      "Full product strategy for Workday: APAC expansion, UX overhaul, and outcome-based AI pricing — backed by 40+ ranked initiatives and a $700M–$1.1B investment thesis.",
    sections: [
      {
        heading: "The Challenge",
        body: "Workday is a dominant B2B SaaS platform ($8.45B revenue, 60%+ of Fortune 500) — but its growth rate is declining. ~75% of revenue comes from North America, its AI capabilities lack a monetization model, and a complex UX is hurting adoption. The question: how does Workday grow from $8.45B to $13.22B by FY2027?",
      },
      {
        heading: "Our Strategic Response",
        body: "A full product strategy: current-state diagnosis, competitive landscape (Oracle, SAP, ADP, UKG), customer segmentation, value proposition canvas, and a 3-OKR roadmap with a $700M–$1.1B investment ask.",
      },
      {
        heading: "3 Strategic OKRs",
        body: "1. APAC Expansion — grow non-NA revenue from 25% to 40% by FY2027, targeting Japan, India, Australia, and Singapore with localized payroll compliance engines.  2. UX Overhaul — reduce user friction by 30%, maintain CSAT above 95% during AI rollouts, cut support interactions by 25% via AI self-service.  3. Outcome-Based Pricing — shift from fixed-entitlement subscriptions to value-aligned tiered pricing where customers pay for measurable business outcomes.",
      },
      {
        heading: "Prioritization Rigor",
        body: "40+ ideas ranked using MoSCoW + ICE scoring. Top initiatives evaluated with NPV, payback period, and build-vs-buy analysis. 3-phase roadmap with milestones from Q2 2025 to 2027+.",
      },
      {
        heading: "Recognition",
        body: "Named best project of the quarter by Prof. Nitin T Bhat.",
      },
    ],
    tools:
      "Strategic frameworks (MoSCoW, ICE, NPV) · Financial modeling · Competitive analysis · OKR design",
    team: "Ali Lo, Ishika Johari, Raghav Swaminathan, Sanyam Mehta, Soham Desai, Souporno Ghosh",
  },
];

const skills = [
  {
    title: "Analytics & Data Engineering",
    items: [
      "Python (pandas, scikit-learn, CTGAN/SDV)",
      "SQL",
      "Snowflake",
      "R (lavaan, mclust)",
      "ETL Pipeline Design",
      "Dimensional Data Modeling",
      "OpenAlex API",
    ],
  },
  {
    title: "Data Visualization",
    items: [
      "Tableau",
      "Tableau Public",
      "Data Storytelling",
      "Dashboard Design",
      "Geospatial Analysis",
      "Correlation Analysis",
    ],
  },
  {
    title: "People Analytics",
    items: [
      "Workforce Analytics",
      "Organizational Science",
      "Survey Design",
      "Synthetic Data Generation",
      "Latent Profile Analysis",
      "SEM/CFA",
      "Burnout Measurement",
      "HR KPI Frameworks",
    ],
  },
  {
    title: "Product & Strategy",
    items: [
      "OKR Design",
      "MoSCoW Prioritization",
      "ICE Scoring",
      "NPV/ROI Analysis",
      "Roadmapping",
      "User Research",
      "Guerrilla Usability Testing",
      "Value Proposition Design",
      "Competitive Analysis",
      "Build vs. Buy",
    ],
  },
];

const nav = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

function ProjectCard({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className="group text-left w-full border-t border-border py-8 md:py-10 transition-colors hover:bg-accent/30 -mx-4 px-4 md:-mx-6 md:px-6 rounded-sm"
          aria-label={`Open case study: ${project.title}`}
        >
          <div className="grid grid-cols-12 gap-4 md:gap-8 items-start">
            <div className="col-span-2 md:col-span-1 text-sm font-mono text-muted-foreground pt-1">
              {project.number}
            </div>
            <div className="col-span-10 md:col-span-7">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                {project.featured && (
                  <Badge className="bg-primary/10 text-primary hover:bg-primary/15 border-0">
                    Featured
                  </Badge>
                )}
                {project.award && (
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-primary">
                    <Award className="h-3.5 w-3.5" />
                    {project.award}
                  </span>
                )}
              </div>
              <h3 className="text-2xl md:text-3xl font-serif font-medium tracking-tight text-foreground group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <p className="mt-2 text-muted-foreground leading-relaxed max-w-2xl">
                {project.tagline}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((t) => (
                  <span
                    key={t}
                    className="text-xs uppercase tracking-wider text-muted-foreground"
                  >
                    {t}
                  </span>
                )).reduce<React.ReactNode[]>((acc, el, i) => {
                  if (i > 0) acc.push(<span key={`d${i}`} className="text-muted-foreground/40 text-xs">·</span>);
                  acc.push(el);
                  return acc;
                }, [])}
              </div>
            </div>
            <div className="hidden md:flex col-span-4 justify-end items-start pt-2">
              <span className="inline-flex items-center gap-2 text-sm text-foreground/70 group-hover:text-primary transition-colors">
                Read case study
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </div>
          </div>
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            {project.award && (
              <span className="inline-flex items-center gap-1 text-xs font-medium text-primary">
                <Award className="h-3.5 w-3.5" />
                {project.award}
              </span>
            )}
            <span className="text-xs text-muted-foreground">{project.status}</span>
          </div>
          <DialogTitle className="font-serif text-2xl md:text-3xl font-medium leading-tight">
            {project.title}
          </DialogTitle>
          <p className="text-muted-foreground pt-1">{project.tagline}</p>
        </DialogHeader>
        <div className="space-y-6 mt-2">
          {project.sections.map((s) => (
            <section key={s.heading}>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">
                {s.heading}
              </h4>
              <p className="text-sm md:text-base leading-relaxed text-foreground/85 whitespace-pre-line">
                {s.body}
              </p>
            </section>
          ))}
          <div className="border-t border-border pt-4 space-y-2 text-sm">
            <div>
              <span className="text-muted-foreground">Tools · </span>
              <span className="text-foreground/85">{project.tools}</span>
            </div>
            {project.team && (
              <div>
                <span className="text-muted-foreground">Team · </span>
                <span className="text-foreground/85">{project.team}</span>
              </div>
            )}
            {project.links && (
              <div className="flex flex-wrap gap-3 pt-2">
                {project.links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                  >
                    {l.label}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function Portfolio() {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      {/* Nav */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-background/80 border-b border-border/60">
        <div className="mx-auto max-w-6xl px-6 md:px-10 h-16 flex items-center justify-between">
          <a href="#top" className="font-serif text-lg font-medium tracking-tight">
            Souporno Ghosh
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="text-foreground/70 hover:text-primary transition-colors"
              >
                {n.label}
              </a>
            ))}
          </nav>
          <a
            href="#contact"
            className="hidden md:inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            Get in touch <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="mx-auto max-w-6xl px-6 md:px-10 pt-20 md:pt-32 pb-16 md:pb-24">
        <p className="text-sm font-mono uppercase tracking-widest text-primary mb-6">
          People Analytics · Data Strategy · Product Thinking
        </p>
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium leading-[1.05] tracking-tight">
          Analytics for people.
          <br />
          <span className="text-primary italic">Strategy</span> for growth.
        </h1>
        <p className="mt-8 max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed">
          I'm Souporno — turning workforce data into decisions that matter. MSIM candidate at the
          University of Washington, graduating June 2026 and open to full-time roles in People
          Analytics, Data & Business Analytics, and Product / Program Management.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Button asChild size="lg" className="rounded-full px-6">
            <a href="#work">
              View my work
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="rounded-full px-6 border-foreground/20"
          >
            <a href="#contact">Let's connect</a>
          </Button>
        </div>
      </section>

      {/* About */}
      <section
        id="about"
        className="mx-auto max-w-6xl px-6 md:px-10 py-20 md:py-28 border-t border-border"
      >
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-3">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-primary">
              About
            </h2>
          </div>
          <div className="col-span-12 md:col-span-9 space-y-6 text-lg leading-relaxed text-foreground/85">
            <p>
              My work sits at the intersection of <em>people, data, and strategy</em>. I'm drawn to
              problems where understanding human behavior and organizational dynamics can be
              unlocked through rigorous analysis — whether that's predicting faculty career
              trajectories from publication data, designing a real-time burnout detection platform
              for healthcare workers, or reimagining how an $8B enterprise SaaS company should
              price its AI offerings for a global market.
            </p>
            <p>
              I come from a background that blends technical depth (Python, SQL, Tableau, synthetic
              data generation) with product and strategic thinking (OKRs, roadmapping, MoSCoW/ICE
              prioritization). I'm equally comfortable writing a data pipeline and presenting a
              business case to executives.
            </p>
            <p>
              When I'm not building dashboards or wrangling datasets, I'm thinking about the future
              of work — and how organizations can take better care of the people inside them.
            </p>
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
                  Looking for
                </p>
                <ul className="space-y-1 text-foreground/80">
                  <li>People / Workforce Analytics</li>
                  <li>Data & Business Analytics</li>
                  <li>Operations Analytics</li>
                  <li>Product / Program Management</li>
                </ul>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
                  Currently
                </p>
                <ul className="space-y-1 text-foreground/80">
                  <li className="inline-flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5" /> Seattle, WA
                  </li>
                  <li>MSIM @ UW iSchool</li>
                  <li>Graduating June 2026</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Work */}
      <section
        id="work"
        className="mx-auto max-w-6xl px-6 md:px-10 py-20 md:py-28 border-t border-border"
      >
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">
              Selected work
            </h2>
            <p className="font-serif text-3xl md:text-4xl font-medium tracking-tight max-w-xl">
              Six case studies on people, data, and strategy.
            </p>
          </div>
          <span className="hidden md:inline text-sm text-muted-foreground">
            {projects.length} projects
          </span>
        </div>
        <div>
          {projects.map((p) => (
            <ProjectCard key={p.number} project={p} />
          ))}
          <div className="border-t border-border" />
        </div>
      </section>

      {/* Skills */}
      <section
        id="skills"
        className="mx-auto max-w-6xl px-6 md:px-10 py-20 md:py-28 border-t border-border"
      >
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-3">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">
              Toolkit
            </h2>
            <p className="font-serif text-2xl md:text-3xl font-medium tracking-tight">
              How I work.
            </p>
          </div>
          <div className="col-span-12 md:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-10">
            {skills.map((s) => (
              <div key={s.title}>
                <h3 className="font-serif text-lg font-medium mb-3">{s.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {s.items.map((i) => (
                    <span
                      key={i}
                      className="text-xs px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground border border-border"
                    >
                      {i}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="mx-auto max-w-6xl px-6 md:px-10 py-24 md:py-32 border-t border-border"
      >
        <div className="max-w-3xl">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-primary mb-6">
            Contact
          </h2>
          <p className="font-serif text-4xl md:text-6xl font-medium tracking-tight leading-[1.05]">
            Let's build something <span className="italic text-primary">meaningful</span> together.
          </p>
          <p className="mt-8 text-lg text-muted-foreground leading-relaxed">
            I'm actively looking for full-time opportunities starting June 2026 in People
            Analytics, Workforce Analytics, Data & Business Analytics, Operations Analytics, or
            Product / Program Management. If you're working on problems at the intersection of
            people and data — I'd love to talk.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button asChild size="lg" className="rounded-full px-6">
              <a href="mailto:souporno@uw.edu">
                <Mail className="h-4 w-4" /> souporno@uw.edu
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full px-6 border-foreground/20"
            >
              <a href="https://github.com/Souporno" target="_blank" rel="noreferrer">
                <Github className="h-4 w-4" /> GitHub
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full px-6 border-foreground/20"
            >
              <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">
                <Linkedin className="h-4 w-4" /> LinkedIn
              </a>
            </Button>
          </div>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto max-w-6xl px-6 md:px-10 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© 2026 Souporno Ghosh · Seattle, WA</p>
          <div className="flex items-center gap-5">
            <a
              href="mailto:souporno@uw.edu"
              className="hover:text-primary transition-colors"
              aria-label="Email"
            >
              <Mail className="h-4 w-4" />
            </a>
            <a
              href="https://github.com/Souporno"
              target="_blank"
              rel="noreferrer"
              className="hover:text-primary transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}