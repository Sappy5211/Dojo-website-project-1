export type CTA = { label: string; href: string };
export type NavItem = { label: string; href: string };
export type Value = { id: string; title: string; line: string; icon: string };
export type Person = {
  slug: string;
  name: string;
  role: string;
  specialism: string;
  bio: string;
  responsibility: string;
  linkedin: string;
  avatar?: string;
  initials: string;
};
export type Capability = { title: string; desc: string; sub: string[]; sectorsHref?: string };
export type FocusArea = { title: string; desc: string; icon: string };
export type Step = { id: string; title: string; desc: string };
export type Pressure = { title: string; desc: string; icon: string };
export type Sector = {
  slug: string;
  name: string;
  accent: string;
  hero: { eyebrow: string; statement: string };
  pressures: Pressure[];
  keyDecisions: { title: string; desc: string }[];
  howWeHelp: { challenge: string; capability: string; outcome: string }[];
  aiDataOpportunities: { opportunity: string; dataNote: string; oversightNote: string }[];
  relevantPeople: string[];
  relatedCapabilities: string[];
  cta: { heading: string; line: string; cta: CTA };
};

export const flags = { insightsEnabled: false };

export const brand = {
  name: "ENIRIQ",
  tagline: "‹energy transition, utilities, and applied AI advisory›",
  email: "‹hello@eniriq.com›",
  linkedin: "‹linkedin url›",
  location: "‹location›",
};

export const nav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "What We Do", href: "/what-we-do" },
  { label: "Sectors", href: "/sectors" },
  { label: "People", href: "/people" },
  { label: "Contact", href: "/contact" },
];

export const meta = {
  defaultDescription: "‹default ENIRIQ page description›",
  home: { title: "‹home page title›", description: "‹home page description›" },
  whatWeDo: { title: "‹what we do page title›", description: "‹what we do page description›" },
  sectors: { title: "‹sectors page title›", description: "‹sectors page description›" },
  people: { title: "‹people page title›", description: "‹people page description›" },
  contact: { title: "‹contact page title›", description: "‹contact page description›" },
  insights: { title: "‹insights page title›", description: "‹insights page description›" },
};

export const ui = {
  labels: {
    relatedSectors: "Related sectors →",
    explore: "Explore →",
    people: "People →",
    footerWhatWeDo: "What we do",
    footerCompany: "Company",
    footerContact: "Contact",
    legal: "‹legal placeholder›",
    home: "Home",
    formError: "‹required fields and email format message›",
    required: "‹required›",
    messageSent: "‹message sent confirmation›",
  },
  notFound: { eyebrow: "‹not found›", title: "‹page unavailable›" },
  values: { eyebrow: "‹values›", title: "‹six-node operating signature›" },
  homeSections: {
    whyEyebrow: "‹why now›",
    whyTitle: "‹why this matters now›",
    whyIntro: "‹context line about transition, data, infrastructure, and investment›",
    focusTitle: "‹focus areas title›",
    focusIntro: "‹exploration framed intro›",
    capabilityTitle: "‹what we do teaser title›",
    capabilityIntro: "‹capability teaser intro›",
    sectorIntro: "‹sector teaser intro›",
    methodTitle: "‹how we work teaser title›",
    methodIntro: "‹method teaser intro›",
  },
  whatWeDoSections: {
    heroEyebrow: "‹what we do›",
    pillarsTitle: "‹capability pillars›",
    pillarsIntro: "‹capability section intro›",
    aiEyebrow: "‹AI implementation layer›",
    aiTitle: "‹from problem to governed implementation›",
    methodTitle: "‹idea to implementation method›",
    methodIntro: "‹method intro›",
    engagementTitle: "‹engagement models›",
    engagementIntro: "‹engagement intro›",
    relatedTitle: "‹related sectors›",
    relatedIntro: "‹related sector intro›",
    ctaHeading: "‹what we do CTA heading›",
    ctaLine: "‹what we do CTA line›",
    pipelineStart: "‹start›",
    pipelineOutcome: "‹outcome›",
  },
  sectorsSections: {
    eyebrow: "‹sectors›",
    themesTitle: "‹cross-sector themes›",
    themesIntro: "‹themes intro›",
    decisionTitle: "‹sector decision map›",
    decisionIntro: "‹decision map intro›",
  },
  sectorDetailSections: {
    fallbackTitle: "‹sector page title›",
    fallbackDescription: "‹sector page description›",
    pressuresTitle: "‹sector pressures›",
    pressuresIntro: "‹sector pressure intro›",
    decisionsTitle: "‹key decisions this sector needs to make›",
    decisionsIntro: "‹key decision intro›",
    helpTitle: "‹how we help›",
    helpIntro: "‹how we help intro›",
    aiTitle: "‹AI/data opportunities›",
    aiIntro: "‹AI/data opportunity intro›",
    peopleTitle: "‹relevant people and capabilities›",
    peopleIntro: "‹relevant people intro›",
    helpCols: ["‹challenge›", "‹capability›", "‹outcome›"],
  },
  peopleSections: {
    eyebrow: "‹people›",
    leadershipTitle: "‹leadership›",
    leadershipIntro: "‹leadership intro›",
    responsibilityTitle: "‹areas of responsibility›",
    responsibilityIntro: "‹responsibility map intro›",
    philosophyTitle: "‹decision-making philosophy›",
    philosophyIntro: "‹philosophy intro›",
  },
  contactSections: {
    eyebrow: "‹contact›",
    routingTitle: "‹route the conversation›",
    routingIntro: "‹routing intro›",
    detailsTitle: "‹direct details›",
  },
  insightsSections: { eyebrow: "‹insights›" },
};

