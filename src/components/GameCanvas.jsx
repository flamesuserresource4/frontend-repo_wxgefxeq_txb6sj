import React, { useEffect, useRef } from 'react';

// Simple canvas-based movement and proximity interaction
const GameCanvas = ({ onInteractPrompt, onNPCProximity }) => {
  const canvasRef = useRef(null);
  const stateRef = useRef({
    keys: {},
    player: { x: 80, y: 120, size: 18, speed: 2.2 },
    npcs: [
      { id: 'aaradhya', x: 240, y: 120, size: 18, color: '#f472b6' },
      { id: 'isha', x: 120, y: 220, size: 18, color: '#60a5fa' },
      { id: 'mother', x: 300, y: 220, size: 18, color: '#facc15' },
    ],
    bounds: { w: 400, h: 260 },
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const handleKeyDown = (e) => {
      stateRef.current.keys[e.key.toLowerCase()] = true;
      if (e.key.toLowerCase() === 'e') {
        const near = getNearbyNPC();
        if (near) onInteractPrompt(near.id);
      }
    };
    const handleKeyUp = (e) => {
      stateRef.current.keys[e.key.toLowerCase()] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    let raf;
    const loop = () => {
      update();
      draw();
      raf = requestAnimationFrame(loop);
    };
    loop();

    function update() {
      const s = stateRef.current;
      const { player, keys, bounds } = s;
      const speed = player.speed;
      if (keys['arrowup'] || keys['w']) player.y -= speed;
      if (keys['arrowdown'] || keys['s']) player.y += speed;
      if (keys['arrowleft'] || keys['a']) player.x -= speed;
      if (keys['arrowright'] || keys['d']) player.x += speed;

      // clamp to bounds
      player.x = Math.max(player.size, Math.min(bounds.w - player.size, player.x));
      player.y = Math.max(player.size, Math.min(bounds.h - player.size, player.y));

      const near = getNearbyNPC();
      onNPCProximity(near ? near.id : null);
    }

    function getNearbyNPC() {
      const { player, npcs } = stateRef.current;
      for (const n of npcs) {
        const dx = n.x - player.x;
        const dy = n.y - player.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 32) return n;
      }
      return null;
    }

    function draw() {
      const { player, npcs, bounds } = stateRef.current;
      ctx.clearRect(0, 0, bounds.w, bounds.h);

      // background tiles
      ctx.fillStyle = '#0b0b12';
      ctx.fillRect(0, 0, bounds.w, bounds.h);

      // simple zones for locations
      ctx.fillStyle = '#1e293b'; // temple zone
      ctx.fillRect(0, 0, bounds.w, 80);
      ctx.fillStyle = '#0f172a'; // cafe zone
      ctx.fillRect(0, 90, bounds.w, 80);
      ctx.fillStyle = '#111827'; // home zone
      ctx.fillRect(0, 180, bounds.w, 80);

      // labels
      ctx.fillStyle = 'rgba(255,255,255,0.8)';
      ctx.font = '12px Inter, system-ui, sans-serif';
      ctx.fillText('Temple', 8, 16);
      ctx.fillText('Café', 8, 106);
      ctx.fillText('Family House', 8, 196);

      // NPCs
      for (const n of npcs) {
        ctx.fillStyle = n.color;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.size / 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = 'white';
        ctx.fillText(n.id, n.x - 20, n.y - 14);
      }

      // player
      ctx.fillStyle = '#34d399';
      ctx.beginPath();
      ctx.arc(player.x, player.y, player.size / 2, 0, Math.PI * 2);
      ctx.fill();
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [onInteractPrompt, onNPCProximity]);

  return (
    <div className="w-full flex items-center justify-center">
      <canvas
        ref={canvasRef}
        width={400}
        height={260}
        className="rounded-lg border border-white/10 bg-black/40"
      />
    </div>
  );
};

export default GameCanvas;
