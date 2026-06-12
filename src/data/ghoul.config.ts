/**
 * Ghoul Site Configuration
 */

export interface CrossLink {
  id: string;
  name: string;
  domain: string;
  icon: string;
  color: string;
  realm: string;
  live: boolean;
}

export interface Product {
  name: string;
  tagline: string;
  description: string;
  category: 'core' | 'pro' | 'tool' | 'refill' | 'limited';
  volume: string;
  price: string;
  features: string[];
  heroIngredient?: string;
}

export interface GhoulConfig {
  id: string;
  name: string;
  tagline: string;
  description: string;
  domain: string;
  icon: string;
  isLeader: boolean;
  products: Product[];
  crossLinks: CrossLink[];
  cta: {
    headline: string;
    subheadline: string;
    buttonText: string;
    placeholderText: string;
  };
  gameUrl: string;
  social: {
    twitter?: string;
    instagram?: string;
    youtube?: string;
  };
  science: {
    title: string;
    subtitle: string;
    description: string;
    adaptation: string;
    stats: { label: string; value: string }[];
  };
  marketSize: string;
  traction: { label: string; value: string; status: 'complete' | 'in-progress' | 'upcoming' }[];
  ipStatus: string;
  ipClasses: string[];
  roadmap: { phase: string; title: string; items: string[]; status: 'complete' | 'in-progress' | 'upcoming' }[];
  fundingAsk: string;
  valuation: string;
  equityOffered: string;
  projectedRevenue: { year: string; amount: string; sources: string }[];
  roiTarget: string;
  partnerships: { type: string; description: string }[];
  revenueStreams: { stream: string; description: string; timeline: string }[];
}

