import React from 'react';
import { Heart } from 'lucide-react';

const TopBar = ({ score }) => {
  const clamped = Math.max(0, Math.min(10, score));
  const percent = (clamped / 10) * 100;

  return (
    <header className="sticky top-0 z-20 w-full bg-zinc-900/70 backdrop-blur border-b border-white/10 rounded-xl">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-4">
        <div className="flex items-center gap-2 text-pink-400">
          <Heart className="w-5 h-5" />
          <span className="font-semibold">Compatibility</span>
        </div>
        <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-pink-500 to-rose-400"
            style={{ width: `${percent}%` }}
          />
        </div>
        <span className="text-white/80 text-sm min-w-[3ch] text-right">{clamped}</span>
      </div>
    </header>
  );
};

export default TopBar;