export const footer = {
  newsletterHeading: "‹stay connected›",
  newsletterBlurb: "‹short placeholder inviting people to stay in the loop on the transition›",
  emailPlaceholder: "‹your email›",
  linksHeading: "‹explore›",
  contactHeading: "‹contact›",
  followHeading: "‹follow us›",
  legalLinks: ["‹privacy policy›", "‹terms of service›", "‹cookie settings›"],
  linkedinTooltip: "‹connect on LinkedIn›",
  emailTooltip: "‹email us›",
};

export const people = {
  hero: {
    title: "‹people shaping practical transition decisions›",
    intro: "‹people-are-the-proof intro centered on judgement, responsibility, and implementation realism›",
  },
  leadership: [
    {
      slug: "leader-one",
      name: "‹Name›",
      role: "‹experienced sector leader›",
      specialism: "‹energy transition strategy›",
      bio: "‹short biography placeholder that waits for verified client detail›",
      responsibility: "energy transition strategy",
      linkedin: "‹linkedin url›",
      initials: "E1",
    },
    {
      slug: "leader-two",
      name: "‹Name›",
      role: "‹specialist in AI and digital implementation›",
      specialism: "‹AI & digital›",
      bio: "‹short biography placeholder that waits for verified client detail›",
      responsibility: "AI & digital",
      linkedin: "‹linkedin url›",
      initials: "E2",
    },
    {
      slug: "leader-three",
      name: "‹Name›",
      role: "‹responsible for guiding decisions in utilities operations›",
      specialism: "‹utilities operations›",
      bio: "‹short biography placeholder that waits for verified client detail›",
      responsibility: "utilities operations",
      linkedin: "‹linkedin url›",
      initials: "E3",
    },
  ] satisfies Person[],
  responsibilities: [
    "energy transition strategy",
    "AI & digital",
    "utilities operations",
    "regulation & policy",
    "capital/infrastructure",
    "commercial strategy",
  ],
  philosophy: [
    { title: "‹evidence-led judgement›", desc: "‹philosophy line›", icon: "Scale" },
    { title: "‹responsible innovation›", desc: "‹philosophy line›", icon: "ShieldCheck" },
    { title: "‹sector-informed thinking›", desc: "‹philosophy line›", icon: "Network" },
    { title: "‹implementation realism›", desc: "‹philosophy line›", icon: "Wrench" },
  ],
  advisoryNetwork: undefined,
};

const pressures: Pressure[] = [
  { title: "‹transition pressure›", desc: "‹pressure description›", icon: "Zap" },
  { title: "‹AI adoption pressure›", desc: "‹pressure description›", icon: "BrainCircuit" },
  { title: "‹legacy infrastructure pressure›", desc: "‹pressure description›", icon: "Cable" },
  { title: "‹regulatory and investment pressure›", desc: "‹pressure description›", icon: "Landmark" },
];

