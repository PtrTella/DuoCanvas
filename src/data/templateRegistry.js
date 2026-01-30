import { MatchResult } from '../templates/MatchResult';
import { NextMatch } from '../templates/NextMatch';
import { SoccerMatch } from '../templates/SoccerMatch';

export const TEMPLATES = [
  MatchResult,
  NextMatch,
  SoccerMatch
];

export const THEMES = {
  orange: { primary: "from-orange-600 to-red-600", bg: "bg-orange-950", accent: "text-orange-400" },
  blue:   { primary: "from-blue-600 to-cyan-600", bg: "bg-blue-950", accent: "text-blue-400" },
  green:  { primary: "from-green-600 to-emerald-600", bg: "bg-green-950", accent: "text-green-400" },
  purple: { primary: "from-purple-600 to-indigo-600", bg: "bg-purple-950", accent: "text-purple-400" },
  black:  { primary: "from-gray-700 to-black", bg: "bg-gray-900", accent: "text-gray-400" }
};