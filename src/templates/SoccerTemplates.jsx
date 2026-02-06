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
    },
    defaultData: {
      headerTitle: "MATCH DAY",
      homeScore: "", 
      awayScore: ""
    }
  }),
  id: 'soccer_result',
  name: 'Risultato Calcio',
  icon: PartyPopper
};

// 2. SOCCER FORMATION
export const SoccerFormation = {
  ...createLineupTemplate(SOCCER_SPORT, {
    extraBlock: {
      Render: FormationBlock,
      Controls: SoccerFormationControls
    },
    defaultData: {
      headerTitle: "GARA",
      module: "3-2-1",
      rosterList: ""
    }
  }),
  id: 'soccer_roster',
  name: 'Formazione Calcio',
  icon: Shield
};

// 3. SOCCER RANKING
export const SoccerRanking = {
  ...createRankingTemplate(SOCCER_SPORT, {
    options: { showDraws: true, showAverages: false },
    RenderBlock: TeamsRanking,
    defaultData: {
      headerTitle: "CLASSIFICA",
      season: "",
      ranking: []
    }
  }),
  id: 'soccer_ranking',
  name: 'Classifica Calcio',
  icon: ListOrdered
};
