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
  Star,
} from "lucide-react";
import { Paperclip, Download, Trash2 } from "lucide-react";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
    title: "OpenAlex Faculty Trend Analysis (LPA + LGCA)",
    tagline: "Does publication output actually predict academic promotion?",
    tags: ["People Analytics", "Python", "I/O Psychology", "Tableau"],
    categories: ["People Analytics"],
    status: "Ongoing",
    badge: "In Progress",
    summary:
      "Analyzing 34 I/O Psychology faculty across 8 R1 universities — using OpenAlex publication data, Latent Profile Analysis, and Latent Growth Curve Analysis to surface distinct career trajectories.",
    sections: [
      {
        heading: "Overview",
        body: "This ongoing research project investigates a question that sits at the heart of academic career development: does publication output actually predict who gets promoted in academia? Using public scholarly data from the OpenAlex API, I'm building a quantitative picture of faculty career trajectories across top I/O Psychology programs — and applying Latent Profile Analysis (LPA) to uncover distinct patterns in how researchers progress.",
      },
      {
        heading: "The Research Question",
        body: "Academia operates on a \"publish or perish\" norm — but how strongly does publication output actually correlate with promotion events in practice? This project examines whether there are measurable differences in publication patterns before and after promotion milestones, and whether faculty cluster into distinct \"career trajectory types\" based on their output over time.",
      },
      {
        heading: "Scope",
        body: "• 34 I/O Psychology faculty members across 8 R1 (Research 1) universities\n• Publication data from 2014 to 2026 (year-by-year counts)\n• Promotion events manually identified and flagged per faculty member",
      },
      {
        heading: "What I Built — Data Pipeline (Python + OpenAlex API)",
        body: "A Python pipeline retrieves year-by-year publication counts for each faculty member from the OpenAlex API. The pipeline includes:\n• A fuzzy name-matching and confidence scoring system to correctly map faculty names to their OpenAlex author IDs (handling ambiguous matches, name variants, and faculty who have published under different affiliations)\n• Automatic reshaping of raw API results into a long-format, Tableau-ready CSV\n• A Promoted_This_Year binary indicator column, allowing promotion events to be overlaid visually on trend lines",
      },
      {
        heading: "Tableau Dashboard",
        body: "An interactive visualization layer that lets users explore:\n• Individual faculty publication trajectories (line chart per person)\n• Colored dots on the timeline indicating promotion events\n• Institution-level comparisons and filters\n• Pre/post-promotion publication trend comparisons",
      },
      {
        heading: "Latent Profile Analysis (LPA) + Latent Growth Curve Analysis (LGCA)",
        body: "Using R, I apply Latent Profile Analysis to identify distinct career trajectory profiles among faculty — clustering researchers by publication patterns and promotion timelines rather than treating all faculty as one homogeneous group. I've since extended this work with Latent Growth Curve Analysis (LGCA), which models individual trajectories of publication output over time as continuous growth curves — capturing not just which 'type' of researcher someone is, but the shape, rate, and trajectory of their academic productivity across their career. Together, LPA and LGCA provide both a categorical and a continuous lens on faculty career development.",
      },
      {
        heading: "Why This Matters",
        body: "This project explores one of the most understudied dynamics in academia: what does the path to full professor actually look like, quantitatively? The findings could provide:\n• Graduate students and junior faculty with a clearer, data-grounded picture of what academic progression looks like\n• Departments and institutions with benchmarks for evaluating faculty development\n• HR and talent strategy teams in higher education with a replicable methodology for workforce trajectory analysis",
      },
      {
        heading: "Current Status",
        body: "Active and ongoing. The data pipeline is complete and validated. The Tableau dashboard is in development. LPA modeling is in progress.",
      },
    ],
    tools: "Python (OpenAlex API, pandas) · R (LPA/mclust, LGCA) · Tableau Public · Excel",
    links: [
      {
        label: "View on GitHub",
        href: "https://github.com/Souporno/OpenAlex-Faculty-Trend/tree/main/Latent%20Growth%20Curve%20Analysis",
      },
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
        heading: "Overview",
        body: "OkiDoki is an AI-powered, continuous well-being platform designed for the U.S. healthcare workforce — built to detect burnout before it becomes attrition, and intervene with precision and empathy. Designed as a case competition entry for the Deloitte iEngage People Analytics Competition, OkiDoki earned 3rd place and was recognized by Deloitte judges for its analytical rigor and SMART KPI framework.",
      },
      {
        heading: "The Problem",
        body: "The U.S. healthcare industry employs over 22 million people — and is facing a quiet, growing crisis:\n• 76% of healthcare workers report symptoms of burnout, anxiety, or depression\n• 44% planned to leave their jobs in 2022\n• The industry loses an estimated $4.6 billion annually to burnout-related turnover\n• Most organizations respond with annual surveys and reactive policies — far too slow and too broad to address individual burnout before it turns into resignation\n\nThe existing approach to healthcare worker well-being is fundamentally broken: it measures too late, acts too slowly, and treats a highly heterogeneous workforce as one uniform group.",
      },
      {
        heading: "Our Solution: OkiDoki",
        body: "A continuous, AI-powered well-being platform built for healthcare workers — integrating real-time behavioral signals, passive data from clinical systems, and a generative AI wellness assistant into a single platform that gives both workers and hospital leaders the tools to act.",
      },
      {
        heading: "Key Feature 1 — Clinical Shift Mood Check-In / Check-Out",
        body: "Emoji-based mood tracking at the start and end of every shift, taking under 30 seconds. Workers earn wellness points for participation, redeemable for benefits. Check-in data feeds directly into individual and cohort-level risk models.",
      },
      {
        heading: "Key Feature 2 — Generative AI Wellness Assistant",
        body: "A HIPAA-compliant conversational chatbot providing:\n• Emotional support and active listening through structured prompts\n• Personalized resource recommendations (EAP referrals, mental health apps, peer support)\n• Burnout-prevention nudges based on shift patterns and mood trends\n• Anonymous escalation pathways for workers in acute distress",
      },
      {
        heading: "Key Feature 3 — Passive Data Integration",
        body: "OkiDoki syncs with three core enterprise systems — EHR (Electronic Health Records), HRIS, and scheduling platforms — to detect early warning signals without requiring workers to self-report:\n• Skipped break patterns\n• After-hours charting frequency\n• Consecutive shift overloads\n• Sudden schedule change requests",
      },
      {
        heading: "Key Feature 4 — Hospital Leadership Dashboard",
        body: "A real-time people analytics interface for unit managers and HR leaders:\n• Cohort-level burnout risk heatmaps by unit, shift type, and role\n• Trend lines showing well-being score changes over time\n• A/B testing module for comparing the effectiveness of different wellness interventions\n• Anonymized micro-feedback analysis identifying emerging operational stressors (\"No staff relief in ED today\")",
      },
      {
        heading: "Key Feature 5 — SMART KPI Framework (18 Metrics Across 6 Dimensions)",
        body: "The centerpiece of our solution — a rigorous measurement system covering:\n• Physical Well-being: shift overload rate, break compliance rate, sick leave frequency\n• Mental & Emotional Well-being: burnout risk index, mood score trend, EAP utilization rate\n• Social Well-being: peer connection index, team cohesion score\n• Financial Well-being: overtime hour ratio, compensation equity index\n• Purpose & Meaning: role clarity score, mission alignment index\n• Growth & Development: training participation rate, promotion pathway clarity\n\nEach KPI is tied to a data source, a measurement frequency, and a clear threshold for action.",
      },
      {
        heading: "Projected Impact",
        body: "• 30% reduction in burnout-related turnover within 12 months of full deployment\n• 12× ROI from improved retention, reduced sick leave, and lower agency staffing costs\n• 20% boost in wellness program participation through gamified incentives",
      },
      {
        heading: "Recognition",
        body: "At the competition presentation, Deloitte judge Susan Cantrell photographed our SMART KPI framework slide to keep as a reference — calling it one of the most rigorous she had seen in the competition. Professor Richard Sturman and Professor Heather Whiteman also praised the solution's analytical depth and practical implementability.\n\nThe SMART KPI framework and phased rollout plan were specifically highlighted as differentiators from other competing teams.",
      },
    ],
    tools: "Product Design · Strategic Frameworks · GenAI Concepts · HIPAA Compliance · SMART KPI Design",
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
        heading: "Overview",
        body: "This project delivered a full product strategy for Workday — one of the world's leading enterprise SaaS platforms — addressing its slowing growth trajectory and charting a path from $8.45B to $13.22B in revenue by FY2027. Over the course of a quarter, our six-person team conducted a comprehensive diagnosis of Workday's competitive position, customer segments, and strategic options — and produced a prioritized 3-OKR roadmap backed by rigorous financial modeling and a $700M–$1.1B investment case.\n\nThis project won Best of Quarter in IMT 589 B at the UW iSchool.",
      },
      {
        heading: "The Challenge",
        body: "Workday is a dominant B2B SaaS platform — serving 60%+ of the Fortune 500 with $8.45B in revenue — but facing structural headwinds:\n• Revenue growth is decelerating as North American enterprise market saturation approaches\n• ~75% of revenue is concentrated in North America, with limited international footprint\n• AI capabilities are being added to the product but lack a clear monetization model\n• Complex UX is hurting adoption, driving support costs, and threatening renewal rates as alternatives improve\n• Legacy fixed-subscription pricing doesn't capture the value Workday's AI actually delivers\n\nThe central question: How does Workday grow to $13.22B by FY2027 while protecting its core?",
      },
      {
        heading: "Step 1 — Current-State Diagnosis",
        body: "We mapped Workday's full competitive landscape across four key rivals — Oracle, SAP, ADP, and UKG — evaluating each on feature set, geographic reach, AI capability, pricing model, and enterprise penetration. We identified Workday's core moat (deep HCM + Finance integration, Fortune 500 trust, high switching costs) and its key vulnerabilities (UX complexity, AI monetization gap, APAC underinvestment).",
      },
      {
        heading: "Step 2 — Customer Segmentation",
        body: "We segmented Workday's customer base by company size, geography, and function to identify where growth was most accessible. APAC emerged as the highest-opportunity region — significant enterprise demand, low Workday penetration, and regulatory complexity that creates barriers to entry for less-committed competitors.",
      },
      {
        heading: "Step 3 — Idea Generation & Prioritization",
        body: "We generated 40+ strategic initiatives across three domains: geographic expansion, product/UX improvement, and pricing transformation. Each idea was scored using:\n• MoSCoW framework (Must Have / Should Have / Could Have / Won't Have) for strategic necessity\n• ICE scoring (Impact × Confidence × Ease) for execution feasibility\n• NPV analysis and payback period estimates for financial viability\n• Build vs. Buy analysis for capabilities that could be accelerated through acquisition or partnership",
      },
      {
        heading: "OKR 1 — APAC Expansion",
        body: "Objective: Grow non-North American revenue from 25% to 40% of total revenue by FY2027.\n\nKey Results:\n• Launch localized payroll compliance engines for Japan, India, Australia, and Singapore\n• Establish regional HR ecosystem partnerships in each target market\n• Achieve 200+ net new APAC enterprise customers by FY2026",
      },
      {
        heading: "OKR 2 — UX Overhaul",
        body: "Objective: Reduce user friction by 30% and protect renewal rates during AI feature rollout.\n\nKey Results:\n• Reduce average task completion time by 30% across core HCM workflows\n• Maintain CSAT above 95% through AI feature rollout phases\n• Cut inbound support interactions by 25% via AI-powered self-service and guided onboarding",
      },
      {
        heading: "OKR 3 — Outcome-Based AI Pricing",
        body: "Objective: Shift from fixed-entitlement subscriptions to value-aligned, tiered pricing.\n\nKey Results:\n• Launch outcome-based pricing tier where customers pay for measurable AI-driven business outcomes (productivity gains, automation rate, reduced attrition)\n• Pilot with 50 enterprise customers in FY2025, expand to full portfolio by FY2026\n• Increase average contract value (ACV) by 20% through value-based upsells",
      },
      {
        heading: "Investment Case",
        body: "• Total investment ask: $700M – $1.1B across a 3-phase roadmap (Q2 2025 → 2027+)\n• Phase 1 (Q2–Q4 2025): UX redesign + APAC legal/compliance infrastructure\n• Phase 2 (2026): Outcome-based pricing rollout + APAC go-to-market\n• Phase 3 (2027+): AI platform expansion + ecosystem integrations\n• Projected revenue uplift: +$4.77B by FY2027",
      },
      {
        heading: "Recognition",
        body: "Professor Nitin T Bhat named this the best project of the quarter in IMT 589 B — citing the depth of financial modeling, the rigor of the prioritization methodology, and the coherence of the three-OKR narrative as standout qualities relative to other teams.",
      },
    ],
    tools:
      "MoSCoW Prioritization · ICE Scoring · NPV/ROI Analysis · OKR Design · Competitive Analysis · Financial Modeling · Value Proposition Canvas",
    team: "Ali Lo, Ishika Johari, Raghav Swaminathan, Sanyam Mehta, Soham Desai, Souporno Ghosh",
  },
  {
    id: "elderease",
    number: "07",
    title: "ElderEase — On-Demand Non-Medical Senior Care Platform",
    tagline: "A single platform for everyday non-medical senior care.",
    tags: ["Product Strategy", "Market Sizing", "Entrepreneurship"],
    categories: ["Product Strategy"],
    status: "IMT 598 · Entrepreneurship, UW",
    featured: true,
    badge: "Top 17 Teams — UW Science & Technology Showcase 2026",
    summary:
      "A single, on-demand platform for everyday non-medical senior care — built from a classroom idea into a top-17 pitch at UW's Science and Technology Showcase.",
    sections: [
      {
        heading: "The Problem",
        body: "The U.S. non-medical home care market is projected to reach $273.6B by 2029. 77% of seniors want to age in place — yet families are left juggling fragmented services with little visibility or trust in who is actually providing care.",
      },
      {
        heading: "What We Built",
        body: "ElderEase: a single, on-demand platform for everyday non-medical support, designed for both seniors and the families coordinating their care. The platform connects families to vetted caregivers for daily living support, companionship, errands, and household help — removing the fragmentation and trust gap in today's home care market.",
      },
      {
        heading: "My Approach",
        body: "Over several weeks, our team went deep into:\n• Customer personas and real-world use cases for both seniors and adult-children decision-makers\n• Unit economics and pricing — a $35/hour service model\n• Market sizing — a Total Addressable Market (TAM) of approximately $191B, with a clear path to serviceable markets\n• Competitive differentiation in a space that already has strong incumbent players",
      },
      {
        heading: "Outcome",
        body: "What started as a class project in Dr. Mike Teodorescu's Entrepreneurship course (IMT 598) — where our team placed 2nd in the startup pitch competition — became something bigger. We refined the idea and were selected as one of the top 17 teams to pitch ElderEase at the University of Washington's 2026 Science and Technology Showcase, the 20th annual event co-hosted by the Science & Engineering Business Association (SEBA) and the Foster School's Buerk Center for Entrepreneurship.\n\nPitching in front of experienced judges pushed us beyond \"good idea\" into clear thinking, structured storytelling, and defensible logic — and changed how I think about building: not just what sounds good, but what actually works in the real world.",
      },
    ],
    tools: "Market Sizing · Unit Economics · Customer Personas · Pitch Development",
    team: "Souporno Ghosh, Ananya Sharma, Mathew Jerry Meleth, Shanivi Kaul",
  },
  {
    id: "salesforce-capstone",
    number: "08",
    title: "From Metric Dumps to Manager Action: Talent Nudging System",
    tagline: "A governance framework for Salesforce workforce nudges.",
    tags: ["People Analytics", "Product Strategy", "Behavioral Science"],
    categories: ["People Analytics", "Product Strategy"],
    status: "MSIM Capstone · Jan–Jun 2026 · Partner: Salesforce Workforce Intelligence",
    featured: true,
    badge: "🏆 Visionary Lens Award — UW iSchool Capstone Showcase",
    summary:
      "A cluster-based governance layer that turns disconnected Salesforce workforce metrics into bundled, prioritized Slack nudges — grounded in COM-B and EAST behavioral frameworks.",
    sections: [
      {
        heading: "Overview",
        body: "This MSIM capstone project was built in partnership with Salesforce's Workforce Intelligence team. Over a full semester, our team of four tackled a challenge that sits at the intersection of behavioral science, product design, and People Analytics: How can workforce insights be delivered to managers at the right time, with the right context, and with clear actions that drive meaningful outcomes?\n\nThe project was recognized with the Visionary Lens Award for Insightfulness at the UW iSchool Capstone Showcase 2026.",
      },
      {
        heading: "The Problem",
        body: "Managers at Salesforce receive people analytics as disconnected metric updates — creating noise, alert fatigue, and unclear next steps. Important signals get missed while managers spend more time reporting than leading.\n\n\"We need a system that delivers the right signal, at the right time, with the right action pathway.\"\n\nKey design questions we investigated:\n• How should related people metrics be grouped so signals reinforce each other rather than compete?\n• How should nudges be prioritized when multiple signals fire simultaneously?\n• How can the system reduce fatigue while still escalating serious risks?\n• How can Salesforce measure whether nudges actually lead to action and improvement?",
      },
      {
        heading: "Our Solution",
        body: "A cluster-based governance layer that groups related workforce metrics into manager decision moments, and delivers bundled nudges ordered by urgency (Red → Amber → Green) — replacing disconnected metric dumps with meaningful, actionable signals.",
      },
      {
        heading: "The Five Governance Clusters",
        body: "We organized Salesforce's full suite of workforce metrics into five clusters, each mapped to a distinct manager decision moment:\n1. Alignment & Coaching (Check-ins, OKRs) → Planning & alignment\n2. Team Health & Retention (Engagement Survey, Voluntary Attrition, Burnout) → People risk & retention\n3. Talent Development & Performance (Development Programs, Performance Evals) → Capability & eval quality\n4. AI Adoption & Productivity (AI Usage, AI Time Gained) → Adaptability & productivity\n5. Team Participation & Coordination (Office Attendance, VTO) → Coordination & planning\n\nClustering works because outcomes like burnout, engagement, and performance are interdependent — seeing them together reveals the system, not just isolated signals.",
      },
      {
        heading: "Behavioral Design Foundation",
        body: "We grounded the entire system in two frameworks.\n\nCOM-B Framework — ensuring each nudge addresses the three behavioral drivers:\n• Capability: Make the signal easy to understand\n• Opportunity: Deliver inside the manager workflow\n• Motivation: Connect the signal to a timely, trusted action\n\nEAST Framework — making every nudge:\n• Easy: Bundle related signals to reduce cognitive load\n• Attractive: Clear Red-Amber-Green hierarchy and visible progress\n• Social: Benchmarks and norms when helpful\n• Timely: Nudge at the manager decision moment",
      },
      {
        heading: "Governance Rules",
        body: "Six system-level rules govern how nudges behave across the full manager experience:\n• Bundling Rule: All triggered metrics in the same cluster are sent in one Slack message\n• Priority Rule: When multiple bundles compete, order is Team Health → Alignment → Talent → AI → Participation\n• Mute Rule: A cluster may be muted only when all signals are green; new negative signals automatically lift mute\n• Privacy Rule: Sensitive signals (e.g., Burnout) stay aggregate-only and require a minimum team-size threshold\n• Cooldown Rule: After a manager acts, the same nudge is delayed by a defined cooldown period to prevent fatigue\n• Escalation Rule: Persistent red signals after the action window escalate to HRBP with structured context automatically",
      },
      {
        heading: "Manager Experience in Slack — 4 Scenarios",
        body: "We designed and prototyped four real delivery scenarios for the Team Health & Retention cluster:\n• Scenario A: All three signals negative → Critical Bundle sent immediately\n• Scenario B: Burnout negative, others stable → Mixed Bundle with targeted action\n• Scenario C: All three signals green → Reinforcement message to sustain strong practices\n• Scenario D: No action logged within seven days → Follow-up message with escalation pathway\n\nEach scenario included mockups of the Slack message UI, action buttons, cooldown logic, and the conditions that trigger each path.",
      },
      {
        heading: "Success Measurement Framework",
        body: "A five-stage measurement model tracking impact from delivery through sustained behavioral change:\n\nREACH → ACTION → BEHAVIOR → OUTCOME → SUSTAIN\n\n• Reach: Did the nudge reach the right manager?\n• Action: Did the manager take a first action?\n• Behavior: Did manager behavior change?\n• Outcome: Did the related people metric improve?\n• Sustain: Is the system effective and sustainable long-term?\n\nSalesforce's Workforce Intelligence team reviews system performance quarterly and recalibrates thresholds, content, and rules based on this loop.",
      },
      {
        heading: "Future Recommendations",
        body: "Short Term:\n• Split attrition metrics into voluntary and involuntary categories for clearer workforce interpretation\n• Surface internal mobility rate as a forward-looking retention and growth indicator\n• Add eNPS as a high-level sentiment signal within manager nudges\n\nLong Term:\n• Apply KESI-based Organizational Network Analysis to identify hidden collaboration and support patterns within teams\n• Introduce OKR-style goal attainment metrics to measure progress beyond binary threshold completion",
      },
      {
        heading: "Recognition",
        body: "The project was presented at the UW iSchool Capstone Showcase 2026 and received the Visionary Lens Award for Insightfulness — recognizing the depth of the governance model, the rigor of the behavioral design approach, and the practical implementability of the system.\n\nA special thank you to Steven Bramwell and Jamie Kroll at Salesforce for their mentorship, practitioner perspective, and willingness to challenge our assumptions — and to Professor Heather Whiteman for her guidance throughout.",
      },
    ],
    tools:
      "Behavioral Science · COM-B & EAST Frameworks · Governance Design · People Analytics · Decision Support Systems · Slack Integration Design",
    team: "Ananya Sharma, Kshiti Sinha, Shanivi Kaul, Souporno Ghosh (Team FourSight — MSIM, UW iSchool)",
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

type TimelineKind = "professional" | "academic" | "achievement";
type TimelineEntry = {
  kind: TimelineKind;
  // sortKey: approximate start date (YYYY-MM) used to order entries vertically.
  sortKey: string;
  // endKey: approximate end date (YYYY-MM). For achievements, equals sortKey.
  endKey: string;
  period: string;
  title: string;
  org: string;
  location?: string;
  notes: string;
  // For achievements: which side the marker connects to.
  connectsTo?: "left" | "right" | "none";
};

const timeline: TimelineEntry[] = [
  // Academic
  {
    kind: "academic",
    sortKey: "2016-09",
    endKey: "2020-06",
    period: "2016 – 2020",
    title: "B.Tech — Electronics & Communication Engineering",
    org: "SRM Institute of Science and Technology",
    location: "Chennai, India",
    notes:
      "Built a foundation in engineering systems, electronics, and computational thinking. Graduated June 2020 with GPA 3.2.",
  },
  {
    kind: "academic",
    sortKey: "2024-09",
    endKey: "2026-06",
    period: "Sep 2024 – Jun 2026",
    title: "Master of Science in Information Management (GPA: 4.0)",
    org: "University of Washington iSchool",
    location: "Seattle, WA",
    notes:
      "Specializations in Program/Product Management Consulting and Data Science. Coursework spanning People Analytics, Data Warehousing, Product Strategy, Data Visualization, and UX Research. Graduated June 2026.",
  },
  // Professional
  {
    kind: "professional",
    sortKey: "2021-01",
    endKey: "2022-10",
    period: "Jan 2021 – Oct 2022",
    title: "Systems Engineer — Full-Stack Development",
    org: "Infosys Limited | Client: Apple",
    location: "Bangalore, India",
    notes:
      "Built analytics-enabled admin tools in Java and SQL used across 500+ Apple Retail locations globally. Developed REST APIs and Grafana dashboards to improve data flow and system visibility.",
  },
  {
    kind: "professional",
    sortKey: "2022-11",
    endKey: "2023-10",
    period: "Nov 2022 – Oct 2023",
    title: "Senior Systems Engineer — Site Reliability & Product Development",
    org: "Infosys Limited | Client: Apple",
    location: "Bangalore, India",
    notes:
      "Led analytics for Apple's Concierge App — owned KPI dashboards in Splunk, built Python/Go data pipelines, improved failure detection speed by 85%. Supported Apple's first retail store launch in India.",
  },
  {
    kind: "professional",
    sortKey: "2023-11",
    endKey: "2024-07",
    period: "Nov 2023 – Jul 2024",
    title: "Associate Consultant — Product & Data Strategy",
    org: "Infosys Limited | Client: Arizona Public Services",
    location: "Bangalore, India",
    notes:
      "Analyzed multi-system billing and customer datasets in Oracle SQL, improving data accuracy by 35%. Delivered decision-ready analytics for Finance, Operations, and Engineering stakeholders.",
  },
  {
    kind: "professional",
    sortKey: "2025-07",
    endKey: "2026-03",
    period: "Jul 2025 – Mar 2026",
    title: "Graduate Student Program Coordinator",
    org: "CIRCLE — Center for International Relations & Cultural Leadership Exchange, UW Student Life",
    location: "Seattle, WA",
    notes:
      "Designed and coordinated programs connecting 15,000+ international and domestic students with institutional resources, leadership development, and cross-cultural engagement. Led the International Welcome Program, Fall Welcome Mixer, DOL ID visits, wellness sessions, and an Employment-Based Visa info session. Improved program engagement by 35% through user research and feedback loops.",
  },
  {
    kind: "professional",
    sortKey: "2025-09",
    endKey: "2026-06",
    period: "Sep 2025 – Present",
    title: "Graduate Researcher — People Analytics Lab",
    org: "University of Washington",
    location: "Seattle, WA",
    notes:
      "Integrated HRIS, engagement, and performance datasets to build longitudinal workforce cohorts (1,600+ employees). Developed a Performance Archetypes Framework using Python classification and synthetic data generation for workforce segmentation. Supported by a People Analytics Research stipend from the iSchool Workforce Systems Innovation Term Fund (Winter–Spring 2026), conducting applied research under Dr. Heather Whiteman.",
  },
  {
    kind: "professional",
    sortKey: "2026-01",
    endKey: "2026-03",
    period: "Jan 2026 – Mar 2026",
    title: "Graduate Teaching Assistant (Reader/Grader)",
    org: "University of Washington | IMT 550 — Policy and Ethics in Information Management",
    location: "Seattle, WA",
    notes:
      "Prepared course materials, evaluated assignments and exams, and maintained grading records for Professor Jim Loter's course. Supported ethical reasoning and critical reflection in student writing on information policy and ethics.",
  },
  {
    kind: "professional",
    sortKey: "2026-01-15",
    endKey: "2026-06",
    period: "Jan 2026 – Jun 2026",
    title: "Salesforce Capstone — Product Strategy & AI Workflow Design",
    org: "University of Washington | Sponsored by Salesforce Workforce Intelligence Team",
    location: "Seattle, WA",
    notes:
      "Led redesign of Salesforce's manager nudging system for people analytics. Designed event-based AI workflow architecture, Slack-based delivery concepts, and a measurement framework tracking engagement and downstream impact.",
  },
  // Achievements
  {
    kind: "achievement",
    sortKey: "2022-06",
    endKey: "2022-06",
    period: "2022",
    title: "Infosys Rise Insta Award",
    org: "Infosys Limited",
    notes:
      "Recognized with three consecutive quarterly Rise Insta Awards for outstanding performance and impact.",
    connectsTo: "left",
  },
  {
    kind: "achievement",
    sortKey: "2025-04",
    endKey: "2025-04",
    period: "Spring 2025",
    title: "Best of Quarter — Product Strategy and Leadership (IMT 589 B)",
    org: "University of Washington",
    notes:
      "Led strategic analysis for Workday's global growth strategy. Named best project of the quarter by Prof. Nitin T Bhat.",
    connectsTo: "right",
  },
  {
    kind: "achievement",
    sortKey: "2025-11",
    endKey: "2025-11",
    period: "Fall 2025",
    title: "2nd Place — IMT 598 Startup Pitch Competition",
    org: "University of Washington",
    notes:
      "Placed 2nd in the startup pitch competition in Dr. Mike Teodorescu's Entrepreneurship course with teammates Ananya Sharma, Mathew Jerry Meleth, and Shanivi Kaul — the seed of what became ElderEase.",
    connectsTo: "none",
  },
  {
    kind: "achievement",
    sortKey: "2025-12",
    endKey: "2025-12",
    period: "Winter 2025",
    title: "3rd Place — Deloitte iEngage People Analytics Case Competition",
    org: "Deloitte × University of Washington",
    notes:
      "Designed OkiDoki, an AI-powered burnout detection platform for healthcare workers. SMART KPI framework recognized by Deloitte judges.",
    connectsTo: "left",
  },
  {
    kind: "achievement",
    sortKey: "2026-02",
    endKey: "2026-02",
    period: "Winter 2026",
    title: "Top 17 Teams — UW Science and Technology Showcase",
    org: "University of Washington",
    notes:
      "Selected as one of the top 17 teams to pitch ElderEase at the University of Washington's 2026 Science and Technology Showcase, the 20th annual event co-hosted by SEBA and the Foster School's Buerk Center for Entrepreneurship.",
    connectsTo: "none",
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

type Attachment = { id: string; name: string; type: string; dataUrl: string };

function useProjectAttachments(
  id: string,
): [Attachment[], (files: FileList | File[]) => void, (attId: string) => void] {
  const key = `portfolio-files:${id}`;
  const [items, setItems] = useState<Attachment[]>([]);
  useEffect(() => {
    try {
      const v = localStorage.getItem(key);
      if (v) setItems(JSON.parse(v));
    } catch {}
  }, [key]);
  const persist = (next: Attachment[]) => {
    setItems(next);
    try {
      localStorage.setItem(key, JSON.stringify(next));
    } catch {}
  };
  const add = (files: FileList | File[]) => {
    const arr = Array.from(files);
    Promise.all(
      arr.map(
        (f) =>
          new Promise<Attachment>((resolve) => {
            const reader = new FileReader();
            reader.onload = () =>
              resolve({
                id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
                name: f.name,
                type: f.type,
                dataUrl: reader.result as string,
              });
            reader.readAsDataURL(f);
          }),
      ),
    ).then((next) => persist([...items, ...next]));
  };
  const remove = (attId: string) => persist(items.filter((a) => a.id !== attId));
  return [items, add, remove];
}

function ProjectCard({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);
  const [img, setImg, clearImg] = useProjectImage(project.id);
  const fileRef = useRef<HTMLInputElement>(null);
  const attachRef = useRef<HTMLInputElement>(null);
  const [attachments, addAttachments, removeAttachment] = useProjectAttachments(project.id);
  const inProgress = project.badge === "In Progress";
  const githubLink = project.links?.find((l) => l.href.includes("github.com"));
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <article className="group flex flex-col rounded-xl border border-border bg-card overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-primary/40">
        <div className="relative aspect-[16/9] bg-secondary/60 overflow-hidden">
          {inProgress && (
            <span className="absolute top-2 left-2 z-10 inline-flex items-center gap-1 text-[15px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#D4A017]/15 text-[#8a6508] border border-[#D4A017]/40 backdrop-blur-sm">
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
                className="text-[15px] font-semibold uppercase tracking-widest text-primary bg-primary/10 px-2 py-1 rounded-full"
              >
                {c}
              </span>
            ))}
            {project.badge && (
              project.badge !== "In Progress" && (
                <span className="inline-flex items-center gap-1 text-[15px] font-medium text-foreground/70 bg-secondary px-2 py-1 rounded-full">
                  {project.badge}
                </span>
              )
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
                className="text-[16px] px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground border border-border"
              >
                {t.trim()}
              </span>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
            <DialogTrigger asChild>
              <button className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
                Learn more
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </DialogTrigger>
            <div className="flex items-center gap-2">
              {githubLink && (
                <a
                  href={githubLink.href}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1 text-xs font-medium text-foreground/70 hover:text-primary border border-border hover:border-primary/50 rounded-full px-2.5 py-1 transition-colors"
                  aria-label="View on GitHub"
                >
                  <Github className="h-3.5 w-3.5" />
                  GitHub
                </a>
              )}
              {project.featured && (
                <Badge className="bg-primary/10 text-primary hover:bg-primary/15 border-0">
                  Featured
                </Badge>
              )}
            </div>
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
          <div className="border-t border-border pt-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-primary">
                Documents &amp; Photos
              </h4>
              <button
                type="button"
                onClick={() => attachRef.current?.click()}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
              >
                <Paperclip className="h-3.5 w-3.5" /> Add files
              </button>
              <input
                ref={attachRef}
                type="file"
                multiple
                accept="image/*,application/pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt,.csv,.md"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length) addAttachments(e.target.files);
                  e.target.value = "";
                }}
              />
            </div>
            {attachments.length === 0 ? (
              <p className="text-xs text-muted-foreground">
                No attachments yet. Add supporting documents, slides, or photos for this project.
              </p>
            ) : (
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {attachments.map((a) => {
                  const isImg = a.type.startsWith("image/");
                  return (
                    <li
                      key={a.id}
                      className="flex items-center gap-3 rounded-lg border border-border bg-secondary/40 p-2"
                    >
                      {isImg ? (
                        <img
                          src={a.dataUrl}
                          alt={a.name}
                          className="h-10 w-10 rounded object-cover flex-shrink-0"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded bg-background flex items-center justify-center flex-shrink-0">
                          <FileText className="h-5 w-5 text-muted-foreground" />
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-medium truncate">{a.name}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <a
                            href={a.dataUrl}
                            download={a.name}
                            className="text-[16px] text-primary hover:underline inline-flex items-center gap-1"
                          >
                            <Download className="h-3 w-3" /> Download
                          </a>
                          <button
                            type="button"
                            onClick={() => removeAttachment(a.id)}
                            className="text-[16px] text-muted-foreground hover:text-destructive inline-flex items-center gap-1"
                          >
                            <Trash2 className="h-3 w-3" /> Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function HomeTab({ go }: { go: (t: TabKey) => void }) {
  return (
    <div className="mx-auto max-w-6xl px-6 md:px-10 pt-16 md:pt-24 pb-16 md:pb-20 animate-fade-in">
      <p className="text-sm font-mono uppercase tracking-widest text-primary mb-6">
        People Analytics · Data Strategy · Product Thinking
      </p>
      <h1 className="font-serif text-5xl md:text-8xl lg:text-9xl font-medium leading-[1.05] tracking-tight">
        Souporno Ghosh
      </h1>
      <p className="mt-6 font-serif text-2xl md:text-3xl text-foreground/90 italic">
        Turning workforce data into decisions that matter.
      </p>
      <p className="mt-6 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed">
        MSIM graduate of the University of Washington · Open to full-time opportunities in
        People Analytics, Data &amp; Business Analytics, and Product / Program Management ·
        Graduated June 2026.
      </p>
      <div className="mt-8 flex flex-wrap gap-2.5">
        {[
          { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/ghosh-souporno/" },
          { icon: Github, label: "GitHub", href: "https://github.com/Souporno" },
          { icon: Mail, label: "Email", href: "mailto:souporno@uw.edu" },
          { icon: FileText, label: "Resume", href: "#" },
        ].map((p) => (
          <a
            key={p.label}
            href={p.href}
            target={p.href.startsWith("http") ? "_blank" : undefined}
            rel={p.href.startsWith("http") ? "noreferrer" : undefined}
            className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-card px-3.5 py-1.5 text-xs font-medium text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
          >
            <p.icon className="h-3.5 w-3.5" />
            {p.label}
          </a>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-4">
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

      <AboutSection />
    </div>
  );
}

function AboutSection() {
  const [photo, setPhoto, clearPhoto] = useProjectImage("home-portrait");
  const photoRef = useRef<HTMLInputElement>(null);
  return (
    <section className="mt-20 md:mt-24 grid grid-cols-12 gap-8 md:gap-12 border-t border-border pt-16">
      <div className="col-span-12 md:col-span-4">
        <div className="md:sticky md:top-24">
          <button
            type="button"
            onClick={() => photoRef.current?.click()}
            className="group relative block w-full aspect-[4/5] rounded-2xl overflow-hidden border-2 border-primary/40 bg-secondary/50 shadow-lg shadow-primary/5 hover:border-primary/70 hover:shadow-primary/10 transition-all"
            aria-label={photo ? "Replace portrait photo" : "Upload portrait photo"}
          >
            {photo ? (
              <img
                src={photo}
                alt="Souporno Ghosh"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground/70 bg-muted/40">
                <ImagePlus className="h-10 w-10 mb-2" />
                <span className="text-xs uppercase tracking-widest">Click to upload photo</span>
              </div>
            )}
            {photo && (
              <span className="absolute inset-0 flex items-center justify-center bg-foreground/0 group-hover:bg-foreground/30 transition-colors opacity-0 group-hover:opacity-100">
                <span className="inline-flex items-center gap-2 text-sm font-medium bg-background/90 text-foreground px-3 py-1.5 rounded-full">
                  <ImagePlus className="h-4 w-4" /> Replace photo
                </span>
              </span>
            )}
          </button>
          {photo && (
            <button
              type="button"
              onClick={clearPhoto}
              className="mt-2 text-xs text-muted-foreground hover:text-destructive"
            >
              Remove photo
            </button>
          )}
          <input
            ref={photoRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) setPhoto(f);
              e.target.value = "";
            }}
          />
        </div>
      </div>
      <div className="col-span-12 md:col-span-8">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">
          About
        </h2>
        <div className="space-y-5 text-lg leading-relaxed text-foreground/85">
          <p>
            My work sits at the intersection of <em>people, data, and strategy</em>. I'm drawn to
            problems where understanding human behavior and organizational dynamics can be
            unlocked through rigorous analysis.
          </p>
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
                <li>Graduated June 2026</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WorkTab() {
  const [filter, setFilter] = useState<(typeof categories)[number]>("All");
  const filtered =
    filter === "All" ? projects : projects.filter((p) => p.categories.includes(filter));
  return (
    <div className="mx-auto max-w-[1400px] px-6 md:px-10 pt-16 md:pt-20 pb-20 animate-fade-in">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">
        Selected work
      </h2>
      <p className="font-serif text-3xl md:text-4xl font-medium tracking-tight max-w-xl">
        Projects I've worked on.
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
              {c === "All" ? "All Projects" : c}
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
  return <PathTabInner />;
}

// ---------- Nested-container Path timeline ----------

type PathChild = {
  title: string;
  org?: string;
  startDec: number;
  endDec: number;
  period: string;
  notes: string;
};

type PathAchievement = {
  title: string;
  period: string;
  dateDec: number;
  notes: string;
};

type PathParent = {
  kind: "academic" | "professional";
  label: string;
  subLabel: string;
  location: string;
  startDec: number;
  endDec: number;
  children: PathChild[];
  achievements: PathAchievement[];
};

const decOf = (y: number, m: number) => y + (m - 1) / 12;

const pathParents: PathParent[] = [
  {
    kind: "academic",
    label: "University of Washington iSchool",
    subLabel:
      "MS Information Management · GPA 4.0 · Graduated June 2026",
    location: "Seattle, WA",
    startDec: decOf(2024, 9),
    endDec: decOf(2026, 6),
    children: [
      {
        title: "Graduate Researcher — People Analytics Lab",
        org: "University of Washington",
        startDec: decOf(2025, 9),
        endDec: decOf(2026, 6),
        period: "Sep 2025 – Present",
        notes:
          "Integrated HRIS, engagement, and performance datasets (1,600+ employees). Built a Performance Archetypes Framework in Python. Funded by the iSchool Workforce Systems Innovation Term Fund under Dr. Heather Whiteman.",
      },
      {
        title: "Salesforce Capstone — Talent Nudging System",
        org: "UW × Salesforce Workforce Intelligence",
        startDec: decOf(2026, 1),
        endDec: decOf(2026, 6),
        period: "Jan 2026 – Jun 2026",
        notes:
          "Redesigned Salesforce's manager nudging system using a cluster-based governance framework. Recognized with the Visionary Lens Award at the iSchool Capstone Showcase.",
      },
      {
        title: "Graduate Student Program Coordinator",
        org: "CIRCLE, UW Student Life",
        startDec: decOf(2025, 7),
        endDec: decOf(2026, 3),
        period: "Jul 2025 – Mar 2026",
        notes:
          "Designed and coordinated programs connecting 15,000+ international and domestic students. Led Welcome Program, DOL ID visits, wellness sessions, and visa info sessions.",
      },
      {
        title: "Graduate Teaching Assistant (Reader/Grader)",
        org: "UW — IMT 550, Prof. Jim Loter",
        startDec: decOf(2026, 1),
        endDec: decOf(2026, 3),
        period: "Jan 2026 – Mar 2026",
        notes:
          "Prepared course materials, evaluated assignments and exams, and maintained grading records for Policy and Ethics in Information Management.",
      },
    ],
    achievements: [
      {
        title: "3rd Place — Deloitte iEngage",
        period: "Winter 2025",
        dateDec: decOf(2025, 2),
        notes:
          "Designed OkiDoki, an AI-powered burnout detection platform for healthcare workers. SMART KPI framework recognized by Deloitte judges.",
      },
      {
        title: "Best of Quarter — Workday",
        period: "Spring 2025",
        dateDec: decOf(2025, 5),
        notes:
          "Led strategic analysis for Workday's global growth strategy in IMT 589 B. Named best project of the quarter by Prof. Nitin T Bhat.",
      },
      {
        title: "2nd Place — IMT 598 Startup Pitch",
        period: "Fall 2025",
        dateDec: decOf(2025, 11),
        notes:
          "Placed 2nd in Dr. Mike Teodorescu's Entrepreneurship pitch competition — the seed of what became ElderEase.",
      },
      {
        title: "Top 17 Teams — UW STS Showcase",
        period: "Winter 2026",
        dateDec: decOf(2026, 2),
        notes:
          "Selected as one of the top 17 teams to pitch ElderEase at the 2026 UW Science and Technology Showcase.",
      },
      {
        title: "Visionary Lens Award — Capstone Showcase",
        period: "Jun 2026",
        dateDec: decOf(2026, 6),
        notes:
          "Recognized at the UW iSchool Capstone Showcase for the Salesforce Talent Nudging System.",
      },
    ],
  },
  {
    kind: "professional",
    label: "Infosys Limited",
    subLabel:
      "Client: Apple (2021–2023) · Client: Arizona Public Services (2023–2024)",
    location: "Bangalore, India",
    startDec: decOf(2021, 1),
    endDec: decOf(2024, 7),
    children: [
      {
        title: "Systems Engineer — Full-Stack Development",
        startDec: decOf(2021, 1),
        endDec: decOf(2022, 10),
        period: "Jan 2021 – Oct 2022",
        notes:
          "Built analytics-enabled admin tools in Java and SQL across 500+ Apple Retail locations globally. Developed REST APIs and Grafana dashboards.",
      },
      {
        title: "Senior Systems Engineer — Site Reliability & Product Development",
        startDec: decOf(2022, 11),
        endDec: decOf(2023, 10),
        period: "Nov 2022 – Oct 2023",
        notes:
          "Led analytics for Apple's Concierge App — Splunk dashboards, Python/Go pipelines, 85% faster failure detection. Supported Apple India's first retail launch.",
      },
      {
        title: "Associate Consultant — Product & Data Strategy",
        startDec: decOf(2023, 11),
        endDec: decOf(2024, 7),
        period: "Nov 2023 – Jul 2024",
        notes:
          "Analyzed billing and customer datasets in Oracle SQL, improving data accuracy by 35%. Delivered decision-ready analytics for Finance, Operations, and Engineering.",
      },
    ],
    achievements: [
      {
        title: "Infosys Rise Insta Award",
        period: "2022",
        dateDec: decOf(2022, 6),
        notes:
          "Recognized with three consecutive quarterly Rise Insta Awards for outstanding performance and impact.",
      },
    ],
  },
  {
    kind: "academic",
    label: "SRM Institute of Science and Technology",
    subLabel:
      "B.Tech — Electronics & Communication Engineering · GPA 3.2 · Graduated June 2020",
    location: "Chennai, India",
    startDec: decOf(2016, 6),
    endDec: decOf(2020, 6),
    children: [],
    achievements: [],
  },
];

// Greedy lane assignment for overlapping children — earlier starts pick the
// leftmost free lane; lane count is the max concurrency.
function assignLanes(children: PathChild[]) {
  const sorted = children
    .map((c, i) => ({ c, i }))
    .sort((a, b) => a.c.startDec - b.c.startDec);
  const laneEnd: number[] = [];
  const placement = new Map<number, number>(); // original index -> lane
  for (const { c, i } of sorted) {
    let lane = -1;
    for (let l = 0; l < laneEnd.length; l++) {
      if (laneEnd[l] <= c.startDec) {
        lane = l;
        break;
      }
    }
    if (lane === -1) {
      lane = laneEnd.length;
      laneEnd.push(0);
    }
    laneEnd[lane] = c.endDec;
    placement.set(i, lane);
  }
  return { placement, laneCount: Math.max(1, laneEnd.length) };
}

function ChildCard({
  c,
  accentBorder,
  tipSide,
}: {
  c: PathChild;
  accentBorder: string;
  tipSide: "left" | "right";
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          className={`w-full text-left rounded-md bg-white/95 border-l-[3px] ${accentBorder} border border-black/5 shadow-sm p-2 hover:shadow-md transition-shadow`}
        >
          <p className="text-[16px] font-mono uppercase tracking-wider text-muted-foreground leading-tight">
            {c.period}
          </p>
          <p className="text-[16px] font-semibold leading-tight mt-0.5 text-foreground">
            {c.title}
          </p>
          {c.org && (
            <p className="text-[15px] text-foreground/60 leading-tight mt-0.5">
              {c.org}
            </p>
          )}
        </button>
      </TooltipTrigger>
      <TooltipContent side={tipSide} className="max-w-xs text-left">
        <p className="text-[15px] font-mono uppercase tracking-widest text-muted-foreground mb-1">
          {c.period}
        </p>
        <p className="text-xs font-semibold mb-1">{c.title}</p>
        {c.org && (
          <p className="text-[16px] text-foreground/70 mb-1">{c.org}</p>
        )}
        <p className="text-[16px] text-foreground/85 leading-snug">{c.notes}</p>
      </TooltipContent>
    </Tooltip>
  );
}

function AchievementBadge({
  a,
  tipSide,
}: {
  a: PathAchievement;
  tipSide: "left" | "right";
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 rounded-full border border-[#D4A017]/70 bg-[#FBF3D9] hover:bg-[#F5E7B4] shadow-sm px-2 py-0.5"
          aria-label={a.title}
        >
          <Star className="h-3 w-3 text-[#B8860B] fill-[#D4A017]" />
          <span className="text-[15px] font-medium text-[#7A5A0F] leading-none">
            {a.title}
          </span>
        </button>
      </TooltipTrigger>
      <TooltipContent side={tipSide} className="max-w-xs text-left">
        <p className="text-[15px] font-mono uppercase tracking-widest text-muted-foreground mb-1">
          {a.period}
        </p>
        <p className="text-xs font-semibold mb-1">{a.title}</p>
        <p className="text-[16px] text-foreground/85 leading-snug">{a.notes}</p>
      </TooltipContent>
    </Tooltip>
  );
}

function ParentBox({
  p,
  side,
}: {
  p: PathParent;
  side: "left" | "right";
}) {
  const isAcademic = p.kind === "academic";
  const bg = isAcademic ? "bg-[#EBE4F5]" : "bg-[#F5EAE7]";
  const labelColor = isAcademic ? "text-[#5B3A8A]" : "text-[#8A4A3A]";
  const childBorder = isAcademic ? "border-l-[#7B5AB3]" : "border-l-[#B26A55]";

  const { placement, laneCount } = assignLanes(p.children);
  const lanes: PathChild[][] = Array.from({ length: laneCount }, () => []);
  p.children.forEach((c, i) => {
    const l = placement.get(i) ?? 0;
    lanes[l].push(c);
  });
  // Within a lane, newest at top.
  lanes.forEach((lane) => lane.sort((a, b) => b.startDec - a.startDec));

  // Tooltip should open toward the spine (inner side).
  const tipSide: "left" | "right" = side === "left" ? "right" : "left";
  // Achievement strip hugs the spine.
  const achAlign = side === "left" ? "justify-end" : "justify-start";

  return (
    <div className={`rounded-2xl ${bg} shadow-sm p-4`}>
      <h4
        className={`font-serif text-sm md:text-base font-semibold leading-tight ${labelColor}`}
      >
        {p.label}
      </h4>
      <p className="text-[16px] text-foreground/70 leading-snug mt-0.5">
        {p.subLabel}
      </p>
      <p className="text-[16px] text-muted-foreground inline-flex items-center gap-1 mt-0.5">
        <MapPin className="h-2.5 w-2.5" /> {p.location}
      </p>

      {p.children.length > 0 && (
        laneCount > 2 ? (
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[...p.children]
              .sort((a, b) => b.startDec - a.startDec)
              .map((c, i) => (
                <ChildCard
                  key={i}
                  c={c}
                  accentBorder={childBorder}
                  tipSide={tipSide}
                />
              ))}
          </div>
        ) : (
          <div
            className="mt-3 grid gap-2"
            style={{ gridTemplateColumns: `repeat(${laneCount}, minmax(0, 1fr))` }}
          >
            {lanes.map((laneChildren, li) => (
              <div key={li} className="flex flex-col gap-2">
                {laneChildren.map((c, i) => (
                  <ChildCard
                    key={`${li}-${i}`}
                    c={c}
                    accentBorder={childBorder}
                    tipSide={tipSide}
                  />
                ))}
              </div>
            ))}
          </div>
        )
      )}

      {p.achievements.length > 0 && (
        <div className={`mt-3 flex flex-wrap gap-1.5 ${achAlign}`}>
          {p.achievements.map((a, i) => (
            <AchievementBadge key={i} a={a} tipSide={tipSide} />
          ))}
        </div>
      )}
    </div>
  );
}

function PathTabInner() {
  return (
    <div className="mx-auto max-w-[1600px] px-6 md:px-10 pt-16 md:pt-20 pb-20 animate-fade-in">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">
        My Journey
      </h2>
      <p className="font-serif text-3xl md:text-4xl font-medium tracking-tight">
        From India to the United States — a path through engineering, data, and people.
      </p>
      <p className="mt-3 text-sm text-muted-foreground max-w-2xl">
        Each institution is a container on the timeline; the roles and projects inside it
        are sized and stacked to show when they actually happened — and when they overlapped.
        Hover any card or star for detail.
      </p>

      {/* Legend */}
      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs">
        <div className="inline-flex items-center gap-2">
          <span className="h-3 w-6 rounded bg-[#EBE4F5] border border-[#7B5AB3]/40" />
          <span className="text-foreground/80 font-medium">Academic</span>
        </div>
        <div className="inline-flex items-center gap-2">
          <span className="h-3 w-6 rounded bg-[#F5EAE7] border border-[#B26A55]/40" />
          <span className="text-foreground/80 font-medium">Professional</span>
        </div>
        <div className="inline-flex items-center gap-2">
          <Star className="h-3.5 w-3.5 text-[#B8860B] fill-[#D4A017]" />
          <span className="text-foreground/80 font-medium">Achievement / Recognition</span>
        </div>
      </div>

      {/* Nested-container timeline */}
      <TooltipProvider delayDuration={120}>
        <div className="relative mt-10 w-full">
          {pathParents.map((p, idx) => {
            const side: "left" | "right" =
              p.kind === "academic" ? "left" : "right";
            const topYear = Math.floor(p.endDec);
            const botYear = Math.floor(p.startDec);
            return (
              <div key={p.label}>
                <div className="grid grid-cols-[1fr_96px_1fr] items-stretch">
                  {/* Left slot */}
                  <div className="flex justify-end pr-2 md:pr-4">
                    {side === "left" && (
                      <div className="w-full">
                        <ParentBox p={p} side="left" />
                      </div>
                    )}
                  </div>
                  {/* Center spine + year anchors */}
                  <div className="relative flex flex-col items-center">
                    <div className="w-px flex-1 bg-foreground/40" />
                    <div className="absolute top-0 -translate-y-1/2 flex items-center gap-1.5">
                      <span className="h-px w-3 bg-foreground/50" />
                      <span className="font-mono text-[16px] text-muted-foreground bg-background px-1.5 py-0.5 rounded">
                        {topYear}
                      </span>
                      <span className="h-px w-3 bg-foreground/50" />
                    </div>
                    <div className="absolute bottom-0 translate-y-1/2 flex items-center gap-1.5">
                      <span className="h-px w-3 bg-foreground/50" />
                      <span className="font-mono text-[16px] text-muted-foreground bg-background px-1.5 py-0.5 rounded">
                        {botYear}
                      </span>
                      <span className="h-px w-3 bg-foreground/50" />
                    </div>
                  </div>
                  {/* Right slot */}
                  <div className="flex justify-start pl-2 md:pl-4">
                    {side === "right" && (
                      <div className="w-full">
                        <ParentBox p={p} side="right" />
                      </div>
                    )}
                  </div>
                </div>
                {/* Continuous spine segment between parents */}
                {idx < pathParents.length - 1 && (
                  <div className="grid grid-cols-[1fr_96px_1fr]">
                    <div />
                    <div className="flex justify-center h-10">
                      <div className="w-px bg-foreground/40" />
                    </div>
                    <div />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </TooltipProvider>

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
  return _ContactTab();
}

function HobbiesTab() {
  return (
    <div className="mx-auto max-w-6xl px-6 md:px-10 pt-16 md:pt-20 pb-24 animate-fade-in">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">
        Life beyond the desk
      </h2>
      <p className="font-serif text-4xl md:text-6xl font-medium tracking-tight leading-[1.05]">
        Designing <span className="italic text-primary">Belonging</span>.
      </p>
      <p className="mt-6 italic text-muted-foreground text-base md:text-lg max-w-3xl leading-relaxed">
        "The throughline of my time at UW has been closing the gap between resources that
        exist and people who actually feel supported by them."
      </p>

      <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1 — full-width banner */}
        <HobbyCard
          id="hobby-circle"
          className="md:col-span-2 bg-[#F4EFE5] border-l-4 border-l-primary"
          icon="🌐"
          title="Building Community at UW CIRCLE"
          paragraphs={[
            "As a Graduate Student Program Coordinator at UW CIRCLE — the Center for International Relations & Cultural Leadership Exchange, often described as a \"home away from home\" for international students — I designed and coordinated programs connecting 15,000+ international and domestic graduate students with institutional resources, leadership development, and cross-cultural engagement.",
            "I led events ranging from museum visits and cultural outings to professional development workshops and entrepreneurship info sessions. I also organized the International Welcome Program and Fall Welcome Mixer, coordinated Department of Licensing visits for Washington State IDs, wellness sessions with the UW Counseling Center, and an Employment-Based Visa session with immigration attorneys — supporting students navigating some of the most complex transitions of their lives.",
          ]}
          quote={`"What made it meaningful was seeing students not just show up, but leave with new connections, clearer direction, and a stronger sense of belonging."`}
        />

        {/* Card 2 */}
        <HobbyCard
          id="hobby-research"
          icon="📊"
          title="People Analytics Research Fair"
          paragraphs={[
            "In 2026, I presented a research poster at the UW iSchool Research Fair alongside Aswathy, as part of the UW People Analytics Research Lab under Professor Heather Whiteman.",
            "Our work explored how People Analytics can be a force for good — applying rigorous data and behavioral science to understand how work systems shape employee well-being, performance, and long-term sustainability. My focus: performance trajectories and burnout dynamics — how patterns in employee experience evolve over time, and what they reveal about healthier, more sustainable work systems.",
          ]}
          badge="UW iSchool Research Fair · 2026"
        />

        {/* Card 3 */}
        <HobbyCard
          id="hobby-pitch"
          icon="🚀"
          title="Startup Pitch Competition & UW Science and Technology Showcase"
          paragraphs={[
            "In Dr. Mike Teodorescu's entrepreneurship course, my team took our idea beyond the classroom — placing 2nd in the course startup pitch competition. That placed us among the top 17 teams selected to represent the iSchool and pitch at the University of Washington Science and Technology Showcase.",
            "That journey — from classroom idea to public pitch stage — changed how I think about innovation. Strong ideas are only the beginning. What matters is whether they can be structured, tested, communicated clearly, and made useful in the real world.",
          ]}
          badge="Top 17 Teams · UW Science & Technology Showcase"
        />

        {/* Card 4 */}
        <HobbyCard
          id="hobby-whatsapp"
          icon="💬"
          title="The MSIM WhatsApp Community"
          paragraphs={[
            "I noticed a gap in the MSIM student experience: there was no fast, informal, peer-centered support channel. Students had questions about coursework, housing, part-time jobs, and logistics — but formal channels were too slow for everyday needs.",
            "So I created and continue to run an MSIM WhatsApp community. Over time it became a connective layer — cross-sharing resources from CIRCLE, HFS opportunities, event announcements, and peer support in real time.",
          ]}
          quote={`"Support and belonging don't happen automatically. They have to be intentionally built and sustained."`}
        />

        {/* Card 5 */}
        <HobbyCard
          id="hobby-teaching"
          icon="📚"
          title="Teaching, Grading & Mentoring"
          paragraphs={[
            "As a Graduate Teaching Assistant / Reader-Grader for IMT 550 (Policy and Ethics in Information Management) under Professor Jim Loter, I engaged with student writing on ethics, information, and critical reflection.",
            "As a Student Coordinator at UW HFS, I used relationships with directors and managers to help peers learn about and pursue part-time job opportunities — a meaningful source of stability for students adjusting to a new environment.",
          ]}
        />

        {/* Card 6 — closing accent */}
        <HobbyCard
          id="hobby-closing"
          className="md:col-span-2 bg-[#F1DDD2]/60 border-primary/20"
          icon="✍️"
          title="If My MSIM Journey Were a Story"
          paragraphs={[
            "Its title would be: Designing Belonging.",
            "I choose this because the throughline has been the effort to close the gap between resources that exist and people who actually feel supported by them. Through CIRCLE, HFS, the WhatsApp community, mentorship, and teaching — I tried to make information more accessible, opportunities more visible, and support more immediate.",
            "My journey has not only been about what I learned or achieved. It has also been about what I helped build for others, and how I tried to make the MSIM experience more connected, navigable, and genuinely inclusive.",
          ]}
          soft
        />
      </div>

      <p className="mt-16 text-center italic text-muted-foreground">
        More to come — I'm always adding.
      </p>
    </div>
  );
}

function HobbyCard({
  id,
  icon,
  title,
  paragraphs,
  quote,
  badge,
  className = "",
  soft = false,
}: {
  id: string;
  icon: string;
  title: string;
  paragraphs: string[];
  quote?: string;
  badge?: string;
  className?: string;
  soft?: boolean;
}) {
  const [attachments, addAttachments, removeAttachment] = useProjectAttachments(id);
  const fileRef = useRef<HTMLInputElement>(null);
  return (
    <div
      className={`group rounded-2xl border bg-card p-7 md:p-8 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md hover:border-primary/30 ${className}`}
    >
      <div className="text-3xl mb-4" aria-hidden>
        {icon}
      </div>
      <h3 className="font-serif text-2xl md:text-[1.7rem] font-medium tracking-tight leading-snug">
        {title}
      </h3>
      <div className="mt-4 space-y-3 text-[0.97rem] leading-relaxed text-foreground/80">
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
      {quote && (
        <div
          className={`mt-5 rounded-lg border-l-2 border-primary/60 ${soft ? "bg-background/60" : "bg-[#F4EFE5]/70"} px-4 py-3 italic text-sm text-foreground/75`}
        >
          {quote}
        </div>
      )}
      {badge && (
        <div className="mt-5">
          <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
            {badge}
          </span>
        </div>
      )}

      {/* Photo uploads */}
      <div className="mt-6 pt-5 border-t border-foreground/10">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Photos
          </span>
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="inline-flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 transition-colors"
          >
            <ImagePlus className="h-3.5 w-3.5" /> Add
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => {
              if (e.target.files?.length) addAttachments(e.target.files);
              e.target.value = "";
            }}
          />
        </div>
        {attachments.length === 0 ? (
          <p className="text-xs text-muted-foreground/70 italic">
            No photos yet — click Add to upload.
          </p>
        ) : (
          <div className="grid grid-cols-3 gap-2">
            {attachments.map((a) => (
              <div
                key={a.id}
                className="group/img relative aspect-square overflow-hidden rounded-md border border-foreground/10"
              >
                {a.type.startsWith("image/") ? (
                  <img src={a.dataUrl} alt={a.name} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
                    <FileText className="h-5 w-5" />
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => removeAttachment(a.id)}
                  className="absolute top-1 right-1 rounded-full bg-background/90 p-1 opacity-0 group-hover/img:opacity-100 transition-opacity hover:bg-background"
                  aria-label="Remove"
                >
                  <Trash2 className="h-3 w-3 text-foreground/70" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function _ContactTab() {
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
              href="https://www.linkedin.com/in/ghosh-souporno/"
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
        {tab === "hobbies" && <HobbiesTab />}
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
              href="https://www.linkedin.com/in/ghosh-souporno/"
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