export const home = {
  hero: {
    eyebrow: "‹energy transition · utilities · AI›",
    h1Start: "‹mission line for a working",
    h1Accent: "clean-energy system",
    h1End: "›",
    subline: "‹supporting sentence about energy, data, decisions, and implementation›",
    primary: { label: "Talk to us", href: "/contact" },
    secondary: { label: "See what we do", href: "/what-we-do" },
    diagram: {
      eyebrow: "‹the Current›",
      title: "‹energy → data → AI-supported decision → implementation›",
      caption: "‹visual placeholder for the shared decision flow›",
      nodes: [
        { label: "‹Energy system›", desc: "‹short placeholder describing the energy system layer and what it represents in the flow›" },
        { label: "‹Data layer›", desc: "‹short placeholder describing the data layer that informs decisions›" },
        { label: "‹AI support›", desc: "‹short placeholder describing how AI supports human decisions, with oversight›" },
        { label: "‹Implementation›", desc: "‹short placeholder describing how decisions become delivered implementation›" },
      ],
    },
  },
  purpose: {
    title: "‹purpose title›",
    body: "‹2-3 sentence mission placeholder about helping complex energy organisations make better transition decisions›",
    belief: "‹optional belief line›",
  },
  pressures,
  values: [
    { id: "innovation", title: "‹Innovation›", line: "‹one-line value placeholder›", icon: "Lightbulb" },
    { id: "responsibility", title: "‹Responsibility›", line: "‹one-line value placeholder›", icon: "ShieldCheck" },
    { id: "practicality", title: "‹Practicality›", line: "‹one-line value placeholder›", icon: "Wrench" },
    { id: "sector", title: "‹Sector expertise›", line: "‹one-line value placeholder›", icon: "Network" },
    { id: "partnership", title: "‹Partnership›", line: "‹one-line value placeholder›", icon: "Handshake" },
    { id: "impact", title: "‹Long-term impact›", line: "‹one-line value placeholder›", icon: "Leaf" },
  ] satisfies Value[],
  peopleTeaser: {
    title: "‹people-led credibility title›",
    statement: "‹leadership statement placeholder›",
    peopleSlugs: ["leader-one", "leader-two", "leader-three"],
  },
  focusAreas: [
    { title: "‹transition strategy›", desc: "‹exploration-framed focus area›", icon: "Compass" },
    { title: "‹AI and data adoption›", desc: "‹exploration-framed focus area›", icon: "BrainCircuit" },
    { title: "‹operating model design›", desc: "‹exploration-framed focus area›", icon: "Workflow" },
    { title: "‹sector decision support›", desc: "‹exploration-framed focus area›", icon: "GitBranch" },
  ],
  capabilitiesTeaser: [
    { title: "‹strategy and prioritisation›", desc: "‹capability description›", sub: ["‹sub-capability›", "‹sub-capability›"], sectorsHref: "/sectors" },
    { title: "‹data and workflow design›", desc: "‹capability description›", sub: ["‹sub-capability›", "‹sub-capability›"], sectorsHref: "/sectors" },
    { title: "‹AI implementation support›", desc: "‹capability description›", sub: ["‹sub-capability›", "‹sub-capability›"], sectorsHref: "/sectors" },
  ] satisfies Capability[],
  sectorsTeaser: {
    title: "‹sector pathways title›",
    sectorSlugs: ["electricity-networks", "water-utilities", "renewable-developers"],
  },
  howWeWorkTeaser: [
    { id: "understand", title: "‹Understand›", desc: "‹method placeholder›" },
    { id: "diagnose", title: "‹Diagnose›", desc: "‹method placeholder›" },
    { id: "design", title: "‹Design›", desc: "‹method placeholder›" },
    { id: "guide", title: "‹Guide implementation›", desc: "‹method placeholder›" },
  ] satisfies Step[],
  closingCTA: {
    heading: "‹closing CTA heading›",
    line: "‹closing CTA line›",
    cta: { label: "Talk to us", href: "/contact" },
  },
};

export const whatWeDo = {
  hero: {
    title: "‹what ENIRIQ helps organisations do›",
    intro: "‹intro to the capability model and AI implementation spine›",
    cta: { label: "Talk to us", href: "/contact" },
  },
  capabilityPillars: [
    ...home.capabilitiesTeaser,
    { title: "‹implementation readiness›", desc: "‹capability description›", sub: ["‹sub-capability›", "‹sub-capability›"], sectorsHref: "/sectors" },
    { title: "‹responsible adoption›", desc: "‹capability description›", sub: ["‹sub-capability›", "‹sub-capability›"], sectorsHref: "/sectors" },
  ] satisfies Capability[],
  aiImplementationLayer: {
    intro: "‹explanation of how business problems become data-informed, human-governed implementation choices›",
    layers: ["Business problem", "Data sources", "Workflow design", "AI support", "Human decision", "Implementation", "Outcome measurement"],
  },
  method: [
    { id: "discover", title: "‹Discover›", desc: "‹method placeholder›" },
    { id: "prioritise", title: "‹Prioritise›", desc: "‹method placeholder›" },
    { id: "design", title: "‹Design›", desc: "‹method placeholder›" },
    { id: "implement", title: "‹Implement›", desc: "‹method placeholder›" },
    { id: "measure", title: "‹Measure›", desc: "‹method placeholder›" },
  ] satisfies Step[],
  engagementModels: [
    { title: "‹advisory sprint›", desc: "‹engagement placeholder›" },
    { title: "‹strategy project›", desc: "‹engagement placeholder›" },
    { title: "‹implementation support›", desc: "‹engagement placeholder›" },
    { title: "‹ongoing partnership›", desc: "‹engagement placeholder›" },
  ],
  relatedSectors: ["electricity-networks", "gas-distribution", "water-utilities"],
};

