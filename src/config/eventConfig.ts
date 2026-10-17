export interface EventConfig {
  title: string;
  subtitle: string;
  organizer: string;
  eventDate: string;
  startTime: string;
  reportingTime: string;
  venue: string;
  reportingLocation: string;
  registrationDeadline: string;
  entryFee: string;
  squadSize: string;
  gameDuration: string;
  hostels: Array<{
    id: string;
    name: string;
    code: string;
    description: string;
    hazardLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
    themeColor: string;
  }>;
  prizes: Array<{
    file: string;
    rank: string;
    title: string;
    reward: string;
    badge: string;
    color: string;
  }>;
  rules: Array<{
    id: string;
    title: string;
    file: string;
    summary: string;
    details: string[];
    isCritical?: boolean;
  }>;
  faqs: Array<{
    id: string;
    question: string;
    file: string;
    answer: string;
    category: string;
  }>;
  infoFiles: Array<{
    id: string;
    name: string;
    title: string;
    value: string;
    icon: string;
    description: string;
  }>;
}

const EVENT_DETAILS = {
  eventDate: "To Be Announced",
  startTime: "To Be Announced",
  startTimeLabel: "TO BE ANNOUNCED",
  reportingTime: "To Be Announced",
  venue: "Hostel Common Grounds & Sector Corridors",
  reportingLocation: "Central Hostel Mess / Cafeteria Sector",
  gameDuration: "Approximately 90 Minutes"
};

