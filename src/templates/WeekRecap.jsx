import React from 'react';
import { CalendarRange } from 'lucide-react';
import BaseCard from '../components/UI/BaseCard';
import { MatchInfo, MatchInfoControls } from '../components/blocks/MatchInfo';
import { EventsList, EventsListControls } from '../components/blocks/EventsList';

export const WeekRecap = {
  id: 'week_recap',
  name: 'Recap Settimana',
  icon: CalendarRange, // Icona calendario
  defaultTheme: 'purple', // Purple theme for change

  Render: ({ data, theme, cardRef }) => (
    <BaseCard theme={theme} ref={cardRef}>
        <div className="flex flex-col h-full w-full relative z-10 gap-8">
            {/* 
               Header: Uses "SETTIMANA" as label.
               Pass hideChampionship=true to MatchInfo to comply with "no champ" request 
            */}
            <MatchInfo 
                data={data} 
                theme={theme} 
                matchDayLabel="SETTIMANA" 
                hideChampionship={true} 
            />
            
            <div className="flex-1 flex flex-col justify-center">
                <EventsList data={data} theme={theme} />
            </div>

            {/* Empty space at bottom or maybe a footer slogan if needed, 
                but BaseCard controls the footer sponsors. */}
        </div>
    </BaseCard>
  ),

  Controls: ({ data, onChange }) => (
      <div className="space-y-1 animate-in fade-in">
          {/* Reuse MatchInfo controls but maybe we don't need Championship input? 
              MatchInfoControls has it hardcoded. 
              Ideally we should use a simplified control or just let it be unused. */}
          <MatchInfoControls data={data} onChange={onChange} />
          <EventsListControls data={data} onChange={onChange} />
      </div>
  )
};
