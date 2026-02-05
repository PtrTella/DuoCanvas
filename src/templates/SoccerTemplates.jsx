import { PartyPopper, Shield, ListOrdered } from 'lucide-react';
import { createResultTemplate } from './factories/ResultTemplate';
import { createLineupTemplate } from './factories/LineupTemplate';
import { createRankingTemplate } from './factories/RankingTemplate';
import { GoalTimeline, GoalTimelineControls } from '../components/blocks/GoalTimeline';
import { SoccerFormation as FormationBlock, SoccerFormationControls } from '../components/blocks/SoccerFormation';
import { TeamsRanking } from '../components/blocks/TeamsRanking';
import { useClassifica } from '../hooks/useCsi';
// Pure template definition

const SOCCER_SPORT = {
  id: 'soccer',
  name: 'Calcio',
  icon: PartyPopper,
  defaultTheme: 'green',
  hooks: {
    useRanking: (gironeId) => useClassifica(gironeId || "4") 
  }
};

// 1. SOCCER RESULT
export const SoccerResult = {
  ...createResultTemplate(SOCCER_SPORT, {
    extraBlock: {
      Render: GoalTimeline,
      Controls: GoalTimelineControls
    }
  }),
  id: 'soccer_result',
  name: 'Risultato Calcio',
  icon: PartyPopper,
  defaultTheme: 'green'
};

// 2. SOCCER FORMATION
export const SoccerFormation = {
  ...createLineupTemplate(SOCCER_SPORT, {
    extraBlock: {
      Render: FormationBlock,
      Controls: SoccerFormationControls
    }
  }),
  id: 'soccer_roster',
  name: 'Formazione Calcio',
  icon: Shield,
  defaultTheme: 'green'
};

// 3. SOCCER RANKING
export const SoccerRanking = {
  ...createRankingTemplate(SOCCER_SPORT, {
    options: { showDraws: true, showAverages: false },
    RenderBlock: TeamsRanking
  }),
  id: 'soccer_ranking',
  name: 'Classifica Calcio',
  icon: ListOrdered,
  defaultTheme: 'green'
};
