import { Trophy, Users, ListOrdered } from 'lucide-react';
import { createResultTemplate } from './factories/ResultTemplate';
import { createLineupTemplate } from './factories/LineupTemplate';
import { createRankingTemplate } from './factories/RankingTemplate';
import { BasketRoster, BasketRosterControls } from '../components/blocks/BasketRoster';
import { BasketMatchExtra, BasketMatchExtraControls } from '../components/blocks/BasketMatchExtra';
import { TeamsRanking } from '../components/blocks/TeamsRanking';
import { defineSportTemplate } from '../utils/template-builder';

// 1. BASKET RESULT
export const BasketResult = defineSportTemplate(createResultTemplate, 'basket', {
  id: 'result',
  name: 'Risultato Basket',
  icon: Trophy,
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
});

// 2. BASKET LINEUP
export const BasketLineup = defineSportTemplate(createLineupTemplate, 'basket', {
  id: 'roster',
  name: 'Convocazioni Basket',
  icon: Users,
  extraBlock: {
    Render: BasketRoster,
    Controls: BasketRosterControls
  },
  defaultData: {
    headerTitle: "GARA",
    headerValue: "",
    rosterList: ""
  }
});

// 3. BASKET RANKING
export const BasketRanking = defineSportTemplate(createRankingTemplate, 'basket', {
  id: 'ranking',
  name: 'Classifica Basket',
  icon: ListOrdered,
  options: { showDraws: false, showAverages: true },
  RenderBlock: TeamsRanking,
  defaultData: {
    headerTitle: "CLASSIFICA",
    season: "",
    ranking: []
  }
});
