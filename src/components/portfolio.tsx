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
  FileText,
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
    id: "synthetic-gan",
    number: "01",
    title: "Synthetic Data Generation using GANs",
    tagline: "Privacy-safe people analytics through generative models.",
    tags: ["People Analytics", "Machine Learning", "Python"],
    categories: ["People Analytics", "Data Engineering"],
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
    id: "foodprints",
    number: "02",
    title: "Foodprints — Restaurant Market Intelligence",
    tagline: "Turning 30,000+ Uber Eats records into a market-entry decision tool.",
    tags: ["Data Visualization", "Tableau", "UX Research"],
    categories: ["Data Visualization"],
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
    id: "store-analysis",
    number: "03",
    title: "Store Analysis — Retail Business Intelligence",
    tagline: "An end-to-end BI stack from raw transactions to executive dashboards.",
    tags: ["Data Warehousing", "SQL", "Snowflake", "Tableau"],
    categories: ["Data Engineering", "Data Visualization"],
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
    id: "openalex",
    number: "04",
    title: "OpenAlex Faculty Trend Analysis + LPA",
    tagline: "Does publication output actually predict academic promotion?",
    tags: ["People Analytics", "Python", "I/O Psychology", "Tableau"],
    categories: ["People Analytics"],
    status: "Ongoing",
    badge: "In Progress",
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
    id: "okidoki",
    number: "05",
    title: "OkiDoki — Healthcare Worker Well-being Platform",
    tagline: "Detecting burnout before it becomes attrition.",
    tags: ["People Analytics", "Product Design", "Case Competition"],
    categories: ["People Analytics", "Product Strategy"],
    status: "Deloitte iEngage People Analytics Case Competition, UW",
    featured: true,
    award: "3rd Place — Deloitte iEngage",
    badge: "🥉 Deloitte iEngage — 3rd Place",
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
    id: "workday",
    number: "06",
    title: "Workday — Global Growth Strategy",
    tagline: "From $8.45B to $13.22B by FY2027 — a three-OKR product strategy.",
    tags: ["Product Strategy", "SaaS", "People Analytics"],
    categories: ["Product Strategy"],
    status: "IMT 589 B · Product Strategy and Leadership, UW",
    featured: true,
    award: "Best of Quarter",
    badge: "🏆 Best of Quarter — IMT 589 B",
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

type TabKey = "home" | "work" | "path" | "hobbies" | "contact";

const tabs: { key: TabKey; label: string }[] = [
  { key: "home", label: "Home" },
  { key: "work", label: "Work" },
  { key: "path", label: "Path" },
  { key: "hobbies", label: "Hobbies" },
  { key: "contact", label: "Contact" },
];

const categories: ("All" | Category)[] = [
  "All",
  "People Analytics",
  "Data Visualization",
  "Product Strategy",
  "Data Engineering",
];

