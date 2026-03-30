/**
 * Configuration class for Soccer templates and data formats.
 */
export class SoccerTemplate {
  /**
   * Ranking data structure and UI configuration.
   */
  static ranking = {
    showDraws: true,
    showAverages: false,
    columns: [
      { key: 'points', label: 'PT', placeholder: '24', isStat: false },
      { key: 'played', label: 'G', placeholder: '10', isStat: true },
      { key: 'won', label: 'V', placeholder: '8', isStat: true },
      { key: 'drawn', label: 'P', placeholder: '1', isStat: true },
      { key: 'lost', label: 'S', placeholder: '1', isStat: true },
      { key: 'scored', label: 'GF', placeholder: '34', isAverage: true },
      { key: 'conceded', label: 'GS', placeholder: '12', isAverage: true }
    ]
  };
}
