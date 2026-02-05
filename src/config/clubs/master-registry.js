// Import Components
import { BasketResult, BasketLineup, BasketRanking } from '../../templates/BasketTemplates';
import { SoccerResult, SoccerFormation, SoccerRanking } from '../../templates/SoccerTemplates';
import { WeekRecap } from '../../templates/WeekRecap';

/**
 * 📚 Master Registry - Maps IDs to actual Logic/Icons/Names.
 * This file is ONLY used by index.js to build the UI registry.
 */
export const MASTER_REGISTRY = {
  basket_result:  { ...BasketResult,  name: 'Risultato Basket' },
  basket_roster:  { ...BasketLineup,  name: 'Roster Basket' },
  basket_ranking: { ...BasketRanking, name: 'Classifica Basket' },
  soccer_result:  { ...SoccerResult,  name: 'Risultato Calcio' },
  soccer_roster:  { ...SoccerFormation,name: 'Formazione Calcio' },
  soccer_ranking: { ...SoccerRanking, name: 'Classifica Calcio' },
  week_recap:     { ...WeekRecap,     name: 'Recap Settimana' }
};
