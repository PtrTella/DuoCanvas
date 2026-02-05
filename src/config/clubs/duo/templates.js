// Import base templates from the library
import { BasketResult, BasketLineup, BasketRanking } from '../../../templates/BasketTemplates';
import { SoccerResult, SoccerFormation, SoccerRanking } from '../../../templates/SoccerTemplates';
import { WeekRecap } from '../../../templates/WeekRecap';

// 1. THEMES DEFINITION (Duo Specific)
export const THEMES = {
  orange: { hex: "#ea580c", primary: "from-orange-600 to-red-600", bg: "bg-orange-950", accent: "text-orange-400", bgImage: "/DuoCanvas/clubs/duo/themes/basketTeam.jpeg" },
  blue:   { hex: "#2563eb", primary: "from-blue-600 to-cyan-600", bg: "bg-blue-950", accent: "text-blue-400" },
  gold:   { hex: "#f59e0b", primary: "from-amber-500 via-yellow-500 to-yellow-600", bg: "bg-stone-900", accent: "text-amber-400" },
  green:  { hex: "#16a34a", primary: "from-green-600 to-emerald-600", bg: "bg-green-950", accent: "text-green-400", bgImage: "/DuoCanvas/clubs/duo/themes/soccerTeam.jpeg" },
  purple: { hex: "#9333ea", primary: "from-purple-600 to-indigo-600", bg: "bg-purple-950", accent: "text-purple-400", bgImage: "/DuoCanvas/clubs/duo/themes/imola.jpeg" },
  black:  { hex: "#111827", primary: "from-gray-700 to-black", bg: "bg-gray-900", accent: "text-gray-400" },
  white:  { hex: "#f3f4f6", primary: "from-gray-200 to-white", bg: "bg-white", accent: "text-gray-600" }
};

// 2. TEMPLATES REGISTRY
export const TEMPLATES = [
  { 
    ...BasketResult,  
    defaultTheme: 'orange',
    defaultData: {
      headerTitle: "GIORNATA",
      csiTeamId: 32,
      csiGironeId: "3",
      homeScore: "", awayScore: ""
    }
  },
  { 
    ...BasketLineup,  
    defaultTheme: 'orange',
    defaultData: {
      headerTitle: "GARA",
      rosterList: ""
    }
  },
  { 
    ...BasketRanking, 
    defaultTheme: 'orange',
    defaultData: {
      headerTitle: "CLASSIFICA",
      highlightTeam: "Duo Ligones",
      csiGironeId: "3",
      ranking: [],
      rankingSync: {
        enabled: true,
        label: "CSI Faenza"
      }
    }
  },
  { 
    ...SoccerResult,  
    defaultTheme: 'green',
    defaultData: {
      headerTitle: "GIORNATA",
      homeScore: "", awayScore: ""
    }
  },
  { 
    ...SoccerFormation, 
    defaultTheme: 'green',
    defaultData: {
      headerTitle: "GIORNATA",
      module: "",
      rosterList: ""
    }
  },
  { 
    ...SoccerRanking, 
    defaultTheme: 'green',
    defaultData: {
      headerTitle: "CLASSIFICA",
      highlightTeam: "Duo Ligones",
      ranking: [],
      rankingSync: {
        enabled: true,
        label: "CSI Faenza"
      }
    }
  },
  { 
    ...WeekRecap,     
    defaultTheme: 'purple',
    defaultData: {
      headerTitle: "PROGRAMMA",
      weekEvents: []
    }
  }
];
