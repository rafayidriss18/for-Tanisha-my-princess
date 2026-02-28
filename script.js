/* ================================================
   CINEMATIC LOVE STORY - 10 FULL SCENES
   Tanisha ❤️ Rafay - stacked lines, slow typing, gestures
=================================================== */

const scenes = [
  // ---------- SCENE 1: PROLOGUE ----------
  {
    chapter: "PROLOGUE",
    lines: [
      { text: "Some stories don’t begin with love…", emotion: "romantic" },
      { text: "They begin with almost losing it.", emotion: "dry" },
      { text: "This is Tanisha and Rafay.", emotion: "romantic" },
      { text: "Two hearts under the same sky.", emotion: "romantic" }
    ],
    effect: () => { hideCinematicBars(); setAurora(0.1); setZoom(1); },
    interaction: async () => { await sleep(600); playScene(scenes[1]); }
  },

  // ---------- SCENE 2: THE ARGUMENT ----------
  {
    chapter: "ARGUMENT",
    lines: [
      { text: "I know I spoke harshly…", emotion: "dry" },
      { text: "And I scared you away.", emotion: "dry" },
      { text: "But I would never stop loving you.", emotion: "romantic" }
    ],
    effect: () => { setAurora(0.2); },
    interaction: async () => { await screenShake(10, 700); playScene(scenes[2]); }
  },

  // ---------- SCENE 3: CAR CRASH ----------
  {
    chapter: "CAR CRASH",
    lines: [
      { text: "The world spun around me…", emotion: "dry" },
      { text: "Metal bent, hearts shattered.", emotion: "dry" },
      { text: "But even in chaos, I thought of you.", emotion: "romantic" }
    ],
    effect: () => { flashWhite(400); setAurora(0.3); },
    interaction: async () => { playSFX('assets/sfx/crash.mp3'); await sleep(800); playScene(scenes[4]); }
  },

  // ---------- SCENE 4: COMFORT ----------
  {
    chapter: "COMFORT",
    lines: [
      { text: "Meri jaan… I’m right here with you.", emotion: "romantic" },
      { text: "No fear can pull us apart.", emotion: "romantic" },
      { text: "I’ll always hold you, my perfect girl.", emotion: "romantic" }
    ],
    effect: () => { setAurora(0.4); setZoom(1.05); playMusic('assets/music/romantic.mp3'); },
    interaction: async () => { await sleep(1000); playScene(scenes[5]); }
  },

  // ---------- SCENE 5: STARFISH SECRET ----------
  {
    chapter: "STARFISH",
    lines: [
      { text: "Sometimes I feel dumb, starfishy…", emotion: "playful" },
      { text: "But you call me yours and it’s okay.", emotion: "playful" },
      { text: "Little secrets, little laughs…", emotion: "playful" }
    ],
    effect: () => { setAurora(0.35); },
    interaction: async () => {
      // Tap starfish gesture included
      playScene(scenes[6]);
    }
  },

  // ---------- SCENE 6: FIRST KISS ----------
  {
    chapter: "FIRST KISS",
    lines: [
      { text: "Under the city lights…", emotion: "romantic" },
      { text: "Our lips met for the first time.", emotion: "romantic" },
      { text: "I whispered: 'Mera dil, my lil baby girl…'", emotion: "romantic" }
    ],
    effect: () => { setAurora(0.5); setZoom(1.1); playSFX('assets/sfx/kiss.mp3'); },
    interaction: async () => { await sleep(800); playScene(scenes[7]); }
  },

  // ---------- SCENE 7: FEAR OF LOSING ----------
  {
    chapter: "FEAR",
    lines: [
      { text: "I sometimes worry…", emotion: "dry" },
      { text: "That the world or our fears could pull us apart.", emotion: "dry" },
      { text: "But I promise, my perfect girl…", emotion: "romantic" },
      { text: "I will always be right here.", emotion: "romantic" }
    ],
    effect: () => { setAurora(0.4); setZoom(1.05); },
    interaction: async () => { playScene(scenes[8]); }
  },

  // ---------- SCENE 8: HEALING ----------
  {
    chapter: "HEALING",
    lines: [
      { text: "Your smile, your kindness…", emotion: "romantic" },
      { text: "Everything about you is perfect.", emotion: "romantic" },
      { text: "Even when you feel cold inside,", emotion: "romantic" },
      { text: "I will warm your heart.", emotion: "romantic" }
    ],
    effect: () => { setAurora(0.3); setZoom(1); },
    interaction: async () => { playScene(scenes[9]); }
  },

  // ---------- SCENE 9: HIDDEN ENDING ----------
  {
    chapter: "HIDDEN ENDING",
    lines: [
      { text: "Because you found every secret I hid…", emotion: "playful" },
      { text: "The starfish taps, the little gestures…", emotion: "playful" },
      { text: "You unlocked my heart completely.", emotion: "romantic" }
    ],
    effect: () => { setAurora(0.6); setZoom(1.15); playSFX('assets/sfx/twinkle.mp3'); },
    interaction: async () => { await sleep(800); playScene(scenes[10]); }
  },

  // ---------- SCENE 10: FINAL MESSAGE ----------
  {
    chapter: "FINAL SCENE",
    lines: [
      { text: "No matter what happens…", emotion: "romantic" },
      { text: "If you break my heart or I lose my life…", emotion: "romantic" },
      { text: "I will always love you, Tanisha.", emotion: "romantic" },
      { text: "You are my only ever love, my perfect lil princess, meri jaan.", emotion: "romantic" }
    ],
    effect: () => { setAurora(0.7); setZoom(1.2); playMusic('assets/music/final.mp3'); },
    interaction: async () => { await sleep(2000); alert("❤️ THE END ❤️"); }
  }
];
