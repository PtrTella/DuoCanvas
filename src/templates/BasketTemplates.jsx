import React from 'react';
import { Trophy, Users, ListOrdered } from 'lucide-react';
import { createResultTemplate } from './factories/ResultTemplate';
import { createLineupTemplate } from './factories/LineupTemplate';
import { createRankingTemplate } from './factories/RankingTemplate';
import { BasketRoster, BasketRosterControls } from '../components/blocks/BasketRoster';
import { BasketMatchExtra, BasketMatchExtraControls } from '../components/blocks/BasketMatchExtra';
import { TeamsRanking } from '../components/blocks/TeamsRanking';
import { useClassifica } from '../hooks/useCsi';
import { TEMPLATE_DEFAULTS } from '../config/defaults';

const BASKET_SPORT = {
  id: 'basket',
  name: 'Basket',
  icon: Trophy,
  defaultTheme: 'orange',
  hooks: {
    useRanking: () => useClassifica("3") // Silver Ovest
  }
};

// 1. BASKET RESULT
export const BasketResult = {
  ...createResultTemplate(BASKET_SPORT, {
    extraBlock: {
      Render: BasketMatchExtra,
      Controls: BasketMatchExtraControls
    },
    defaultData: TEMPLATE_DEFAULTS.basket_result
  }),
  id: 'basket_result',
  name: 'Risultato Basket',
  icon: Trophy,
  defaultTheme: 'orange'
};

// 2. BASKET LINEUP
export const BasketLineup = {
  ...createLineupTemplate(BASKET_SPORT, {
    extraBlock: {
      Render: BasketRoster,
      Controls: BasketRosterControls
    },
    defaultData: TEMPLATE_DEFAULTS.basket_roster
  }),
  id: 'basket_roster',
  name: 'Convocazioni Basket',
  icon: Users,
  defaultTheme: 'orange'
};

// 3. BASKET RANKING
export const BasketRanking = {
  ...createRankingTemplate(BASKET_SPORT, {
    options: { showDraws: false, showAverages: true },
    RenderBlock: TeamsRanking,
    defaultData: TEMPLATE_DEFAULTS.basket_ranking
  }),
  id: 'basket_ranking',
  name: 'Classifica Basket',
  icon: ListOrdered,
  defaultTheme: 'orange'
};
