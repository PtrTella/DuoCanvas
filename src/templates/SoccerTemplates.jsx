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
    defaultData: {
      headerTitle: "GIORNATA",
      headerValue: "1",
      labelGoals: "GOL",
      homeGoals: "",
      awayGoals: "",
      homeScore: "0",
      awayScore: "0"
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
    },
    defaultData: {
      headerTitle: "FORMAZIONE",
      headerValue: "",
      module: "3-2-1",
      labelCoach: "Mister",
      labelBench: "A Disposizione",
      rosterList: "1 Voda\n4 Gentilini\n5 Ceroni\n6 Neri\n7 Costa\n8 Mondini\n9 Alpi\n10 Forti\n12 Poli\n15 Sarro A.\n17 Carbone\n20 Collina\n21 Dalle Fabbriche\n22 Tomba\n23 Sarro M."
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
    RenderBlock: TeamsRanking,
    defaultData: {
      headerTitle: "CLASSIFICA",
      headerValue: "",
      leagueName: "Campionato Calcio a 7 - Girone B",
      season: "Stagione 2025/26",
      ranking: [],
      highlightTeam: "Duo Ligones",
      showAverages: false,
      showStats: true
    }
  }),
  id: 'soccer_ranking',
  name: 'Classifica Calcio',
  icon: ListOrdered,
  defaultTheme: 'green'
};
