# MuggleNet Sorting Hat Quiz

A polished, animated Sorting Hat quiz web app built with **Next.js (App Router) + TypeScript + Tailwind CSS + Framer Motion**, ready to deploy on **Vercel**.

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS (v4)
- Framer Motion

## Features

- Magical splash/start screen with ambient particles and floating four-house crest animation
- Randomized quiz flow: **12 unique questions** selected from a **19-question bank**
- Smooth animated transitions between questions
- Periodic thinking interstitials after Q3, Q6, Q9
- Dramatic final thinking reveal after Q12
- Deterministic house scoring with tie-break priority
- House-themed results reveal (Gryffindor, Slytherin, Ravenclaw, Hufflepuff)
- Replay flow that reshuffles a new 12-question run
- Responsive mobile/desktop layout and keyboard-accessible controls
- Reduced-motion support via `prefers-reduced-motion`

## Project Structure

- `/app/layout.tsx` — app shell + metadata
- `/app/page.tsx` — splash, quiz flow, thinking transitions, and results UI
- `/app/globals.css` — theme tokens, reusable styles, house result theme behavior
- `/data/questions.ts` — complete 19-question source bank
- `/lib/quiz.ts` — randomization, score tallying, deterministic tie-break, and house content

## Animation / Transition Notes

- **Ambient motion**: floating house crests and subtle sparkles via Framer Motion loops.
- **View transitions**: `AnimatePresence` + `motion.section` fade/slide between splash, question, interstitial, and results states.
- **Thinking moments**:
  - Short interstitial after every third answered question except the final set.
  - Longer staged final-thinking reveal before result output.
- **Result reveal**: house-specific CSS variables drive color transition to winning house palette.
- **Reduced motion**: motion timings collapse to near-instant and heavy movement is minimized.

## Local Development

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Lint & Build

```bash
npm run lint
npm run build
```

## Deploy to Vercel

### Option A: Vercel Dashboard
1. Import this repository in Vercel.
2. Framework preset: **Next.js** (auto-detected).
3. Deploy.

### Option B: CLI
```bash
npm i -g vercel
vercel
```

No backend or database is required; quiz logic runs fully in the browser.

## House Traits Resource Link

Results screen includes a direct link to:

https://mugglenet.com/resources/every-hogwarts-house-trait-explained-with-famous-members/
