const img = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=80`;

export const heroImage = img("photo-1548013146-72479768bada");

export const portals = [
  {
    id: 1,
    image: img("photo-1533105079780-92b9be482077"),
    rating: "4.9",
    label: "Architectural Heritage",
    tag: "Signature Departure",
    tagStyle: "dark",
    location: "Campania, Italy",
    title: "Amalfi Coastline Villas",
    text: "Privately chartered motor yacht access, citrus grove cloisters, and cliffside terraces.",
    season: "Autumn Manifest",
  },
  {
    id: 2,
    image: img("photo-1528360983277-13d401cdc186"),
    rating: "5.0",
    label: "Imperial Legacy",
    tag: "Curated Itinerary",
    tagStyle: "light",
    location: "Kansai, Japan",
    title: "Kyoto Forest Sanctuaries",
    text: "Exclusive after-hours temple access, private tea masters, and moss garden retreats.",
    season: "Winter Equinox",
  },
  {
    id: 3,
    image: img("photo-1537996194471-e657df975ab4"),
    rating: "4.9",
    label: "Royal Enclave",
    tag: "Instant Confirmation",
    tagStyle: "light",
    location: "Lombardy, Italy",
    title: "Lake Como Grand Estates",
    text: "Historic palatial residences with private water-gate, personal boat captains, and gardens.",
    season: "Spring Resurgence",
  },
  {
    id: 4,
    image: img("photo-1524231757912-21f4fe3a7200"),
    rating: "4.9",
    label: "Ancient Troglodyte",
    tag: "Bespoke Journey",
    tagStyle: "badge",
    location: "Anatolia, Turkey",
    title: "Cappadocia Valley Trove",
    text: "Private balloon takeoff, Byzantine underground cellars, and cave-suite hospitality.",
    season: "Early Summer",
  },
];

export const trunks = [
  {
    id: 1,
    image: img("photo-1570077188670-e3a8d69ac5ff"),
    chip: "P",
    folio: "082",
    meta: "7 Days • 6 Nights • Private Charter",
    title: "The Cycladic Archipelagic Voyage",
    text: "Navigate the hidden small Cyclades aboard a bespoke wooden schooner, anchored nightly in private coves accompanied by private archaeological guides.",
    features: [
      { icon: "Anchor", label: "Full Crew & Chef" },
      { icon: "Plane", label: "Heli-Transfer" },
      { icon: "Crown", label: "VIP Manifest" },
    ],
    tag: "Priority Manifest",
    tagStyle: "badge",
  },
  {
    id: 2,
    image: img("photo-1539020140153-e479b8c22e70"),
    chip: "",
    folio: "114",
    meta: "9 Days • 8 Nights • Private Estate",
    title: "High Atlas & Ocher Palaces",
    text: "A transcendent passage linking secret riads of Marrakech with secluded Berber stone pavilions tucked along the snow-capped Atlas crests.",
    features: [
      { icon: "Droplets", label: "Private Hammam" },
      { icon: "Car", label: "4x4 Chauffeur" },
      { icon: "Palette", label: "Art Curators" },
    ],
    tag: "Curated Itinerary",
    tagStyle: "badge",
  },
  {
    id: 3,
    image: img("photo-1506905925346-21bda4d32df4"),
    chip: " ",
    folio: "047",
    meta: "4 Days • 3 Nights • Mountain Lodge",
    title: "Engadine Alpine Seclusion",
    text: "Restorative seclusion amidst larch forests and high mountain passes, featuring spring-water baths, private ski-guides, and fireside masterclasses.",
    features: [
      { icon: "Waves", label: "Thermal Waters" },
      { icon: "Compass", label: "Private Guide" },
      { icon: "Wine", label: "Grand Cru Cellar" },
    ],
    tag: "Bespoke Journey",
    tagStyle: "badge",
  },
];

export const flights = [
  {
    id: 1,
    aircraft: "Bombardier Global 7500",
    kind: "Non-Stop Transatlantic Flight",
    manifest: "902-RY",
    from: { code: "JFK", city: "New York, US", detail: "Teterboro VIP Apron " },
    to: { code: "CDG", city: "Paris, FR", detail: "Le Bourget Private " },
    duration: "7h 25m Direct",
    route: "Sub-Stratospheric",
    perks: [
      { icon: "Bed", label: "Private Stateroom Suite" },
      { icon: "Utensils", label: "Michelin Tasting Menu" },
      { icon: "Briefcase", label: "4 Manifest Bags Included" },
    ],
    status: "Priority Manifest",
    note: "Fast-track border immigration clearance pre-arranged with French diplomatic protocol.",
  },
  {
    id: 2,
    aircraft: "Gulfstream G700",
    kind: "Indian Ocean Sky Corridor",
    manifest: "411-RY",
    from: { code: "DXB", city: "Dubai, UAE", detail: "Al Maktoum FBO " },
    to: { code: "SIN", city: "Singapore, SG", detail: "Seletar Airport FBO" },
    duration: "7h 10m Direct",
    route: "Quiet Jetway",
    perks: [
      { icon: "Wifi", label: "Ka-Band Global Satellite" },
      { icon: "Crown", label: "Queen Berth Conversion" },
      { icon: "Sparkles", label: "En-Suite Freshening" },
    ],
    status: "Signature Departure",
    note: "Pre-cleared diplomatic seal protocol with Singapore Immigration & Checkpoints Authority.",
  },
];

export const folios = [
  {
    id: 1,
    icon: "Globe",
    region: "European Union",
    title: "Schengen Multi-Year Diplomatic",
    text: "Comprehensive consular protocol expediting 3-to-5 year multi-entry visas across 27 sovereign European territories with biometric home visits.",
    steps: ["Dossier Review", "Consular Filing", "Passport Courier"],
    details: [
      { label: "Standard Turnaround", value: "72 Hours Expedited" },
      { label: "In-Person Biometrics", value: "Private Residence Atelier" },
    ],
    status: "Instant Confirmation",
  },
  {
    id: 2,
    icon: "Landmark",
    region: "Imperial Japan",
    title: "Cultural Connoisseur Entry",
    text: "Extended stay clearance for preservation patrons, private collectors, and architectural researchers sponsored by authorized cultural foundations.",
    steps: ["Heritage Sponsorship", "Ministry Endorsement", "Issuance"],
    details: [
      { label: "Standard Turnaround", value: "5 Business Days" },
      { label: "Stay Duration", value: "Up to 180 Days Continuous" },
    ],
    status: "Bespoke Journey",
  },
  {
    id: 3,
    icon: "Building2",
    region: "United Arab Emirates",
    title: "10-Year Sovereign Golden Visa",
    text: "Full legal architecture for real estate investors, venture innovators, and eminent Emirates VIP biometric clinic escorts.",
    steps: ["Asset Audit", "ICP Submission", "Card Delivery"],
    details: [
      { label: "Standard Turnaround", value: "4 Days Complete" },
      { label: "Family Sponsorship", value: "Unlimited Dependents" },
    ],
    status: "Priority Manifest",
  },
];

export const provenance = {
  image: img("photo-1523531294919-4bcd7c65e216"),
  doctrine: "",
  imageTitle: "",
  imageText: "We reject high-frequency tourism in favor of slow, permanent spatial beauty and deep human provenance.",
  eyebrow: "",
  title: "Curating what cannot be booked online.",
  text: "Every itinerary begins with an empty parchment and your personal rhythm. Raaya maintains direct keys to private historic palazzos, uncharted archipelago reserves, and diplomatic consular corridors inaccessible to standard agents.",
  cards: [
    {
      icon: "Plane",
      title: "Private Aviation Alliances",
      text: "Direct apron access with fully-heavy-jet operators, guaranteed tail numbers, tailored culinary provisions, and discrete passenger flight.",
    },
    {
      icon: "Landmark",
      title: "Conservation Sanctuaries",
      text: "Stays restricted to heritage-listed estates and ancient restored monuments that celebrate indigenous quietude and sustainable stewardship.",
    },
  ],
};

export const testimonial = [
  {
    image: img("photo-1712425718137-491250cfde88"),
    badge: "Verified Traveller",
    quote:
      "Raaya booked my Mumbai to Dubai family trip with confirmed seats together and a smooth baggage plan. When our dates changed, the team rescheduled the tickets within hours without any hidden charges.",
    name: "Rahul Sharma",
    meta: "Mumbai, Maharashtra • Customer since 2021",
    status: "Family Journey",
  },
  {
    image: img("photo-1768221677463-191fc4e15690"),
    badge: "Verified Traveller",
    quote:
      "From the visa documents to the Delhi to London flight, everything was handled before I even asked. The fares were transparent and the whole process felt effortless for my business trip.",
    name: "Ananya Mehta",
    meta: "New Delhi • Customer since 2019",
    status: "Business Travel",
  },
  {
    image: img("photo-1670110531916-41045e83cb0a"),
    badge: "Verified Traveller",
    quote:
      "Our crew change across three ports could have been chaos. Instead every flight, transfer and visa was confirmed days ahead of schedule, with support available whenever we needed it.",
    name: "Captain Arjun Nair",
    meta: "Kochi, Kerala • Customer since 2022",
    status: "Crew Travel",
  },
];

export const essays = [
  {
    id: 1,
    image: img("photo-1601581875309-fafbf2d3ed3a"),
    category: "",
    read: "",
    title: "The Poetics of Cycladic Architecture",
    text: "Why the lime-plastered geometries of the Aegean islands continue to dictate modern notions of spatial calm.",
  },
  {
    id: 2,
    image: img("photo-1545569341-9eb8b30979d9"),
    category: "Monograph",
    read: "12 Min Read",
    title: "Slow Travel Across the Kyoto Hills",
    text: "Mapping century-old cedar trails, family-owned shoyu distilleries, and the enduring pleasure of unhurried walking.",
  },
  {
    id: 3,
    image: img("photo-1591017403286-fd8493524e1e"),
    category: "Conservation",
    read: "6 Min Read",
    title: "In Defense of Historic Palazzos",
    text: "How discerning travelers become custodians of fragile European stone through thoughtful, low-impact private stays.",
  },
];