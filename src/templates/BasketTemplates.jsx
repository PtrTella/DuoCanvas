import { Trophy, Users, ListOrdered } from 'lucide-react';
import { createResultTemplate } from './factories/ResultTemplate';
import { createLineupTemplate } from './factories/LineupTemplate';
import { createRankingTemplate } from './factories/RankingTemplate';
import { BasketRoster, BasketRosterControls } from '../components/blocks/BasketRoster';
import { BasketMatchExtra, BasketMatchExtraControls } from '../components/blocks/BasketMatchExtra';
import { TeamsRanking } from '../components/blocks/TeamsRanking';
import { createSport } from '../utils/template-builder';

const defineBasket = createSport('basket');

// 1. BASKET RESULT
export const BasketResult = defineBasket(createResultTemplate, {
  id: 'result',
  name: 'Risultato Basket',
  icon: Trophy,
  extraBlock: {
    Render: BasketMatchExtra,
    Controls: BasketMatchExtraControls
  }
});

// 2. BASKET LINEUP
export const BasketLineup = defineBasket(createLineupTemplate, {
  id: 'roster',
  name: 'Convocazioni Basket',
  icon: Users,
  extraBlock: {
    Render: BasketRoster,
    Controls: BasketRosterControls
  }
});

// 3. BASKET RANKING
export const BasketRanking = defineBasket(createRankingTemplate, {
  id: 'ranking',
  name: 'Classifica Basket',
  icon: ListOrdered,
  options: { showDraws: false, showAverages: true },
  RenderBlock: TeamsRanking
});
