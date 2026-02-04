import React from 'react';
import { Trophy, Users, ListOrdered } from 'lucide-react';
import { createResultTemplate } from './factories/ResultTemplate';
import { createLineupTemplate } from './factories/LineupTemplate';
import { createRankingTemplate } from './factories/RankingTemplate';
import { BasketRoster, BasketRosterControls } from '../components/blocks/BasketRoster';
import { BasketMatchExtra, BasketMatchExtraControls } from '../components/blocks/BasketMatchExtra';
import { TeamsRanking } from '../components/blocks/TeamsRanking';
import { useClassifica } from '../hooks/useCsi';

const BASKET_SPORT = {
  id: 'basket',
  name: 'Basket',
  icon: Trophy,
  defaultTheme: 'orange',
  hooks: {
    useRanking: useClassifica
  },
  labels: {
    matchDay: "MATCH DAY",
    ranking: "CLASSIFICA",
    roster: "CONVOCAZIONI",
    mvp: "MVP / Note",
    coach: "Allenatore",
    bench: "Panchina",
    nextMatch: "Prossima Gara"
  }
};

// 1. BASKET RESULT
export const BasketResult = {
  ...createResultTemplate(BASKET_SPORT, {
    extraBlock: {
      Render: BasketMatchExtra,
      Controls: BasketMatchExtraControls
    }
  }),
  id: 'basket_result',
  name: 'Risultato Basket',
  icon: Trophy,
  defaultTheme: 'orange',
  defaultData: {
    topScorer: "",
    matchNote: "",
    homeScore: "0",
    awayScore: "0"
  }
};

// 2. BASKET LINEUP
export const BasketLineup = {
  ...createLineupTemplate(BASKET_SPORT, {
    extraBlock: {
      Render: BasketRoster,
      Controls: BasketRosterControls
    }
  }),
  id: 'basket_roster',
  name: 'Convocazioni Basket',
  icon: Users,
  defaultTheme: 'orange',
  defaultData: {
    rosterList: "1 Martini\n4 Rubbi Alfi\n5 Dino\n6 Ricci Lucchi\n7 Tellarini\n8 Gardenghi\n9 Lambertucci\n10 Pieri\n12 Camaggi\n14 Bonifazio\n15 Cavini\n16 Monti\n18 Tassoni\n20 Gamez\n21 Piani Gentile\n22 Biavati\n25 Ferrante\n27 Lancieri",
  }
};

// 3. BASKET RANKING
export const BasketRanking = {
  ...createRankingTemplate(BASKET_SPORT, {
    options: { showDraws: false, showAverages: true },
    RenderBlock: TeamsRanking
  }),
  id: 'basket_ranking',
  name: 'Classifica Basket',
  icon: ListOrdered,
  defaultTheme: 'orange',
  defaultData: {
    leagueName: "Campionato CSI Imola, Girone Ovest",
    season: "Stagione 2025/26",
    ranking: [],
    highlightTeam: "Duo Ligones",
    showAverages: true,
    showStats: true
  }
};
