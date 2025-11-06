import React from 'react';

const getEndingText = (score) => {
  if (score >= 5) return 'Eshaan finds the perfect simple girl ❤️';
  if (score >= 2) return 'Almost there… but she wanted more simplicity 😅';
  return 'Eshaan now meditates alone with WiFi blessings 💻🕉️';
};

const EndingModal = ({ visible, score, onRestart }) => {
  if (!visible) return null;
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70" />
      <div className="relative w-full max-w-md bg-zinc-900 border border-white/10 rounded-xl p-6 text-white text-center">
        <h3 className="text-2xl font-bold mb-2">Your Ending</h3>
        <p className="text-white/90 mb-4">{getEndingText(score)}</p>
        <button
          className="px-4 py-2 rounded-md bg-pink-500 hover:bg-pink-600 transition font-medium"
          onClick={onRestart}
        >
          Play Again
        </button>
      </div>
    </div>
  );
};

export default EndingModal;
