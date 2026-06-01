"use client";

import { CSSProperties, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { House } from "@/data/questions";
import { EMPTY_SCORES, getRandomQuizQuestions, getWinningHouse, HOUSE_BLURBS, HOUSE_THEME, scoreAnswer } from "@/lib/quiz";

const QUESTION_COUNT = 12;
const THINKING_LINES = [
  "Hmm… curious…",
  "Let me think…",
  "Interesting… very interesting…",
];
const FINAL_THINKING_LINES = [
  "Hmm, how curious…",
  "Very difficult…",
  "I know just where to put you…",
];

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mediaQuery.matches);
    onChange();
    mediaQuery.addEventListener("change", onChange);
    return () => mediaQuery.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

function Hat({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <motion.div
      className="relative mx-auto h-44 w-44"
      animate={reducedMotion ? undefined : { y: [0, -8, 0], rotate: [0, 1.5, 0, -1.5, 0] }}
      transition={reducedMotion ? undefined : { repeat: Infinity, duration: 6, ease: "easeInOut" }}
      aria-hidden="true"
    >
      <div className="absolute inset-x-4 bottom-2 h-8 rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(244,193,94,0.45),_transparent_70%)] blur-md" />
      <svg viewBox="0 0 220 220" className="relative z-10 h-full w-full drop-shadow-[0_18px_30px_rgba(0,0,0,0.45)]">
        <path d="M45 166c20 18 108 18 130 0 7-6 6-16-2-20-16-8-35-14-65-14-32 0-52 6-66 14-7 4-6 13 3 20Z" fill="#5b3b24" />
        <path d="M70 136c-6-52 26-95 56-95 23 0 54 32 43 84-21-8-68-11-99 11Z" fill="#6f472a" />
        <path d="M104 64c4-10 14-13 23-9-8 0-14 4-18 13Z" fill="#7d5234" />
        <path d="M85 113c11-14 27-21 46-22-19 7-31 15-39 28Z" fill="#8d6141" opacity=".7" />
        <path d="M91 141c18-5 34-4 49 1-17 3-32 4-49-1Z" fill="#2f1c10" opacity=".45" />
      </svg>
    </motion.div>
  );
}

function HouseCrest({ house }: { house: House }) {
  const detail = HOUSE_THEME[house];

  return (
    <div className="mx-auto mb-5 w-fit rounded-full border border-white/35 bg-white/10 p-3 shadow-[0_0_35px_var(--house-glow)] backdrop-blur-sm">
      <svg width="88" height="102" viewBox="0 0 88 102" role="img" aria-label={`${house} crest`}>
        <path d="M44 4 80 18v30c0 24-16 42-36 50C24 90 8 72 8 48V18L44 4Z" fill={detail.primary} stroke={detail.secondary} strokeWidth="4" />
        <path d="M44 23 62 30v16c0 12-8 21-18 26-10-5-18-14-18-26V30l18-7Z" fill={detail.secondary} opacity="0.25" />
        <text x="44" y="58" textAnchor="middle" fontSize="34" fontFamily="'MedievalSharp', 'Segoe UI', sans-serif" fill={detail.secondary}>
          {house[0]}
        </text>
      </svg>
    </div>
  );
}

