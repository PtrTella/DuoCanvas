/**
 * Utility for parsing manual ranking data from text.
 * 
 * Supports different sport formats:
 * - Basket (Usually no draws): Name Pts G V S [AvgPF AvgPS]
 * - Soccer/Standard (With draws): Name Pts G V N P [GF GS]
 */
export const parseManualRanking = (text, options = {}) => {
    if (!text) return { ranking: [], hasStats: false, hasAverages: false };

    const { rankingFormat } = options;
    const columns = rankingFormat?.columns || [];
    const lines = text.split('\n').filter(l => l.trim().length > 0);
    let hasStatsFound = false;
    let hasAveragesFound = false;

    const ranking = lines.map((line) => {
        const cleanLine = line.replace(/,/g, '.'); 
        const parts = cleanLine.trim().split(/[\s\t]+/);
        const numbers = [];
        
        let i = parts.length - 1;
        while (i >= 0) {
            const num = parseFloat(parts[i]);
            if (!isNaN(num)) {
                numbers.unshift(num); // unshift builds array from left to right: [Pt, G, V...]
                i--;
            } else {
                break; 
            }
        }
        
        let name = parts.slice(0, i + 1).join(' ');
        name = name.replace(/^(\d+)[.)]?\s*/, '');

        let stats = {
            points: 0, played: 0, won: 0, lost: 0, drawn: 0,
            scored: 0, conceded: 0, avgScored: 0, avgConceded: 0
        };
        
        // Map numbers sequentially according to the defined format
        for (let j = 0; j < columns.length; j++) {
            if (numbers.length === 0) break;
            
            const num = numbers.shift(); // take number from left (e.g. Pt -> G -> V)
            const field = columns[j];
            
            stats[field.key] = num;
            
            if (field.key === 'scored') stats.avgScored = num;
            if (field.key === 'conceded') stats.avgConceded = num;
            
            if (field.isStat) hasStatsFound = true;
            if (field.isAverage) hasAveragesFound = true;
        }
        
        return {
            id: name + Math.random(),
            name: name || "Team",
            ...stats
        };
    });

    return { ranking, hasStats: hasStatsFound, hasAverages: hasAveragesFound };
};
