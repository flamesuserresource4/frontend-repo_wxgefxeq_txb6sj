import React, { useMemo, useState } from 'react';
import HeroCover from './components/HeroCover';
import TopBar from './components/TopBar';
import GameCanvas from './components/GameCanvas';
import DialogueBox from './components/DialogueBox';
import EndingModal from './components/EndingModal';

const DIALOGUES = {
  aaradhya: {
    intro: 'Namaste, are you also here for evening aarti?',
    choices: [
      { text: 'Yes, I always come to offer prayers.', value: +2 },
      { text: 'Not really, I just like the peace here.', value: +1 },
      { text: 'Nah, I was just looking for the snack stall.', value: -1 },
    ],
  },
  isha: {
    intro: 'Hey, ever tried filter coffee with bhajans?',
    choices: [
      { text: 'That’s an interesting combo!', value: +1 },
      { text: 'Sounds weird, no thanks.', value: -2 },
      { text: 'Haha, only if you join me.', value: +2 },
    ],
  },
  mother: {
    intro: 'Beta, remember—values matter more than glam.',
    choices: [
      { text: 'I’ll choose kindness and simplicity.', value: +2 },
      { text: 'I’m still figuring things out.', value: 0 },
      { text: 'Looks over values, always.', value: -2 },
    ],
  },
};

export default function App() {
  const [score, setScore] = useState(() => {
    const saved = localStorage.getItem('eshan-score');
    return saved ? Number(saved) : 0;
  });
  const [met, setMet] = useState(() => {
    const saved = localStorage.getItem('eshan-met');
    return saved ? JSON.parse(saved) : {};
  });
  const [activeNPC, setActiveNPC] = useState(null);
  const [nearNPC, setNearNPC] = useState(null);
  const [showEnding, setShowEnding] = useState(false);

  const allMet = useMemo(() => ['aaradhya', 'isha', 'mother'].every((k) => met[k]), [met]);

  const openDialogue = (id) => {
    if (!id) return;
    setActiveNPC(id);
  };

  const closeDialogue = () => setActiveNPC(null);

  const handleChoose = (choice) => {
    const newScore = score + choice.value;
    const newMet = { ...met, [activeNPC]: true };
    setScore(newScore);
    setMet(newMet);
    localStorage.setItem('eshan-score', String(newScore));
    localStorage.setItem('eshan-met', JSON.stringify(newMet));
    setActiveNPC(null);
  };

  React.useEffect(() => {
    if (allMet) {
      setTimeout(() => setShowEnding(true), 300);
    }
  }, [allMet]);

  const restart = () => {
    setScore(0);
    setMet({});
    setActiveNPC(null);
    setShowEnding(false);
    localStorage.removeItem('eshan-score');
    localStorage.removeItem('eshan-met');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 text-white">
      <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
        <HeroCover />
        <TopBar score={score} />

        <section className="grid md:grid-cols-2 gap-6 items-start">
          <div className="space-y-3">
            <h2 className="text-xl font-semibold">How to Play</h2>
            <ul className="text-white/80 list-disc list-inside space-y-1">
              <li>Move with WASD or Arrow Keys</li>
              <li>Approach a character; press E to talk</li>
              <li>Pick a response to gain or lose compatibility</li>
              <li>Meet everyone to reveal your ending</li>
            </ul>
            <div className="text-xs text-white/60">Temple, Café, and Family zones are stacked top to bottom.</div>
          </div>

          <div className="bg-black/30 border border-white/10 rounded-xl p-3">
            <GameCanvas onInteractPrompt={openDialogue} onNPCProximity={setNearNPC} />
            <div className="mt-2 text-sm text-white/80 h-5">
              {nearNPC ? (
                <span>Press E to talk to <span className="font-semibold">{nearNPC}</span></span>
              ) : (
                <span>Walk near someone to interact…</span>
              )}
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-white/10 bg-white/5 p-4">
          <h3 className="font-semibold mb-2">Cast</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm text-white/80">
            <div className="p-3 rounded-lg bg-zinc-900/60">Aaradhya • Temple</div>
            <div className="p-3 rounded-lg bg-zinc-900/60">Isha • Café</div>
            <div className="p-3 rounded-lg bg-zinc-900/60">Mother • Family House</div>
          </div>
        </section>
      </div>

      <DialogueBox
        visible={!!activeNPC}
        npcName={activeNPC?.charAt(0).toUpperCase() + activeNPC?.slice(1)}
        intro={activeNPC ? DIALOGUES[activeNPC].intro : ''}
        choices={activeNPC ? DIALOGUES[activeNPC].choices : []}
        onChoose={handleChoose}
        onClose={() => {
          setActiveNPC(null);
        }}
      />

      <EndingModal visible={showEnding} score={score} onRestart={restart} />
    </div>
  );
}
