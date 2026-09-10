export const BUS_LOCATIONS = [
  "Kolhapur (Dabholkar Corner)",
  "Pune (Swargate / Wakad)",
  "Mumbai (Dadar / Borivali)",
  "Bangalore (Majestic / Anand Rao Circle)",
  "Goa (Panaji / Mapusa)",
  "Hyderabad (MGBS / Gachibowli)",
  "Shirdi (Temple Gate)",
  "Surat (Central Ring Road)"
];

export const ABHI_BUS_FLEET = [
  {
    id: "AB-VOLVO-9600",
    name: "Abhi Bus - Royal Starline SLX",
    busType: "AC Sleeper (2+1)",
    category: "AC Sleeper",
    from: "Kolhapur (Dabholkar Corner)",
    to: "Bangalore (Majestic / Anand Rao Circle)",
    departureTime: "21:30",
    arrivalTime: "06:30",
    duration: "09h 00m",
    startingPrice: 1250,
    rating: 4.8,
    reviews: 242,
    amenities: ["Free High-Speed Wi-Fi", "USB Charging Ports", "Mineral Water Bottle", "Fresh Blanket & Pillow"],
    images: [
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=800&q=80"
    ],
    boardingPoints: [
      { point: "Dabholkar Corner - Abhi Lounge", time: "21:30" },
      { point: "Shiroli Highway Octroi Naka", time: "22:00" },
      { point: "Kagal Toll Plaza", time: "22:20" }
    ],
    droppingPoints: [
      { point: "Yeshwantpur Govardhan Theatre", time: "05:45" },
      { point: "Bangalore Majestic Anand Rao Circle", time: "06:30" },
      { point: "Madiwala Central Stop", time: "07:00" }
    ],
    lowerDeckSeats: [
      { id: "L1", price: 1250, status: "available", isFemale: false },
      { id: "L2", price: 1250, status: "available", isFemale: true },
      { id: "L3", price: 1250, status: "sold", isFemale: false },
      { id: "L4", price: 1250, status: "available", isFemale: false },
      { id: "L5", price: 1250, status: "sold", isFemale: false },
      { id: "L6", price: 1250, status: "available", isFemale: false }
    ],
    upperDeckSeats: [
      { id: "U1", price: 1350, status: "available", isFemale: false },
      { id: "U2", price: 1350, status: "available", isFemale: false },
      { id: "U3", price: 1350, status: "sold", isFemale: false },
      { id: "U4", price: 1350, status: "sold", isFemale: false },
      { id: "U5", price: 1350, status: "available", isFemale: true },
      { id: "U6", price: 1350, status: "sold", isFemale: false }
    ]
  },
  {
    id: "AB-MERC-SHD",
    name: "Abhi Bus - Diamond Crown SHD",
    busType: "AC Sleeper (2+1)",
    category: "AC Sleeper",
    from: "Pune (Swargate / Wakad)",
    to: "Goa (Panaji / Mapusa)",
    departureTime: "22:15",
    arrivalTime: "07:15",
    duration: "09h 00m",
    startingPrice: 1450,
    rating: 4.9,
    reviews: 188,
    amenities: ["Individual TV Screens", "SOS Safety Siren", "GPS Live Tracking", "Pre-packed Snacks"],
    images: [
      "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80"
    ],
    boardingPoints: [
      { point: "Swargate - Abhi Travels Office", time: "22:15" },
      { point: "Katraj Wonder City Highway", time: "22:45" },
      { point: "Shirwal Toll Checkpoint", time: "23:30" }
    ],
    droppingPoints: [
      { point: "Mapusa Gandhi Circle", time: "06:30" },
      { point: "Panaji KTC Central Bus Stand", time: "07:15" }
    ],
    lowerDeckSeats: [
      { id: "L1", price: 1450, status: "available", isFemale: false },
      { id: "L2", price: 1450, status: "sold", isFemale: false },
      { id: "L3", price: 1450, status: "available", isFemale: true },
      { id: "L4", price: 1450, status: "available", isFemale: false },
      { id: "L5", price: 1450, status: "available", isFemale: false },
      { id: "L6", price: 1450, status: "sold", isFemale: false }
    ],
    upperDeckSeats: [
      { id: "U1", price: 1550, status: "available", isFemale: false },
      { id: "U2", price: 1550, status: "available", isFemale: true },
      { id: "U3", price: 1550, status: "sold", isFemale: false },
      { id: "U4", price: 1550, status: "available", isFemale: false },
      { id: "U5", price: 1550, status: "available", isFemale: false },
      { id: "U6", price: 1550, status: "sold", isFemale: false }
    ]
  },
  {
    id: "AB-SCANIA-NONAC",
    name: "Abhi Bus - Silver Cruiser Express",
    busType: "Non-AC Sleeper (2+1)",
    category: "Non-AC Sleeper",
    from: "Mumbai (Dadar / Borivali)",
    to: "Kolhapur (Dabholkar Corner)",
    departureTime: "20:45",
    arrivalTime: "05:15",
    duration: "08h 30m",
    startingPrice: 850,
    rating: 4.6,
    reviews: 130,
    amenities: ["Mobile Charging Socket", "Spacious Luggage Hold", "Emergency Hammer", "Reading Lamp"],
    images: [
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=800&q=80"
    ],
    boardingPoints: [
      { point: "Borivali East - National Park", time: "20:45" },
      { point: "Dadar TT Circle Abhi Desk", time: "21:30" },
      { point: "Vashi Highway Plaza", time: "22:15" }
    ],
    droppingPoints: [
      { point: "Tawade Hotel Junction", time: "04:45" },
      { point: "Dabholkar Corner Central Stop", time: "05:15" }
    ],
    lowerDeckSeats: [
      { id: "L1", price: 850, status: "available", isFemale: false },
      { id: "L2", price: 850, status: "available", isFemale: false },
      { id: "L3", price: 850, status: "sold", isFemale: false },
      { id: "L4", price: 850, status: "available", isFemale: true },
      { id: "L5", price: 850, status: "sold", isFemale: false },
      { id: "L6", price: 850, status: "available", isFemale: false }
    ],
    upperDeckSeats: [
      { id: "U1", price: 950, status: "available", isFemale: false },
      { id: "U2", price: 950, status: "sold", isFemale: false },
      { id: "U3", price: 950, status: "available", isFemale: false },
      { id: "U4", price: 950, status: "sold", isFemale: false },
      { id: "U5", price: 950, status: "available", isFemale: false },
      { id: "U6", price: 950, status: "sold", isFemale: false }
    ]
  },
  {
    id: "AB-AIRBUS-SEATER",
    name: "Abhi Bus - Metro Airway Seater",
    busType: "AC Seater Push-Back (2+2)",
    category: "Regular Seater",
    from: "Pune (Swargate / Wakad)",
    to: "Mumbai (Dadar / Borivali)",
    departureTime: "06:30",
    arrivalTime: "10:30",
    duration: "04h 00m",
    startingPrice: 499,
    rating: 4.7,
    reviews: 310,
    amenities: ["Reclining Ergonomic Seats", "AC Climate Control", "Overhead Parcel Rack", "Bottle Holder"],
    images: [
      "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80"
    ],
    boardingPoints: [
      { point: "Swargate - Abhi Bay 1", time: "06:30" },
      { point: "Wakad Bridge Express Highway", time: "07:00" }
    ],
    droppingPoints: [
      { point: "Vashi Old Toll Naka", time: "09:45" },
      { point: "Dadar Asiad Bus Stand", time: "10:30" }
    ],
    lowerDeckSeats: [
      { id: "S1", price: 499, status: "available", isFemale: false },
      { id: "S2", price: 499, status: "available", isFemale: false },
      { id: "S3", price: 499, status: "sold", isFemale: false },
      { id: "S4", price: 499, status: "available", isFemale: true },
      { id: "S5", price: 499, status: "sold", isFemale: false },
      { id: "S6", price: 499, status: "available", isFemale: false }
    ],
    upperDeckSeats: []
  },
  {
    id: "AB-SHIRDI-SPECIAL",
    name: "Abhi Bus - Sai Darshan Pilgrim Express",
    busType: "AC Sleeper (2+1)",
    category: "AC Sleeper",
    from: "Mumbai (Dadar / Borivali)",
    to: "Shirdi (Temple Gate)",
    departureTime: "22:00",
    arrivalTime: "05:30",
    duration: "07h 30m",
    startingPrice: 999,
    rating: 4.9,
    reviews: 412,
    amenities: ["Devotional Bhajans Audio System", "GPS Live Monitoring", "Air Conditioning", "Pilgrim Blanket"],
    images: [
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=800&q=80"
    ],
    boardingPoints: [
      { point: "Borivali East Sanjay Gandhi Park", time: "22:00" },
      { point: "Thane Teen Hath Naka", time: "22:45" }
    ],
    droppingPoints: [
      { point: "Shirdi Hotel Sun-n-Sand Gate", time: "05:15" },
      { point: "Sai Mandir Gate No. 2", time: "05:30" }
    ],
    lowerDeckSeats: [
      { id: "L1", price: 999, status: "available", isFemale: false },
      { id: "L2", price: 999, status: "sold", isFemale: false },
      { id: "L3", price: 999, status: "available", isFemale: true },
      { id: "L4", price: 999, status: "available", isFemale: false },
      { id: "L5", price: 999, status: "available", isFemale: false },
      { id: "L6", price: 999, status: "sold", isFemale: false }
    ],
    upperDeckSeats: [
      { id: "U1", price: 1099, status: "available", isFemale: false },
      { id: "U2", price: 1099, status: "available", isFemale: false },
      { id: "U3", price: 1099, status: "sold", isFemale: false },
      { id: "U4", price: 1099, status: "sold", isFemale: false },
      { id: "U5", price: 1099, status: "available", isFemale: true },
      { id: "U6", price: 1099, status: "available", isFemale: false }
    ]
  }
];