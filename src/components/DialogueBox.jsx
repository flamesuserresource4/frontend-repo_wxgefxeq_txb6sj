import React from 'react';

const DialogueBox = ({ visible, npcName, intro, choices, onChoose, onClose }) => {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-30 flex items-end md:items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative w-full md:max-w-2xl bg-zinc-900 border border-white/10 rounded-xl shadow-xl p-4 md:p-6 text-white">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-lg md:text-xl font-semibold">{npcName}</h3>
          <button
            onClick={onClose}
            className="px-2 py-1 rounded-md bg-white/10 hover:bg-white/20 transition"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        <p className="text-white/90 mb-4">{intro}</p>
        <div className="grid gap-2">
          {choices.map((choice, idx) => (
            <button
              key={idx}
              onClick={() => onChoose(choice)}
              className="text-left w-full px-4 py-3 bg-white/10 hover:bg-white/20 rounded-lg transition"
            >
              {choice.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DialogueBox;
