import { House, QUESTION_BANK, QuizQuestion } from "@/data/questions";

const HOUSE_PRIORITY: House[] = ["Gryffindor", "Ravenclaw", "Hufflepuff", "Slytherin"];

export type HouseScores = Record<House, number>;

export const HOUSE_BLURBS: Record<House, string> = {
  Gryffindor:
    "Brave at heart, bold in action, and loyal in the face of fear. Gryffindors leap first and light the way for others.",
  Slytherin:
    "Cunning, resourceful, and quietly unstoppable. Slytherins turn ambition into strategy and strategy into legacy.",
  Ravenclaw:
    "Witty, curious, and endlessly thoughtful. Ravenclaws seek patterns, ask better questions, and chase wonder.",
  Hufflepuff:
    "Steady, kind, and fiercely true. Hufflepuffs lead with empathy, fairness, and a strength that never boasts.",
};

export const HOUSE_THEME: Record<House, { primary: string; secondary: string; glow: string }> = {
  Gryffindor: {
    primary: "#9b1c26",
    secondary: "#d4af37",
    glow: "rgba(212, 175, 55, 0.45)",
  },
  Slytherin: {
    primary: "#1f6f50",
    secondary: "#b6bcc6",
    glow: "rgba(182, 188, 198, 0.45)",
  },
  Ravenclaw: {
    primary: "#1f4e8c",
    secondary: "#b4814a",
    glow: "rgba(180, 129, 74, 0.5)",
  },
  Hufflepuff: {
    primary: "#d0a82a",
    secondary: "#111111",
    glow: "rgba(208, 168, 42, 0.45)",
  },
};

export const EMPTY_SCORES: HouseScores = {
  Gryffindor: 0,
  Slytherin: 0,
  Ravenclaw: 0,
  Hufflepuff: 0,
};

export function getRandomQuizQuestions(count = 12): QuizQuestion[] {
  const shuffled = [...QUESTION_BANK];

  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.slice(0, count);
}

export function scoreAnswer(scores: HouseScores, house: House): HouseScores {
  return {
    ...scores,
    [house]: scores[house] + 1,
  };
}

export function getWinningHouse(scores: HouseScores): House {
  const topScore = Math.max(...Object.values(scores));
  const tied = HOUSE_PRIORITY.filter((house) => scores[house] === topScore);
  return tied[0];
}
