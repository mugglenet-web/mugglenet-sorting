export type House = "Gryffindor" | "Slytherin" | "Ravenclaw" | "Hufflepuff";

export type QuizOption = {
  text: string;
  house: House;
};

export type QuizQuestion = {
  id: number;
  prompt: string;
  options: QuizOption[];
};

export const QUESTION_BANK: QuizQuestion[] = [
  {
    id: 1,
    prompt:
      "A locked door appears in a hallway you swear was empty a moment ago. It has no handle, only a keyhole breathing silver mist. What do you do?",
    options: [
      { text: "Press your ear to it and listen for what the room wants.", house: "Ravenclaw" },
      {
        text: "Leave a mark nearby so you can find it again when you're better prepared.",
        house: "Slytherin",
      },
      { text: "Knock.", house: "Hufflepuff" },
      { text: "Step through before the hallway changes its mind.", house: "Gryffindor" },
    ],
  },
  {
    id: 2,
    prompt: "You find a book that rewrites its ending every time you close it.",
    options: [
      {
        text: "Read it aloud to someone else and see if it changes for them too.",
        house: "Hufflepuff",
      },
      { text: "Skip straight to the last page to see what happens.", house: "Ravenclaw" },
      { text: "Hide it somewhere.", house: "Slytherin" },
      { text: "Tear out one page and see whether the story screams.", house: "Gryffindor" },
    ],
  },
  {
    id: 3,
    prompt: "Pick a candle.",
    options: [
      { text: "The one that burns underwater.", house: "Slytherin" },
      { text: "The one that lights only when shared.", house: "Hufflepuff" },
      { text: "The one with a flame that points north.", house: "Gryffindor" },
      { text: "The one that casts a shadow of tomorrow.", house: "Ravenclaw" },
    ],
  },
  {
    id: 4,
    prompt: "A portrait asks you to keep a secret. It won't say whose.",
    options: [
      { text: '"Tell me what harm comes if I don\'t."', house: "Ravenclaw" },
      { text: '"I\'ll keep it, but not if it hurts someone."', house: "Hufflepuff" },
      { text: '"Secrets are debts. What do I get in return?"', house: "Slytherin" },
      { text: '"Fine. But if this causes trouble, I\'m waking you."', house: "Gryffindor" },
    ],
  },
  {
    id: 6,
    prompt: "Four staircases move at once. Which one do you trust?",
    options: [
      { text: "The one no one else notices.", house: "Slytherin" },
      { text: "The one with muddy footprints going both ways.", house: "Hufflepuff" },
      { text: "The one that looks wrong on purpose.", house: "Ravenclaw" },
      { text: "The one that is already moving quickly.", house: "Gryffindor" },
    ],
  },
  {
    id: 7,
    prompt: "A stranger drops a pouch of coins and doesn't notice.",
    options: [
      { text: "Return it before anyone sees.", house: "Hufflepuff" },
      { text: "Return it, but notice the crest on the clasp.", house: "Slytherin" },
      { text: "Return it and ask where the coins were minted.", house: "Ravenclaw" },
      {
        text: "Chase them down and nearly knock over three people doing it.",
        house: "Gryffindor",
      },
    ],
  },
  {
    id: 8,
    prompt: "You find a letter on your windowsill. It contains only one sentence: 'Not yet.'",
    options: [
      { text: "Not yet? Good. That means eventually.", house: "Slytherin" },
      { text: 'You write back: "Then when?"', house: "Ravenclaw" },
      { text: "You keep it folded in your pocket like a warning.", house: "Gryffindor" },
      { text: "You place it under a teacup and wait.", house: "Hufflepuff" },
    ],
  },
  {
    id: 9,
    prompt: "Your wand begins producing flowers instead of spells.",
    options: [
      { text: "You test whether there is a pattern in the flowers.", house: "Ravenclaw" },
      { text: "You hand them out until the wand calms down.", house: "Hufflepuff" },
      { text: "You use the distraction to get out of class.", house: "Slytherin" },
      {
        text: "You point it at the problem anyway. A flower can be a weapon if thrown hard enough.",
        house: "Gryffindor",
      },
    ],
  },
  {
    id: 10,
    prompt: "Choose a warning sign.",
    options: [
      { text: '"The floor forgives once."', house: "Gryffindor" },
      { text: '"Do not feed the mirror after midnight."', house: "Ravenclaw" },
      { text: '"Borrowed names must be returned."', house: "Slytherin" },
      { text: '"Someone is coming."', house: "Hufflepuff" },
    ],
  },
  {
    id: 11,
    prompt:
      "You are invited to a feast where every dish shows a memory instead of a flavor.",
    options: [
      {
        text: "You taste the smallest dish first. Small things hide the sharpest truths.",
        house: "Slytherin",
      },
      { text: "You ask who cooked them.", house: "Hufflepuff" },
      { text: "You try the dish no one else will touch.", house: "Gryffindor" },
      { text: "You avoid what other people avoid.", house: "Ravenclaw" },
    ],
  },
  {
    id: 12,
    prompt:
      "Someone challenges you to a duel, but you know they are only doing it because they are embarrassed.",
    options: [
      { text: "Refuse publicly, then speak to them privately.", house: "Hufflepuff" },
      { text: "Accept and end it quickly.", house: "Gryffindor" },
      { text: "Decline in a way that makes them owe you one.", house: "Slytherin" },
      {
        text: "Ask one question that makes the whole room realize why they asked.",
        house: "Ravenclaw",
      },
    ],
  },
  {
    id: 13,
    prompt: "Pick a sound from the Forbidden Forest.",
    options: [
      { text: "A bell ringing underground.", house: "Ravenclaw" },
      { text: "Someone laughing who should not be there.", house: "Gryffindor" },
      { text: "A creature stepping exactly when you step.", house: "Slytherin" },
      { text: "A lullaby with no singer.", house: "Hufflepuff" },
    ],
  },
  {
    id: 14,
    prompt: "You discover a spell that can make everyone forget one mistake you made.",
    options: [
      { text: "Use it, thank Merlin.", house: "Gryffindor" },
      {
        text: "Don't use it. A mistake erased is a lesson ignored.",
        house: "Hufflepuff",
      },
      {
        text: "Study it, because the existence of such a spell is more interesting than the spell itself.",
        house: "Ravenclaw",
      },
      { text: "Keep it. Not for now. For later.", house: "Slytherin" },
    ],
  },
  {
    id: 15,
    prompt: "The Hat pauses on your head for a very long time. What do you think?",
    options: [
      { text: '"It sees too much."', house: "Slytherin" },
      { text: '"It\'s deciding what I need."', house: "Hufflepuff" },
      { text: '"I wonder whether it has ever changed its mind."', house: "Ravenclaw" },
      { text: '"Say something, then."', house: "Gryffindor" },
    ],
  },
  {
    id: 16,
    prompt: "A map shows every place you have never been. One place glows.",
    options: [
      { text: "You go, but tell someone where you're headed.", house: "Hufflepuff" },
      { text: "You memorize the route and burn the map.", house: "Slytherin" },
      { text: "You go before the glow fades.", house: "Gryffindor" },
      { text: "You wonder why that place chose tonight.", house: "Ravenclaw" },
    ],
  },
  {
    id: 17,
    prompt: "Choose a gift from a cabinet that opens only once.",
    options: [
      { text: "A ring that makes promises audible.", house: "Hufflepuff" },
      { text: "A knife that cuts through lies, but not rope.", house: "Gryffindor" },
      { text: 'A bottle labeled "Useful Fear."', house: "Slytherin" },
      { text: "A blank card that answers one question.", house: "Ravenclaw" },
    ],
  },
  {
    id: 18,
    prompt:
      "In a dream, you meet yourself as a child. They ask, 'Did we become wonderful?'",
    options: [
      { text: '"We became great."', house: "Slytherin" },
      { text: '"We grew."', house: "Ravenclaw" },
      { text: '"We became good."', house: "Hufflepuff" },
      { text: '"We never stopped."', house: "Gryffindor" },
    ],
  },
  {
    id: 19,
    prompt:
      "A silver fox offers to guide you through a storm, but it asks for one memory as payment.",
    options: [
      {
        text: "Give it a memory of winning a battle. You can make another.",
        house: "Slytherin",
      },
      {
        text: "Give it a memory of being wrong. You know the shape of that lesson now.",
        house: "Ravenclaw",
      },
      { text: "Give it a memory of family. It should know that feeling.", house: "Hufflepuff" },
      { text: "Refuse and walk into the storm yourself while mumbling.", house: "Gryffindor" },
    ],
  },
  {
    id: 20,
    prompt: "The castle whispers your name from behind a wall.",
    options: [
      { text: '"Not unless you say please."', house: "Gryffindor" },
      { text: '"Who taught you my name?"', house: "Slytherin" },
      { text: '"I\'m listening."', house: "Hufflepuff" },
      { text: '"Walls don\'t whisper. So what are you?"', house: "Ravenclaw" },
    ],
  },
];
