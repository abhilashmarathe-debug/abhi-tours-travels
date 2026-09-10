// src/data/mockData.js

export const PACKAGES = [
  // =========================================================================
  // --- 1. INTERNATIONAL: EUROPE (CENTRAL, SOUTHERN & NORDIC)
  // =========================================================================
  {
    id: "intl-eur-01",
    title: "Splendid Europe: Paris, Rhine Falls & Swiss Alpine Wonders",
    category: "International",
    region: "Europe",
    duration: "10 Days / 9 Nights",
    startingPrice: 189999,
    rating: 4.8,
    reviews: 142,
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
    highlights: ["Eiffel Tower Summit Level 3", "Jungfraujoch Top of Europe", "Lucerne Lake Cruise", "Rhine Falls Schaffhausen"],
    inclusions: [
      "Return economy airfare ex-Mumbai/Delhi with Schengen visa guidance",
      "4-Star accommodations in Paris, Zurich, and Lucerne",
      "Daily breakfast & pure Indian dinners (Jain options guaranteed)",
      "Dedicated bilingual Indian Tour Leader"
    ],
    exclusions: [
      "Mandatory driver & tour manager tips (€3/day)",
      "Baggage porterage and personal laundry",
      "Travel mediclaim beyond age 60"
    ],
    itinerary: [
      { day: 1, title: "Arrival in Paris & Seine Illumination Cruise", desc: "Arrival at CDG Airport. Check-in to hotel followed by an evening cruise along the illuminated Seine River." },
      { day: 2, title: "Paris City Highlights & Eiffel Tower 3rd Level", desc: "Guided coach orientation past Arc de Triomphe and Champs-Élysées with summit access to the Eiffel Tower." },
      { day: 3, title: "Paris to Central Switzerland via Rhine Falls", desc: "Scenic transit through Alsace vineyards to Schaffhausen to witness Europe's largest plain waterfall." },
      { day: 4, title: "Jungfraujoch Alpine Cogwheel Excursion", desc: "Ascend the cogwheel railway to Jungfraujoch Top of Europe. Visit Ice Palace and Sphinx Terrace." },
      { day: 5, title: "Lucerne, Chapel Bridge & Mount Titlis Rotair", desc: "Revolving cable car to Mount Titlis summit, cliff walk, and heritage walk through Lucerne." }
    ],
    departures: [
      { date: "2026-10-12", status: "Available", seatsLeft: 14, price: 189999 },
      { date: "2026-10-25", status: "Filling Fast", seatsLeft: 4, price: 194999 },
      { date: "2026-11-08", status: "Available", seatsLeft: 18, price: 179999 }
    ]
  },
  {
    id: "intl-it-02",
    title: "Italian Renaissance: Rome, Florence, Venice & Amalfi Coast",
    category: "International",
    region: "Europe",
    duration: "8 Days / 7 Nights",
    startingPrice: 149999,
    rating: 4.9,
    reviews: 168,
    image: "https://images.unsplash.com/photo-1529260830199-42c24126f198?auto=format&fit=crop&w=800&q=80",
    highlights: ["Colosseum & Vatican Museums", "Venice Gondola Ride & St. Mark's", "Florence Duomo & Leaning Tower of Pisa", "Amalfi Coastal Drive"],
    inclusions: [
      "Centrally situated 4-star Italian properties",
      "High-speed Frecciarossa train tickets between Rome, Florence, and Venice",
      "Daily continental breakfast and curated Indian/Italian vegetarian dinners",
      "Skip-the-line entrance tickets to Vatican Museums and Colosseum"
    ],
    exclusions: [
      "City tourist taxes (€4-€7 per person/night payable at hotel reception)",
      "Schengen visa fees",
      "Lunches and individual drink orders"
    ],
    itinerary: [
      { day: 1, title: "Arrival in Rome & Trevi Fountain Walk", desc: "Arrive at Fiumicino Airport. Transfer to hotel, followed by an evening walking tour covering Trevi Fountain." },
      { day: 2, title: "Vatican City, Sistine Chapel & Roman Colosseum", desc: "Guided tour through St. Peter's Basilica, Michelangelo's Sistine Chapel, and the ancient Colosseum arena." },
      { day: 3, title: "High-Speed Train to Florence & Pisa Excursion", desc: "Frecciarossa train to Florence. Afternoon drive to Pisa to see the iconic Leaning Tower." },
      { day: 4, title: "Florence Art Landmarks to Venice Canal City", desc: "Explore Florence Duomo and Ponte Vecchio. Board train across northern plains to Venice." },
      { day: 5, title: "Venice Gondola Ride & St. Mark's Square", desc: "Private gondola ride through Grand Canal waterways, visit St. Mark's Basilica, and Murano glass demonstration." }
    ],
    departures: [
      { date: "2026-10-09", status: "Available", seatsLeft: 12, price: 149999 },
      { date: "2026-10-23", status: "Filling Fast", seatsLeft: 3, price: 154999 },
      { date: "2026-11-06", status: "Available", seatsLeft: 16, price: 149999 }
    ]
  },
  {
    id: "intl-scand-03",
    title: "Nordic Wonders: Norwegian Fjords, Oslo, Stockholm & Copenhagen",
    category: "International",
    region: "Europe",
    duration: "9 Days / 8 Nights",
    startingPrice: 219999,
    rating: 4.9,
    reviews: 92,
    image: "https://images.unsplash.com/photo-1509356843151-3e7d96241e11?auto=format&fit=crop&w=800&q=80",
    highlights: ["Sognefjord Cruise by Electric Catamaran", "Flåm Scenic Alpine Railway", "Vasa Warship Museum Stockholm", "DFDS Overnight Cruise"],
    inclusions: [
      "Overnight DFDS cruise from Copenhagen to Oslo with sea-view cabins",
      "Full scenic transit on the Flåm mountain railway and Sognefjord cruise",
      "4-Star central hotels in Copenhagen, Oslo, Bergen, and Stockholm",
      "Indian vegetarian/Jain dinners arranged with our escort"
    ],
    exclusions: [
      "Schengen visa stamping charges",
      "Optional helicopter tour over Briksdal Glacier",
      "Personal baggage porterage"
    ],
    itinerary: [
      { day: 1, title: "Arrival in Copenhagen & Nyhavn Harbor", desc: "Arrival in Denmark. Visit Little Mermaid statue, Amalienborg Palace, and evening stroll at colorful Nyhavn." },
      { day: 2, title: "Copenhagen to Oslo via Luxury Overnight Cruise", desc: "Board the luxury DFDS Scandinavian cruise liner sailing northward along the Kattegat strait." },
      { day: 3, title: "Oslo City Highlights & Vigeland Sculpture Park", desc: "Tour Vigeland Park, Royal Palace, and Opera House before moving toward the fjord country." },
      { day: 4, title: "Flåm Railway Ascent & Nærøyfjord Cruise", desc: "Ride one of the world's steepest standard-gauge train routes into Flåm, followed by a fjord boat cruise." },
      { day: 5, title: "Bergen Bryggen Wharf to Stockholm", desc: "Explore UNESCO Bryggen wooden harbor in Bergen. Flight/express train to royal Stockholm." }
    ],
    departures: [
      { date: "2026-10-04", status: "Available", seatsLeft: 10, price: 219999 },
      { date: "2026-10-18", status: "Filling Fast", seatsLeft: 2, price: 229999 },
      { date: "2026-11-01", status: "Available", seatsLeft: 14, price: 214999 }
    ]
  },

  // =========================================================================
  // --- 2. INTERNATIONAL: GULF & THE WIDER MIDDLE EAST
  // =========================================================================
  {
    id: "intl-dxb-04",
    title: "Dazzling Dubai & Abu Dhabi: Burj Khalifa, Desert Safari & Yas Island",
    category: "International",
    region: "Middle East",
    duration: "5 Days / 4 Nights",
    startingPrice: 58999,
    rating: 4.7,
    reviews: 218,
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80",
    highlights: ["Burj Khalifa 124th Floor", "4x4 Desert Dune Safari with BBQ", "Sheikh Zayed Grand Mosque & BAPS Hindu Mandir", "Palm Jumeirah View & Monorail"],
    inclusions: [
      "Single-entry 30-day UAE tourist visa & travel mediclaim",
      "4 Nights in 4-Star central Bur Dubai / Al Barsha property",
      "Daily breakfast & pure Indian lunches/dinners at partner kitchens",
      "All transfers in air-conditioned luxury coaches"
    ],
    exclusions: [
      "Tourism Dirham fee paid upon check-in (AED 15/night)",
      "Return flights",
      "Formula Rossa fast track upgrade at Ferrari World"
    ],
    itinerary: [
      { day: 1, title: "Arrival in Dubai & Marina Dhow Cruise", desc: "Arrive at DXB. Hotel transfer and check-in. Evening Marina Dhow Cruise with international and Indian buffet." },
      { day: 2, title: "Dubai City Tour & Burj Khalifa Observatory", desc: "Photo stop at Burj Al Arab, visit Dubai Mall, and ascend to Burj Khalifa 124th floor observatory." },
      { day: 3, title: "Desert Safari, Dune Bashing & Bedouin Camp", desc: "Afternoon 4x4 dune bashing across golden dunes, camel rides, tanoura dance, and barbecue dinner." },
      { day: 4, title: "Abu Dhabi Day Tour: Sheikh Zayed Mosque & BAPS Mandir", desc: "Day trip to Abu Dhabi covering the Grand Mosque, BAPS Hindu Temple, and photo-stop at Ferrari World." },
      { day: 5, title: "Deira Gold Souk & Departure", desc: "Explore the historic Deira Gold & Spice Souks before departure transfer to DXB Airport." }
    ],
    departures: [
      { date: "2026-10-15", status: "Available", seatsLeft: 16, price: 58999 },
      { date: "2026-10-28", status: "Filling Fast", seatsLeft: 3, price: 62999 },
      { date: "2026-11-10", status: "Available", seatsLeft: 20, price: 58999 }
    ]
  },
  {
    id: "intl-omn-05",
    title: "Oman Jewels: Muscat Grand Mosque, Wahiba Desert & Nizwa Oasis",
    category: "International",
    region: "Middle East",
    duration: "6 Days / 5 Nights",
    startingPrice: 69999,
    rating: 4.8,
    reviews: 88,
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80",
    highlights: ["Sultan Qaboos Grand Mosque", "Wahiba Sands Desert Luxury Camp", "Wadi Bani Khalid Natural Emerald Pools", "Nizwa Historic Souq & Round Tower"],
    inclusions: [
      "4 Nights 4-Star Muscat hotel + 1 Night Deluxe Desert Camp in Wahiba",
      "4x4 Land Cruiser transport throughout desert and mountain routes",
      "Daily breakfast and prepared Indian & Omani buffet dinners",
      "All monument entries and local English/Hindi speaking guides"
    ],
    exclusions: [
      "Oman tourist visa fee",
      "Dune buggy rentals in Wahiba Sands",
      "Personal tipping to drivers and tour managers"
    ],
    itinerary: [
      { day: 1, title: "Arrival in Muscat & Mutrah Corniche Walk", desc: "Arrive at Muscat International. Transfer to hotel, followed by an evening stroll through historic Mutrah Souq." },
      { day: 2, title: "Sultan Qaboos Grand Mosque & Royal Opera House", desc: "Visit the Grand Mosque featuring hand-woven carpets and chandeliers, followed by Royal Opera House Muscat." },
      { day: 3, title: "Muscat to Wahiba Sands via Coastal Wadi Pools", desc: "Drive along coastal highways with stops at turquoise wadis. Enter Wahiba Sands for an overnight camp stay." },
      { day: 4, title: "Wadi Bani Khalid Oasis to Heritage Nizwa", desc: "Swim in the emerald freshwater pools of Wadi Bani Khalid before driving to ancient capital Nizwa." },
      { day: 5, title: "Nizwa Fort, Silver Souq & Return to Muscat", desc: "Explore the 17th-century Nizwa Fort and antique silver souq before heading back to Muscat for departure." }
    ],
    departures: [
      { date: "2026-10-10", status: "Available", seatsLeft: 12, price: 69999 },
      { date: "2026-10-24", status: "Filling Fast", seatsLeft: 4, price: 74999 },
      { date: "2026-11-14", status: "Available", seatsLeft: 15, price: 69999 }
    ]
  },
  {
    id: "intl-sau-06",
    title: "Saudi Odyssey: Riyadh Heritage, AlUla Hegra & Red Sea Jeddah",
    category: "International",
    region: "Middle East",
    duration: "7 Days / 6 Nights",
    startingPrice: 119999,
    rating: 4.9,
    reviews: 74,
    image: "https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?auto=format&fit=crop&w=800&q=80",
    highlights: ["UNESCO Hegra Nabataean Tombs in AlUla", "Elephant Rock & Maraya Mirror Hall", "Riyadh Kingdom Centre Skybridge", "Jeddah Historic Al Balad Quarter"],
    inclusions: [
      "6 Nights in premium 5-star properties and AlUla desert resort",
      "Domestic air tickets: Riyadh to AlUla and AlUla to Jeddah",
      "All VIP site entries including Hegra guided vintage Land Rover tours",
      "Specialized Indian culinary arrangements throughout the tour"
    ],
    exclusions: [
      "Saudi Tourist E-Visa fee",
      "Optional helicopter flights over AlUla canyons",
      "Personal room service and excess baggage"
    ],
    itinerary: [
      { day: 1, title: "Arrival in Riyadh - Capital of the Kingdom", desc: "Arrive at King Khalid Airport. Transfer to luxury hotel. Evening visit to Kingdom Centre Skybridge." },
      { day: 2, title: "Diriyah Historic Mud City & Masmak Fortress", desc: "Tour the birthplace of the Saudi state at UNESCO At-Turaif in Diriyah and visit Masmak Fortress." },
      { day: 3, title: "Fly to AlUla & Sunset at Elephant Rock", desc: "Flight to AlUla. Check into desert resort. Marvel at Elephant Rock under illuminated desert night skies." },
      { day: 4, title: "Hegra Nabataean Tombs & Maraya Concert Hall", desc: "Guided tour through monumental carved tombs of ancient Hegra and photo-stop at Maraya mirror building." },
      { day: 5, title: "Fly to Coastal Jeddah & Al Balad Historic Quarter", desc: "Flight to Jeddah. Explore coral-stone architecture and wooden balconies of ancient Al Balad." }
    ],
    departures: [
      { date: "2026-10-18", status: "Available", seatsLeft: 8, price: 119999 },
      { date: "2026-11-08", status: "Filling Fast", seatsLeft: 2, price: 124999 },
      { date: "2026-11-22", status: "Available", seatsLeft: 10, price: 119999 }
    ]
  },
  {
    id: "intl-baku-07",
    title: "Land of Fire: Baku, Flame Towers, Absheron & Gobustan",
    category: "International",
    region: "Middle East",
    duration: "5 Days / 4 Nights",
    startingPrice: 47999,
    rating: 4.8,
    reviews: 135,
    image: "https://images.unsplash.com/photo-1579888944880-d98341245702?auto=format&fit=crop&w=800&q=80",
    highlights: ["Ateshgah Fire Temple & Yanar Dag Burning Mountain", "Heydar Aliyev Center Architecture", "Old City (Icherisheher) & Maiden Tower", "Gobustan Mud Volcanoes & Rock Petroglyphs"],
    inclusions: [
      "4 Nights in 4-Star or 5-Star Baku city-center hotel",
      "Azerbaijan electronic visa processing and airport pickup",
      "Daily breakfast buffet and Indian dinners with local flatbreads",
      "All entrance fees and 4x4 transfers to Gobustan mud volcanoes"
    ],
    exclusions: [
      "Personal minibar and telephone charges",
      "Return airfare to Baku International (GYD)",
      "Optional Baku Eye ferris wheel passes"
    ],
    itinerary: [
      { day: 1, title: "Arrival in Baku & Highland Park Funicular", desc: "Arrive at Baku Airport. Evening funicular ride to Highland Park for panoramic night views of the Flame Towers." },
      { day: 2, title: "Old City Heritage, Maiden Tower & Heydar Aliyev Center", desc: "Walking tour of Icherisheher and photo-stop at Zaha Hadid's futuristic Heydar Aliyev Center." },
      { day: 3, title: "Ateshgah Fire Temple & Yanar Dag Burning Mountain", desc: "Visit the historic Hindu-Zoroastrian Ateshgah Fire Temple and observe the natural flames of Yanar Dag." },
      { day: 4, title: "Gobustan Mud Volcanoes & Caspian Promenade", desc: "Explore 40,000-year-old rock petroglyphs and take 4x4 jeeps to active mud volcanoes." },
      { day: 5, title: "Nizami Street Shopping & Departure", desc: "Morning visit to local souvenir alleys on Nizami Street before airport departure." }
    ],
    departures: [
      { date: "2026-10-14", status: "Available", seatsLeft: 18, price: 47999 },
      { date: "2026-10-28", status: "Filling Fast", seatsLeft: 4, price: 51999 },
      { date: "2026-11-11", status: "Available", seatsLeft: 20, price: 47999 }
    ]
  },
  {
    id: "intl-egy-08",
    title: "Mysteries of Egypt & Nile Cruise: Cairo Pyramids, Luxor & Aswan",
    category: "International",
    region: "Middle East & Africa",
    duration: "8 Days / 7 Nights",
    startingPrice: 104999,
    rating: 4.8,
    reviews: 114,
    image: "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=800&q=80",
    highlights: ["Great Pyramids of Giza & Sphinx", "3-Night 5-Star Nile Luxury Cruise", "Valley of the Kings in Luxor", "Philae Temple of Goddess Isis"],
    inclusions: [
      "4 Nights 5-Star Cairo Hotel + 3 Nights Full-Board Nile Cruise",
      "Domestic flights: Cairo to Aswan and Luxor to Cairo",
      "Sightseeing guided by licensed English/Hindi speaking Egyptologists",
      "Specialized Indian catering arrangements on land and ship"
    ],
    exclusions: [
      "Entry inside the Great Pyramid burial chamber",
      "Mandatory cruise and driver tips ($8/day)",
      "Hot air balloon flight over Luxor West Bank"
    ],
    itinerary: [
      { day: 1, title: "Arrival in Cairo - The City of Thousand Minarets", desc: "Arrival at Cairo International Airport. Transfer to hotel overlooking the Pyramids." },
      { day: 2, title: "Great Pyramids of Giza, Sphinx & Egyptian Museum", desc: "Tour the Pyramids of Khufu, Khafre, and Menkaure. Stand before the Great Sphinx and visit the Antiquities Museum." },
      { day: 3, title: "Fly to Aswan & Embark 5-Star Nile Cruise", desc: "Flight to Aswan. Board luxury cruise liner. Visit Aswan High Dam and Philae Temple." },
      { day: 4, title: "Kom Ombo & Edfu Temples Along the Nile", desc: "Sail north along ancient waterways. Visit dual temple of Sobek and Horus at Kom Ombo, followed by Edfu Temple." },
      { day: 5, title: "Luxor Valley of the Kings & Karnak Temple", desc: "Sail into Luxor. Explore rock-cut tombs in Valley of the Kings and the hypostyle hall of Karnak Temple." }
    ],
    departures: [
      { date: "2026-10-17", status: "Available", seatsLeft: 10, price: 104999 },
      { date: "2026-11-07", status: "Filling Fast", seatsLeft: 4, price: 109999 },
      { date: "2026-11-21", status: "Available", seatsLeft: 14, price: 104999 }
    ]
  },

  // =========================================================================
  // --- 3. INTERNATIONAL: EAST ASIA & SOUTHEAST ASIA
  // =========================================================================
  {
    id: "intl-jp-09",
    title: "Golden Route of Japan: Tokyo Skytree, Mount Fuji, Kyoto & Osaka",
    category: "International",
    region: "Southeast Asia",
    duration: "8 Days / 7 Nights",
    startingPrice: 199999,
    rating: 4.9,
    reviews: 185,
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80",
    highlights: ["Shinkansen Bullet Train at 320 km/h", "Mount Fuji 5th Station & Lake Ashi Cruise", "Kyoto Fushimi Inari Shrine (10,000 Torii Gates)", "Osaka Dotonbori District"],
    inclusions: [
      "7 Nights in premium 4-star city hotels in Tokyo, Kyoto, and Osaka",
      "Shinkansen bullet train ticket from Tokyo to Kyoto",
      "Daily Japanese/continental breakfasts and pure Indian vegetarian/Jain dinners",
      "Japan tourist visa assistance and English/Hindi speaking escort"
    ],
    exclusions: [
      "Universal Studios Japan Super Nintendo World passes",
      "Luggage courier services between hotels (Yamato Transport)",
      "Personal tea ceremony workshop fees"
    ],
    itinerary: [
      { day: 1, title: "Arrival in Tokyo & Shinjuku Neon Crossing", desc: "Arrival at Narita/Haneda Airport. Transfer to central hotel. Evening stroll through bustling Shinjuku." },
      { day: 2, title: "Tokyo City Landmarks, Asakusa Senso-ji & Skytree", desc: "Visit Tokyo's oldest temple Senso-ji, cross Shibuya Scramble crossing, and ascend Tokyo Skytree." },
      { day: 3, title: "Mount Fuji 5th Station & Lake Ashi Hakone Ropeway", desc: "Drive to Mt. Fuji 5th Station. Cruise volcanic Lake Ashi and take the Hakone ropeway across sulfur springs." },
      { day: 4, title: "Bullet Train to Ancient Imperial Kyoto", desc: "Board the Shinkansen to Kyoto. Walk through the endless orange vermilion gates of Fushimi Inari Shrine." },
      { day: 5, title: "Kinkaku-ji Golden Pavilion & Osaka Castle", desc: "Visit Zen Buddhist Golden Pavilion and Arashiyama Bamboo Grove. Transit to vibrant Osaka for Dotonbori food walk." }
    ],
    departures: [
      { date: "2026-10-15", status: "Available", seatsLeft: 12, price: 199999 },
      { date: "2026-10-29", status: "Filling Fast", seatsLeft: 3, price: 209999 },
      { date: "2026-11-12", status: "Available", seatsLeft: 16, price: 199999 }
    ]
  },
  {
    id: "intl-vn-cb-10",
    title: "Scenic Vietnam & Cambodia: Halong Bay, Hanoi, Da Nang & Angkor Wat",
    category: "International",
    region: "Southeast Asia",
    duration: "8 Days / 7 Nights",
    startingPrice: 89999,
    rating: 4.9,
    reviews: 96,
    image: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80",
    highlights: ["Overnight 5-Star Halong Bay Cruise", "Da Nang Golden Giant Hand Bridge", "Angkor Wat Sunrise Excursion", "Hanoi Old Quarter Rickshaw Ride"],
    inclusions: [
      "Overnight stay on luxury Halong Bay cruise with private balcony cabins",
      "Regional flights: Hanoi to Da Nang and Da Nang to Siem Reap",
      "Electronic visa approvals for Vietnam and Cambodia",
      "Pure Indian meals and vegetarian set menus arranged across all stops"
    ],
    exclusions: [
      "Cambodia visa stamp fee payable on arrival ($30 USD)",
      "Ba Na Hills wax museum entrance",
      "Personal tips and kayak rentals"
    ],
    itinerary: [
      { day: 1, title: "Arrival in Hanoi & French Quarter Walk", desc: "Airport reception in Hanoi. Evening cyclo rickshaw tour through 36 guild streets of the Old Quarter." },
      { day: 2, title: "Hanoi to Halong Bay Overnight Cruise", desc: "Board luxury cruise liner, explore Sung Sot Cave, and kayak through emerald karst waters." },
      { day: 3, title: "Halong Bay Sunrise to Central Da Nang", desc: "Morning Tai Chi on sundeck. Return to harbor and board flight to coastal Da Nang." },
      { day: 4, title: "Ba Na Hills & Iconic Golden Hand Bridge", desc: "Ride the world's longest single-wire cable car to Ba Na Hills and walk across the giant stone hand bridge." },
      { day: 5, title: "Fly to Siem Reap & Ancient Angkor Wat Sunrise", desc: "Flight to Cambodia. Early morning sunrise visit to monumental Angkor Wat temple towers." }
    ],
    departures: [
      { date: "2026-10-20", status: "Available", seatsLeft: 12, price: 89999 },
      { date: "2026-11-04", status: "Available", seatsLeft: 15, price: 89999 },
      { date: "2026-11-18", status: "Filling Fast", seatsLeft: 5, price: 94999 }
    ]
  },
  {
    id: "intl-tha-11",
    title: "Treasures of Thailand: Bangkok Temples, Safari World & Phuket Islands",
    category: "International",
    region: "Southeast Asia",
    duration: "6 Days / 5 Nights",
    startingPrice: 42999,
    rating: 4.8,
    reviews: 285,
    image: "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=800&q=80",
    highlights: ["Phi Phi Speedboat Excursion & Maya Bay", "Bangkok Grand Palace & Reclining Buddha", "Chao Phraya Luxury Dinner Cruise", "Safari World & Marine Park"],
    inclusions: [
      "5 Nights accommodation in central 4-star hotels (Phuket & Bangkok)",
      "Domestic flight from Phuket to Bangkok with check-in baggage",
      "Daily breakfast & Indian buffets at partner kitchens",
      "All national park fees and English/Hindi speaking tour managers"
    ],
    exclusions: [
      "Thailand visa fees (if applicable)",
      "Optional water sports at Coral Island (parasailing/sea-walker)",
      "Personal tipping and porter charges"
    ],
    itinerary: [
      { day: 1, title: "Arrival in Phuket & Patong Beach Orientation", desc: "Meet upon arrival at Phuket International. Transfer to hotel, evening orientation walk through Patong." },
      { day: 2, title: "Full-Day Phi Phi Island & Maya Bay Tour by Speedboat", desc: "Cruise to Maya Bay and Viking Cave with buffet lunch on Phi Phi Don and snorkeling stops in lagoons." },
      { day: 3, title: "Phuket Big Buddha & Transfer to Bangkok", desc: "Visit Big Buddha and Wat Chalong. Afternoon flight to capital city Bangkok." },
      { day: 4, title: "Safari World, Marine Park & Chao Phraya Dinner Cruise", desc: "Full day safari park drive with animal shows. Evening luxury dinner cruise along Chao Phraya River." },
      { day: 5, title: "Bangkok Temples Tour & Gems Gallery Shopping", desc: "Tour Wat Traimit (Golden Buddha), Wat Pho (Reclining Buddha), and afternoon shopping at Indra Square." }
    ],
    departures: [
      { date: "2026-10-10", status: "Available", seatsLeft: 16, price: 42999 },
      { date: "2026-10-24", status: "Filling Fast", seatsLeft: 4, price: 45999 },
      { date: "2026-11-07", status: "Available", seatsLeft: 22, price: 42999 }
    ]
  },
  {
    id: "intl-bali-12",
    title: "Enchanting Bali: Ubud Rainforest, Kintamani Volcano & Nusa Penida",
    category: "International",
    region: "Southeast Asia",
    duration: "7 Days / 6 Nights",
    startingPrice: 51999,
    rating: 4.9,
    reviews: 210,
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
    highlights: ["Nusa Penida Island Tour (Kelingking Beach)", "Ubud Sacred Monkey Forest & Jungle Swing", "Mount Batur View at Kintamani", "Tanah Lot Sunset Temple"],
    inclusions: [
      "3 Nights Ubud Pool Villa + 3 Nights Kuta/Seminyak 4-Star Beach Resort",
      "Fast boat transfers to Nusa Penida Island with private transport",
      "Daily breakfast and prepared Indian dinners (pure veg options available)",
      "All monument entry passes, temple sarongs, and AC private transfers"
    ],
    exclusions: [
      "Indonesia Visa on Arrival (~USD 35)",
      "Bali Tourist Levy (payable online)",
      "Water sports activities at Tanjung Benoa"
    ],
    itinerary: [
      { day: 1, title: "Arrival in Denpasar & Transfer to Ubud Rainforest", desc: "Arrival at Ngurah Rai Airport. Private transfer past terraced rice fields to Ubud retreat." },
      { day: 2, title: "Kintamani Volcano, Coffee Plantation & Jungle Swing", desc: "Witness Mount Batur and Lake Batur vistas. Visit coffee estates and take the famous jungle swing." },
      { day: 3, title: "Ubud Monkey Forest & Transfer to Seminyak Coast", desc: "Walk through Ubud Monkey Forest and Royal Palace. Afternoon transfer to coastal Seminyak/Kuta." },
      { day: 4, title: "West Nusa Penida Day Excursion by Fast Boat", desc: "Fast boat to Nusa Penida. Visit iconic T-Rex shaped Kelingking Beach, Broken Beach, and Angel's Billabong." },
      { day: 5, title: "Water Sports at Tanjung Benoa & Uluwatu Sunset", desc: "Banana boat ride at Tanjung Benoa. Sunset visit to clifftop Uluwatu Temple with Kecak fire dance." }
    ],
    departures: [
      { date: "2026-10-14", status: "Available", seatsLeft: 18, price: 51999 },
      { date: "2026-10-27", status: "Filling Fast", seatsLeft: 5, price: 54999 },
      { date: "2026-11-11", status: "Available", seatsLeft: 20, price: 49999 }
    ]
  },
  {
    id: "intl-sg-my-13",
    title: "Spectacular Singapore & Malaysia with Genting Highlands",
    category: "International",
    region: "Southeast Asia",
    duration: "7 Days / 6 Nights",
    startingPrice: 76999,
    rating: 4.8,
    reviews: 320,
    image: "https://images.unsplash.com/photo-1565967511849-76a60a516170?auto=format&fit=crop&w=800&q=80",
    highlights: ["Universal Studios Singapore", "Gardens by the Bay Supertrees & Cloud Forest", "Petronas Twin Towers & KL Tower", "Batu Caves Murugan Shrine & Genting Skyway"],
    inclusions: [
      "3 Nights in Singapore + 3 Nights in Kuala Lumpur (4-Star Hotels)",
      "High-speed AC coach transfer between Singapore and Kuala Lumpur",
      "Universal Studios full-day pass with rides included",
      "Indian breakfasts, lunches, and specialty Jain dinners"
    ],
    exclusions: [
      "Singapore and Malaysia tourist visas",
      "Tourism tax directly payable at Malaysian hotel desks",
      "Casino chips and personal shopping expenses"
    ],
    itinerary: [
      { day: 1, title: "Arrival in Singapore & Night Safari Tram Ride", desc: "Touchdown at Changi Airport. Transfer to hotel. Evening open-tram ride across nocturnal wildlife park." },
      { day: 2, title: "City Orientation & Sentosa Island with Universal Studios", desc: "Photo stop at Merlion Park. Cross over to Sentosa Island for rides at Universal Studios." },
      { day: 3, title: "Gardens by the Bay & Marina Bay Sands Observatory", desc: "Explore futuristic Flower Dome and Cloud Forest waterfall. Sunset views from MBS SkyPark deck." },
      { day: 4, title: "Scenic Coach Transfer to Kuala Lumpur, Malaysia", desc: "Cross the Johor Strait via coach into Malaysia. Drive past palm plantations to KL city center hotel." },
      { day: 5, title: "Batu Caves Murugan Temple & Genting Highlands", desc: "Climb the 272 steps of Batu Caves. Board Genting Skyway cable car up into mountain resort." }
    ],
    departures: [
      { date: "2026-10-11", status: "Available", seatsLeft: 15, price: 76999 },
      { date: "2026-10-25", status: "Filling Fast", seatsLeft: 3, price: 81999 },
      { date: "2026-11-09", status: "Available", seatsLeft: 19, price: 76999 }
    ]
  },

  // =========================================================================
  // --- 4. INTERNATIONAL: INDIAN OCEAN ISLANDS
  // =========================================================================
  {
    id: "intl-mld-14",
    title: "Maldives Luxury Escape: Private Overwater Villa & Coral Atolls",
    category: "International",
    region: "Island Escapes",
    duration: "4 Days / 3 Nights",
    startingPrice: 84999,
    rating: 4.9,
    reviews: 178,
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80",
    highlights: ["Speedboat / Seaplane Island Transfers", "All-Inclusive Dining & Drinks", "Guided House Reef Snorkeling", "Sunset Dolphin Cruise"],
    inclusions: [
      "3 Nights stay in Deluxe Beach Bungalow or Water Villa",
      "All-inclusive meal plan (Breakfast, Lunch, Dinner, High Tea)",
      "Return speedboat airport transfers from Malé Velana International",
      "Complimentary non-motorized watersports equipment"
    ],
    exclusions: [
      "Green Tax ($6/night per person payable at check-in)",
      "Scuba diving certification dives",
      "Spa therapies and motorized jet ski rentals"
    ],
    itinerary: [
      { day: 1, title: "Arrival in Malé & Speedboat Transfer to Atoll Resort", desc: "Arrive at Velana International Airport. Transferred across turquoise lagoons to your private atoll resort." },
      { day: 2, title: "House Reef Snorkeling & Sunset Dolphin Cruise", desc: "Explore coral reefs with sea turtles and reef fish. Sunset cruise in open waters alongside wild spinner dolphins." },
      { day: 3, title: "Water Sports & Candlelit Beachfront Dinner", desc: "Day for paddleboarding and sea kayaking. Barbecue dinner under tropical stars." },
      { day: 4, title: "Leisure Morning & Departure Transfer", desc: "Lavish buffet breakfast and boat transfer back to Malé for onward journey." }
    ],
    departures: [
      { date: "2026-10-08", status: "Available", seatsLeft: 8, price: 84999 },
      { date: "2026-10-22", status: "Filling Fast", seatsLeft: 3, price: 89999 },
      { date: "2026-11-05", status: "Available", seatsLeft: 12, price: 82999 }
    ]
  },
  {
    id: "intl-mru-15",
    title: "Paradise Mauritius: Ile Aux Cerfs, Chamarel 7-Colored Earth & Casela",
    category: "International",
    region: "Island Escapes",
    duration: "7 Days / 6 Nights",
    startingPrice: 79999,
    rating: 4.8,
    reviews: 130,
    image: "https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&w=800&q=80",
    highlights: ["Speedboat Cruise to Ile Aux Cerfs", "Chamarel 7-Coloured Earth Dunes", "Casela Nature Park Safari", "Trou Aux Cerfs Volcanic Crater"],
    inclusions: [
      "6 Nights in beachfront 4-star resort with water sports",
      "Full day North Tour (Port Louis & Le Caudan Waterfront)",
      "Daily breakfast and prepared Indian dinners (pure veg options)",
      "Return airport transfers in air-conditioned coaches"
    ],
    exclusions: [
      "Undersea walk and parasailing charges at Ile Aux Cerfs",
      "Quad biking and ziplining at Casela Nature Park",
      "Beverages and telephone expenses"
    ],
    itinerary: [
      { day: 1, title: "Arrival in Mauritius - Welcome to Coral Island", desc: "Arrive at Sir Seewoosagur Ramgoolam Airport. Transfer to beach resort. Welcome cocktail and ocean sunset." },
      { day: 2, title: "Ile Aux Cerfs Island Speedboat Adventure", desc: "Cruise to Ile Aux Cerfs paradise island. Enjoy sandy beaches and clear blue lagoons." },
      { day: 3, title: "North Tour: Port Louis Capital & Pamplemousses", desc: "Explore capital Port Louis, historic Fort Adelaide, Central Market, and Royal Botanical Gardens." },
      { day: 4, title: "South Tour: Chamarel Colored Earth & Grand Bassin", desc: "Visit sacred Grand Bassin Hindu lake and the natural chromatic dunes of Chamarel 7-Colored Earth." },
      { day: 5, title: "Casela Nature Park & Big Cat Encounter", desc: "Safari drive through savanna trails with zebras, ostriches, and rhinoceroses." }
    ],
    departures: [
      { date: "2026-10-12", status: "Available", seatsLeft: 14, price: 79999 },
      { date: "2026-10-26", status: "Filling Fast", seatsLeft: 4, price: 84999 },
      { date: "2026-11-09", status: "Available", seatsLeft: 18, price: 79999 }
    ]
  },
  {
    id: "intl-sey-16",
    title: "Seychelles Archipelago: Mahé Granite Boulders & Praslin Vallee de Mai",
    category: "International",
    region: "Island Escapes",
    duration: "6 Days / 5 Nights",
    startingPrice: 99999,
    rating: 4.9,
    reviews: 68,
    image: "https://images.unsplash.com/photo-1589979481223-deb893043163?auto=format&fit=crop&w=800&q=80",
    highlights: ["Anse Source d'Argent Giant Granite Boulders", "UNESCO Vallée de Mai (Coco de Mer Palm)", "Cat Cocos Inter-Island Ferry", "Victoria Botanical Gardens"],
    inclusions: [
      "3 Nights Mahé + 2 Nights Praslin Island in boutique oceanfront resorts",
      "Inter-island Cat Cocos catamaran tickets (Mahé - Praslin - La Digue)",
      "Daily breakfast buffet and Indian dinner arrangements",
      "All island transfers and guided forest trail permits"
    ],
    exclusions: [
      "Bicycle rentals on La Digue Island",
      "International flights to Seychelles (SEZ)",
      "Snorkeling gear hire"
    ],
    itinerary: [
      { day: 1, title: "Arrival in Mahé & Victoria City Tour", desc: "Touchdown in Victoria, Seychelles. Explore the Clock Tower, local market, and relax at Beau Vallon Beach." },
      { day: 2, title: "Cat Cocos Ferry to Praslin & Vallée de Mai Forest", desc: "Cruise to Praslin. Walk through the prehistoric forest of Vallée de Mai to see endemic Coco de Mer nuts." },
      { day: 3, title: "Day Trip to La Digue: Anse Source d'Argent", desc: "Boat to La Digue. Bicycle or buggy tour to Anse Source d'Argent with its sculpted granite rock formations." },
      { day: 4, title: "Return to Mahé & Coastal Scenic Drive", desc: "Catamaran back to Mahé. Scenic drive along coastal fringe past cinnamon plantations and coves." },
      { day: 5, title: "Marine Park Snorkeling & Creole Market", desc: "Glass-bottom boat tour across Ste Anne Marine National Park with fish feeding and reef snorkeling." }
    ],
    departures: [
      { date: "2026-10-16", status: "Available", seatsLeft: 10, price: 99999 },
      { date: "2026-11-06", status: "Filling Fast", seatsLeft: 3, price: 104999 },
      { date: "2026-11-20", status: "Available", seatsLeft: 12, price: 99999 }
    ]
  },

  // =========================================================================
  // --- 5. DOMESTIC: NORTH INDIA
  // =========================================================================
  {
    id: "nat-kash-17",
    title: "Heaven on Earth: Kashmir Paradise, Gulmarg Gondola & Dal Lake",
    category: "Domestic",
    region: "North India",
    duration: "6 Days / 5 Nights",
    startingPrice: 34999,
    rating: 4.9,
    reviews: 310,
    image: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=800&q=80",
    highlights: ["Dal Lake Deluxe Houseboat", "Gulmarg Gondola Phase 1", "Pahalgam Betaab Valley", "Shikara Ride at Sunset"],
    inclusions: [
      "1 Night Deluxe Houseboat on Dal Lake + 4 Nights Premium 4-Star Resort",
      "Daily breakfast and prepared Indian dinners (Buffet)",
      "Dedicated tempo traveller for sightseeing and transfers",
      "Pre-booked Gondola Phase 1 cable car passes"
    ],
    exclusions: [
      "Pony rides or sledging in Gulmarg / Sonamarg",
      "Flights to Srinagar Airport (SXR)",
      "Local union cab fees in Aru / Betaab Valley"
    ],
    itinerary: [
      { day: 1, title: "Arrival in Srinagar & Dal Lake Shikara", desc: "Welcome at Srinagar Airport. Check-in to luxury houseboat followed by a 2-hour Shikara ride." },
      { day: 2, title: "Srinagar to Gulmarg - Gondola Excursion", desc: "Drive to Gulmarg. Board the high-altitude cable car up to Kungdoor Station (Phase 1)." },
      { day: 3, title: "Gulmarg to Pahalgam via Saffron Fields", desc: "Scenic transfer through Pampore saffron fields into Pahalgam valley along the Lidder River." },
      { day: 4, title: "Pahalgam Valleys Exploration", desc: "Day excursion to Betaab Valley, Chandanwari, and local Kashmiri handicraft centers." },
      { day: 5, title: "Pahalgam to Srinagar & Mughal Gardens", desc: "Return to Srinagar. Explore Shalimar Bagh, Nishat Bagh, and Shankaracharya Temple." }
    ],
    departures: [
      { date: "2026-09-28", status: "Filling Fast", seatsLeft: 3, price: 34999 },
      { date: "2026-10-05", status: "Available", seatsLeft: 12, price: 36999 },
      { date: "2026-10-18", status: "Available", seatsLeft: 20, price: 34999 }
    ]
  },
  {
    id: "nat-him-18",
    title: "Himachal Alpine Trail: Shimla, Kullu Valley & Manali Solang",
    category: "Domestic",
    region: "North India",
    duration: "6 Days / 5 Nights",
    startingPrice: 29999,
    rating: 4.8,
    reviews: 195,
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80",
    highlights: ["Atal Tunnel & Solang Snow Valley", "Shimla Mall Road & Ridge Walk", "Hadimba Temple & Vashisht Hot Springs", "Kullu River Rafting Point"],
    inclusions: [
      "2 Nights Shimla + 3 Nights Manali in 4-Star mountain resorts",
      "Daily hot buffet breakfasts and pure Indian dinners",
      "Private AC vehicle (heating included) for mountain transfers",
      "Permits for Solang Valley and Atal Tunnel transit"
    ],
    exclusions: [
      "Adventure sports (paragliding, zorbing, river rafting)",
      "Rohtang Pass NGT green tax permit fee",
      "Flights / train to Chandigarh (IXC)"
    ],
    itinerary: [
      { day: 1, title: "Chandigarh to Shimla - Foothill Ascent", desc: "Meet at Chandigarh. Scenic drive past apple orchards to Shimla. Evening stroll along Mall Road." },
      { day: 2, title: "Kufri Excursion & Shimla Heritage", desc: "Visit Kufri winter sports hub. Horse rides to Mahasu Peak and views from Jakhu Hill." },
      { day: 3, title: "Shimla to Manali via Kullu Valley", desc: "Scenic transfer along Beas River through Pandoh Dam, Hanogi Mata temple, and Kullu shawl centers." },
      { day: 4, title: "Solang Valley & Atal Tunnel Engineering Feat", desc: "Drive through the 9.02 km Atal Tunnel to North Portal. Adventure activities at Solang Valley." },
      { day: 5, title: "Manali Local Sightseeing & Old Manali Cafes", desc: "Visit Hadimba Temple, Manu Temple, Tibetan monasteries, and sulfur springs at Vashisht." }
    ],
    departures: [
      { date: "2026-10-06", status: "Available", seatsLeft: 18, price: 29999 },
      { date: "2026-10-20", status: "Filling Fast", seatsLeft: 4, price: 32999 },
      { date: "2026-11-03", status: "Available", seatsLeft: 15, price: 29999 }
    ]
  },
  {
    id: "nat-uttr-19",
    title: "Devbhoomi Uttarakhand: Mussoorie Hills, Nainital Lakes & Corbett",
    category: "Domestic",
    region: "North India",
    duration: "7 Days / 6 Nights",
    startingPrice: 31999,
    rating: 4.8,
    reviews: 144,
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80",
    highlights: ["Naini Lake Yacht Ride & Naina Devi Temple", "Kempty Falls & Gun Hill Mussoorie", "Jim Corbett National Park Safari Gate", "Bhimtal Lake Island"],
    inclusions: [
      "6 Nights in premium hill view resorts (Nainital, Mussoorie & Corbett)",
      "Daily North Indian buffet breakfasts and pure vegetarian dinners",
      "Private commercial AC vehicle with experienced mountain driver",
      "Boating tokens at Naini Lake and environmental passes"
    ],
    exclusions: [
      "Jim Corbett 4x4 open gypsy safari booking",
      "Cable car tickets at Gun Hill",
      "Train or flight tickets to Dehradun/Delhi"
    ],
    itinerary: [
      { day: 1, title: "Delhi to Nainital - Lake District Ascent", desc: "Pickup in Delhi. Scenic ascent into Kumaon hills. Evening walk along Nainital Mall Road." },
      { day: 2, title: "Nainital Lake Tour: Bhimtal, Sattal & Snow View", desc: "Explore Bhimtal, Sattal, and Naukuchiatal. Cable car to Snow View Point overlooking Nanda Devi." },
      { day: 3, title: "Nainital to Corbett Foothills", desc: "Drive down to Ramnagar Corbett belt. Evening nature walk and riverbed relaxation." },
      { day: 4, title: "Corbett to Queen of Hills Mussoorie", desc: "Scenic highway transfer to Mussoorie. Check-in and evening stroll along Camel's Back Road." },
      { day: 5, title: "Mussoorie Hills: Kempty Falls & Mall Road", desc: "Visit tumbling Kempty Falls, Company Garden, and enjoy sunset vistas over the Doon Valley." }
    ],
    departures: [
      { date: "2026-10-08", status: "Available", seatsLeft: 16, price: 31999 },
      { date: "2026-10-22", status: "Filling Fast", seatsLeft: 3, price: 34999 },
      { date: "2026-11-05", status: "Available", seatsLeft: 20, price: 31999 }
    ]
  },

  // =========================================================================
  // --- 6. DOMESTIC: SOUTH INDIA
  // =========================================================================
  {
    id: "nat-ker-20",
    title: "Kerala Backwaters, Munnar Tea Hills & Thekkady Spices",
    category: "Domestic",
    region: "South India",
    duration: "6 Days / 5 Nights",
    startingPrice: 28999,
    rating: 4.8,
    reviews: 184,
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80",
    highlights: ["Alleppey Houseboat Cruise", "Munnar Tea Plantations", "Periyar Wildlife Sanctuary", "Eravikulam National Park"],
    inclusions: [
      "1 Night Private Houseboat with traditional Kerala/Indian meals",
      "4 Nights in premium hill stations and wildlife resorts",
      "All interstate permits, tolls, and parking taxes",
      "Dedicated tour manager assistance"
    ],
    exclusions: [
      "Kathakali or Kalaripayattu show entry tickets",
      "Airfare / Train tickets to Cochin (COK)",
      "Spice plantation sample purchases"
    ],
    itinerary: [
      { day: 1, title: "Cochin to Munnar - Tea Country Ascent", desc: "Arrival at Cochin Airport. Drive through Cheeyappara waterfalls to Munnar." },
      { day: 2, title: "Munnar Tea Gardens & Eravikulam Park", desc: "Visit Nilgiri Tahr habitat at Eravikulam and Tata Tea Museum." },
      { day: 3, title: "Munnar to Thekkady Spice Sanctuary", desc: "Scenic drive through Cardamom hills. Guided spice garden tour and Periyar Lake boat ride." },
      { day: 4, title: "Thekkady to Alleppey Houseboat", desc: "Board private houseboat in Alleppey. Cruise backwaters with freshly prepared meals." },
      { day: 5, title: "Alleppey to Cochin Departure", desc: "Disembark and transfer to Cochin Airport with a stop at Fort Kochi Chinese fishing nets." }
    ],
    departures: [
      { date: "2026-10-10", status: "Available", seatsLeft: 18, price: 28999 },
      { date: "2026-10-24", status: "Filling Fast", seatsLeft: 4, price: 31999 },
      { date: "2026-11-14", status: "Available", seatsLeft: 22, price: 28999 }
    ]
  },
  {
    id: "nat-coorg-21",
    title: "Misty Coorg, Ooty Toy Train & Kabini Wilderness",
    category: "Domestic",
    region: "South India",
    duration: "5 Days / 4 Nights",
    startingPrice: 24999,
    rating: 4.7,
    reviews: 132,
    image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80",
    highlights: ["Abbey Falls & Coffee Plantation Walk", "UNESCO Nilgiri Mountain Toy Train", "Dubare Elephant Camp", "Kabini Jungle Open Safari"],
    inclusions: [
      "4 Nights in boutique plantation bungalows and jungle lodges",
      "Daily South & North Indian buffet breakfasts and dinners",
      "Private AC vehicle ex-Bangalore with driver allowances",
      "Guided coffee tasting & spice trail walk"
    ],
    exclusions: [
      "Kabini safari vehicle booking charges",
      "Camera tickets at botanical gardens",
      "Airfare / Train tickets to Bengaluru (BLR)"
    ],
    itinerary: [
      { day: 1, title: "Bangalore to Coorg via Bylakuppe Tibetan Golden Temple", desc: "Pickup in Bangalore. Drive to Coorg with a stop at Namdroling Monastery in Bylakuppe." },
      { day: 2, title: "Abbey Falls, Raja's Seat & Coffee Estate Trail", desc: "Visit Abbey Falls and historic Madikeri Fort. Walk through aromatic Arabica/Robusta coffee plantations." },
      { day: 3, title: "Dubare Elephant Camp to Ooty Hills", desc: "Interact with elephants at Dubare Camp along Cauvery River. Drive through Bandipur reserves up into Nilgiris." },
      { day: 4, title: "Ooty Toy Train & Botanical Gardens", desc: "Ride the heritage Nilgiri Toy Train from Ooty to Coonoor. Visit Doddabetta Peak and tea factory." },
      { day: 5, title: "Return to Bangalore Airport", desc: "Scenic descent from Western Ghats back to Bangalore Kempegowda International Airport." }
    ],
    departures: [
      { date: "2026-10-04", status: "Available", seatsLeft: 14, price: 24999 },
      { date: "2026-10-18", status: "Available", seatsLeft: 16, price: 24999 },
      { date: "2026-11-01", status: "Filling Fast", seatsLeft: 5, price: 26999 }
    ]
  },
  {
    id: "nat-hyd-23",
    title: "Heritage Hyderabad: Ramoji Film City & Nizam Palaces",
    category: "Domestic",
    region: "South India",
    duration: "4 Days / 3 Nights",
    startingPrice: 19999,
    rating: 4.8,
    reviews: 146,
    image: "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&w=800&q=80",
    highlights: ["Full-Day Ramoji Film City Tour", "Golconda Fort Sound & Light Show", "Charminar & Laad Bazaar Pearl Shopping", "Chowmahalla Palace"],
    inclusions: [
      "3 Nights in central 4-star property in Banjara Hills / Hitec City",
      "VIP Entry pass to Ramoji Film City with studio tours",
      "Authentic Hyderabadi cuisine lunches & buffet dinners",
      "AC transport for city sightseeing and airport transfers"
    ],
    exclusions: [
      "Personal shopping at Laad Bazaar for bangles and pearls",
      "Monument photography passes",
      "Flights to Rajiv Gandhi International (HYD)"
    ],
    itinerary: [
      { day: 1, title: "Arrival in Hyderabad & Golconda Sound & Light Show", desc: "Arrive at HYD Airport. Check in and visit Golconda Fort for the historic evening sound and light presentation." },
      { day: 2, title: "Full-Day Studio Tour at Ramoji Film City", desc: "Explore the world's largest integrated film studio complex with live stunts, themed gardens, and rides." },
      { day: 3, title: "Charminar, Mecca Masjid & Chowmahalla Palace", desc: "Walk through old city to Charminar and Mecca Masjid. Tour Chowmahalla Palace and shop at Laad Bazaar." },
      { day: 4, title: "Salar Jung Museum & Departure", desc: "Explore 40,000+ artifacts at Salar Jung Museum and visit Hussain Sagar Lake before airport transfer." }
    ],
    departures: [
      { date: "2026-10-09", status: "Available", seatsLeft: 18, price: 19999 },
      { date: "2026-10-23", status: "Available", seatsLeft: 15, price: 19999 },
      { date: "2026-11-06", status: "Filling Fast", seatsLeft: 4, price: 21999 }
    ]
  },

  // =========================================================================
  // --- 7. DOMESTIC: WEST INDIA
  // =========================================================================
  {
    id: "nat-raj-24",
    title: "Royal Rajasthan: Jaipur Forts, Jodhpur Citadel & Udaipur Lake Palaces",
    category: "Domestic",
    region: "West India",
    duration: "7 Days / 6 Nights",
    startingPrice: 38999,
    rating: 4.9,
    reviews: 240,
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80",
    highlights: ["Amber Fort Jeep Safari", "Mehrangarh Fort Jodhpur", "Lake Pichola Sunset Boat Ride", "City Palace Udaipur"],
    inclusions: [
      "Heritage hotel and palace stays across Jaipur, Jodhpur, and Udaipur",
      "Daily breakfast and authentic Rajasthani / Jain dinners",
      "AC Coach with English/Hindi tour leader",
      "Monument entries and boat ride tickets"
    ],
    exclusions: [
      "Camera and video permits at palace sites",
      "Tips to folk performers and drivers",
      "Airfare / Train tickets to Jaipur"
    ],
    itinerary: [
      { day: 1, title: "Arrival in Pink City Jaipur", desc: "Check-in hotel, evening visit to Birla Temple and Chokhi Dhani cultural village." },
      { day: 2, title: "Jaipur Heritage - Amber Fort & Hawa Mahal", desc: "Jeep ascent to Amber Fort, photo stop at Hawa Mahal, and City Palace tour." },
      { day: 3, title: "Jaipur to Jodhpur via Pushkar", desc: "Drive past sacred Pushkar Lake and Brahma Temple. Evening arrival in Jodhpur." },
      { day: 4, title: "Mehrangarh Fort to Udaipur", desc: "Explore Mehrangarh Fort, Jaswant Thada, and drive toward the City of Lakes." },
      { day: 5, title: "Udaipur City Palace & Lake Pichola", desc: "Tour City Palace museum, Saheliyon-ki-Bari, and take a sunset boat cruise on Pichola." }
    ],
    departures: [
      { date: "2026-10-18", status: "Available", seatsLeft: 14, price: 38999 },
      { date: "2026-11-01", status: "Filling Fast", seatsLeft: 2, price: 41999 },
      { date: "2026-11-15", status: "Available", seatsLeft: 20, price: 38999 }
    ]
  },
  {
    id: "nat-guj-25",
    title: "Vibrant Gujarat: White Rann of Kutch, Gir Lion Safari & Somnath Jyotirlinga",
    category: "Domestic",
    region: "West India",
    duration: "6 Days / 5 Nights",
    startingPrice: 31999,
    rating: 4.8,
    reviews: 152,
    image: "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=800&q=80",
    highlights: ["White Desert Sunset & Moonlight Salt Plains", "Gir National Park Asiatic Lion Open Safari", "Somnath Temple Evening Sound & Light Show", "Bhuj Aina Mahal & Rogan Art Village"],
    inclusions: [
      "2 Nights Deluxe AC Tent City at Dhordo (Kutch) + 3 Nights 4-Star Hotels",
      "Pure Gujarati & Jain vegetarian thali dining throughout tour",
      "Gir Jungle Trail open gypsy safari permit and guide",
      "All interstate tolls, parking, and AC coach transit"
    ],
    exclusions: [
      "Paramotoring or ATV rides on the White Desert",
      "Camera permits inside Gir National Park",
      "Airfare / Train tickets to Ahmedabad or Rajkot"
    ],
    itinerary: [
      { day: 1, title: "Ahmedabad to Bhuj - Kutch Craft Hub", desc: "Arrival in Ahmedabad/Bhuj. Visit Prag Mahal and Aina Mahal, shop for bandhani and mirror-work textiles." },
      { day: 2, title: "Dhordo White Desert & Sunset Over Rann", desc: "Check into luxurious tent city at Dhordo. Witness the sunset over the endless white salt desert." },
      { day: 3, title: "Kala Dungar Highest Point to Junagadh", desc: "Ascend Black Hill (Kala Dungar) for panoramic border views. Drive southward toward Junagadh." },
      { day: 4, title: "Gir National Park Asiatic Lion Safari", desc: "Early morning open gypsy safari inside Gir Forest to spot endangered Asiatic lions and leopards." },
      { day: 5, title: "Somnath Sea-Facing Jyotirlinga & Diu Island", desc: "Darshan at first Jyotirlinga Somnath Temple. Afternoon visit to Portuguese Fort in Diu." }
    ],
    departures: [
      { date: "2026-10-15", status: "Available", seatsLeft: 16, price: 31999 },
      { date: "2026-10-29", status: "Filling Fast", seatsLeft: 3, price: 34999 },
      { date: "2026-11-12", status: "Available", seatsLeft: 18, price: 31999 }
    ]
  },
  {
    id: "nat-goa-26",
    title: "Sun, Sand & Heritage: North & South Goa Coastal Leisure",
    category: "Domestic",
    region: "West India",
    duration: "4 Days / 3 Nights",
    startingPrice: 17999,
    rating: 4.7,
    reviews: 310,
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80",
    highlights: ["Mandovi River Sunset Cruise", "Old Goa Basilicas (Bom Jesus)", "Aguada Fort Ocean Vistas", "Calangute & Baga Beach Fun"],
    inclusions: [
      "3 Nights in 4-Star North Goa Beach Resort with swimming pool",
      "Daily breakfast buffet and evening dinners",
      "1-Hour Mandovi River cruise with Goan folk dance performances",
      "AC coach for North & South Goa sightseeing circuits"
    ],
    exclusions: [
      "Water sports at Baga/Calangute",
      "Drinks, beach shacks expenses, and club entries",
      "Airfare / Train tickets to Dabolim or MOPA Airport"
    ],
    itinerary: [
      { day: 1, title: "Arrival in Goa & Sunset Beach Walk", desc: "Arrive at MOPA or Dabolim Airport. Transfer to beachside resort. Relax by the pool and stroll along Calangute." },
      { day: 2, title: "North Goa Forts, Cliffs & Vibrant Coast", desc: "Tour 17th-century Fort Aguada overlooking Arabian Sea. Explore Sinquerim, Anjuna, and Baga beach." },
      { day: 3, title: "South Goa Portuguese Churches & Mandovi Cruise", desc: "Visit UNESCO-listed Basilica of Bom Jesus and Se Cathedral in Old Goa. Evening Mandovi River cruise." },
      { day: 4, title: "Goan Souvenir Shopping & Departure", desc: "Shop for feni, cashews, and spices at Panaji market before heading to the airport." }
    ],
    departures: [
      { date: "2026-10-02", status: "Available", seatsLeft: 20, price: 17999 },
      { date: "2026-10-16", status: "Available", seatsLeft: 22, price: 17999 },
      { date: "2026-10-30", status: "Filling Fast", seatsLeft: 5, price: 19999 }
    ]
  },

  // =========================================================================
  // --- 8. DOMESTIC: EAST & NORTH-EAST INDIA
  // =========================================================================
  {
    id: "nat-sikkim-27",
    title: "Himalayan Mystique: Gangtok, Tsomgo Lake, Nathula Pass & Darjeeling Toy Train",
    category: "Domestic",
    region: "East India",
    duration: "6 Days / 5 Nights",
    startingPrice: 32999,
    rating: 4.9,
    reviews: 188,
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80",
    highlights: ["Tsomgo Glacial Lake & Baba Mandir (12,400 ft)", "Nathula Pass Indo-China Border Lookout", "Tiger Hill Kanchenjunga Sunrise", "UNESCO Darjeeling Himalayan Toy Train"],
    inclusions: [
      "3 Nights Gangtok + 2 Nights Darjeeling in 4-Star mountain hotels",
      "Sikkim Inner Line Permit (ILP) and Nathula Border passes included",
      "Daily hot buffet breakfasts and pure Indian dinners",
      "Non-AC luxury SUV for all mountain transfers and Tiger Hill sunrise"
    ],
    exclusions: [
      "Joyride ticket on the Darjeeling Steam Toy Train",
      "Yak rides at Tsomgo Lake",
      "Flights / train tickets to Bagdogra (IXB) or NJP Railway Station"
    ],
    itinerary: [
      { day: 1, title: "Bagdogra to Gangtok - Along Teesta River", desc: "Pickup at Bagdogra Airport. Drive along green Teesta River gorge to Gangtok. Evening walk on MG Marg." },
      { day: 2, title: "Tsomgo Glacial Lake, Baba Mandir & Nathula Pass", desc: "Drive to high altitude Tsomgo Lake. Visit Baba Harbhajan Singh Mandir and Indo-China military outpost at Nathula Pass." },
      { day: 3, title: "Gangtok Monasteries to Darjeeling Queen of Hills", desc: "Visit Rumtek Monastery and Do Drul Chorten. Scenic transfer through tea hills to colonial Darjeeling." },
      { day: 4, title: "Tiger Hill Sunrise Over Mount Kanchenjunga", desc: "Early 4:00 AM trip to Tiger Hill to watch golden sunrise over Kanchenjunga. Visit Ghoom Monastery and Batasia Loop." },
      { day: 5, title: "Darjeeling Tea Gardens & Mountaineering Institute", desc: "Tour Himalayan Mountaineering Institute (HMI), Padmaja Naidu Zoo, and Happy Valley Tea Estate." }
    ],
    departures: [
      { date: "2026-10-07", status: "Available", seatsLeft: 14, price: 32999 },
      { date: "2026-10-21", status: "Filling Fast", seatsLeft: 3, price: 36999 },
      { date: "2026-11-04", status: "Available", seatsLeft: 18, price: 32999 },
      { date: "2026-11-18", status: "Available", seatsLeft: 12, price: 30999 }
    ]
  },
  {
    id: "nat-ne-28",
    title: "Enchanted North-East: Kaziranga Rhino Safari, Shillong & Cherrapunji Waterfalls",
    category: "Domestic",
    region: "East India",
    duration: "7 Days / 6 Nights",
    startingPrice: 36999,
    rating: 4.8,
    reviews: 142,
    image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=800&q=80",
    highlights: ["Kaziranga National Park Elephant & Jeep Safari", "Cherrapunji Nohkalikai Falls & Mawsmai Caves", "Living Double Decker Root Bridge Trail", "Dawki Crystal Clear Umngot River Boating"],
    inclusions: [
      "2 Nights Kaziranga + 3 Nights Shillong + 1 Night Cherrapunji eco-resorts",
      "1 Elephant Safari + 1 Jeep Safari inside Kaziranga Central / Western range",
      "Daily breakfast and prepared Indian dinners (Jain options guaranteed)",
      "Dedicated commercial AC vehicle with forest permits and tolls"
    ],
    exclusions: [
      "Camera fees inside Kaziranga National Park",
      "Boat ride charges at Dawki river",
      "Flights to Guwahati International Airport (GAU)"
    ],
    itinerary: [
      { day: 1, title: "Guwahati to Kaziranga National Park", desc: "Arrive at Guwahati Airport. Visit Kamakhya Temple and drive past tea gardens to Kaziranga wildlife reserve." },
      { day: 2, title: "Kaziranga Elephant & Jeep Safari: One-Horned Rhinos", desc: "Early morning elephant safari to spot one-horned rhinos, wild water buffalo, and swamp deer. Afternoon open jeep safari." },
      { day: 3, title: "Kaziranga to Shillong - Scotland of the East", desc: "Scenic transfer up into Meghalaya pine plateaus. Photo stop at serene Umiam Barapani Lake. Evening at Police Bazar." },
      { day: 4, title: "Cherrapunji Waterfalls & Limestone Mawsmai Cave", desc: "Drive into Cherrapunji, one of the wettest places on earth. View Nohkalikai Falls and walk through lit limestone caverns of Mawsmai." },
      { day: 5, title: "Dawki Transparent River & Mawlynnong Cleanest Village", desc: "Boat ride on glass-like waters of Umngot River in Dawki. Tour Mawlynnong, awarded Asia's cleanest village." }
    ],
    departures: [
      { date: "2026-10-10", status: "Available", seatsLeft: 12, price: 36999 },
      { date: "2026-10-24", status: "Filling Fast", seatsLeft: 2, price: 39999 },
      { date: "2026-11-07", status: "Available", seatsLeft: 16, price: 36999 },
      { date: "2026-11-21", status: "Available", seatsLeft: 10, price: 35999 }
    ]
  },
  {
    id: "nat-odisha-29",
    title: "Golden Triangle of Odisha: Puri Jagannath, Konark Sun Temple & Chilika Lake",
    category: "Domestic",
    region: "East India",
    duration: "5 Days / 4 Nights",
    startingPrice: 22999,
    rating: 4.8,
    reviews: 164,
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80",
    highlights: ["Puri Jagannath Temple Mahaprasad Experience", "UNESCO Konark Sun Temple Chariot Wheels", "Chilika Lake Irrawaddy Dolphin Sanctuary", "Dhauli Peace Pagoda & Raghurajpur Crafts"],
    inclusions: [
      "2 Nights Puri + 2 Nights Bhubaneswar in luxury 4-star properties",
      "Special pandas / guides for Jagannath Temple Darshan",
      "Motorboat cruise on Chilika Lake to Dolphin Point and Rajhans Island",
      "Daily Indian vegetarian buffet breakfasts and dinners"
    ],
    exclusions: [
      "Temple special puja donation receipts",
      "Monument photography passes",
      "Flights / train tickets to Bhubaneswar (BBI)"
    ],
    itinerary: [
      { day: 1, title: "Arrival in Bhubaneswar - Temple City to Puri Beach", desc: "Pickup at Bhubaneswar. Visit 11th-century Lingaraj Temple and Dhauli Shanti Stupa before proceeding to holy Puri." },
      { day: 2, title: "Lord Jagannath Temple & Konark Sun Temple", desc: "Early morning darshan at Jagannath Temple. Drive down Marine Drive to marvel at the 13th-century Konark Sun Temple chariot." },
      { day: 3, title: "Chilika Lagoon Boat Cruise & Irrawaddy Dolphins", desc: "Excursion to Satapada on Chilika Lake, Asia's largest brackish lagoon. Spot endangered Irrawaddy dolphins and Sea Mouth." },
      { day: 4, title: "Raghurajpur Artisan Village to Bhubaneswar", desc: "Visit heritage craft village Raghurajpur to see Pattachitra painters. Afternoon visit to Udayagiri & Khandagiri Jain caves." },
      { day: 5, title: "Nandankanan Zoological Park & Departure", desc: "Tour white tiger sanctuary at Nandankanan Zoo before airport transfer in Bhubaneswar." }
    ],
    departures: [
      { date: "2026-10-14", status: "Available", seatsLeft: 18, price: 22999 },
      { date: "2026-10-28", status: "Filling Fast", seatsLeft: 4, price: 25999 },
      { date: "2026-11-11", status: "Available", seatsLeft: 20, price: 22999 }
    ]
  },

  // =========================================================================
  // --- 9. DOMESTIC: INDIAN ISLAND TERRITORIES
  // =========================================================================
  {
    id: "nat-lak-30",
    title: "Untouched Lakshadweep: Agatti, Bangaram & Coral Lagoons",
    category: "Domestic",
    region: "Island Escapes",
    duration: "5 Days / 4 Nights",
    startingPrice: 38999,
    rating: 4.9,
    reviews: 142,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    highlights: ["Agatti Coral Reef Glass-Bottom Boat", "Bangaram Uninhabited Island Excursion", "Thinnakara Scuba & Sea Turtle Haven", "Kayaking in Crystal Lagoons"],
    inclusions: [
      "Lakshadweep entry permit processing and heritage verification",
      "4 Nights in beach cottages on Agatti / Bangaram Island",
      "All meals (Breakfast, Lunch, Dinner with pure veg/Jain options)",
      "Inter-island boat transfers and airport pickup at Agatti (AGX)"
    ],
    exclusions: [
      "Airfare to/from Agatti Airport (Kochi to Agatti flight)",
      "PADI scuba diving sessions",
      "Personal watersports rentals"
    ],
    itinerary: [
      { day: 1, title: "Arrival at Agatti Airstrip & Lagoon Orientation", desc: "Fly into the runway of Agatti Airport surrounded by coral seas. Evening glass-bottom boat tour." },
      { day: 2, title: "Bangaram Island Day Excursion by Speedboat", desc: "Speedboat excursion to Bangaram, a pristine uninhabited atoll. Snorkeling in coral gardens." },
      { day: 3, title: "Thinnakara Island & Sea Turtle Point", desc: "Cruise to Thinnakara Island. Spot giant green sea turtles in shallow lagoons." },
      { day: 4, title: "Water Sports, Scuba Diving & Island Cycling", desc: "Day for guided scuba diving, kayaking, and bicycling through the fishing villages of Agatti." },
      { day: 5, title: "Departure from Agatti", desc: "Morning dip in the turquoise lagoon before transfer to Agatti Airport for flight to Kochi." }
    ],
    departures: [
      { date: "2026-10-11", status: "Available", seatsLeft: 10, price: 38999 },
      { date: "2026-10-25", status: "Filling Fast", seatsLeft: 2, price: 42999 },
      { date: "2026-11-08", status: "Available", seatsLeft: 12, price: 38999 }
    ]
  },
  {
    id: "nat-and-31",
    title: "Andaman Tropical Escapes: Havelock Radhanagar & Port Blair Cellular Jail",
    category: "Domestic",
    region: "Island Escapes",
    duration: "5 Days / 4 Nights",
    startingPrice: 32999,
    rating: 4.9,
    reviews: 215,
    image: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=800&q=80",
    highlights: ["Cellular Jail Light & Sound Show", "Radhanagar Beach Sunset (Asia's Best Beach)", "Makruzz Luxury Catamaran Cruise", "Elephant Beach Snorkeling"],
    inclusions: [
      "2 Nights Port Blair + 2 Nights Havelock Island in beachside resorts",
      "Makruzz / Green Ocean luxury AC catamaran ferry tickets",
      "Daily breakfast and curated Indian dinners",
      "All island entry permits, harbor transfers, and escorts"
    ],
    exclusions: [
      "Undersea scuba diving or sea-kart rides",
      "Airfare to Port Blair (IXZ)",
      "Camera fees at Cellular Jail"
    ],
    itinerary: [
      { day: 1, title: "Arrival in Port Blair & Historic Cellular Jail", desc: "Touchdown in Port Blair. Check in and visit Cellular Jail. Witness the emotional Light & Sound show." },
      { day: 2, title: "High-Speed Cruise to Havelock Island & Radhanagar", desc: "Board Makruzz catamaran to Havelock Island. Sunset relaxation on Radhanagar Beach." },
      { day: 3, title: "Elephant Beach Snorkeling & Coral Exploration", desc: "Speedboat to Elephant Beach with complimentary snorkeling over live shallow reefs." },
      { day: 4, title: "Return to Port Blair & Local Souvenir Shopping", desc: "Catamaran cruise back to Port Blair. Visit Samudrika Naval Marine Museum." },
      { day: 5, title: "Departure from Port Blair", desc: "Transfer to Port Blair airport with coastal memories." }
    ],
    departures: [
      { date: "2026-10-12", status: "Available", seatsLeft: 12, price: 32999 },
      { date: "2026-10-26", status: "Filling Fast", seatsLeft: 3, price: 35999 },
      { date: "2026-11-09", status: "Available", seatsLeft: 16, price: 32999 }
    ]
  },

  // =========================================================================
  // --- 10. DEVOTIONAL & TEERTH YATRA CIRCUITS
  // =========================================================================
  {
    id: "dev-kashi-32",
    title: "Divya Kashi, Ayodhya Ram Mandir & Prayagraj Triveni Sangam",
    category: "Devotional",
    region: "Devotional",
    duration: "5 Days / 4 Nights",
    startingPrice: 21999,
    rating: 4.9,
    reviews: 380,
    image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80",
    highlights: ["Kashi Vishwanath Corridor & Ganga Aarti", "Ayodhya Shri Ram Janmabhoomi Mandir Darshan", "Prayagraj Triveni Sangam Holy Snan", "Sarnath Buddha Deer Park"],
    inclusions: [
      "4 Nights in premium 4-star hotels in Varanasi and Ayodhya",
      "Special VIP Darshan tokens for Kashi Vishwanath & Ram Mandir",
      "Exclusive private boat ride during Dashashwamedh Ghat Evening Aarti",
      "Pure Satvik / Jain dining arrangements (Breakfast, Lunch & Dinner)"
    ],
    exclusions: [
      "Personal puja samagri and Pandit dakshina",
      "Flight / Train tickets to Varanasi (VNS) or Ayodhya (AYJ)",
      "Baggage porterage and personal transport tips"
    ],
    itinerary: [
      { day: 1, title: "Arrival in Varanasi & Evening Ganga Aarti", desc: "Pickup at Varanasi Airport/Railway Station. Transfer to hotel. Evening private boat cruise to witness the divine Dashashwamedh Ghat Ganga Aarti." },
      { day: 2, title: "Kashi Vishwanath Corridor, Annapurna & Kal Bhairav", desc: "Early morning holy bath at Manikarnika Ghat. VIP darshan at Kashi Vishwanath Jyotirlinga, Annapurna Temple, and protector shrine Kal Bhairav." },
      { day: 3, title: "Prayagraj Day Excursion: Triveni Sangam & Alopi Devi", desc: "Drive to Prayagraj. Take a holy boat ride to the confluence of Ganga, Yamuna, and Saraswati. Visit Anand Bhavan and historic Hanuman Mandir." },
      { day: 4, title: "Varanasi to Ayodhya - Shri Ram Janmabhoomi Darshan", desc: "Scenic drive to holy Ayodhya. Visit the grand Shri Ram Janmabhoomi Mandir, Hanuman Garhi, and attend evening Saryu River Aarti." },
      { day: 5, title: "Kanak Bhavan & Departure", desc: "Darshan at Kanak Bhavan and Sita Ki Rasoi before departure transfer to Ayodhya or Varanasi Airport." }
    ],
    departures: [
      { date: "2026-10-06", status: "Available", seatsLeft: 18, price: 21999 },
      { date: "2026-10-20", status: "Filling Fast", seatsLeft: 4, price: 24999 },
      { date: "2026-11-03", status: "Available", seatsLeft: 22, price: 21999 },
      { date: "2026-11-17", status: "Available", seatsLeft: 16, price: 21999 }
    ]
  },
  {
    id: "dev-kedar-33",
    title: "Char Dham Yatra Essence: Kedarnath Jyotirlinga & Badrinath Dham",
    category: "Devotional",
    region: "Devotional",
    duration: "6 Days / 5 Nights",
    startingPrice: 34999,
    rating: 4.9,
    reviews: 420,
    image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=800&q=80",
    highlights: ["Kedarnath Temple High-Himalayan Darshan", "Badrinath Temple & Tapt Kund Holy Dip", "Mana Village - The First Village of India", "Devprayag Confluence of Alaknanda & Bhagirathi"],
    inclusions: [
      "Accommodations in deluxe mountain guesthouses & GMVN certified camps",
      "Helicopter shuttle assistance / Pony trek coordination at Phata/Guptkashi",
      "Daily hot Satvik buffet meals and energized morning herbal teas",
      "Specialized Himalayan mountain drivers and dedicated spiritual escort"
    ],
    exclusions: [
      "Helicopter round-trip ticket or pony/doli charges",
      "Special Rudrabhishek Puja booking slips",
      "Train or flight to Dehradun / Haridwar"
    ],
    itinerary: [
      { day: 1, title: "Haridwar to Guptkashi via Devprayag Sangam", desc: "Meet at Haridwar. Drive along the sacred Alaknanda and Mandakini rivers through Devprayag and Rudraprayag to Guptkashi." },
      { day: 2, title: "Guptkashi to Kedarnath Dham (Trek / Helipad)", desc: "Proceed to Sonprayag/Gaurikund. Ascend toward Kedarnath (by trek or helicopter shuttle). Attend late evening temple aarti amidst snow-capped peaks." },
      { day: 3, title: "Morning Mahadev Darshan & Descent to Pipalkoti", desc: "Early morning Abhishek at Kedarnath Jyotirlinga. Descend to base valley and transfer to Pipalkoti along the mountain highway." },
      { day: 4, title: "Pipalkoti to Badrinath Dham & Mana Village", desc: "Scenic drive through Joshimath to Badrinath. Holy dip in Tapt Kund, darshan of Lord Badri Vishal, and visit Vyas Gufa in historic Mana village." },
      { day: 5, title: "Badrinath to Rishikesh via Vishnuprayag", desc: "Descent through the Panch Prayags back to the holy riverbanks of Rishikesh. Evening relax at the ashrams." }
    ],
    departures: [
      { date: "2026-09-28", status: "Filling Fast", seatsLeft: 3, price: 34999 },
      { date: "2026-10-08", status: "Available", seatsLeft: 12, price: 36999 },
      { date: "2026-10-22", status: "Available", seatsLeft: 15, price: 34999 }
    ]
  },
  {
    id: "dev-rishi-34",
    title: "Holy Ganges Retreat: Haridwar Har Ki Pauri & Rishikesh Ashrams",
    category: "Devotional",
    region: "Devotional",
    duration: "4 Days / 3 Nights",
    startingPrice: 16999,
    rating: 4.8,
    reviews: 215,
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80",
    highlights: ["Har Ki Pauri World-Famous Sunset Ganga Aarti", "Mansa Devi & Chandi Devi Ropeway Cable Car", "Parmarth Niketan Ashram & Ram Jhula", "Vashishta Gufa Meditation Cave"],
    inclusions: [
      "3 Nights in riverside heritage hotels in Haridwar and Rishikesh",
      "VIP reserved seating for evening Aarti at Har Ki Pauri and Parmarth Niketan",
      "Daily breakfast buffet and Satvik North Indian dinners",
      "AC private vehicle for city circuits, cable car transfers, and sightseeing"
    ],
    exclusions: [
      "Ganga river rafting passes",
      "Personal donations and temple pujas",
      "Travel tickets to Haridwar Railway Station / Dehradun Airport"
    ],
    itinerary: [
      { day: 1, title: "Arrival in Haridwar & Har Ki Pauri Ganga Aarti", desc: "Arrival at Haridwar. Check in and evening holy dip at Brahmakund, followed by the world-renowned Har Ki Pauri Maha Aarti." },
      { day: 2, title: "Mansa Devi, Chandi Devi & Drive to Rishikesh", desc: "Ropeway ride to hilltop shrines of Mansa Devi and Chandi Devi. Afternoon drive along the Ganges to yoga haven Rishikesh." },
      { day: 3, title: "Ram Jhula, Beatles Ashram & Parmarth Niketan", desc: "Explore historic suspension bridges, visit Maharishi Mahesh Yogi Ashram, and participate in sunset prayers at Parmarth Niketan." },
      { day: 4, title: "Vashishta Gufa & Departure", desc: "Morning meditation at Sage Vashishta's ancient riverside cave before departure transfer to Haridwar or Dehradun." }
    ],
    departures: [
      { date: "2026-10-04", status: "Available", seatsLeft: 20, price: 16999 },
      { date: "2026-10-18", status: "Available", seatsLeft: 16, price: 16999 },
      { date: "2026-11-01", status: "Filling Fast", seatsLeft: 4, price: 18999 },
      { date: "2026-11-15", status: "Available", seatsLeft: 22, price: 16999 }
    ]
  },
  {
    id: "dev-south-35",
    title: "Dakshin Divya Yatra: Tirupati Balaji, Madurai & Rameshwaram Jyotirlinga",
    category: "Devotional",
    region: "Devotional",
    duration: "6 Days / 5 Nights",
    startingPrice: 28999,
    rating: 4.9,
    reviews: 310,
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80",
    highlights: ["Tirupati Venkateswara Swamy Sheegra Darshan (VIP)", "Rameshwaram Ramanathaswamy 22 Teertham Holy Snan", "Madurai Meenakshi Sundareswarar Temple", "Tiruchirappalli Sri Ranganathaswamy Temple"],
    inclusions: [
      "5 Nights in verified 4-star pilgrim hotels with twin sharing",
      "Confirmed TTD Special Entry Darshan (₹300 ticket included)",
      "Daily pure vegetarian South & North Indian Satvik meals",
      "Special temple coordinators for Rameshwaram 22 Kund snan"
    ],
    exclusions: [
      "Special seva tickets at Tirumala",
      "Personal tonsuring (Mundan) charges",
      "Flights to Chennai (MAA) or Madurai (IXM)"
    ],
    itinerary: [
      { day: 1, title: "Chennai to Tirupati - Seven Sacred Hills", desc: "Arrival in Chennai. Scenic transfer through Eastern Ghats to Tirupati foothills. Evening visit to Padmavathi Ammavari Temple." },
      { day: 2, title: "Tirumala Venkateswara VIP Darshan", desc: "Ascend Tirumala hills via electric bus/cab. Special Entry Darshan of Lord Balaji. Afternoon transfer to Vellore Golden Temple." },
      { day: 3, title: "Tirupati to Srirangam to Madurai", desc: "Drive southward to Trichy. Tour colossal Sri Ranganathaswamy Temple on Cauvery island, proceeding to ancient Madurai." },
      { day: 4, title: "Meenakshi Amman Temple to Holy Rameshwaram", desc: "Morning darshan at Meenakshi Temple. Drive across Pamban Sea Bridge to sacred Rameshwaram island." },
      { day: 5, title: "Rameshwaram 22 Teerthams & Agni Theertham", desc: "Holy bath in 22 traditional well teerthams inside Ramanathaswamy Temple. Visit Ram Setu viewpoint at Dhanushkodi." }
    ],
    departures: [
      { date: "2026-10-10", status: "Available", seatsLeft: 15, price: 28999 },
      { date: "2026-10-24", status: "Filling Fast", seatsLeft: 3, price: 31999 },
      { date: "2026-11-07", status: "Available", seatsLeft: 18, price: 28999 }
    ]
  }
];