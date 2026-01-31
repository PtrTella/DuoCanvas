import { MatchResult } from '../templates/MatchResult';
import { NextMatch } from '../templates/NextMatch';
import { SoccerMatch } from '../templates/SoccerMatch';
import { FootballResult } from '../templates/FootballResult';
import { WeekRecap } from '../templates/WeekRecap';

export const TEMPLATES = [
  MatchResult,
  NextMatch,
  SoccerMatch,
  FootballResult,
  WeekRecap
];

export const THEMES = {
  orange: { primary: "from-orange-600 to-red-600", bg: "bg-orange-950", accent: "text-orange-400" },
  blue:   { primary: "from-blue-600 to-cyan-600", bg: "bg-blue-950", accent: "text-blue-400" },
  green:  { primary: "from-green-600 to-emerald-600", bg: "bg-green-950", accent: "text-green-400" },
  purple: { primary: "from-purple-600 to-indigo-600", bg: "bg-purple-950", accent: "text-purple-400" },
  black:  { primary: "from-gray-700 to-black", bg: "bg-gray-900", accent: "text-gray-400" }
};

// Tailwind class map for controls (must be static strings to compile)
export const CONTROL_THEMES = {
  orange: {
    wrapper: "bg-orange-50 border-orange-100",
    label: "text-orange-800",
    focus: "focus:border-orange-500"
  },
  blue: {
    wrapper: "bg-blue-50 border-blue-100",
    label: "text-blue-800",
    focus: "focus:border-blue-500"
  },
  green: {
    wrapper: "bg-green-50 border-green-100",
    label: "text-green-800",
    focus: "focus:border-green-500"
  },
  purple: {
    wrapper: "bg-purple-50 border-purple-100",
    label: "text-purple-800",
    focus: "focus:border-purple-500"
  },
  black: {
    wrapper: "bg-gray-100 border-gray-200",
    label: "text-gray-700",
    focus: "focus:border-gray-600"
  }
};