export const EVENT_CONFIG: EventConfig = {
  title: "AMONG US: HOSTEL PROTOCOL",
  subtitle: "The Ultimate Real-Life Social Deduction Tournament Right Inside Your Hostels",
  organizer: "SPARK",
  eventDate: EVENT_DETAILS.eventDate,
  startTime: EVENT_DETAILS.startTime,
  reportingTime: EVENT_DETAILS.reportingTime,
  venue: EVENT_DETAILS.venue,
  reportingLocation: EVENT_DETAILS.reportingLocation,
  registrationDeadline: "TO BE ANNOUNCED",
  entryFee: "FREE ENTRY (Student ID Required)",
  squadSize: "10 - 15 Crewmates Per Sector (2 Hidden Impostors)",
  gameDuration: EVENT_DETAILS.gameDuration,

  hostels: [
    {
      id: "H1",
      name: "Hostel 1 Sector",
      code: "SECTOR-H1",
      description: "Dense residential block with complex stairwells and narrow electrical corridors.",
      hazardLevel: "HIGH",
      themeColor: "#C51111"
    },
    {
      id: "H3",
      name: "Hostel 3 Sector",
      code: "SECTOR-H3",
      description: "Open courtyard perimeter with high visibility navigation pathways.",
      hazardLevel: "MEDIUM",
      themeColor: "#132ED1"
    },
    {
      id: "H4",
      name: "Hostel 4 Sector",
      code: "SECTOR-H4",
      description: "Multi-wing complex featuring central atrium and rapid-transit side corridors.",
      hazardLevel: "HIGH",
      themeColor: "#117F2D"
    },
    {
      id: "H5",
      name: "Hostel 5 Sector",
      code: "SECTOR-H5",
      description: "Outer perimeter sector near sports grounds and auxiliary storage units.",
      hazardLevel: "CRITICAL",
      themeColor: "#EF7D0D"
    },
    {
      id: "PnT",
      name: "PnT Hostel Sector",
      code: "SECTOR-PNT",
      description: "High-density sector with intricate corridors and secluded task checkpoints.",
      hazardLevel: "MEDIUM",
      themeColor: "#6B2FBC"
    },
    {
      id: "Girls",
      name: "Girls Hostel Sector",
      code: "SECTOR-GH",
      description: "Fortified zone with dedicated security checkpoints and monitored task sectors.",
      hazardLevel: "LOW",
      themeColor: "#ED54BA"
    }
  ],

  prizes: [
    {
      file: "champion_trophy.exe",
      rank: "1st Place",
      title: "Master Sleuth / Alpha Impostor Bounty",
      reward: "₹10,000 Cash Pool + Custom 3D Printed Trophy + Gold Crewmate Badges",
      badge: "CHAMPION",
      color: "#F5F557"
    },
    {
      file: "crew_survival.exe",
      rank: "2nd Place",
      title: "Tactical Survival Squad",
      reward: "₹5,000 Cash Pool + Official Event Merch + Silver Crewmate Badges",
      badge: "RUNNER-UP",
      color: "#D6E0F0"
    },
    {
      file: "impostor_bounty.exe",
      rank: "Special Honor",
      title: "Most Notorious Impostor",
      reward: "Exclusive Custom Hoodie + 'Master of Deception' Title Certificate",
      badge: "MOST SUS",
      color: "#C51111"
    },
    {
      file: "certificates.exe",
      rank: "Participation",
      title: "Verified Crewmate Certificate",
      reward: "Official Certificate of Participation + Digital Badge for all finishers",
      badge: "CREWMATE",
      color: "#38FEDC"
    }
  ],

  rules: [
    {
      id: "physical-contact",
      title: "Physical Safety & Non-Contact Elimination",
      file: "crew_protocol.exe",
      summary: "Strict zero-contact policy. Impostors eliminate targets via silent RFID/sticker tag only.",
      details: [
        "Eliminations are performed by discreetly presenting an Impostor Card or placing a color-coded tag on the crewmate's back.",
        "No grabbing, pushing, running on stairs, or aggressive physical contact is permitted under any circumstances.",
        "Eliminated crewmates must instantly play dead/sit down and refrain from speaking until reported.",
        "Report an eliminated player to the sector marshal to pause play and begin a meeting.",
        "Meetings allow three minutes of verbal discussion; voting is by majority hand raise."
      ],
      isCritical: true
    },
    {
      id: "impostor-rules",
      title: "Impostor Rules",
      file: "impostor_rules.exe",
      summary: "Impostors use only the approved non-contact tag mechanic.",
      details: [
        "Eliminations must use the event's approved non-contact tag method.",
        "Physical contact, pushing, or running is prohibited for every player.",
        "Follow sector marshal instructions and stay inside approved hostel sector boundaries."
      ]
    },
    {
      id: "hostel-boundaries",
      title: "Off-Limit Hostel Zones",
      file: "hostel_zones.exe",
      summary: "Stay strictly within designated residential hostel boundaries.",
      details: [
        "Warden offices, private locked residential rooms, terrace rooftops, and electrical generator rooms are STRICTLY OUT OF BOUNDS.",
        "All players must carry their Student ID Card and keep emergency sector marshals in visual range.",
        "Leaving your designated hostel sector boundary results in immediate ejection from the tournament."
      ]
    },
    {
      id: "fair-play",
      title: "Ghost Silence & Fair Play",
      file: "fair_play.exe",
      summary: "Dead crewmates speak no tales.",
      details: [
        "Eliminated players (Ghosts) must keep their masks on and remain 100% silent during meetings.",
        "Ghosts may continue completing remaining physical tasks to help the Crew task bar reach 100%.",
        "Using external group chats or Discord calls during live rounds is considered foul sabotage and leads to squad disqualification."
      ]
    }
  ],

  faqs: [
    {
      id: "faq-never-played",
      question: "Do I need prior gaming experience with Among Us?",
      file: "faq_first_timer.exe",
      category: "Gameplay",
      answer: "Not at all! The game rules will be briefed in plain English 20 minutes prior to the round. The mechanics are simple: complete fun real-world tasks, keep an eye on who is acting suspicious, and participate in lively discussion during emergency meetings."
    },
    {
      id: "faq-teams",
      question: "Can I register with friends or as a squad?",
      file: "faq_teams.exe",
      category: "Registration",
      answer: "Yes! You can choose the same hostel sector when registering. However, roles (Crewmate vs Impostor) will be assigned randomly by the Sector Marshal so you might end up secretly hunting your best friend!"
    },
    {
      id: "faq-what-to-bring",
      question: "What should I bring and wear on the event day?",
      file: "faq_gear.exe",
      category: "Preparation",
      answer: "Wear comfortable shoes and athletic clothes (you will be moving across sectors!). Bring your official College ID card and your phone to scan task QR checkpoints."
    },
    {
      id: "faq-timing",
      question: "When should I arrive, and how long will the event take?",
      file: "faq_timing.exe",
      category: "Timing",
      answer: "The exact event date and time are to be announced soon! The tournament session will run for approximately 90 minutes across your hostel sectors."
    }
  ],

  infoFiles: [
    {
      id: "date",
      name: "date.exe",
      title: "EVENT DATE",
      value: EVENT_DETAILS.eventDate.toUpperCase(),
      icon: "Calendar",
      description: "The official event date is to be announced soon by SPARK. Pre-registration is open now."
    },
    {
      id: "time",
      name: "time.exe",
      title: "START TIME",
      value: EVENT_DETAILS.startTimeLabel,
      icon: "Clock",
      description: "Official round kickoff and reporting times across all 6 hostel sectors to be announced."
    },
    {
      id: "venue",
      name: "venue.exe",
      title: "CENTRAL SECTOR",
      value: EVENT_DETAILS.venue.toUpperCase(),
      icon: "MapPin",
      description: `Primary gathering point, check-in desk, and main Cafeteria meeting table at ${EVENT_DETAILS.reportingLocation}.`
    },
    {
      id: "format",
      name: "game_format.exe",
      title: "MISSION FORMAT",
      value: "REAL-LIFE SOCIAL DEDUCTION",
      icon: "Gamepad2",
      description: "Physical tasks, sneaky tag eliminations, and intense in-person emergency meetings."
    }
  ]
};

