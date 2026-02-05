import { PartyPopper, Shield, ListOrdered } from 'lucide-react';
import { createResultTemplate } from './factories/ResultTemplate';
import { createLineupTemplate } from './factories/LineupTemplate';
import { createRankingTemplate } from './factories/RankingTemplate';
import { GoalTimeline, GoalTimelineControls } from '../components/blocks/GoalTimeline';
import { SoccerFormation as FormationBlock, SoccerFormationControls } from '../components/blocks/SoccerFormation';
import { TeamsRanking } from '../components/blocks/TeamsRanking';
import { useClassifica } from '../hooks/useCsi';
import { TEMPLATE_DEFAULTS } from '../config/defaults';

const SOCCER_SPORT = {
  id: 'soccer',
  name: 'Calcio',
  icon: PartyPopper,
  defaultTheme: 'green',
  hooks: {
    useRanking: () => useClassifica("4") // Girone Calcio (Ipotetico, da configurare)
  }
};

// 1. SOCCER RESULT
export const SoccerResult = {
  ...createResultTemplate(SOCCER_SPORT, {
    extraBlock: {
      Render: GoalTimeline,
      Controls: GoalTimelineControls
    },
    defaultData: TEMPLATE_DEFAULTS.soccer_result
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
    },
    defaultData: TEMPLATE_DEFAULTS.soccer_roster
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
    RenderBlock: TeamsRanking,
    defaultData: TEMPLATE_DEFAULTS.soccer_ranking
  }),
  id: 'soccer_ranking',
  name: 'Classifica Calcio',
  icon: ListOrdered,
  defaultTheme: 'green'
};
