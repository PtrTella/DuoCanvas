/**
 * Configuration class for Basketball templates and data formats.
 */
export class BasketTemplate {
  /**
   * Ranking data structure and UI configuration.
   */
  static ranking = {
    showDraws: false,
    showAverages: true,
    columns: [
      { key: 'points', label: 'PT', placeholder: '20', isStat: false },
      { key: 'played', label: 'G', placeholder: '10', isStat: true },
      { key: 'won', label: 'V', placeholder: '8', isStat: true },
      { key: 'lost', label: 'S', placeholder: '2', isStat: true },
      { key: 'scored', label: 'PF', placeholder: '850', isAverage: true },
      { key: 'conceded', label: 'PS', placeholder: '720', isAverage: true }
    ]
  };
}