const timeline = [
  {
    period: "2016 – 2020",
    title: "B.Tech — Electronics & Communication Engineering",
    org: "SRM Institute of Science and Technology",
    location: "Chennai, India",
    notes:
      "Built a foundation in engineering systems, electronics, and computational thinking. Graduated June 2020 with GPA 3.2.",
  },
  {
    period: "Jan 2021 – Oct 2022",
    title: "Systems Engineer — Full-Stack Development",
    org: "Infosys Limited | Client: Apple",
    location: "Bangalore, India",
    notes:
      "Built analytics-enabled admin tools in Java and SQL used across 500+ Apple Retail locations globally. Developed REST APIs and Grafana dashboards to improve data flow and system visibility.",
  },
  {
    period: "2022",
    title: "Infosys Rise Insta Award",
    org: "Infosys Limited",
    location: "Bangalore, India",
    notes:
      "Recognized with three consecutive quarterly Rise Insta Awards for outstanding performance and impact.",
  },
  {
    period: "Nov 2022 – Oct 2023",
    title: "Senior Systems Engineer — Site Reliability & Product Development",
    org: "Infosys Limited | Client: Apple",
    location: "Bangalore, India",
    notes:
      "Led analytics for Apple's Concierge App — owned KPI dashboards in Splunk, built Python/Go data pipelines, improved failure detection speed by 85%. Supported Apple's first retail store launch in India.",
  },
  {
    period: "Nov 2023 – Jul 2024",
    title: "Associate Consultant — Product & Data Strategy",
    org: "Infosys Limited | Client: Arizona Public Services",
    location: "Bangalore, India",
    notes:
      "Analyzed multi-system billing and customer datasets in Oracle SQL, improving data accuracy by 35%. Delivered decision-ready analytics for Finance, Operations, and Engineering stakeholders.",
  },
  {
    period: "Sep 2024 – Jun 2026",
    title: "M.S. in Information Management (GPA: 4.0)",
    org: "University of Washington iSchool",
    location: "Seattle, WA",
    notes:
      "Specializations in Program/Product Management Consulting and Data Science. Coursework spanning People Analytics, Data Warehousing, Product Strategy, Data Visualization, and UX Research.",
  },
  {
    period: "Jan 2025 – Present",
    title: "Salesforce Capstone — Product Strategy & AI Workflow Design",
    org: "University of Washington | Sponsored by Salesforce Workforce Intelligence Team",
    location: "Seattle, WA",
    notes:
      "Led redesign of Salesforce's manager nudging system for people analytics. Designed event-based AI workflow architecture, Slack-based delivery concepts, and a measurement framework tracking engagement and downstream impact.",
  },
  {
    period: "Jul 2025 – Present",
    title: "Graduate Student Program Coordinator",
    org: "CIRCLE — Center for International Relations & Cultural Leadership Exchange, UW Student Life",
    location: "Seattle, WA",
    notes:
      "Designed and coordinated programs connecting 15,000+ international and domestic students with institutional resources. Improved program engagement by 35% through user research and feedback loops.",
  },
  {
    period: "Sep 2025 – Present",
    title: "Graduate Researcher — People Analytics Lab",
    org: "University of Washington",
    location: "Seattle, WA",
    notes:
      "Integrated HRIS, engagement, and performance datasets to build longitudinal workforce cohorts (1,600+ employees). Developed a Performance Archetypes Framework using Python classification and synthetic data generation for workforce segmentation.",
  },
  {
    period: "Winter 2025",
    title: "3rd Place — Deloitte iEngage People Analytics Case Competition",
    org: "Deloitte × University of Washington",
    location: "Seattle, WA",
    notes:
      "Designed OkiDoki — an AI-powered burnout detection platform for healthcare workers. SMART KPI framework (6 well-being dimensions) recognized and photographed by Deloitte judges.",
  },
  {
    period: "Spring 2025",
    title: "Best of Quarter — Product Strategy and Leadership",
    org: "University of Washington (IMT 589 B)",
    location: "Seattle, WA",
    notes:
      "Led strategic analysis for Workday's path from $8.45B to $13.22B — APAC expansion, UX overhaul, and outcome-based AI pricing. Named best project of the quarter by Prof. Nitin T Bhat.",
  },
  {
    period: "Jan 2026 – Present",
    title: "Graduate Teaching Assistant",
    org: "University of Washington | IMT 550 – Policy and Ethics in Information Management",
    location: "Seattle, WA",
    notes:
      "Evaluated analytical and written coursework and supported ethical reasoning in data-driven decision making for graduate students.",
  },
];

function useProjectImage(id: string): [string | null, (file: File) => void, () => void] {
  const key = `portfolio-img:${id}`;
  const [img, setImg] = useState<string | null>(null);
  useEffect(() => {
    try {
      const v = localStorage.getItem(key);
      if (v) setImg(v);
    } catch {}
  }, [key]);
  const setFromFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const url = reader.result as string;
      setImg(url);
      try {
        localStorage.setItem(key, url);
      } catch {}
    };
    reader.readAsDataURL(file);
  };
  const clear = () => {
    setImg(null);
    try {
      localStorage.removeItem(key);
    } catch {}
  };
  return [img, setFromFile, clear];
}

