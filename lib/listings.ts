export interface Listing {
  id: string;
  title: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  lotSize: string;
  yearBuilt: number;
  garage: number;
  address: string;
  city: string;
  state: string;
  zip: string;
  description: string;
  longDescription: string[];
  images: string[];
  featured: boolean;
  propertyType: string;
  status: "Active" | "Pending" | "Sold";
  features: string[];
  amenities: string[];
}

export const listings: Listing[] = [
  {
    id: "1",
    title: "Craftsman Bungalow with Timber Accents",
    price: 875000,
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2850,
    lotSize: "0.32 acres",
    yearBuilt: 2022,
    garage: 2,
    address: "33 Sunset Ridge",
    city: "Burlington",
    state: "ON",
    zip: "L7M 5C8",
    description:
      "Stunning craftsman bungalow with timber-framed gables, stone accents, and a covered front porch. Mature treed lot with golden-hour curb appeal. Open-concept main floor with vaulted ceilings.",
    longDescription: [
      "Welcome to 33 Sunset Ridge — a beautifully built craftsman bungalow that captures the warmth of timeless architecture with the comforts of modern construction. The signature timber-framed gables, natural stone columns, and rich wood garage doors create exceptional curb appeal.",
      "Inside, you'll find vaulted tongue-and-groove ceilings, wide-plank hardwood floors, and an open-concept layout that flows from the living room into a chef's kitchen with quartz countertops and a large island. Four bedrooms include a primary suite with walk-in closet and ensuite.",
      "The covered front porch is the perfect spot for morning coffee, while the deep backyard with mature trees offers privacy and room to entertain. Fully finished basement with rec room and additional bedroom adds nearly 1,400 sq ft of livable space.",
    ],
    images: ["/images/listing-1.jpg", "/images/interior.jpg", "/images/listing-1.jpg"],
    featured: true,
    propertyType: "Bungalow",
    status: "Active",
    features: [
      "Timber-framed gables",
      "Stone column entry",
      "Vaulted tongue-and-groove ceilings",
      "Wide-plank hardwood floors",
      "Covered front porch",
      "Finished walkout basement",
    ],
    amenities: ["Covered Porch", "Mature Trees", "Finished Basement", "Open Concept", "Quartz Counters"],
  },
  {
    id: "2",
    title: "Mountainside Brick Cottage",
    price: 685000,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 2200,
    lotSize: "0.45 acres",
    yearBuilt: 2020,
    garage: 1,
    address: "12 Pinecrest Way",
    city: "Banff",
    state: "AB",
    zip: "T1L 1B5",
    description:
      "Charming European-inspired brick cottage with terracotta roof tiles, set against breathtaking mountain views. Lush flower-lined entry, balcony with hanging gardens, and warm interior lighting.",
    longDescription: [
      "Tucked into the foothills with majestic mountain views, this picturesque brick cottage feels like a slice of Tuscany in the Rockies. The hand-laid red brick and authentic terracotta roof tiles give the home its distinctive character, while flower-lined walkways and a balcony garden welcome you home.",
      "Three bedrooms include a dreamy primary suite with private balcony access. The interior features hand-scraped hardwood, exposed wooden beams, and a stone fireplace that anchors the great room. The kitchen blends rustic charm with modern Bosch appliances and reclaimed wood island.",
      "Step outside onto the stone patio surrounded by gardens, or explore the surrounding hiking trails just steps from your door. Truly a one-of-a-kind retreat for nature lovers and design connoisseurs alike.",
    ],
    images: ["/images/listing-2.jpg", "/images/interior.jpg", "/images/listing-2.jpg"],
    featured: true,
    propertyType: "Cottage",
    status: "Active",
    features: [
      "Authentic terracotta roof",
      "Hand-laid brick exterior",
      "Mountain views",
      "Balcony garden",
      "Stone fireplace",
      "Reclaimed wood accents",
    ],
    amenities: ["Mountain Views", "Garden Balcony", "Stone Patio", "Hiking Trail Access", "Bosch Appliances"],
  },
  {
    id: "3",
    title: "Contemporary Modern Twilight Estate",
    price: 1450000,
    bedrooms: 4,
    bathrooms: 4,
    sqft: 4100,
    lotSize: "0.38 acres",
    yearBuilt: 2024,
    garage: 2,
    address: "808 Skyline Avenue",
    city: "Mississauga",
    state: "ON",
    zip: "L5M 2T8",
    description:
      "Striking contemporary residence with sleek black-and-white facade, dramatic uplighting, and floor-to-ceiling glass. Architecturally designed for indoor-outdoor living and dusk-time elegance.",
    longDescription: [
      "Architecturally bold and meticulously executed, 808 Skyline Avenue is a 4,100 sq ft contemporary masterpiece that comes alive at twilight. The clean black-and-white volumes contrast with warm walnut accents, and integrated LED uplighting transforms the facade into a sculptural statement.",
      "Inside, double-height ceilings, a floating glass staircase, and oversized windows fill the home with natural light and view corridors. The chef's kitchen features Miele appliances, full-height European cabinetry, and a quartzite waterfall island.",
      "The primary suite occupies the entire upper east wing with a private terrace, fireplace, and spa bathroom with rain shower and freestanding tub. Smart home control of lighting, climate, and security throughout. EV charger and solar-ready electrical complete this forward-looking home.",
    ],
    images: ["/images/listing-3.jpg", "/images/interior.jpg", "/images/listing-3.jpg"],
    featured: true,
    propertyType: "Modern",
    status: "Active",
    features: [
      "Double-height ceilings",
      "Floating glass staircase",
      "Miele kitchen package",
      "Quartzite waterfall island",
      "Integrated facade lighting",
      "EV charger and solar-ready",
    ],
    amenities: ["Smart Home", "EV Charging", "Solar Ready", "Private Terrace", "Floor-to-Ceiling Glass"],
  },
  {
    id: "4",
    title: "Sport Court Mega Estate with Pool",
    price: 3450000,
    bedrooms: 7,
    bathrooms: 8,
    sqft: 8800,
    lotSize: "1.4 acres",
    yearBuilt: 2024,
    garage: 8,
    address: "1 Estate Court Lane",
    city: "Oakville",
    state: "ON",
    zip: "L6J 7T2",
    description:
      "Once-in-a-generation estate featuring full-sized basketball and tennis courts, soccer pitch, infinity pool, pool cabana, and 8-car underground garage. Built for the ultimate active luxury lifestyle.",
    longDescription: [
      "1 Estate Court Lane redefines what a private residence can be. Sprawling across 1.4 acres of meticulously planned grounds, this 8,800 sq ft contemporary mega-estate combines world-class amenities with sophisticated architecture for a truly exceptional offering.",
      "On-site sports facilities are unmatched: a full-sized basketball court, tennis court, and a regulation soccer pitch. The infinity pool with sun shelf is anchored by a fully-appointed cabana with kitchen, bar, full bathroom, and lounge area. Below the home, an 8-car underground garage with vehicle lift accommodates the most discerning collector.",
      "Inside, seven en-suite bedrooms occupy a thoughtful split layout with a primary wing featuring a sitting room, dual closets, fireplace, and morning bar. The two-island kitchen, formal dining room, library, theater, and 1,500-bottle wine cellar are all just steps from one another. This is generational real estate.",
    ],
    images: ["/images/listing-4.jpg", "/images/interior.jpg", "/images/listing-4.jpg"],
    featured: true,
    propertyType: "Mega Estate",
    status: "Active",
    features: [
      "Basketball and tennis courts",
      "Regulation soccer pitch",
      "Infinity pool with cabana",
      "8-car underground garage",
      "1,500-bottle wine cellar",
      "Home theater and gym",
    ],
    amenities: ["Sport Courts", "Soccer Pitch", "Infinity Pool", "Cabana", "Wine Cellar", "Home Theater", "Gym"],
  },
  {
    id: "5",
    title: "Tudor-Style Family Home — Keys Ready",
    price: 925000,
    bedrooms: 4,
    bathrooms: 3,
    sqft: 3300,
    lotSize: "0.22 acres",
    yearBuilt: 2023,
    garage: 2,
    address: "5 Brookhaven Way",
    city: "Brampton",
    state: "ON",
    zip: "L6Y 5N1",
    description:
      "Stunning Tudor-style family home with mixed brick and stone facade, elegant gables, and arched stone entry. Move-in ready with new construction warranty. Perfect for growing families.",
    longDescription: [
      "5 Brookhaven Way is a brand-new 3,300 sq ft Tudor-style family home in Brampton's most desirable family neighborhood. The mixed brick and limestone facade, decorative gables, and arched stone entry create timeless curb appeal that will look as beautiful in twenty years as it does today.",
      "The main floor features 9-foot ceilings, hardwood floors throughout, a generous foyer, formal dining room, family room with gas fireplace, and a chef's kitchen with two-tone cabinetry, quartz countertops, and walk-in pantry. Mudroom with built-ins connects to the two-car garage.",
      "Upstairs, four spacious bedrooms include a luxurious primary suite with walk-in closet, freestanding tub, and rain shower. Convenient second-floor laundry. New construction Tarion warranty for peace of mind. Top-rated schools and shopping all within walking distance.",
    ],
    images: ["/images/listing-5.jpg", "/images/interior.jpg", "/images/listing-5.jpg"],
    featured: true,
    propertyType: "Single Family",
    status: "Active",
    features: [
      "Mixed brick and limestone facade",
      "Arched stone entry",
      "9-foot ceilings",
      "Two-tone cabinetry",
      "Walk-in pantry",
      "Tarion warranty",
    ],
    amenities: ["New Construction", "Top Schools", "Walkable Shopping", "Family Neighborhood", "Tarion Warranty"],
  },
  {
    id: "6",
    title: "Resort-Style Estate with Private Amenities",
    price: 2895000,
    bedrooms: 6,
    bathrooms: 7,
    sqft: 7200,
    lotSize: "1.1 acres",
    yearBuilt: 2024,
    garage: 6,
    address: "22 Estate Court",
    city: "Vaughan",
    state: "ON",
    zip: "L4H 0B5",
    description:
      "Resort-caliber estate complete with private sport courts, infinity pool with cabana, manicured grounds, and underground vehicle gallery. The pinnacle of contemporary luxury living.",
    longDescription: [
      "An estate of singular ambition. 22 Estate Court delivers a 7,200 sq ft contemporary residence on 1.1 lush acres, with amenities that rival the finest private resorts. Floor-to-ceiling glass walls, soaring ceilings, and pristine white volumes create gallery-like interiors throughout.",
      "Outside, the offerings are unmatched: a basketball court, tennis court, and full-sized soccer pitch, plus an infinity-edge pool with sun shelf and a fully-appointed cabana. The 6-car underground gallery accommodates collector vehicles with charging infrastructure throughout.",
      "Six en-suite bedrooms include a primary retreat that spans the entire eastern wing with a spa bathroom, fireplace, dual dressing rooms, and a private terrace overlooking the grounds. Catering kitchen, theater room, gym, and 1,200-bottle wine cellar complete the offering.",
    ],
    images: ["/images/listing-6.jpg", "/images/interior.jpg", "/images/listing-6.jpg"],
    featured: true,
    propertyType: "Mega Estate",
    status: "Active",
    features: [
      "Multiple sport courts",
      "Infinity pool with cabana",
      "6-car underground gallery",
      "Catering kitchen",
      "Spa primary suite",
      "1,200-bottle wine cellar",
    ],
    amenities: ["Sport Courts", "Infinity Pool", "Cabana", "Underground Garage", "Theater", "Gym", "Wine Cellar"],
  },
  {
    id: "7",
    title: "Tuscan Villa with Courtyard",
    price: 2350000,
    bedrooms: 6,
    bathrooms: 6,
    sqft: 6100,
    lotSize: "0.55 acres",
    yearBuilt: 2018,
    garage: 4,
    address: "7800 Villa Roma Dr",
    city: "Scottsdale",
    state: "AZ",
    zip: "85255",
    description:
      "Mediterranean masterpiece with terracotta roof, arched colonnades, and a central courtyard with fountain. Features a professional kitchen, home gym, and casita for guests.",
    longDescription: [
      "An authentic Tuscan villa transported to the Sonoran Desert. This 6,100 sq ft Mediterranean masterpiece features classic terracotta roof tiles, hand-troweled stucco, arched colonnades, and a stunning central courtyard with copper fountain.",
      "Six bedrooms include a separate casita perfect for guests or extended family. The professional-grade kitchen features Wolf and Sub-Zero appliances, two islands, and a walk-in temperature-controlled wine room. The dedicated home gym and dual home offices support today's flexible lifestyle.",
      "Outdoor living is exceptional with multiple covered patios, an oversized pool with Baja shelf, hot tub, outdoor kitchen with pizza oven, and a private putting green. Mountain views complete this remarkable Scottsdale estate.",
    ],
    images: ["/images/listing-7.jpg", "/images/interior.jpg", "/images/listing-7.jpg"],
    featured: false,
    propertyType: "Single Family",
    status: "Active",
    features: [
      "Authentic terracotta roof",
      "Central courtyard with fountain",
      "Wolf and Sub-Zero appliances",
      "Wine room with tasting area",
      "Separate guest casita",
      "Mountain views",
    ],
    amenities: ["Pool", "Hot Tub", "Outdoor Kitchen", "Pizza Oven", "Putting Green", "Casita", "Home Gym"],
  },
  {
    id: "8",
    title: "Mountain View Modern Farmhouse",
    price: 975000,
    bedrooms: 4,
    bathrooms: 3,
    sqft: 3600,
    lotSize: "0.92 acres",
    yearBuilt: 2023,
    garage: 3,
    address: "1550 Elk Meadow Trail",
    city: "Park City",
    state: "UT",
    zip: "84098",
    description:
      "Modern farmhouse with board-and-batten siding, black steel windows, and stunning mountain views. Features include a barn-door pantry, mudroom with cubbies, and wraparound porch.",
    longDescription: [
      "This brand-new modern farmhouse perfectly blends rustic charm with contemporary sophistication. White board-and-batten siding contrasts beautifully with black steel windows and metal roof accents, creating timeless curb appeal on a 0.92-acre lot with panoramic mountain views.",
      "The interior showcases shiplap walls, exposed wood beams, and wide-plank white oak floors. The kitchen features a large island, custom shaker cabinets, quartz counters, and a barn-door pantry. The mudroom with custom cubbies and dog wash makes outdoor living practical.",
      "The wraparound porch is perfect for morning coffee while watching the elk in the meadow. Park City's world-class skiing, hiking, and dining are just minutes away, making this the ideal mountain retreat.",
    ],
    images: ["/images/listing-8.jpg", "/images/interior.jpg", "/images/listing-8.jpg"],
    featured: false,
    propertyType: "Single Family",
    status: "Active",
    features: [
      "Board-and-batten siding",
      "Black steel windows",
      "Shiplap walls and exposed beams",
      "Wide-plank white oak floors",
      "Wraparound porch",
      "Mudroom with dog wash",
    ],
    amenities: ["Mountain Views", "Wraparound Porch", "Mudroom", "Dog Wash", "EV Ready"],
  },
];

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function getListing(id: string): Listing | undefined {
  return listings.find((l) => l.id === id);
}
