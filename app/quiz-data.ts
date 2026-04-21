export type PersonalityKey =
  | "darkRoastRebel"
  | "balancedBrew"
  | "cozySipper"
  | "flavorChaser";

export type PersonalityProfile = {
  key: PersonalityKey;
  name: string;
  headline: string;
  description: string;
  traits: string[];
  accent: string;
  accentSoft: string;
  coffee: {
    name: string;
    notes: string;
    description: string;
  };
};

export type QuizQuestion = {
  id: number;
  prompt: string;
  options: {
    label: string;
    personality: PersonalityKey;
  }[];
};

const profileMap: Record<PersonalityKey, PersonalityProfile> = {
  darkRoastRebel: {
    key: "darkRoastRebel",
    name: "Dark Roast Rebel",
    headline: "Built for bold mornings and big energy.",
    description:
      "You want coffee with presence. Rich, smoky, and unapologetic flavors make you feel switched on and ready to move.",
    traits: ["confident", "intense", "unapologetic"],
    accent: "#8C5A3A",
    accentSoft: "#F2E0D2",
    coffee: {
      name: "Campfire Stories",
      notes: "Rich, smoky, and s'mores-like",
      description:
        "A dark roast with serious character that lands with depth, warmth, and a little edge.",
    },
  },
  balancedBrew: {
    key: "balancedBrew",
    name: "Balanced Brew",
    headline: "Polished taste with everyday range.",
    description:
      "You are drawn to coffee that feels effortless to love. Smoothness, consistency, and quiet quality matter more than drama.",
    traits: ["reliable", "polished", "easygoing"],
    accent: "#A9794A",
    accentSoft: "#F3E7D8",
    coffee: {
      name: "Sunrise Blend",
      notes: "Caramel, chocolate, and a smooth finish",
      description:
        "A medium roast that slides naturally into your routine and tastes dialed-in from the first sip.",
    },
  },
  cozySipper: {
    key: "cozySipper",
    name: "Cozy Sipper",
    headline: "A softer, warmer ritual with every cup.",
    description:
      "Coffee is part of your comfort system. You want something mellow, welcoming, and quietly indulgent enough to slow the day down.",
    traits: ["comfort-first", "warm", "steady"],
    accent: "#C89B69",
    accentSoft: "#F7EEDD",
    coffee: {
      name: "Golden Hour",
      notes: "Sweet, smooth, and softly rounded",
      description:
        "A comforting cup designed to feel easy, luminous, and just a little luxurious.",
    },
  },
  flavorChaser: {
    key: "flavorChaser",
    name: "Flavor Chaser",
    headline: "You are here for something memorable.",
    description:
      "You like your coffee with surprise built in. Novelty, personality, and strong opinions beat playing it safe every time.",
    traits: ["curious", "adventurous", "restless"],
    accent: "#6E4A3D",
    accentSoft: "#EEE0D7",
    coffee: {
      name: "Double Down",
      notes: "Intense, espresso-forward, and unforgettable",
      description:
        "An extra-bold recommendation for drinkers who want their coffee to leave a mark.",
    },
  },
};

export const personalityOrder: PersonalityKey[] = [
  "darkRoastRebel",
  "balancedBrew",
  "cozySipper",
  "flavorChaser",
];

export const personalities = personalityOrder.map((key) => profileMap[key]);

export const questions: QuizQuestion[] = [
  {
    id: 1,
    prompt: "It is Saturday morning. What sounds best?",
    options: [
      {
        label: "A strong cup, a packed schedule, and getting out the door fast",
        personality: "darkRoastRebel",
      },
      {
        label: "A calm morning routine, good music, and something reliably great",
        personality: "balancedBrew",
      },
      {
        label: "A blanket, a slow start, and nowhere urgent to be",
        personality: "cozySipper",
      },
      {
        label:
          "Trying a new spot in town just because you have never been there before",
        personality: "flavorChaser",
      },
    ],
  },
  {
    id: 2,
    prompt: "Which flavor profile sounds most appealing right now?",
    options: [
      {
        label: "Smoky, intense, and bold",
        personality: "darkRoastRebel",
      },
      {
        label: "Smooth, balanced, and familiar",
        personality: "balancedBrew",
      },
      {
        label: "Soft, sweet, and comforting",
        personality: "cozySipper",
      },
      {
        label: "Surprising, sharp, and impossible to ignore",
        personality: "flavorChaser",
      },
    ],
  },
  {
    id: 3,
    prompt: "Your ideal coffee experience feels like:",
    options: [
      {
        label: "A jolt of energy that makes you feel unstoppable",
        personality: "darkRoastRebel",
      },
      {
        label: "A dependable ritual that fits perfectly into your day",
        personality: "balancedBrew",
      },
      {
        label: "A little moment of comfort you look forward to",
        personality: "cozySipper",
      },
      {
        label: "A mini adventure that wakes up your curiosity",
        personality: "flavorChaser",
      },
    ],
  },
  {
    id: 4,
    prompt: "Pick the phrase that sounds most like you.",
    options: [
      {
        label: '"Go big or go home."',
        personality: "darkRoastRebel",
      },
      {
        label: '"I like things done well and done right."',
        personality: "balancedBrew",
      },
      {
        label: '"Comfort is underrated."',
        personality: "cozySipper",
      },
      {
        label: '"I want to try the weird one."',
        personality: "flavorChaser",
      },
    ],
  },
  {
    id: 5,
    prompt:
      "If NovaBrew were choosing your next bag, what would you want it to optimize for?",
    options: [
      {
        label: "Strength and depth",
        personality: "darkRoastRebel",
      },
      {
        label: "Balance and versatility",
        personality: "balancedBrew",
      },
      {
        label: "Warmth and ease",
        personality: "cozySipper",
      },
      {
        label: "Novelty and edge",
        personality: "flavorChaser",
      },
    ],
  },
  {
    id: 6,
    prompt: "Which setting matches your coffee personality best?",
    options: [
      {
        label: "A late-night city street with neon lights",
        personality: "darkRoastRebel",
      },
      {
        label: "A bright kitchen with clean lines and morning sun",
        personality: "balancedBrew",
      },
      {
        label: "A cozy window seat on a rainy day",
        personality: "cozySipper",
      },
      {
        label: "A hidden alley cafe with a menu you cannot pronounce",
        personality: "flavorChaser",
      },
    ],
  },
];
