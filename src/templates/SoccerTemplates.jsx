import { PartyPopper, Shield, ListOrdered } from 'lucide-react';
import { createResultTemplate } from './factories/ResultTemplate';
import { createLineupTemplate } from './factories/LineupTemplate';
import { createRankingTemplate } from './factories/RankingTemplate';
import { GoalTimeline, GoalTimelineControls } from '../components/blocks/GoalTimeline';
import { SoccerFormation as FormationBlock, SoccerFormationControls } from '../components/blocks/SoccerFormation';
import { TeamsRanking, TeamsRankingControls } from '../components/blocks/TeamsRanking';
import { createSport } from '../utils/template-builder';
import { SoccerTemplate } from '../config/sports/SoccerTemplate';

const defineSoccer = createSport('soccer');

// 1. SOCCER RESULT
export const SoccerResult = defineSoccer(createResultTemplate, {
  id: 'result',
  name: 'Risultato Calcio',
  icon: PartyPopper,
  extraBlock: {
    Render: GoalTimeline,
    Controls: GoalTimelineControls
  }
});

// 2. SOCCER FORMATION
export const SoccerFormation = defineSoccer(createLineupTemplate, {
  id: 'roster',
  name: 'Formazione Calcio',
  icon: Shield,
  extraBlock: {
    Render: FormationBlock,
    Controls: SoccerFormationControls
  }
});

// 3. SOCCER RANKING
export const SoccerRanking = defineSoccer(createRankingTemplate, {
  id: 'ranking',
  name: 'Classifica Calcio',
  icon: ListOrdered,
  rankingFormat: SoccerTemplate.ranking,
  rankingBlock: {
    Render: TeamsRanking,
    Controls: TeamsRankingControls
  }
});
