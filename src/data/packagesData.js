import {
  BedDouble,
  CalendarDays,
  Flame,
  Gem,
  Globe,
  Heart,
  Landmark,
  MapPin,
  Mountain,
  Plane,
  Sparkles,
  Sun,
  Users,
  Utensils,
} from "lucide-react";

const img = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`;

export const packagesImages = {
  hero: img("photo-1499856871958-5b9627545d1a"),
  showcase: img("photo-1573843981267-be1999ff37cd"),
};

export const searchCategories = ["Holidays", "Domestic", "International", "Honeymoon", "Family", "Adventure"];

export const categoryTabs = [
  { key: "trending", label: "Trending", icon: Flame },
  { key: "domestic", label: "Domestic Escapes", icon: MapPin },
  { key: "international", label: "International", icon: Globe },
  { key: "honeymoon", label: "Honeymoon Specials", icon: Heart },
  { key: "family", label: "Family Holidays", icon: Users },
  { key: "luxury", label: "Signature Luxury", icon: Sparkles },
  { key: "adventure", label: "Adventure & Trek", icon: Mountain },
  { key: "weekend", label: "Weekend", icon: CalendarDays },
];

export const trendingDestinations = [
  {
    id: 1,
    image: img("photo-1512453979798-5ea266f8880c"),
    country: "United Arab Emirates",
    city: "Dubai",
    text: "Modern Marvels & Desert Luxury",
    count: "",
  },
  {
    id: 2,
    image: img("photo-1573843981267-be1999ff37cd"),
    country: "Indian Ocean",
    city: "Maldives",
    text: "Private Atoll & Overwater Sanctuary",
    count: "",
  },
  {
    id: 3,
    image: img("photo-1566837945700-30057527ade0"),
    country: "India (Domestic)",
    city: "Kashmir",
    text: "Paradise on Earth & Alpine Valleys",
    count: "",
  },
  {
    id: 4,
    image: img("photo-1537996194471-e657df975ab4"),
    country: "Indonesia",
    city: "Bali",
    text: "Tropical Serenity & Sacred Temples",
    count: "",
  },
];

export const alsoTrending = ["Switzerland (Glacier Express)", "Singapore & Sentosa", "Paris & Swiss Alps", "Goa Luxury Villas"];

export const destinationFilters = [
  { key: "dubai", label: "Dubai (UAE)", count: 18 },
  { key: "maldives", label: "Maldives", count: 12 },
  { key: "kashmir", label: "Kashmir & Ladakh", count: 14 },
  { key: "bali", label: "Bali (Indonesia)", count: 22 },
  { key: "switzerland", label: "Switzerland & Alps", count: 9 },
  { key: "thailand", label: "Thailand (Phuket/Krabi)", count: 16 },
];

export const durationFilters = [
  { key: "1-3", label: "1 – 3 Days" },
  { key: "4-6", label: "4 – 6 Days" },
  { key: "7-10", label: "7 – 10 Days" },
  { key: "10+", label: "10+ Days" },
];

export const hotelStandardFilters = [
  { key: "5star", label: "5-Star Luxury & Palaces" },
  { key: "4star", label: "4-Star Premium Resorts" },
  { key: "heritage", label: "Heritage Boutique Stays" },
];

export const inclusionFilters = [
  { key: "flights", label: "Flights Included" },
  { key: "transfers", label: "Private Airport Transfers" },
  { key: "breakfast", label: "Daily Gourmet Breakfast" },
];

export const defaultPackageFilters = {
  destinations: ["dubai", "maldives"],
  duration: ["4-6"],
  budgetMax: 150000,
  hotelStandard: ["5star", "4star"],
  inclusions: ["flights", "transfers"],
};

export const sortModes = [
  { key: "recommended", label: "Recommended (Curated)" },
  { key: "priceLow", label: "Price: Low to High" },
  { key: "priceHigh", label: "Price: High to Low" },
  { key: "duration", label: "Duration" },
];

export const packages = [
  {
    id: 1,
    badge: { label: "Best Seller", style: "star" },
    image: img("photo-1512453979798-5ea266f8880c"),
    duration: "5N / 6D",
    included: "Flights Included",
    location: "Dubai, UAE · Private Experience",
    title: "Dubai Skyline & Desert Safari & Bedouin BBQ",
    features: [
      "5★ Address Downtown or Palace stay",
      "Private 4x4 Desert Safari & Bedouin BBQ",
      "Luxury Dubai Marina Yacht Cruise",
      "Round-trip Airport Chauffeur transfers",
    ],
    price: 54999,
    destinationKey: "dubai",
    durationBucket: "4-6",
    hotelStandard: "5star",
    inclusions: ["flights", "transfers"],
  },
  {
    id: 2,
    badge: { label: "Signature Luxury", style: "gold" },
    image: img("photo-1573843981267-be1999ff37cd"),
    duration: "4N / 5D",
    included: "Flights Included",
    location: "Maldives Atolls · All Inclusive Option",
    title: "Maldives Overwater Sanctuary Villa Retreat",
    features: [
      "5★ Overwater Villa with Private Ocean Deck",
      "Daily Half Board (Breakfast + Gourmet Dinner)",
      "Round-trip Scenic Seaplane / Speedboat",
      "Guided Coral Reef Snorkel Safari",
    ],
    price: 89999,
    destinationKey: "maldives",
    durationBucket: "4-6",
    hotelStandard: "5star",
    inclusions: ["flights"],
  },
  {
    id: 3,
    badge: { label: "Customizable", style: "muted" },
    image: img("photo-1566837945700-30057527ade0"),
    duration: "5N / 6D",
    included: "Houseboat & Resort",
    location: "Srinagar · Gulmarg · Pahalgam",
    title: "Jewel of Kashmir: Alpine Valleys & Dal Lake",
    features: [
      "1N Handcrafted Heritage Houseboat Stay",
      "Gulmarg Gondola Cable Car Ride (Phase 1 & 2)",
      "All Gourmet Meals & Kashmiri Wazwan Dinner",
      "Dedicated Private Chauffeur & Luxury SUV",
    ],
    price: 36500,
    destinationKey: "kashmir",
    durationBucket: "4-6",
    hotelStandard: "heritage",
    inclusions: ["transfers"],
  },
  {
    id: 4,
    badge: { label: "Honeymoon Favorite", style: "muted" },
    image: img("photo-1537996194471-e657df975ab4"),
    duration: "6N / 7D",
    included: "Private Pool Villa",
    location: "Ubud & Seminyak · Indonesia",
    title: "Bali Cultural Highlands & Beach Romance",
    features: [
      "3N Ubud Rainforest Villa + 3N Seminyak Beach",
      "Signature Floating Breakfast Experience",
      "Mount Batur Sunrise 4WD Jeep Safari",
      "Couple Balinese Spa & Flower Bath Ritual",
    ],
    price: 48000,
    destinationKey: "bali",
    durationBucket: "7-10",
    hotelStandard: "4star",
    inclusions: ["breakfast"],
  },
  {
    id: 5,
    badge: { label: "Curated European", style: "muted" },
    image: img("photo-1530122037265-a5f1f91d3b99"),
    duration: "7N / 8D",
    included: "1st Class Swiss Pass",
    location: "Lucerne · Interlaken · Zermatt",
    title: "Swiss Alps & Glacier Express Grand Tour",
    features: [
      "8-Day 1st Class Swiss Rail Travel Pass",
      "Jungfraujoch Top of Europe Mountain Rail",
      "4★ Superior Alpine View Hotels with Breakfast",
      "Private Lake Lucerne Panorama Yacht Cruise",
    ],
    price: 145000,
    destinationKey: "switzerland",
    durationBucket: "7-10",
    hotelStandard: "5star",
    inclusions: ["flights", "transfers"],
  },
  {
    id: 6,
    badge: { label: "Best Value", style: "muted" },
    image: img("photo-1552465011-b4e21bf6e79a"),
    duration: "5N / 6D",
    included: "Internal Flights",
    location: "Bangkok & Phuket · Thailand",
    title: "Thailand Dual: Bangkok & Phuket Getaway",
    features: [
      "3N Phuket Beachfront + 2N Bangkok City",
      "Phi Phi & Maya Bay Speedboat Catamaran",
      "Chao Phraya River Evening Dinner Cruise",
      "All Private Domestic Flights & Hotel Transfers",
    ],
    price: 42500,
    destinationKey: "thailand",
    durationBucket: "4-6",
    hotelStandard: "4star",
    inclusions: ["flights", "transfers"],
  },
];

export const signatureShowcase = {
  tag: "",
  title: "Maldives Overwater Sanctuary",
  text:
    "Unwind in an architectural haven suspended directly over crystalline lagoons. Includes private seaplane transfers, daily sunset champagne tastings, curated private sandbank picnics, and 24/7 dedicated island butler service.",
  features: [
    { icon: Sun, label: "5 Nights / 6 Days" },
    { icon: Utensils, label: "Champagne Breakfast" },
    { icon: BedDouble, label: "Private Water Villa" },
    { icon: Plane, label: "Seaplane Transfers" },
  ],
  price: 89999,
};

export const thematicCollections = [
  {
    icon: Heart,
    title: "Honeymoon Romantic Escapes",
    text: "Return flights, private pool villas, candlelit beach dinners and sunset cruises, planned for couples in Bali, the Maldives and Europe.",
    items: [
      { label: "Bali Pool Villa with Flights (6D/5N)", price: "₹48,000" },
      { label: "Maldives Overwater Retreat (5D/4N)", price: "₹89,500" },
    ],
    link: "View honeymoon packages",
  },
  {
    icon: Plane,
    title: "Global Short & Long Hauls",
    text: "Hassle-free international trips with confirmed flights, visa assistance, handpicked hotels, airport transfers and 24/7 travel support.",
    items: [
      { label: "Dubai City & Desert Safari (5D/4N)", price: "₹54,999" },
      { label: "Singapore & Sentosa Getaway (5D/4N)", price: "₹58,000" },
    ],
    link: "Explore international packages",
  },
  {
    icon: Landmark,
    title: "Discover Incredible India",
    text: "Domestic holidays with flights and stays covered, from the palaces of Rajasthan and Kerala backwaters to the valleys of Kashmir.",
    items: [
      { label: "Kashmir Valleys & Dal Lake (6D/5N)", price: "₹36,500" },
      { label: "Kerala Houseboat & Munnar (5D/4N)", price: "₹32,000" },
    ],
    link: "Browse India packages",
  },
];

export const packagesFaqs = [
  {
    question: "Can I customize the hotels, dates, or inclusions in any package?",
    answer:
      "Yes. Every package is a starting template. You can swap hotels, adjust travel dates, add or remove inclusions, and our team will recalculate the price accordingly.",
  },
  {
    question: "Are flights and private transfers included in the quoted price?",
    answer:
      "This depends on the package. Look for the 'Flights Included' and 'Private Airport Transfers' tags on each card, or ask our concierge desk to confirm what is bundled.",
  },
  {
    question: "Does Raaya Travels assist with international visas and travel insurance?",
    answer:
      "Yes, we provide end-to-end visa documentation support and can arrange comprehensive travel insurance alongside your package booking.",
  },
  {
    question: "What is the payment policy and booking process?",
    answer:
      "A booking is confirmed with a partial advance payment, with the balance due before departure as per the itinerary schedule. Full payment terms are shared once you customize your trip.",
  },
  {
    question: "Where are the official offices of Raaya Tour & Travel located?",
    answer:
      "Our head office is at Unit 1737–1738, C-Block, Bhutani Alphathum, Sector 90, Noida (U.P.) – 201305, India.",
  },
];