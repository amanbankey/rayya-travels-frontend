import {
  BriefcaseBusiness,
  ClipboardCheck,
  Hotel,
  Mail,
  MapPin,
  Phone,
  Plane,
  PlaneTakeoff,
  Ship,
} from "lucide-react";
import { office } from "./aboutData";

const img = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=80`;

export const contactImages = {
  hero: img("photo-1540962351504-03099e0a754b"),
  inquiry: img("photo-1618221195710-dd6b41faaea6"),
};

export const contactInfo = {
  ...office,
  hours: "Monday – Saturday: 10:00 AM – 7:00 PM IST",
  mapsLink: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Bhutani Alphathum Sector 90 Noida")}`,
  mapEmbed: "https://maps.google.com/maps?q=Bhutani+Alphathum+Sector+90+Noida&output=embed",
};

export const contactCards = [
  {
    icon: Phone,
    label: "Call us directly",
    value: contactInfo.phone,
    text: "Direct access to our senior reservation coordinators for urgent bookings or queries.",
    action: "Call now",
    href: `tel:${contactInfo.phone}`,
  },
  {
    icon: Mail,
    label: "Email desk",
    value: contactInfo.email,
    text: "Send your detailed travel folios, flight rosters, or group quotation dossiers anytime.",
    action: "Send email",
    href: `mailto:${contactInfo.email}`,
  },
  {
    icon: MapPin,
    label: "Head office",
    value: "Noida, Uttar Pradesh",
    text: "Unit 1737–1738, C-Block, Bhutani Alphathum, Sector 90, Noida – 201305.",
    action: "View office details",
    href: "#office",
  },
];

export const serviceOptions = [
  { value: "flights", label: "Flight Booking" },
  { value: "visa", label: "Visa Assistance" },
  { value: "packages", label: "Curated Packages" },
  { value: "hotels", label: "Hotels & Resorts" },
  { value: "corporate", label: "Corporate Travel" },
  { value: "crew", label: "Crew & Marine Travel" },
];

export const travellerOptions = ["1 Adult", "2 Adults"];

export const pathways = [
  {
    value: "flights",
    icon: PlaneTakeoff,
    title: "Flight Booking",
    text: "Commercial and private aviation itineraries.",
  },
  {
    value: "visa",
    icon: ClipboardCheck,
    title: "Visa Assistance",
    text: "Meticulous documentation support, diplomatic clearances, and appointment coordination.",
  },
  {
    value: "packages",
    icon: Plane,
    title: "Curated Packages",
    text: "Quiet-luxury holiday folios.",
  },
  {
    value: "hotels",
    icon: Hotel,
    title: "Hotels & Resorts",
    text: "Bespoke private estates, heritage sanctuaries, and distinguished luxury accommodations.",
  },
  {
    value: "corporate",
    icon: BriefcaseBusiness,
    title: "Corporate Travel",
    text: "Executive business mobility, group itineraries, and flexible policy management.",
  },
  {
    value: "crew",
    icon: Ship,
    title: "Crew & Marine Travel",
    text: "Time-critical rotation ticketing for shipping vessels, technical crews, and logistics teams.",
  },
];


export const channels = [
  {
    tag: "Channel 01 • Direct Voice",
    title: "By Phone",
    text: "Direct phone communication for immediate flight quotes or rapid travel assistance.",
    value: contactInfo.phone,
    action: "Call Our Team",
    href: `tel:${contactInfo.phone}`,
    primary: false,
  },
  {
    tag: "Channel 02 • Digital Desk",
    title: "By Email",
    text: "Attach itineraries, passenger spreadsheets, or complex multi-city schedules for quotation.",
    value: contactInfo.email,
    action: "Send an Email",
    href: `mailto:${contactInfo.email}`,
    primary: false,
  },
  {
    tag: "Channel 03 • Dedicated Desk",
    title: "Inquiry Desk",
    text: "Fill our streamlined inquiry form above to receive an end-to-end bespoke journey draft.",
    value: "Online Itinerary Briefing",
    action: "Complete Inquiry Desk",
    href: "#inquiry",
    primary: true,
  },
];

export const faqs = [
  {
    question: "How can I request a flight booking?",
    answer:
      "Fill the inquiry form with your route, dates and number of travellers, or call our reservation desk. A travel specialist will share the best available fares and complete the booking once you confirm.",
  },
  {
    question: "Can Raaya Travels help with visa applications?",
    answer:
      "Yes. We guide you through documentation, appointment scheduling and submission for a wide range of destinations. Approval remains at the discretion of the respective consulate.",
  },
  {
    question: "Can I request a customized holiday package?",
    answer:
      "Absolutely. Share your destination, budget, travel dates and preferences, and we will design a personalized itinerary covering flights, stays, transfers and experiences.",
  },
  {
    question: "Do you provide corporate travel services?",
    answer:
      "We manage business travel for companies, including flights, hotels, meetings, conferences and group movement, with flexible policy handling and dependable coordination.",
  },
  {
    question: "Do you provide crew ticketing services?",
    answer:
      "Yes. We support shipping companies with quick crew ticketing, urgent coordination, international routing and efficient ticket management for time-critical rotations.",
  },
  {
    question: "How can I contact the travel team?",
    answer: `You can call us on ${contactInfo.phone}, write to ${contactInfo.email}, or send an inquiry through the form on this page. We typically respond within 2–4 business hours.`,
  },
  {
    question: "Where is the Raaya Travels office located?",
    answer:
      "Our head office is at Unit 1737–1738, C-Block, Bhutani Alphathum, Sector 90, Noida (U.P.) – 201305, India. We are open Monday to Saturday, 10:00 AM – 7:00 PM IST.",
  },
];