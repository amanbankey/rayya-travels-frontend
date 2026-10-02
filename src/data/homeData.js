const img = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=80`;

export const heroImage = img("photo-1548013146-72479768bada");

export const portals = [
  {
    id: 1,
    image: img("photo-1589901164570-f9de6556e1c1"),
    rating: "4.9",
    label: "Royal Heritage",
    tag: "Popular Choice",
    tagStyle: "dark",
    location: "Rajasthan, India",
    title: "Udaipur Lake Palace Holiday",
    text: "Return flights, lake-view heritage hotel stay, a Lake Pichola boat ride and City Palace guided tour.",
    season: "Best in Winter",
  },
  {
    id: 2,
    image: img("photo-1609828913552-f9138ed9e42d"),
    rating: "5.0",
    label: "Backwater Escape",
    tag: "Handpicked Itinerary",
    tagStyle: "light",
    location: "Kerala, India",
    title: "Kerala Backwaters & Houseboat",
    text: "Flights to Kochi, a private Alleppey houseboat stay, Munnar tea gardens and airport transfers.",
    season: "Best in Monsoon & Winter",
  },
  {
    id: 3,
    image: img("photo-1595815771614-ade9d652a65d"),
    rating: "4.9",
    label: "Mountain Retreat",
    tag: "Instant Confirmation",
    tagStyle: "light",
    location: "Jammu & Kashmir, India",
    title: "Kashmir Dal Lake Getaway",
    text: "Srinagar flights, a Dal Lake houseboat stay, shikara rides and Gulmarg sightseeing with transfers.",
    season: "Best in Spring & Summer",
  },
  {
    id: 4,
    image: img("photo-1599661046827-dacff0c0f09a"),
    rating: "4.9",
    label: "Fort & Culture",
    tag: "Custom Package",
    tagStyle: "badge",
    location: "Rajasthan, India",
    title: "Jaipur Amber Fort Heritage Tour",
    text: "Flights to Jaipur, a heritage haveli stay, Amber Fort visit, local bazaar walk and guided city tour.",
    season: "Best from Oct to Mar",
  },
];

export const trunks = [
  {
    id: 1,
    image: img("photo-1586359716568-3e1907e4cf9f"),
    chip: "P",
    folio: "082",
    meta: "6 Days • 5 Nights • Beach Resort",
    title: "Andaman Island Escape",
    text: "Return flights to Port Blair, beachfront resort stay, Havelock and Neil Island tours, snorkelling and ferry transfers, all planned for a relaxed island holiday.",
    features: [
      { icon: "Plane", label: "Flights Included" },
      { icon: "Waves", label: "Water Activities" },
      { icon: "Car", label: "Island Transfers" },
    ],
    tag: "Popular Choice",
    tagStyle: "badge",
  },
  {
    id: 2,
    image: img("photo-1635255506105-b74adbd94026"),
    chip: "",
    folio: "114",
    meta: "7 Days • 6 Nights • Hotels & Camps",
    title: "Ladakh Himalayan Circuit",
    text: "Flights to Leh, acclimatisation stay, Pangong Lake and Nubra Valley sightseeing, monastery visits and a dedicated driver across high-altitude routes.",
    features: [
      { icon: "Plane", label: "Flights Included" },
      { icon: "Car", label: "SUV with Driver" },
      { icon: "Compass", label: "Local Guide" },
    ],
    tag: "Handpicked Itinerary",
    tagStyle: "badge",
  },
  {
    id: 3,
    image: img("photo-1614082242765-7c98ca0f3df3"),
    chip: " ",
    folio: "047",
    meta: "4 Days • 3 Nights • Beach Stay",
    title: "Goa Beach Getaway",
    text: "Flights to Goa, a comfortable beachside stay near Palolem and Baga, sightseeing in Old Goa, sunset cruise and airport transfers with flexible dates.",
    features: [
      { icon: "Plane", label: "Flights Included" },
      { icon: "Waves", label: "Sunset Cruise" },
      { icon: "Car", label: "Airport Transfers" },
    ],
    tag: "Instant Confirmation",
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
    icon: "Landmark",
    region: "United Arab Emirates",
    title: "Dubai Tourist eVisa for Indians",
    text: "Quick and reliable UAE tourist visa processing for Indian passport holders, with document checking, online filing and e-visa delivery on email.",
    steps: ["Document Check", "Online Filing", "eVisa Delivery"],
    details: [
      { label: "Standard Turnaround", value: "3-4 Working Days" },
      { label: "Validity", value: "30 / 60 Days Stay" },
    ],
    status: "Instant Confirmation",
  },
  {
    id: 2,
    icon: "Globe",
    region: "European Union",
    title: "Schengen Visa Assistance",
    text: "Complete guidance for Indian travellers applying for a Schengen visa, including itinerary and hotel proof, form filling and VFS appointment support.",
    steps: ["Profile Review", "VFS Appointment", "Passport Courier"],
    details: [
      { label: "Standard Turnaround", value: "10-15 Working Days" },
      { label: "Coverage", value: "27 European Countries" },
    ],
    status: "Handpicked Itinerary",
  },
  {
    id: 3,
    icon: "Building2",
    region: "Singapore",
    title: "Singapore Visa Support",
    text: "Hassle-free Singapore visa support for tourists and business travellers from India, with checklist guidance, application filing and status updates.",
    steps: ["Checklist Guidance", "Application Filing", "Visa Update"],
    details: [
      { label: "Standard Turnaround", value: "3-5 Working Days" },
      { label: "Applicant Support", value: "Family & Group Applications" },
    ],
    status: "Priority Support",
  },
];

export const provenance = {
  image: img("photo-1564507592333-c60657eea523"),
  doctrine: "",
  imageTitle: "Taj Mahal, Agra",
  imageText: "We plan every journey around your pace, so you enjoy India and the world without rush or stress.",
  eyebrow: "",
  title: "Travel Planned Around Your Needs.",
  text: "Every journey begins with a simple conversation about your dates, budget and preferences. Raaya Travels then arranges confirmed flights, trusted hotels, visa support and local assistance, so you can travel across India and abroad with complete peace of mind.",
  cards: [
    {
      icon: "Plane",
      title: "Trusted Airline Partners",
      text: "IATA-approved ticketing with leading Indian and international airlines, covering domestic routes, group bookings and urgent travel with transparent fares.",
    },
    {
      icon: "Landmark",
      title: "Handpicked Stays & Tours",
      text: "Carefully selected hotels, heritage stays and guided tours across Rajasthan, Kerala, Kashmir and Goa, planned to match your budget.",
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
    image: img("photo-1706186839147-0d708602587b"),
    category: "Travel Guide",
    read: "6 Min Read",
    title: "Varanasi: A First-Timer's Guide to the Ghats",
    text: "Best time to visit, sunrise boat rides on the Ganga, must-see ghats and how to plan flights and stays for a smooth spiritual trip.",
  },
  {
    id: 2,
    image: img("photo-1719831738921-972e0ec76337"),
    category: "Destination",
    read: "5 Min Read",
    title: "Munnar Tea Gardens: A Slow Weekend in Kerala",
    text: "Where to stay, which viewpoints to visit and how to combine Munnar with Alleppey backwaters in one comfortable itinerary.",
  },
  {
    id: 3,
    image: img("photo-1596018382916-56d2e341d784"),
    category: "Heritage",
    read: "7 Min Read",
    title: "Hampi: Exploring India's Ancient Stone Capital",
    text: "A practical guide to temples, local transport and the best season to explore this UNESCO World Heritage site in Karnataka.",
  },
];