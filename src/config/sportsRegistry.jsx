import React, { useState } from 'react';
import { Trophy, Shield, PartyPopper, Users, ListOrdered } from 'lucide-react';

// Import Specific Blocks
import { MatchScoreControls } from '../components/blocks/MatchScore';
import { MatchDetailsControls } from '../components/blocks/MatchDetails';
import { GoalTimeline, GoalTimelineControls } from '../components/blocks/GoalTimeline';
import { BasketRosterVisual, BasketRosterVisualControls } from '../components/blocks/BasketRosterVisual';
import { SoccerFormation, SoccerFormationControls } from '../components/blocks/SoccerFormation';
import { useClassifica } from '../hooks/useCsi';

// Placeholder hook for Soccer Ranking
const useSoccerClassifica = () => {
  const [data] = useState([]);
  return { classifica: data, loading: false, error: null, refresh: () => {} };
};

export const SPORTS = {
  basket: {
    id: 'basket',
    name: 'Basket',
    icon: Trophy,
    defaultTheme: 'orange',
    hooks: {
      useRanking: useClassifica
    },
    labels: {
      matchDay: "MATCH DAY",
      roster: "CONVOCAZIONI",
      ranking: "CLASSIFICA",
      mvp: "MVP / Note"
    },
    blocks: {
      resultExtra: {
        Render: ({ data }) => (
          data.topScorer ? (
            <div className="mt-8 text-white text-xl font-black bg-black/40 px-6 py-2 rounded-xl backdrop-blur-md border border-white/10 uppercase tracking-widest shadow-xl text-center">
              {data.topScorer}
            </div>
          ) : null
        ),
        Controls: ({ data, onChange }) => (
          <div className="pb-3 mb-3 border-b border-gray-100">
            <label className="text-[10px] font-bold text-gray-500 uppercase mb-2 block font-mono">MVP / Note</label>
            <input 
              type="text" 
              value={data.topScorer || ''} 
              onChange={(e) => onChange('topScorer', e.target.value)} 
              className="w-full p-2 text-center text-sm border rounded-lg bg-white" 
              placeholder="Esempio: 23 Martini"
            />
          </div>
        )
      },
      lineupExtra: {
        Render: BasketRosterVisual,
        Controls: BasketRosterVisualControls
      },
      rankingConfig: {
        columnsString: "V•Win(3/2) S•Loss(1/0) MPF•Med.PuntiFatti",
        showDraws: false,
        showAverages: true,
        labels: { scored: "MPF", conceded: "MPS" }
      }
    }
  },
  soccer: {
    id: 'soccer',
    name: 'Calcio',
    icon: Shield,
    defaultTheme: 'green',
    hooks: {
      useRanking: useSoccerClassifica
    },
    labels: {
      matchDay: "GIORNATA",
      roster: "FORMAZIONE",
      ranking: "CLASSIFICA",
      mvp: "Timeline Gol"
    },
    blocks: {
      resultExtra: {
        Render: ({ data, theme }) => (
          <div className="w-full flex justify-center mt-6">
            <GoalTimeline data={data} theme={theme} className="w-full max-w-xl scale-110" />
          </div>
        ),
        Controls: GoalTimelineControls
      },
      lineupExtra: {
        Render: SoccerFormation,
        Controls: SoccerFormationControls
      },
      rankingConfig: {
        columnsString: "V•Vinte N•Pareggi P•Perse",
        showDraws: true,
        showAverages: false,
        labels: { scored: "GF", conceded: "GS" }
      }
    }
  }
};
