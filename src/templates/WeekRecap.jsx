import React from 'react';
import { CalendarRange } from 'lucide-react';
import BaseCard from '../components/ui/BaseCard';
import { MatchInfo, MatchInfoControls } from '../components/blocks/MatchInfo';
import { EventsList, EventsListControls } from '../components/blocks/EventsList';

export const WeekRecap = {
  id: 'week_recap',
  name: 'Recap Settimana',
  icon: CalendarRange, // Icona calendario
  defaultTheme: 'purple', // Purple theme for change

  Render: ({ data, theme, cardRef }) => (
    <BaseCard theme={theme} ref={cardRef}>
        <div className="flex flex-col h-full w-full relative z-10 gap-4">
            <MatchInfo 
                data={data} 
                theme={theme}
            />
            
            <div className="flex-1 flex flex-col justify-center">
                <EventsList data={data} theme={theme} />
            </div>

            {/* Empty space at bottom or maybe a footer slogan if needed, 
                but BaseCard controls the footer sponsors. */}
        </div>
    </BaseCard>
  ),

  Controls: ({ data, onChange, themeColor }) => (
      <div className="space-y-1 animate-in fade-in">
          <MatchInfoControls data={data} onChange={onChange} />
          <EventsListControls data={data} onChange={onChange} />
      </div>
  ),

  defaultData: {
    headerTitle: "SETTIMANA",
    headerValue: "",
    weekEvents: [
       { 
         sport: 'Basket', 
         date: 'Ven 12', 
         time: '21:30', 
         location: 'Pala Penazzi', 
         championship: 'Serie B Ovest',
         homeTeam: 'Duo Ligones',
         awayTeam: 'Avversari',
         color: 'orange'
       },
       { 
         sport: 'Calcio a 7', 
         date: 'Ven 14',
         time: '20:30', 
         location: 'Casa del Fanciullo', 
         championship: 'Coppa CSI Imola',
         homeTeam: 'Atletico',
         awayTeam: 'Duo Ligones',
         color: 'green'
       }
    ]
  }
};
