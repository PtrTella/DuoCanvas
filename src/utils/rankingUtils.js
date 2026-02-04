/**
 * Utility for parsing manual ranking data from text.
 * 
 * Supports different sport formats:
 * - Basket (Usually no draws): Name Pts G V S [AvgPF AvgPS]
 * - Soccer/Standard (With draws): Name Pts G V N P [GF GS]
 */
export const parseManualRanking = (text, options = { showDraws: false }) => {
    if (!text) return { ranking: [], hasStats: false, hasAverages: false };

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
                numbers.unshift(num);
                i--;
            } else {
                break; 
            }
        }
        
        let name = parts.slice(0, i + 1).join(' ');
        // Remove leading rank if present (e.g. "1. TEAM" or "1 TEAM")
        name = name.replace(/^(\d+)[.)]?\s*/, '');

        let stats = {
            points: 0, played: 0, won: 0, lost: 0, drawn: 0
        };
        
        const n = numbers.length;
        
        if (options.showDraws) {
            // Format: Pt G V N P ...
            if (n >= 7) {
                stats.points = numbers[n-7];
                stats.played = numbers[n-6];
                stats.won = numbers[n-5];
                stats.drawn = numbers[n-4];
                stats.lost = numbers[n-3];
                stats.avgScored = numbers[n-2];   // GF
                stats.avgConceded = numbers[n-1]; // GS
                hasStatsFound = true;
                hasAveragesFound = true;
            } else if (n >= 5) {
                stats.points = numbers[n-5];
                stats.played = numbers[n-4];
                stats.won = numbers[n-3];
                stats.drawn = numbers[n-2];
                stats.lost = numbers[n-1];
                hasStatsFound = true;
            } else if (n >= 1) {
                stats.points = numbers[n-1];
            }
        } else {
            // Format: Pt G V P ... (No Draws)
            if (n >= 6) {
                stats.points = numbers[n-6];
                stats.played = numbers[n-5];
                stats.won = numbers[n-4];
                stats.lost = numbers[n-3];
                stats.avgScored = numbers[n-2];
                stats.avgConceded = numbers[n-1];
                hasStatsFound = true;
                hasAveragesFound = true;
            } else if (n >= 4) {
                stats.points = numbers[n-4];
                stats.played = numbers[n-3];
                stats.won = numbers[n-2];
                stats.lost = numbers[n-1];
                hasStatsFound = true;
            } else if (n >= 1) {
                stats.points = numbers[n-1];
            }
        }
        
        return {
            id: name + Math.random(),
            name: name || "Team",
            ...stats
        };
    });

    return { ranking, hasStats: hasStatsFound, hasAverages: hasAveragesFound };
};
