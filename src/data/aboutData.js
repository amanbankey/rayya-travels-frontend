import {
  Anchor,
  BedDouble,
  Building2,
  Bus,
  CircleCheck,
  Gem,
  Map,
  Network,
  Plane,
  Sailboat,
  ScrollText,
  ShieldCheck,
  Ship,
  SlidersHorizontal,
  Sparkles,
  Stamp,
  Ticket,
} from "lucide-react";
const img = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`;

export const trustCards = [
  {
    tag: "01 / Accreditation",
    icon: Ticket,
    title: "IATA Approved Ticketing",
    text: "Reliable and professional flight booking services with trusted industry standards.",
  },
  {
    tag: "02 / Personalization",
    icon: Sparkles,
    title: "Customized Travel Solutions",
    text: "Tailor-made domestic and international travel solutions designed around your preferences and budget.",
  },
  {
    tag: "03 / End-to-End",
    icon: Network,
    title: "Complete Travel Assistance",
    text: "From visas and hotel bookings to transportation and travel insurance, travel support is available under one roof.",
  },
  {
    tag: "04 / Transparency",
    icon: ScrollText,
    title: "Competitive Pricing",
    text: "Affordable travel packages and transparent pricing without hidden charges.",
  },
  {
    tag: "05 / Enterprise",
    icon: Anchor,
    title: "Corporate & Crew Expertise",
    text: "Specialized travel management solutions for corporate clients and shipping companies.",
  },
];

export const businessCards = [
  {
    icon: Building2,
    title: "Corporate Travel",
    text: "Streamlined solutions engineered for enterprise efficiency, policy adherence, and executive travelers.",
    tags: ["Business travel", "Meetings", "Conferences", "Employee travel", "Corporate coordination"],
  },
  {
    icon: Sailboat,
    title: "Crew Travel",
    text: "Time-critical flight management and seafarer ticket logistics for global maritime operations.",
    tags: ["Shipping companies", "Crew ticketing", "Urgent coordination", "International routing", "Ticket management"],
  },
];

export const aboutImages = {
  hero: img("photo-1566073771259-6a8506099945"),
  who: img("photo-1573496359142-b8d87734a5a2"),
  iata: img("photo-1436491865332-7a61a109cc05"),
};

export const whoStats = [
  { title: "Global", text: "Domestic & Worldwide Access" },
  { title: "Bespoke", text: "Client-Centric Tailoring" },
];

export const approachCards = [
  {
    number: "01",
    icon: SlidersHorizontal,
    title: "Personalized",
    text: "Travel solutions designed around individual preferences and requirements.",
    link: "Tailor-fit routes",
  },
  {
    number: "02",
    icon: ShieldCheck,
    title: "Reliable",
    text: "Professional assistance and dependable coordination throughout your journey.",
    link: "Constant oversight",
  },
  {
    number: "03",
    icon: CircleCheck,
    title: "Convenient",
    text: "Complete travel support designed to make travel planning simpler and stress-free.",
    link: "Unified workflow",
  },
];

export const iataPoints = [
  "Domestic flight booking",
  "International flight booking",
  "Fare selection assistance",
  "Travel coordination",
  "Corporate and crew travel support",
];

export const destinations = [
  {
    id: 1,
    image: img("photo-1524492412937-b28074a5d7da"),
    category: "Domestic Escapes",
    name: "India",
    text: "Heritage, Diversity & Timeless Splendor",
  },
  {
    id: 2,
    image: img("photo-1512453979798-5ea266f8880c"),
    category: "Middle East",
    name: "Dubai",
    text: "Modern Marvels & Luxury",
  },
  {
    id: 3,
    image: img("photo-1552465011-b4e21bf6e79a"),
    category: "Southeast Asia",
    name: "Thailand",
    text: "Tropical Paradise",
  },
  {
    id: 4,
    image: img("photo-1525625293386-3f8f99389edd"),
    category: "Metropolis",
    name: "Singapore",
    text: "City of Wonders",
  },
  {
    id: 5,
    image: img("photo-1499856871958-5b9627545d1a"),
    category: "Continental",
    name: "Europe",
    text: "Iconic Cities & Scenic Beauty",
  },
  {
    id: 6,
    image: img("photo-1537996194471-e657df975ab4"),
    category: "Island Sanctuary",
    name: "Bali",
    text: "Island Retreat",
  },
  {
    id: 7,
    image: img("photo-1596422846543-75c6fc197f07"),
    category: "Equatorial Wonders",
    name: "Malaysia",
    text: "Culture, Nature & Adventure",
    wide: true,
  },
];

export const visionTags = ["Trusted", "Customer-Focused", "Seamless", "Memorable", "Value-Driven"];

export const pillars = [
  { number: "01", title: "Comfort" },
  { number: "02", title: "Convenience" },
  { number: "03", title: "Reliability" },
  { number: "04", title: "Personalized Service" },
];

export const services = [
  { icon: Plane, label: "Flights" },
  { icon: Stamp, label: "Visa" },
  { icon: BedDouble, label: "Hotels" },
  { icon: Map, label: "Tours" },
  { icon: Building2, label: "Corporate" },
  { icon: Bus, label: "Transport" },
  { icon: Ship, label: "Crew Travel" },
  { icon: Gem, label: "Luxury Travel" },
];

export const office = {
  entity: "RAAYA TOUR & TRAVEL PVT. LTD.",
  address: "Unit 1737–1738, C-Block, Bhutani Alphathum, Sector 90, Noida (U.P.) – 201305, India",
  phone: "+91-9028849207",
  email: "booking@raayatravels.com",
  place: "Bhutani Alphathum, Sector 90, Noida",
  placeNote: "Corporate Office Tower C",
  mapUrl: "https://maps.google.com/maps?q=Bhutani+Alphathum+Sector+90+Noida&output=embed",
};