function SplashCrests({ reducedMotion }: { reducedMotion: boolean }) {
  const crests: Array<{ house: House; x: number; y: number; rotate: number }> = [
    { house: "Gryffindor", x: -122, y: -10, rotate: -8 },
    { house: "Ravenclaw", x: 108, y: -16, rotate: 8 },
    { house: "Hufflepuff", x: -96, y: 50, rotate: -6 },
    { house: "Slytherin", x: 94, y: 54, rotate: 6 },
  ];

  return (
    <div className="relative mx-auto mt-8 h-44 w-full max-w-md" aria-hidden="true">
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,_rgba(213,174,92,0.2),_transparent_70%)] blur-2xl" />
      {crests.map(({ house, x, y, rotate }, index) => {
        const detail = HOUSE_THEME[house];
        return (
          <motion.div
            key={house}
            className="absolute left-1/2 top-1/2"
            initial={{ x, y, rotate, opacity: 0 }}
            animate={
              reducedMotion
                ? { x, y, rotate, opacity: 1 }
                : {
                    x: [x, x + (index % 2 === 0 ? -6 : 6), x],
                    y: [y, y - 9, y],
                    rotate: [rotate, rotate + (index % 2 === 0 ? -2 : 2), rotate],
                    opacity: [0.85, 1, 0.85],
                  }
            }
            transition={{ delay: index * 0.08, repeat: Infinity, duration: 4.2 + index * 0.35, ease: "easeInOut" }}
          >
            <div className="w-fit rounded-full border border-[#e8cb89]/70 bg-[#1f152f]/80 p-2 shadow-[0_0_24px_rgba(213,174,92,0.3)] backdrop-blur-sm">
              <svg width="54" height="62" viewBox="0 0 88 102" role="img" aria-label={`${house} crest`}>
                <path d="M44 4 80 18v30c0 24-16 42-36 50C24 90 8 72 8 48V18L44 4Z" fill={detail.primary} stroke={detail.secondary} strokeWidth="5" />
                <text x="44" y="60" textAnchor="middle" fontSize="38" fontFamily="'MedievalSharp', 'Segoe UI', sans-serif" fill={detail.secondary}>
                  {house[0]}
                </text>
              </svg>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

export default function Home() {
  const reducedMotion = usePrefersReducedMotion();
  const [phase, setPhase] = useState<"splash" | "question" | "thinking" | "finalThinking" | "result">("splash");
  const [questions, setQuestions] = useState(() => getRandomQuizQuestions(QUESTION_COUNT));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scores, setScores] = useState(EMPTY_SCORES);
  const [winningHouse, setWinningHouse] = useState<House | null>(null);
  const timeRef = useRef<number | null>(null);

  const particles = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        left: `${((i * 13) % 93) + 2}%`,
        top: `${((i * 17) % 85) + 4}%`,
        delay: (i % 6) * 0.6,
        duration: 5 + (i % 4),
      })),
    []
  );

  useEffect(() => {
    return () => {
      if (timeRef.current) {
        window.clearTimeout(timeRef.current);
      }
    };
  }, []);

  const question = questions[currentIndex];

  const beginQuiz = () => {
    if (timeRef.current) {
      window.clearTimeout(timeRef.current);
    }
    setQuestions(getRandomQuizQuestions(QUESTION_COUNT));
    setCurrentIndex(0);
    setScores(EMPTY_SCORES);
    setWinningHouse(null);
    setPhase("question");
  };

  const revealResult = (finalScores: typeof scores) => {
    const winner = getWinningHouse(finalScores);
    setWinningHouse(winner);
    setPhase("result");
  };

  const onAnswer = (house: House) => {
    if (phase !== "question") {
      return;
    }

    const nextScores = scoreAnswer(scores, house);
    setScores(nextScores);

    const answered = currentIndex + 1;
    const isLastQuestion = answered === QUESTION_COUNT;

    if (isLastQuestion) {
      setPhase("finalThinking");
      timeRef.current = window.setTimeout(
        () => revealResult(nextScores),
        reducedMotion ? 800 : 3600
      );
      return;
    }

    if (answered % 3 === 0 && answered < QUESTION_COUNT) {
      setPhase("thinking");
      timeRef.current = window.setTimeout(
        () => {
          setCurrentIndex((value) => value + 1);
          setPhase("question");
        },
        reducedMotion ? 500 : 1700
      );
      return;
    }

    setCurrentIndex((value) => value + 1);
  };

  const houseVars =
    winningHouse === null
      ? undefined
      : ({
          "--house-primary": HOUSE_THEME[winningHouse].primary,
          "--house-secondary": HOUSE_THEME[winningHouse].secondary,
          "--house-glow": HOUSE_THEME[winningHouse].glow,
        } as CSSProperties);

  return (
    <main className="relative min-h-screen overflow-hidden bg-bg-base text-text-primary">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(213,174,92,0.16),_transparent_56%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-85">
        {particles.map((particle) => (
          <motion.span
            key={particle.id}
            className="sparkle"
            style={{ left: particle.left, top: particle.top }}
            animate={
              reducedMotion
                ? { opacity: 0.45 }
                : { opacity: [0.2, 0.8, 0.2], y: [0, -15, 0], scale: [0.9, 1.2, 0.9] }
            }
            transition={
              reducedMotion
                ? undefined
                : {
                    delay: particle.delay,
                    duration: particle.duration,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }
            }
          />
        ))}
      </div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-3xl flex-col justify-center px-4 py-8 sm:px-6">
        <AnimatePresence mode="wait">
          {phase === "splash" && (
            <motion.section
              key="splash"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: reducedMotion ? 0.05 : 0.5 }}
              className="glass-card text-center"
            >
              <p className="text-xs uppercase tracking-[0.28em] text-text-muted">MuggleNet Sorting</p>
              <h1 className="font-display mt-3 text-4xl leading-tight text-[var(--color-brand-gold)] sm:text-5xl">The Sorting Hat Quiz</h1>
              <p className="mx-auto mt-4 max-w-xl text-sm text-text-primary/90 sm:text-base">
                Step into a calm, enchanted hall. Answer twelve curious prompts and let the Hat decide your house.
              </p>
              <SplashCrests reducedMotion={reducedMotion} />
              <button type="button" className="magic-button mt-7" onClick={beginQuiz}>
                Be Sorted
              </button>
            </motion.section>
          )}

          {phase === "question" && question && (
            <motion.section
              key={`question-${question.id}`}
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: reducedMotion ? 0.05 : 0.35 }}
              className="glass-card"
            >
              <div className="mb-5">
                <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-[0.2em] text-text-muted">
                  <span>Question {currentIndex + 1} of {QUESTION_COUNT}</span>
                  <span>{Math.round(((currentIndex + 1) / QUESTION_COUNT) * 100)}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/10">
                  <motion.div
                    className="h-full rounded-full bg-[linear-gradient(90deg,var(--color-brand-gold),#f3dd9c)]"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentIndex + 1) / QUESTION_COUNT) * 100}%` }}
                    transition={{ duration: reducedMotion ? 0.01 : 0.3 }}
                  />
                </div>
              </div>

              <h2 className="font-display text-2xl leading-tight text-text-primary sm:text-3xl">{question.prompt}</h2>

              <div className="mt-6 grid gap-3">
                {question.options.map((option) => (
                  <button
                    key={option.text}
                    type="button"
                    className="choice-button"
                    onClick={() => onAnswer(option.house)}
                  >
                    {option.text}
                  </button>
                ))}
              </div>
            </motion.section>
          )}

          {phase === "thinking" && (
            <motion.section
              key={`thinking-${currentIndex}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reducedMotion ? 0.05 : 0.4 }}
              className="glass-card text-center"
              aria-live="polite"
            >
              <Hat reducedMotion={reducedMotion} />
              <p className="mt-5 text-lg text-text-primary sm:text-xl">
                {THINKING_LINES[Math.floor(currentIndex / 3) % THINKING_LINES.length]}
              </p>
            </motion.section>
          )}

          {phase === "finalThinking" && (
            <motion.section
              key="final-thinking"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="glass-card text-center"
              aria-live="polite"
            >
              <Hat reducedMotion={reducedMotion} />
              <div className="mt-5 space-y-2 text-lg text-text-primary sm:text-xl">
                {FINAL_THINKING_LINES.map((line, index) => (
                  <motion.p
                    key={line}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: reducedMotion ? 0 : index * 0.85, duration: reducedMotion ? 0.01 : 0.45 }}
                  >
                    {line}
                  </motion.p>
                ))}
              </div>
            </motion.section>
          )}

          {phase === "result" && winningHouse && (
            <motion.section
              key="result"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reducedMotion ? 0.05 : 0.45 }}
              className="glass-card house-result"
              style={houseVars}
            >
              <p className="text-xs uppercase tracking-[0.28em] text-white/75">The Hat has decided…</p>
              <h2 className="font-display mt-2 text-4xl text-house-secondary sm:text-5xl">{winningHouse}</h2>
              <HouseCrest house={winningHouse} />
              <p className="mx-auto max-w-xl text-center text-sm text-white/90 sm:text-base">{HOUSE_BLURBS[winningHouse]}</p>

              <a
                className="mt-6 inline-flex rounded-full border border-[#e8cb89]/50 bg-[#2d2240]/70 px-5 py-3 text-sm font-semibold text-[#f7eed1] hover:bg-[#3a2a56]/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]"
                href="https://mugglenet.com/resources/every-hogwarts-house-trait-explained-with-famous-members/"
                target="_blank"
                rel="noreferrer"
              >
                Explore all house traits & famous members
              </a>

              <div className="mt-7 text-center">
                <button type="button" className="magic-button" onClick={beginQuiz}>
                  Take the quiz again
                </button>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
