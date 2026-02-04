import React, { useState } from 'react';
import { Trophy, Shield, PartyPopper, Users, ListOrdered } from 'lucide-react';

// Import Specific Blocks
import { MatchScoreControls } from '../components/blocks/MatchScore';
import { MatchDetailsControls } from '../components/blocks/MatchDetails';
import { GoalTimeline, GoalTimelineControls } from '../components/blocks/GoalTimeline';
import { BasketRoster, BasketRosterControls } from '../components/blocks/BasketRoster';
import { SoccerFormation, SoccerFormationControls } from '../components/blocks/SoccerFormation';
import { TeamsRanking } from '../components/blocks/TeamsRanking';
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
    templates: {
      result: {
        blocks: {
          extra: {
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
          }
        },
        defaults: {
          homeScore: 0,
          awayScore: 0,
          topScorer: ""
        }
      },
      lineup: {
        blocks: {
          extra: {
            Render: BasketRoster,
            Controls: BasketRosterControls
          }
        },
        defaults: {
          rosterList: "1 Martini\n4 Rubbi Alfi\n5 Dino\n6 Ricci Lucchi\n7 Tellarini\n8 Gardenghi\n9 Lambertucci\n10 Pieri\n12 Camaggi\n14 Bonifazio\n15 Cavini\n16 Monti\n18 Tassoni\n20 Gamez\n21 Piani Gentile\n22 Biavati\n25 Ferrante\n27 Lancieri",
        }
      },
      ranking: {
        blocks: {
          config: {
            Render: (props) => <TeamsRanking {...props} showAverages={true} showDraws={false} />,
            options: { showDraws: false, showAverages: true }
          }
        },
        defaults: {
          leagueName: "Campionato CSI Imola, Girone Ovest",
          season: "Stagione 2025/26",
          ranking: [],
          highlightTeam: "Duo Ligones",
          showAverages: true,
          showStats: true
        }
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
    templates: {
      result: {
        blocks: {
          extra: {
            Render: ({ data, theme }) => (
              <div className="w-full flex justify-center mt-6">
                <GoalTimeline data={data} theme={theme} className="w-full max-w-xl scale-110" />
              </div>
            ),
            Controls: GoalTimelineControls
          }
        },
        defaults: {
          homeScore: 0,
          awayScore: 0,
          homeGoals: "",
          awayGoals: ""
        }
      },
      lineup: {
        blocks: {
          extra: {
            Render: SoccerFormation,
            Controls: SoccerFormationControls
          }
        },
        defaults: {
          module: "3-2-1",
          rosterList: "1 Voda\n4 Gentilini\n5 Ceroni\n6 Neri\n7 Costa\n8 Mondini\n9 Alpi\n10 Forti\n12 Poli\n15 Sarro A.\n17 Carbone\n20 Collina\n21 Dalle Fabbriche\n22 Tomba\n23 Sarro M."
        }
      },
      ranking: {
        blocks: {
          config: {
            Render: (props) => <TeamsRanking {...props} showAverages={false} showDraws={true} />,
            options: { showDraws: true, showAverages: false }
          }
        },
        defaults: {
          leagueName: "Campionato Calcio a 7 - Girone B",
          season: "Stagione 2025/26",
          ranking: [],
          highlightTeam: "Duo Ligones",
          showAverages: false,
          showStats: true
        }
      }
    }
  }
};
