import { BasketResult, BasketLineup, BasketRanking } from '../templates/BasketTemplates';
import { SoccerResult, SoccerFormation, SoccerRanking } from '../templates/SoccerTemplates';
import { WeekRecap } from '../templates/WeekRecap';

export { THEMES, CONTROL_THEMES } from './constants';

export const TEMPLATES = [
  BasketResult,
  BasketLineup,
  BasketRanking,
  SoccerResult,
  SoccerFormation,
  SoccerRanking,
  WeekRecap
];
