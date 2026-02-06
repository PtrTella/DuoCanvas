import React from 'react';
import { Trophy, Users, ListOrdered } from 'lucide-react';
import { createResultTemplate } from './factories/ResultTemplate';
import { createLineupTemplate } from './factories/LineupTemplate';
import { createRankingTemplate } from './factories/RankingTemplate';
import { BasketRoster, BasketRosterControls } from '../components/blocks/BasketRoster';
import { BasketMatchExtra, BasketMatchExtraControls } from '../components/blocks/BasketMatchExtra';
import { TeamsRanking } from '../components/blocks/TeamsRanking';
import { useClassifica } from '../hooks/useCsi';
// NO generic imports from config to avoid circularity

const BASKET_SPORT = {
  id: 'basket',
  name: 'Basket',
  icon: Trophy,
  hooks: {
    useRanking: (gironeId) => useClassifica(gironeId || "3") 
  }
};

// 1. BASKET RESULT
export const BasketResult = {
  ...createResultTemplate(BASKET_SPORT, {
    extraBlock: {
      Render: BasketMatchExtra,
      Controls: BasketMatchExtraControls
    },
    defaultData: {
      headerTitle: "MATCH DAY",
      headerValue: "",
      homeScore: "", 
      awayScore: ""
    }
  }),
  id: 'basket_result',
  name: 'Risultato Basket',
  icon: Trophy
};

// 2. BASKET LINEUP
export const BasketLineup = {
  ...createLineupTemplate(BASKET_SPORT, {
    extraBlock: {
      Render: BasketRoster,
      Controls: BasketRosterControls
    },
    defaultData: {
      headerTitle: "GARA",
      headerValue: "",
      rosterList: ""
    }
  }),
  id: 'basket_roster',
  name: 'Convocazioni Basket',
  icon: Users
};

// 3. BASKET RANKING
export const BasketRanking = {
  ...createRankingTemplate(BASKET_SPORT, {
    options: { showDraws: false, showAverages: true },
    RenderBlock: TeamsRanking,
    defaultData: {
      headerTitle: "CLASSIFICA",
      season: "",
      ranking: []
    }
  }),
  id: 'basket_ranking',
  name: 'Classifica Basket',
  icon: ListOrdered
};
