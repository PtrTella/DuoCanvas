import { PartyPopper, Shield, ListOrdered } from 'lucide-react';
import { createResultTemplate } from './factories/ResultTemplate';
import { createLineupTemplate } from './factories/LineupTemplate';
import { createRankingTemplate } from './factories/RankingTemplate';
import { GoalTimeline, GoalTimelineControls } from '../components/blocks/GoalTimeline';
import { SoccerFormation as FormationBlock, SoccerFormationControls } from '../components/blocks/SoccerFormation';
import { TeamsRanking } from '../components/blocks/TeamsRanking';
import { defineSportTemplate } from '../utils/template-builder';

// 1. SOCCER RESULT
export const SoccerResult = defineSportTemplate(createResultTemplate, 'soccer', {
  id: 'result',
  name: 'Risultato Calcio',
  icon: PartyPopper,
  extraBlock: {
    Render: GoalTimeline,
    Controls: GoalTimelineControls
  },
  defaultData: {
    headerTitle: "MATCH DAY",
    homeScore: "", 
    awayScore: ""
  }
});

// 2. SOCCER FORMATION
export const SoccerFormation = defineSportTemplate(createLineupTemplate, 'soccer', {
  id: 'roster',
  name: 'Formazione Calcio',
  icon: Shield,
  extraBlock: {
    Render: FormationBlock,
    Controls: SoccerFormationControls
  },
  defaultData: {
    headerTitle: "GARA",
    module: "3-2-1",
    teamFormation: ""
  }
});

// 3. SOCCER RANKING
export const SoccerRanking = defineSportTemplate(createRankingTemplate, 'soccer', {
  id: 'ranking',
  name: 'Classifica Calcio',
  icon: ListOrdered,
  options: { showDraws: true, showAverages: false },
  RenderBlock: TeamsRanking,
  defaultData: {
    headerTitle: "CLASSIFICA",
    season: "",
    ranking: []
  }
});