export const config: GhoulConfig = {
  id: "teen",
  name: "TEEN GHOUL",
  tagline: "Attitude & Altitude",
  description: "The teen lifestyle vertical — grooming, room culture, study accessories, and self-expression without judgment.",
  domain: "https://www.teenghoul.com",
  icon: "🎧",
  isLeader: false,

  products: [
    {
      name: "Room Refresh Bomb",
      tagline: "One spray. Zero evidence.",
      description: "Aerosol-free fine mist that neutralises odors in bedrooms, gaming setups, and shared living spaces. Not a cover-up – a molecular reset.",
      category: "core",
      volume: "400ml",
      price: "$18.99 AUD",
      features: ["Aerosol-free", "Molecular reset", "Long-lasting"],
      heroIngredient: "Nano-Zyme Amplifiers™",
    },
    {
      name: "Acne-Safe Surface Cleaner",
      tagline: "Clean surfaces. Clear skin.",
      description: "Non-comedogenic surface spray for bathroom counters, mirrors, and makeup stations. Kills bacteria that contribute to breakouts without irritating sensitive skin.",
      category: "core",
      volume: "300ml",
      price: "$16.99 AUD",
      features: ["Non-comedogenic", "Bacteria kill", "Mirror streak-free"],
      heroIngredient: "Nano-Zyme Amplifiers™",
    },
    {
      name: "Gaming Chair Deodorizer",
      tagline: "Your throne deserves respect.",
      description: "Targeted spray for fabric and leather gaming chairs. Breaks down sebum, sweat, and snack residue that accumulates during marathon sessions.",
      category: "core",
      volume: "250ml",
      price: "$15.99 AUD",
      features: ["Fabric safe", "Leather safe", "Sebum breaker"],
      heroIngredient: "Nano-Zyme Amplifiers™",
    },
    {
      name: "Snack Residue Lifter",
      tagline: "Cheeto dust, defeated.",
      description: "Pre-treatment for clothing, couch cushions, and carpet hit by grease, sauce, and powdery snack residue. Works on the toughest adolescent snacking casualties.",
      category: "pro",
      volume: "200ml",
      price: "$14.99 AUD",
      features: ["Grease specialist", "Couch safe", "Fast acting"],
      heroIngredient: "Nano-Zyme Amplifiers™",
    },
    {
      name: "Locker Freshener",
      tagline: "Open it without regret.",
      description: "Compact gel pod that absorbs moisture and neutralises odors in school lockers, gym bags, and gym shoes. Lasts 30 days.",
      category: "pro",
      volume: "2 Pack",
      price: "$9.99 AUD",
      features: ["30-day life", "Moisture absorbing", "Compact"],
      heroIngredient: "Nano-Zyme Amplifiers™",
    },
    {
      name: "Desk Organiser",
      tagline: "A place for everything.",
      description: "Modular desk organiser with cable management, phone stand, and cleaning supply compartment. Built for gaming and study setups.",
      category: "tool",
      volume: "Organiser",
      price: "$34.99 AUD",
      features: ["Cable management", "Phone stand", "Modular"],
    },
    {
      name: "The Hangout Kit",
      tagline: "Everything for the room reset.",
      description: "Branded tote with full-size Room Refresh Bomb, Gaming Chair Deodorizer, and microfiber cloths. The complete teen cleaning arsenal.",
      category: "tool",
      volume: "Kit",
      price: "$44.99 AUD",
      features: ["Branded tote", "Full sizes", "Microfiber cloths"],
    },
    {
      name: "Room Refresh Refill",
      tagline: "Refill the attitude.",
      description: "Concentrated refill for the Room Refresh Bomb. Same molecular reset power in a sleek aluminum bottle.",
      category: "refill",
      volume: "600ml",
      price: "$21.99 AUD",
      features: ["Aluminum bottle", "2x refills", "Sleek design"],
      heroIngredient: "Nano-Zyme Amplifiers™",
    },
    {
      name: "Back-to-School Bundle",
      tagline: "Limited. Like your patience.",
      description: "Everything a teen needs to start the year fresh: all core products plus the Locker Freshener and Desk Organiser. Limited run.",
      category: "limited",
      volume: "Bundle",
      price: "$59.99 AUD",
      features: ["Limited run", "Full arsenal", "Gift-ready"],
      heroIngredient: "Nano-Zyme Amplifiers™",
    },
  ],

  crossLinks: [
    {
      id: "ghoulverse",
      name: "GHOULVERSE",
      domain: "https://www.ghoulverse.com",
      icon: "🌌",
      color: "#00f0ff",
      realm: "The Universe",
      live: true,
    },
    {
      id: "goo",
      name: "GOO GHOUL",
      domain: "https://www.ghoulverse.com/ghouls/goo/",
      icon: "👻",
      color: "#00f0ff",
      realm: "The Origin",
      live: true,
    },
    {
      id: "party",
      name: "PARTY GHOUL",
      domain: "https://www.partyghoul.com",
      icon: "🎉",
      color: "#ff00ff",
      realm: "The Neon District",
      live: true,
    },
    {
      id: "beauty",
      name: "BEAUTY GHOUL",
      domain: "https://www.beautyghoul.com",
      icon: "💄",
      color: "#ec4899",
      realm: "The Glamour Dimension",
      live: true,
    },
    {
      id: "garden",
      name: "GARDEN GHOUL",
      domain: "https://www.gardenghoul.com",
      icon: "🌿",
      color: "#22c55e",
      realm: "The Verdant Wilds",
      live: true,
    },
    {
      id: "zen",
      name: "ZEN GHOUL",
      domain: "https://www.zenghoul.com",
      icon: "🧘",
      color: "#a855f7",
      realm: "The Tranquil Gardens",
      live: true,
    },
    {
      id: "tradie",
      name: "TRADIE GHOUL",
      domain: "https://www.tradieghoul.com",
      icon: "🔧",
      color: "#eab308",
      realm: "The Industrial Wastes",
      live: true,
    },
    {
      id: "geek",
      name: "GEEK GHOUL",
      domain: "https://www.geekghoul.com",
      icon: "💻",
      color: "#00d4ff",
      realm: "The Mainframe",
      live: true,
    },
    {
      id: "sport",
      name: "SPORT GHOUL",
      domain: "https://www.ghoulverse.com/ghouls/sport/",
      icon: "🏆",
      color: "#f97316",
      realm: "The Arena",
      live: false,
    },
    {
      id: "googoo",
      name: "GOO GOO",
      domain: "https://www.googooghoul.com",
      icon: "🍼",
      color: "#3b82f6",
      realm: "The Nursery",
      live: true,
    },
    {
      id: "kid",
      name: "KID GHOUL",
      domain: "https://www.kidghoul.com",
      icon: "🧒",
      color: "#ef4444",
      realm: "The Playground",
      live: true,
    },
    {
      id: "teen",
      name: "TEEN GHOUL",
      domain: "https://www.teenghoul.com",
      icon: "🎧",
      color: "#8b5cf6",
      realm: "The Hangout",
      live: true,
    },
    {
      id: "scholar",
      name: "BOOK GHOUL",
      domain: "https://www.ghoulverse.com/ghouls/scholar/",
      icon: "📚",
      color: "#f97316",
      realm: "The Infinite Library",
      live: false,
    },
  ],

  cta: {
    headline: "Investor Inquiries",
    subheadline: "Join the GHOULVERSE portfolio. Request the full investor deck and financial projections.",
    buttonText: "Request Deck",
    placeholderText: "Enter your email...",
  },

  gameUrl: "https://www.ghoulverse.com/play/",

  social: {
    // Social accounts launching Q2 2026 — follow @ghoulverse
  },

  science: {
    title: "The Science",
    subtitle: "Nano-Zyme Amplifiers™",
    description: "Every TEEN GHOUL product deploys Nano-Zyme Amplifiers™ – microscopic enzymatic clusters that identify and dismantle specific organic compounds at the molecular level. Grease from pizza? Sebum on a gaming chair? These nano-enzymes seek, bind, and destroy – without stripping finishes or leaving residue behind.",
    adaptation: "For the Hangout, we focus on non-irritating, straightforward formulations that fit into busy routines and sensitive spaces without overcomplicating self-care.",
    stats: [
      { label: "Reaction Time", value: "<60s" },
      { label: "Target Precision", value: "99.7%" },
      { label: "Finish Safe", value: "100%" },
      { label: "Cool Factor", value: "Maximum" },
    ],
  },

  marketSize: "$260B global teen & young adult consumer market",
  traction: [
    { label: "Character Websites", value: "10 Live", status: "complete" },
    { label: "GOO GHOUL™ Trademark", value: "IP Australia — Accepted", status: "complete" },
    { label: "GHOULVERSE Game", value: "Live", status: "complete" },
    { label: "Brand Partnerships", value: "Seeking First Deals", status: "upcoming" },
  ],
  ipStatus: "Trademark classes identified — Class 3 (cleaning preparations), Class 21 (household utensils), and Class 35 (retail services). Filing planned post-funding.",
  ipClasses: [
    "Class 3 – Cleaning preparations, deodorants & stain removers",
    "Class 21 – Household utensils, organisers & cleaning tools",
    "Class 35 – Retail store services & brand licensing",
    "Class 25 – Apparel, accessories & branded merchandise",
  ],
  roadmap: [
    { phase: "Phase 1", title: "Foundation", items: ["12 character websites live", "GOO GHOUL™ Class 3 (AU) filed", "GHOULVERSE game launched"], status: "complete" },
    { phase: "Phase 1.5", title: "International IP", items: ["US trademark via Madrid Protocol", "EU trademark filing", "Defensive name registrations"], status: "in-progress" },
    { phase: "Phase 2", title: "Mascot Creation", items: ["24 professional mascots (2 per ghoul)", "$120K investment across 12 characters"], status: "upcoming" },
    { phase: "Phase 3", title: "Partnerships & Revenue", items: ["Sector sponsorships", "Affiliate deals", "Event appearances", "Influencer recruitment"], status: "upcoming" },
    { phase: "Phase 4", title: "Entertainment Scale", items: ["Animated series pilot", "Convention circuit", "Merchandise licensing"], status: "upcoming" },
    { phase: "Phase 5", title: "Product Launch", items: ["GOO GHOUL flagship household line", "Vertical-specific owned product lines"], status: "upcoming" },
  ],

  fundingAsk: "$250,000 AUD",
  valuation: "$1,250,000 pre-money",
  equityOffered: "20%",
  projectedRevenue: [
    { year: "Year 1", amount: "$200,000", sources: "Brand sponsorships, event appearances, affiliate commissions" },
    { year: "Year 2", amount: "$560,000", sources: "Licensing, events, merch royalties, content" },
    { year: "Year 3", amount: "$1,200,000", sources: "Full licensing engine + product sales" },
  ],
  roiTarget: "5–8x over 3–5 years (40–70% IRR)",
  partnerships: [
    { type: "Brand Sponsorships", description: "Existing companies in each vertical pay to associate with our character IP at events and online." },
    { type: "Affiliate Marketing", description: "Partner products featured on ghoul websites — we earn commission on referred sales." },
    { type: "Event Appearances", description: "Mascots appear at sports events, conventions, retail launches — appearance fees + brand exposure." },
    { type: "Licensing", description: "Brands license ghoul characters for their own marketing, packaging, and promotions." },
  ],
  revenueStreams: [
    { stream: "Sponsorships", description: "Sector-specific brand deals per ghoul", timeline: "Year 1" },
    { stream: "Events", description: "Mascot appearances and activations", timeline: "Year 1" },
    { stream: "Affiliate", description: "Commission on partner product sales", timeline: "Year 1" },
    { stream: "Licensing", description: "Character IP licensing to brands", timeline: "Year 2" },
    { stream: "Merchandise", description: "Royalties on plush, apparel, accessories", timeline: "Year 2" },
    { stream: "Animation", description: "YouTube/streaming ad revenue, distribution deals", timeline: "Year 2" },
    { stream: "Products", description: "Owned product lines launched per vertical, starting with GOO GHOUL", timeline: "Year 3" },
  ],
};
