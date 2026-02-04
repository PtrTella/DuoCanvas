import { PartyPopper, Shield, ListOrdered } from 'lucide-react';
import { createResultTemplate } from './factories/ResultTemplate';
import { createLineupTemplate } from './factories/LineupTemplate';
import { createRankingTemplate } from './factories/RankingTemplate';
import { GoalTimeline, GoalTimelineControls } from '../components/blocks/GoalTimeline';
import { SoccerFormation as FormationBlock, SoccerFormationControls } from '../components/blocks/SoccerFormation';
import { TeamsRanking } from '../components/blocks/TeamsRanking';
import { useClassifica } from '../hooks/useCsi';

const SOCCER_SPORT = {
  id: 'soccer',
  name: 'Calcio',
  icon: PartyPopper,
  defaultTheme: 'green',
  hooks: {
    useRanking: useClassifica
  },
  labels: {
    matchDay: "MATCH DAY",
    ranking: "CLASSIFICA",
    coach: "Mister",
    bench: "A Disposizione",
    nextMatch: "Prossima Gara",
    roster: "CONVOCAZIONI",
    goals: "GOL"
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
  defaultTheme: 'green',
  defaultData: {
    events: [],
    homeScore: "0",
    awayScore: "0"
  }
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
  defaultTheme: 'green',
  defaultData: {
    module: "3-2-1",
    rosterList: "1 Voda\n4 Gentilini\n5 Ceroni\n6 Neri\n7 Costa\n8 Mondini\n9 Alpi\n10 Forti\n12 Poli\n15 Sarro A.\n17 Carbone\n20 Collina\n21 Dalle Fabbriche\n22 Tomba\n23 Sarro M."
  }
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
  defaultTheme: 'green',
  defaultData: {
    leagueName: "Campionato Calcio a 7 - Girone B",
    season: "Stagione 2025/26",
    ranking: [],
    highlightTeam: "Duo Ligones",
    showAverages: false,
    showStats: true
  }
};
