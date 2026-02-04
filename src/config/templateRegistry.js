import { Trophy, Shield, PartyPopper, Users, ListOrdered } from 'lucide-react';
import { createResultTemplate } from '../templates/factories/ResultTemplate';
import { createLineupTemplate } from '../templates/factories/LineupTemplate';
import { createRankingTemplate } from '../templates/factories/RankingTemplate';
import { WeekRecap } from '../templates/WeekRecap';
import { SPORTS } from './sportsRegistry';

// --- DYNAMIC TEMPLATE GENERATION ---
const generateTemplates = () => {
  const templates = [];

  Object.values(SPORTS).forEach(sport => {
    // 1. Result Template
    if (sport.templates.result) {
      templates.push({
        ...createResultTemplate(sport.id),
        id: `${sport.id}_result`,
        name: `Risultato ${sport.name}`,
        icon: sport.id === 'soccer' ? PartyPopper : Trophy,
        defaultTheme: sport.defaultTheme
      });
    }

    // 2. Lineup Template
    if (sport.templates.lineup) {
      templates.push({
        ...createLineupTemplate(sport.id),
        id: `${sport.id}_roster`, // or _formation for soccer? let's stick to _roster and _lineup but ID should be consistent
        name: sport.id === 'soccer' ? 'Formazione Calcio' : `Convocazioni ${sport.name}`,
        icon: sport.id === 'soccer' ? Shield : Users,
        defaultTheme: sport.defaultTheme
      });
    }

    // 3. Ranking Template
    if (sport.templates.ranking) {
      templates.push({
        ...createRankingTemplate(sport.id),
        id: `${sport.id}_ranking`,
        name: `Classifica ${sport.name}`,
        icon: ListOrdered,
        defaultTheme: sport.defaultTheme
      });
    }
  });

  // Always add Week Recap (Manual/Special)
  templates.push(WeekRecap);

  return templates;
};

export const TEMPLATES = generateTemplates();

export const THEMES = {
  orange: { preview: "#ea580c", accentColor: "#ea580c", primary: "from-orange-600 to-red-600", bg: "bg-orange-950", accent: "text-orange-400", bgImage: "/DuoCanvas/themes/basketTeam.jpeg" },
  blue:   { preview: "#2563eb", accentColor: "#2563eb", primary: "from-blue-600 to-cyan-600", bg: "bg-blue-950", accent: "text-blue-400", decoration: "/DuoCanvas/themes/volleyball.png" },
  green:  { preview: "#16a34a", accentColor: "#16a34a", primary: "from-green-600 to-emerald-600", bg: "bg-green-950", accent: "text-green-400", bgImage: "/DuoCanvas/themes/soccerTeam.jpeg" },
  purple: { preview: "#9333ea", accentColor: "#9333ea", primary: "from-purple-600 to-indigo-600", bg: "bg-purple-950", accent: "text-purple-400", bgImage: "/DuoCanvas/themes/imola.jpeg" },
  black:  { preview: "#111827", accentColor: "#111827", primary: "from-gray-700 to-black", bg: "bg-gray-900", accent: "text-gray-400" }
};

// Tailwind class map for controls (must be static strings to compile)
export const CONTROL_THEMES = {
  orange: {
    wrapper: "bg-orange-50 border-orange-100",
    label: "text-orange-800",
    focus: "focus:border-orange-500"
  },
  blue: {
    wrapper: "bg-blue-50 border-blue-100",
    label: "text-blue-800",
    focus: "focus:border-blue-500"
  },
  green: {
    wrapper: "bg-green-50 border-green-100",
    label: "text-green-800",
    focus: "focus:border-green-500"
  },
  purple: {
    wrapper: "bg-purple-50 border-purple-100",
    label: "text-purple-800",
    focus: "focus:border-purple-500"
  },
  black: {
    wrapper: "bg-gray-100 border-gray-200",
    label: "text-gray-700",
    focus: "focus:border-gray-600"
  }
};