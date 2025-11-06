import React from 'react';
import Spline from '@splinetool/react-spline';

const HeroCover = () => {
  return (
    <section className="relative w-full h-[60vh] overflow-hidden rounded-xl shadow-lg">
      <Spline
        scene="https://prod.spline.design/atN3lqky4IzF-KEP/scene.splinecode"
        style={{ width: '100%', height: '100%' }}
      />
      {/* Soft gradient overlay for legibility; won't block interactions */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-6 flex flex-col items-center gap-3 text-center px-4">
        <h1 className="text-3xl md:text-5xl font-bold text-white drop-shadow-md">
          Eshaan: Quest for the Simple Brahman Girl
        </h1>
        <p className="text-white/90 max-w-2xl">
          Explore cozy locations, meet memorable characters, and make choices that shape your story.
        </p>
      </div>
    </section>
  );
};

export default HeroCover;