const makeSector = (slug: string, name: string, accent: string): Sector => ({
  slug,
  name,
  accent,
  hero: { eyebrow: "‹sector pathway›", statement: "‹sector-specific statement placeholder›" },
  pressures,
  keyDecisions: [
    { title: "‹decision area›", desc: "‹decision description›" },
    { title: "‹decision area›", desc: "‹decision description›" },
    { title: "‹decision area›", desc: "‹decision description›" },
  ],
  howWeHelp: [
    { challenge: "‹challenge›", capability: "‹relevant capability›", outcome: "‹outcome placeholder›" },
    { challenge: "‹challenge›", capability: "‹relevant capability›", outcome: "‹outcome placeholder›" },
    { challenge: "‹challenge›", capability: "‹relevant capability›", outcome: "‹outcome placeholder›" },
  ],
  aiDataOpportunities: [
    { opportunity: "‹opportunity›", dataNote: "‹data/workflow note›", oversightNote: "‹human oversight note›" },
    { opportunity: "‹opportunity›", dataNote: "‹data/workflow note›", oversightNote: "‹human oversight note›" },
  ],
  relevantPeople: ["leader-one", "leader-two"],
  relatedCapabilities: ["‹strategy and prioritisation›", "‹AI implementation support›"],
  cta: { heading: "‹sector CTA heading›", line: "‹sector CTA line›", cta: { label: "Talk to us", href: "/contact" } },
});

export const sectors = {
  landing: {
    hero: { title: "‹sector-specific decisions need sector-specific thinking›", intro: "‹each sector faces different decisions placeholder›" },
    crossThemes: ["Decarbonisation", "Asset resilience", "Data quality", "AI adoption", "Regulation", "Capital delivery"],
    decisionMap: [
      { title: "‹cross-sector decision›", desc: "‹decision note›" },
      { title: "‹cross-sector decision›", desc: "‹decision note›" },
      { title: "‹cross-sector decision›", desc: "‹decision note›" },
    ],
  },
  sectorList: [
    makeSector("electricity-networks", "‹Electricity networks›", "#16A34A"),
    makeSector("gas-distribution", "‹Gas distribution›", "#10B981"),
    makeSector("water-utilities", "‹Water utilities›", "#38BDF8"),
    makeSector("renewable-developers", "‹Renewable developers›", "#22C55E"),
    makeSector("energy-retailers", "‹Energy retailers›", "#14B8A6"),
    makeSector("infrastructure-investors", "‹Infrastructure investors›", "#0EA5E9"),
    makeSector("public-sector", "‹Public sector›", "#D9A441"),
  ] satisfies Sector[],
};

export const contact = {
  hero: { title: "‹start a practical conversation›", line: "‹one line about routing the right conversation›" },
  routingOptions: ["‹discuss strategy›", "‹discuss AI/digital›", "‹discuss a sector challenge›", "‹speak to a specific person›"],
  formFields: {
    name: "Name",
    organisation: "Organisation",
    email: "Email",
    sector: "Sector",
    area: "Area of interest",
    message: "Message",
    submit: "Send",
    nameError: "‹name is required›",
    emailError: "‹enter a valid email address›",
    messageError: "‹message is required›",
  },
  directDetails: { email: brand.email, linkedin: brand.linkedin, location: brand.location },
  reassurance: "‹what happens next›",
  directLabels: { email: "‹email›", linkedin: "‹linkedin›", location: "‹location›" },
};

export const insights = {
  hero: { title: "‹insights title›", intro: "‹insights intro›" },
  featured: { category: "‹category›", title: "‹featured insight title›", excerpt: "‹excerpt›", readTime: "‹read time›" },
  articles: [
    { category: "‹category›", title: "‹article title›", excerpt: "‹excerpt›", readTime: "‹read time›" },
    { category: "‹category›", title: "‹article title›", excerpt: "‹excerpt›", readTime: "‹read time›" },
  ],
  topics: ["‹topic›", "‹topic›", "‹topic›"],
};

export function getPeopleBySlugs(slugs: string[]) {
  return people.leadership.filter((person) => slugs.includes(person.slug));
}

export function getSectorBySlug(slug: string) {
  return sectors.sectorList.find((sector) => sector.slug === slug);
}