function ProjectCard({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);
  const [img, setImg, clearImg] = useProjectImage(project.id);
  const fileRef = useRef<HTMLInputElement>(null);
  const inProgress = project.badge === "In Progress";
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <article className="group flex flex-col rounded-xl border border-border bg-card overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-primary/40">
        <div className="relative aspect-[16/9] bg-secondary/60 overflow-hidden">
          {inProgress && (
            <span className="absolute top-2 left-2 z-10 inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#D4A017]/15 text-[#8a6508] border border-[#D4A017]/40 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#D4A017]" />
              In Progress
            </span>
          )}
          {img ? (
            <img src={img} alt={project.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground/60">
              <ImagePlus className="h-8 w-8 mb-1" />
              <span className="text-xs uppercase tracking-widest">Click to upload</span>
            </div>
          )}
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="absolute inset-0 flex items-center justify-center bg-foreground/0 hover:bg-foreground/30 transition-colors text-background opacity-0 hover:opacity-100"
            aria-label="Upload project image"
          >
            <span className="inline-flex items-center gap-2 text-sm font-medium bg-background/90 text-foreground px-3 py-1.5 rounded-full">
              <ImagePlus className="h-4 w-4" /> {img ? "Replace image" : "Upload image"}
            </span>
          </button>
          {img && (
            <button
              type="button"
              onClick={clearImg}
              className="absolute top-2 right-2 bg-background/90 text-foreground rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Remove image"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) setImg(f);
              e.target.value = "";
            }}
          />
        </div>
        <div className="flex flex-col flex-1 p-6">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            {project.categories.map((c) => (
              <span
                key={c}
                className="text-[10px] font-semibold uppercase tracking-widest text-primary bg-primary/10 px-2 py-1 rounded-full"
              >
                {c}
              </span>
            ))}
            {project.badge && (
              <span className="inline-flex items-center gap-1 text-[10px] font-medium text-foreground/70 bg-secondary px-2 py-1 rounded-full">
                {project.badge}
              </span>
            )}
          </div>
          <h3 className="font-serif text-xl md:text-2xl font-medium tracking-tight text-foreground group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-2">
            {project.summary}
          </p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.tools.split("·").map((t) => (
              <span
                key={t}
                className="text-[11px] px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground border border-border"
              >
                {t.trim()}
              </span>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
            <DialogTrigger asChild>
              <button className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
                View case study
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </DialogTrigger>
            {project.featured && (
              <Badge className="bg-primary/10 text-primary hover:bg-primary/15 border-0">
                Featured
              </Badge>
            )}
          </div>
        </div>
      </article>
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

function HomeTab({ go }: { go: (t: TabKey) => void }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="mx-auto max-w-6xl px-6 md:px-10 pt-16 md:pt-24 pb-16 md:pb-20 animate-fade-in">
      <p className="text-sm font-mono uppercase tracking-widest text-primary mb-6">
        People Analytics · Data Strategy · Product Thinking
      </p>
      <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium leading-[1.05] tracking-tight">
        Souporno Ghosh
      </h1>
      <p className="mt-6 font-serif text-2xl md:text-3xl text-foreground/90 italic">
        Turning workforce data into decisions that matter.
      </p>
      <p className="mt-6 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed">
        MSIM candidate at the University of Washington · Open to full-time opportunities in
        People Analytics, Data &amp; Business Analytics, and Product / Program Management ·
        Graduating June 2026.
      </p>
      <div className="mt-8 flex flex-wrap items-center gap-4">
        <Button size="lg" className="rounded-full px-6" onClick={() => go("work")}>
          View my work <ArrowRight className="h-4 w-4" />
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="rounded-full px-6 border-foreground/20"
          onClick={() => go("contact")}
        >
          Let's connect
        </Button>
      </div>

      <section className="mt-20 md:mt-24 grid grid-cols-12 gap-8 border-t border-border pt-16">
        <div className="col-span-12 md:col-span-3">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-primary">About</h2>
        </div>
        <div className="col-span-12 md:col-span-9 space-y-5 text-lg leading-relaxed text-foreground/85">
          <p>
            My work sits at the intersection of <em>people, data, and strategy</em>. I'm drawn to
            problems where understanding human behavior and organizational dynamics can be
            unlocked through rigorous analysis.
          </p>
          {expanded ? (
            <>
              <p>
                I come from a background that blends technical depth (Python, SQL, Tableau,
                synthetic data generation) with product and strategic thinking (OKRs, roadmapping,
                MoSCoW/ICE prioritization). I'm equally comfortable writing a data pipeline and
                presenting a business case to executives.
              </p>
              <p>
                When I'm not building dashboards or wrangling datasets, I'm thinking about the
                future of work — and how organizations can take better care of the people inside
                them.
              </p>
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
                    Looking for
                  </p>
                  <ul className="space-y-1 text-foreground/80">
                    <li>People / Workforce Analytics</li>
                    <li>Data &amp; Business Analytics</li>
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
            </>
          ) : null}
          <button
            onClick={() => setExpanded((v) => !v)}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            {expanded ? "Show less" : "Read more"}
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </section>
    </div>
  );
}

function WorkTab() {
  const [filter, setFilter] = useState<(typeof categories)[number]>("All");
  const filtered =
    filter === "All" ? projects : projects.filter((p) => p.categories.includes(filter));
  return (
    <div className="mx-auto max-w-6xl px-6 md:px-10 pt-16 md:pt-20 pb-20 animate-fade-in">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">
        Selected work
      </h2>
      <p className="font-serif text-3xl md:text-4xl font-medium tracking-tight max-w-xl">
        Six case studies on people, data, and strategy.
      </p>

      <div className="mt-10 flex flex-wrap gap-2">
        {categories.map((c) => {
          const active = filter === c;
          return (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={
                "px-4 py-1.5 rounded-full text-sm font-medium border transition-colors " +
                (active
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background text-foreground/70 border-border hover:border-primary/50 hover:text-primary")
              }
            >
              {c}
            </button>
          );
        })}
      </div>

      <div
        key={filter}
        className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 animate-fade-in"
      >
        {filtered.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </div>
  );
}

function PathTab() {
  return (
    <div className="mx-auto max-w-6xl px-6 md:px-10 pt-16 md:pt-20 pb-20 animate-fade-in">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">
        My Journey
      </h2>
      <p className="font-serif text-3xl md:text-4xl font-medium tracking-tight">
        From Kolkata to Seattle — a path through code, product, and people.
      </p>

      <div className="mt-12 relative">
        <div className="absolute left-3 md:left-[140px] top-2 bottom-2 w-px bg-border" />
        <ol className="space-y-10">
          {timeline.map((t) => (
            <li key={t.period + t.title} className="relative grid grid-cols-[1fr] md:grid-cols-[140px_1fr] gap-4 md:gap-10">
              <div className="hidden md:block text-sm font-mono uppercase tracking-widest text-muted-foreground pt-1">
                {t.period}
              </div>
              <div className="relative pl-10 md:pl-8">
                <span className="absolute left-1.5 md:-left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-primary ring-4 ring-background" />
                <p className="md:hidden text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2">
                  {t.period}
                </p>
                <div className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/40">
                  <h3 className="font-serif text-lg md:text-xl font-medium">{t.title}</h3>
                  <p className="text-sm text-primary mt-1">{t.org}</p>
                  <p className="text-xs text-muted-foreground inline-flex items-center gap-1 mt-0.5">
                    <MapPin className="h-3 w-3" /> {t.location}
                  </p>
                  <p className="mt-3 text-sm text-foreground/85 leading-relaxed">{t.notes}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <section className="mt-20 border-t border-border pt-16">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">
          Toolkit
        </h2>
        <p className="font-serif text-2xl md:text-3xl font-medium tracking-tight mb-10">
          How I work.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
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
      </section>
    </div>
  );
}

function ContactTab() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill out all fields.");
      return;
    }
    setSending(true);
    const subject = encodeURIComponent(`Portfolio inquiry from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:souporno@uw.edu?subject=${subject}&body=${body}`;
    setTimeout(() => {
      setSending(false);
      toast.success("Opening your email client…");
    }, 400);
  };
  return (
    <div className="mx-auto max-w-6xl px-6 md:px-10 pt-16 md:pt-20 pb-24 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-primary mb-6">
            Contact
          </h2>
          <p className="font-serif text-4xl md:text-5xl font-medium tracking-tight leading-[1.05]">
            Let's build something <span className="italic text-primary">meaningful</span> together.
          </p>
          <p className="mt-6 text-base md:text-lg text-muted-foreground leading-relaxed">
            I'm actively looking for full-time opportunities starting June 2026 in People
            Analytics, Workforce Analytics, Data &amp; Business Analytics, Operations Analytics, or
            Product / Program Management.
          </p>
          <div className="mt-8 space-y-3">
            <a
              href="mailto:souporno@uw.edu"
              className="flex items-center gap-3 text-foreground/85 hover:text-primary transition-colors"
            >
              <Mail className="h-4 w-4" /> souporno@uw.edu
            </a>
            <a
              href="https://github.com/Souporno"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 text-foreground/85 hover:text-primary transition-colors"
            >
              <Github className="h-4 w-4" /> github.com/Souporno
            </a>
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 text-foreground/85 hover:text-primary transition-colors"
            >
              <Linkedin className="h-4 w-4" /> LinkedIn
            </a>
          </div>
        </div>
        <form
          onSubmit={onSubmit}
          className="rounded-2xl border border-border bg-card p-6 md:p-8 space-y-5"
        >
          <div>
            <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Name
            </label>
            <Input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Your name"
              className="mt-2"
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Email
            </label>
            <Input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="you@company.com"
              className="mt-2"
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Message
            </label>
            <Textarea
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Tell me about the role or project…"
              className="mt-2"
            />
          </div>
          <Button type="submit" size="lg" className="rounded-full px-6 w-full" disabled={sending}>
            <Mail className="h-4 w-4" /> {sending ? "Sending…" : "Send message"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export function Portfolio() {
  const [tab, setTab] = useState<TabKey>("home");
  const [menuOpen, setMenuOpen] = useState(false);

  const go = (t: TabKey) => {
    setTab(t);
    setMenuOpen(false);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground antialiased">
      <header className="sticky top-0 z-40 backdrop-blur-md bg-background/80 border-b border-border/60">
        <div className="mx-auto max-w-6xl px-6 md:px-10 h-16 flex items-center justify-between">
          <button
            onClick={() => go("home")}
            className="font-serif text-lg font-medium tracking-tight"
          >
            Souporno Ghosh
          </button>
          <nav className="hidden md:flex items-center gap-1">
            {tabs.map((t) => {
              const active = tab === t.key;
              return (
                <button
                  key={t.key}
                  onClick={() => go(t.key)}
                  className={
                    "relative px-4 py-2 text-sm font-medium transition-colors " +
                    (active ? "text-primary" : "text-foreground/70 hover:text-primary")
                  }
                >
                  {t.label}
                  {active && (
                    <span className="absolute left-3 right-3 -bottom-0.5 h-0.5 bg-primary rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>
          <button
            className="md:hidden p-2 -mr-2"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden border-t border-border/60 bg-background/95 backdrop-blur">
            <nav className="mx-auto max-w-6xl px-6 py-3 flex flex-col">
              {tabs.map((t) => (
                <button
                  key={t.key}
                  onClick={() => go(t.key)}
                  className={
                    "py-3 text-left text-base font-medium border-b border-border/40 last:border-0 " +
                    (tab === t.key ? "text-primary" : "text-foreground/80")
                  }
                >
                  {t.label}
                </button>
              ))}
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">
        {tab === "home" && <HomeTab go={go} />}
        {tab === "work" && <WorkTab />}
        {tab === "path" && <PathTab />}
        {tab === "contact" && <ContactTab />}
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto max-w-6xl px-6 md:px-10 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© 2026 Souporno Ghosh</p>
          <div className="flex items-center gap-5">
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