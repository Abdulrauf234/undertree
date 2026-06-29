'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, Volume2, VolumeX, Flame, Zap } from 'lucide-react';

interface AkaraBall {
  id: number;
  x: number;
  y: number;
  status: 'raw' | 'frying' | 'done';
  fryTime: number; // seconds spent frying
}

interface PopcornParticle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  scale: number;
  popped: boolean;
}

export default function Playground() {
  const [activeTab, setActiveTab] = useState<'akara' | 'maize' | 'popcorn'>('akara');
  const [soundEnabled, setSoundEnabled] = useState(false);

  // sound player (mock synth beep or audio noise if active)
  const playSound = (freq = 200, duration = 0.1) => {
    if (!soundEnabled) return;
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      // Audio context error or not supported
    }
  };

  // --- AKARA STATE ---
  const [akaras, setAkaras] = useState<AkaraBall[]>([]);
  const [isStirring, setIsStirring] = useState(false);

  const dropAkara = () => {
    const newBall: AkaraBall = {
      id: Date.now(),
      x: 20 + Math.random() * 60, // percentage
      y: 0,
      status: 'raw',
      fryTime: 0,
    };
    setAkaras((prev) => [...prev, newBall]);
    playSound(120, 0.2); // Low drop splash sound
  };

  const stirPot = () => {
    setIsStirring(true);
    playSound(180, 0.4);
    setTimeout(() => setIsStirring(false), 800);
    // speed up frying of frying ones
    setAkaras((prev) =>
      prev.map((a) =>
        a.status === 'frying'
          ? { ...a, fryTime: Math.min(a.fryTime + 1.5, 4) }
          : a
      )
    );
  };

  useEffect(() => {
    if (akaras.length === 0) return;
    const interval = setInterval(() => {
      setAkaras((prev) =>
        prev.map((a) => {
          if (a.status === 'raw') {
            return { ...a, status: 'frying', y: 65 }; // drop into oil
          }
          if (a.status === 'frying') {
            const nextTime = a.fryTime + 0.25;
            const nextStatus = nextTime >= 4 ? 'done' : 'frying';
            if (nextStatus === 'done' && a.status !== 'done') {
              playSound(440, 0.15); // Golden crisp ping!
            }
            return {
              ...a,
              fryTime: nextTime,
              status: nextStatus,
              // slightly bubble floating around
              x: a.x + (Math.random() * 2 - 1),
            };
          }
          return a;
        })
      );
    }, 250);

    return () => clearInterval(interval);
  }, [akaras, soundEnabled]);

  const resetAkara = () => {
    setAkaras([]);
  };

  // --- MAIZE STATE ---
  const [maizeRotation, setMaizeRotation] = useState(0);
  const [charcoalHeat, setCharcoalHeat] = useState(50); // 0 to 100

  // --- POPCORN STATE ---
  const [heatLevel, setHeatLevel] = useState(30); // 0 to 100
  const [popcorns, setPopcorns] = useState<PopcornParticle[]>([]);

  useEffect(() => {
    if (activeTab !== 'popcorn' || heatLevel < 40) return;
    const spawnTimer = setInterval(() => {
      // Spawn kernel
      const newKernel: PopcornParticle = {
        id: Math.random(),
        x: 50 + (Math.random() * 30 - 15),
        y: 85,
        vx: (Math.random() * 10 - 5),
        vy: -(Math.random() * 15 + (heatLevel / 4)),
        scale: 0.6,
        popped: false,
      };
      setPopcorns((prev) => [...prev, newKernel]);
    }, Math.max(100, 1000 - heatLevel * 8));

    return () => clearInterval(spawnTimer);
  }, [activeTab, heatLevel]);

  // Popcorn physics loop
  useEffect(() => {
    if (popcorns.length === 0) return;
    const frame = requestAnimationFrame(() => {
      setPopcorns((prev) =>
        prev
          .map((p) => {
            // gravity
            const nextVy = p.vy + 0.6;
            const nextY = p.y + nextVy;
            const nextX = p.x + p.vx;

            // Trigger Pop at peak height (when vy is near 0 or ascending)
            let isPopped = p.popped;
            let currentScale = p.scale;
            if (!isPopped && nextVy > -2) {
              isPopped = true;
              currentScale = 1.2 + Math.random() * 0.4;
              playSound(600 + Math.random() * 200, 0.05); // popcorn pop sound
            }

            return {
              ...p,
              x: nextX,
              y: nextY,
              vy: nextVy,
              scale: currentScale,
              popped: isPopped,
            };
          })
          // filter out popped items that fall out of bounds
          .filter((p) => p.y < 110)
      );
    });
    return () => cancelAnimationFrame(frame);
  }, [popcorns, soundEnabled]);

  return (
    <section id="playground" className="py-20 relative px-4 md:px-8">
      <div className="absolute bottom-0 right-0 w-[500px] h-[300px] bg-[#A7C957]/5 blur-[120px] pointer-events-none" />

      <div className="w-[92%] max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <h2 className="text-[#D8BE7A] font-medium tracking-wider text-sm uppercase">Preparation Hub</h2>
            <h3 className="text-3xl md:text-4xl font-playfair font-bold text-[#F7F4EB]">
              Cooking Playground
            </h3>
            <p className="text-sm text-[#F7F4EB]/70 max-w-md">
              Interact with our virtual street food cooker models. Simulating oil temperature, charcoal glows, and popping rates!
            </p>
          </div>

          {/* Sound control */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full glass-panel border border-[#D8BE7A]/30 text-[#D8BE7A] text-sm font-semibold hover:bg-white/5 transition-all"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            {soundEnabled ? 'Mute Cooking Sounds' : 'Unmute Cooking Sounds'}
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-white/10">
          <button
            onClick={() => setActiveTab('akara')}
            className={`py-4 px-8 font-playfair font-bold text-lg relative ${
              activeTab === 'akara' ? 'text-[#D8BE7A]' : 'text-[#F7F4EB]/60 hover:text-[#F7F4EB]'
            }`}
          >
            🥣 Akara Fryer
            {activeTab === 'akara' && (
              <motion.div layoutId="playTab" className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D8BE7A]" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('maize')}
            className={`py-4 px-8 font-playfair font-bold text-lg relative ${
              activeTab === 'maize' ? 'text-[#D8BE7A]' : 'text-[#F7F4EB]/60 hover:text-[#F7F4EB]'
            }`}
          >
            🌽 Roasted Maize
            {activeTab === 'maize' && (
              <motion.div layoutId="playTab" className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D8BE7A]" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('popcorn')}
            className={`py-4 px-8 font-playfair font-bold text-lg relative ${
              activeTab === 'popcorn' ? 'text-[#D8BE7A]' : 'text-[#F7F4EB]/60 hover:text-[#F7F4EB]'
            }`}
          >
            🍿 Popcorn Machine
            {activeTab === 'popcorn' && (
              <motion.div layoutId="playTab" className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D8BE7A]" />
            )}
          </button>
        </div>

        {/* Simulator Content Area */}
        <div className="glass-panel rounded-3xl border border-white/5 p-6 md:p-10 min-h-[450px] relative overflow-hidden shadow-2xl flex flex-col lg:flex-row gap-8 items-center justify-between">
          
          {/* Simulation Visual Window */}
          <div className="w-full lg:w-3/5 h-80 rounded-2xl relative overflow-hidden border border-white/10 bg-gradient-to-b from-[#0D1F14] to-black/80 flex items-center justify-center">
            
            {/* AKARA SIMULATOR */}
            {activeTab === 'akara' && (
              <div className="absolute inset-0">
                {/* Hot oil area styling */}
                <div className="absolute bottom-0 left-0 right-0 h-40 bg-yellow-600/25 border-t-2 border-yellow-500/50 flex items-end justify-center overflow-hidden">
                  
                  {/* Bubbling oil particles */}
                  <div className="absolute inset-0 flex justify-around pointer-events-none opacity-30">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-300 animate-bubble" style={{ animationDelay: '0.1s', left: '10%' }} />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-300 animate-bubble" style={{ animationDelay: '0.7s', left: '30%' }} />
                    <span className="w-1 h-1 rounded-full bg-yellow-300 animate-bubble" style={{ animationDelay: '0.4s', left: '50%' }} />
                    <span className="w-2 h-2 rounded-full bg-yellow-300 animate-bubble" style={{ animationDelay: '1.2s', left: '75%' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-300 animate-bubble" style={{ animationDelay: '0.9s', left: '90%' }} />
                  </div>

                  {/* Frying Akara Balls */}
                  {akaras.map((a) => {
                    let color = 'bg-[#D8BE7A]/90'; // raw/dropping
                    if (a.status === 'frying') {
                      // Interpolate between pale golden and rich bronze brown
                      if (a.fryTime > 3) color = 'bg-[#8FA93D] shadow-[#8FA93D]/30';
                      else if (a.fryTime > 1.5) color = 'bg-yellow-700 shadow-yellow-600/30';
                      else color = 'bg-yellow-600 shadow-yellow-500/30';
                    } else if (a.status === 'done') {
                      color = 'bg-[#8FA93D] ring-2 ring-[#D8BE7A] shadow-[#D8BE7A]/40';
                    }

                    return (
                      <motion.div
                        key={a.id}
                        layoutId={`akara-${a.id}`}
                        className={`absolute w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold select-none cursor-default shadow-lg transition-colors duration-500 ${color}`}
                        style={{
                          left: `${a.x}%`,
                          bottom: a.status === 'raw' ? '120px' : '30px',
                        }}
                        animate={{
                          y: a.status === 'raw' ? 0 : [0, -4, 0],
                        }}
                        transition={{
                          y: { repeat: Infinity, duration: 1.5, ease: 'easeInOut' },
                        }}
                      >
                        🥣
                      </motion.div>
                    );
                  })}
                </div>

                {/* Steam particles above fryer */}
                <div className="absolute top-16 left-1/2 -translate-x-1/2 flex gap-3 opacity-30">
                  <span className="w-2 h-14 bg-gradient-to-t from-transparent to-[#F7F4EB] rounded-full animate-steam" style={{ animationDelay: '0.2s' }} />
                  <span className="w-2.5 h-16 bg-gradient-to-t from-transparent to-[#F7F4EB] rounded-full animate-steam" style={{ animationDelay: '0.8s' }} />
                  <span className="w-1.5 h-10 bg-gradient-to-t from-transparent to-[#F7F4EB] rounded-full animate-steam" style={{ animationDelay: '1.4s' }} />
                </div>

                {/* Wooden spoon stirring visual */}
                {isStirring && (
                  <motion.div
                    initial={{ x: -100, y: 50, rotate: -20 }}
                    animate={{ x: 150, y: [60, 90, 60], rotate: [0, 45, 0] }}
                    transition={{ duration: 0.8 }}
                    className="absolute z-20 text-4xl"
                  >
                    🥄
                  </motion.div>
                )}
              </div>
            )}

            {/* MAIZE ROASTER */}
            {activeTab === 'maize' && (
              <div className="absolute inset-0 flex flex-col justify-between p-6">
                <div className="flex-grow flex items-center justify-center">
                  {/* Rotating Maize */}
                  <motion.div
                    style={{ rotate: maizeRotation }}
                    className="text-7xl cursor-pointer select-none filter drop-shadow-[0_0_15px_rgba(216,190,122,0.3)]"
                    onClick={() => {
                      setMaizeRotation((prev) => prev + 90);
                      playSound(300, 0.1);
                    }}
                  >
                    🌽
                  </motion.div>
                </div>

                {/* Roaster Grill & Glowing Charcoals */}
                <div className="h-16 w-full relative rounded-xl bg-neutral-900 border border-white/10 flex items-center justify-around overflow-hidden">
                  {/* Fire Glow Effect */}
                  <div
                    className="absolute inset-0 bg-red-600 transition-opacity duration-500 animate-ember pointer-events-none"
                    style={{ opacity: charcoalHeat / 100 }}
                  />

                  {/* Hot glowing charcoal pieces */}
                  <div className="flex gap-2 z-10">
                    <span className="w-6 h-6 rounded-full bg-red-800 animate-pulse" />
                    <span className="w-8 h-6 rounded-md bg-yellow-700 animate-pulse" style={{ animationDelay: '0.5s' }} />
                    <span className="w-6 h-6 rounded-full bg-red-950" />
                    <span className="w-9 h-7 rounded-sm bg-red-800 animate-pulse" style={{ animationDelay: '1s' }} />
                  </div>

                  {/* Spark particles rising */}
                  {charcoalHeat > 50 && (
                    <div className="absolute inset-0 flex justify-around pointer-events-none">
                      <span className="w-1 h-1 rounded-full bg-orange-400 animate-bubble" style={{ animationDelay: '0.2s', left: '20%' }} />
                      <span className="w-1 h-1 rounded-full bg-yellow-400 animate-bubble" style={{ animationDelay: '0.8s', left: '45%' }} />
                      <span className="w-1 h-1 rounded-full bg-orange-500 animate-bubble" style={{ animationDelay: '0.5s', left: '70%' }} />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* POPCORN MACHINE */}
            {activeTab === 'popcorn' && (
              <div className="absolute inset-0 overflow-hidden flex flex-col justify-end">
                {/* Machine Heat Indicator */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1 rounded-md glass-panel text-xs text-[#D8BE7A]">
                  <Zap className={`w-3.5 h-3.5 ${heatLevel > 60 ? 'text-red-500 fill-red-500 animate-bounce' : ''}`} />
                  Heat: {heatLevel}%
                </div>

                {/* Flying Popcorn Particles */}
                {popcorns.map((p) => (
                  <div
                    key={p.id}
                    className="absolute text-xl pointer-events-none select-none"
                    style={{
                      left: `${p.x}%`,
                      top: `${p.y}%`,
                      transform: `translate(-50%, -50%) scale(${p.scale})`,
                    }}
                  >
                    {p.popped ? '🍿' : '🟡'}
                  </div>
                ))}

                {/* Hot Pot at base */}
                <div className="h-10 w-32 mx-auto bg-neutral-800 border-t border-neutral-700 rounded-t-lg relative flex items-center justify-center">
                  <div className={`absolute -top-3 w-8 h-8 rounded-full bg-yellow-500/10 filter blur-sm ${heatLevel > 50 ? 'animate-ping' : ''}`} />
                  <span className="text-xs text-neutral-500 uppercase tracking-widest font-bold">Heater</span>
                </div>
              </div>
            )}

          </div>

          {/* Simulation Control Dashboard */}
          <div className="w-full lg:w-1/3 flex flex-col gap-6">
            <h4 className="text-xl font-bold font-playfair text-[#D8BE7A]">Controls</h4>
            
            {activeTab === 'akara' && (
              <div className="space-y-4">
                <p className="text-sm text-[#F7F4EB]/70">
                  Drop raw bean paste balls into the fryer oil, wait for them to sizzle, turn golden-brown, and rise to the surface.
                </p>
                <div className="flex flex-col gap-3">
                  <button
                    onClick={dropAkara}
                    className="w-full py-3.5 font-bold rounded-xl bg-[#8FA93D] text-[#0D1F14] hover:bg-[#A7C957] active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    Drop Akara Ball
                  </button>
                  <button
                    onClick={stirPot}
                    className="w-full py-3.5 font-semibold rounded-xl glass-panel text-[#F7F4EB] border border-white/10 hover:bg-white/5 active:scale-95 transition-all"
                  >
                    🥄 Stir Pot
                  </button>
                  <button
                    onClick={resetAkara}
                    className="w-full py-2.5 text-xs text-[#F7F4EB]/60 hover:text-[#F7F4EB] transition-colors flex items-center justify-center gap-1"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Reset Fryer
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'maize' && (
              <div className="space-y-6">
                <p className="text-sm text-[#F7F4EB]/70">
                  Adjust the heat level of the charcoal bed below. Spin the maize cob manually to ensure an even, roasted glow.
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-[#F7F4EB]/70">
                    <span>Charcoal Heat Intensity</span>
                    <span className="text-[#D8BE7A] font-bold">{charcoalHeat}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={charcoalHeat}
                    onChange={(e) => setCharcoalHeat(Number(e.target.value))}
                    className="w-full accent-[#8FA93D] cursor-pointer"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => {
                      setMaizeRotation((prev) => prev + 45);
                      playSound(300, 0.1);
                    }}
                    className="w-full py-3.5 font-bold rounded-xl bg-[#8FA93D] text-[#0D1F14] hover:bg-[#A7C957] transition-all"
                  >
                    Rotate Maize 45°
                  </button>
                  <button
                    onClick={() => {
                      setMaizeRotation(0);
                      setCharcoalHeat(50);
                    }}
                    className="w-full py-2.5 text-xs text-[#F7F4EB]/60 hover:text-[#F7F4EB] transition-colors flex items-center justify-center gap-1"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Reset Settings
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'popcorn' && (
              <div className="space-y-6">
                <p className="text-sm text-[#F7F4EB]/70">
                  Increase the heater intensity to heat up the popcorn kernels. Exceed 40% heat to start the popping frenzy!
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-[#F7F4EB]/70">
                    <span>Heater Intensity</span>
                    <span className="text-[#D8BE7A] font-bold">{heatLevel}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={heatLevel}
                    onChange={(e) => setHeatLevel(Number(e.target.value))}
                    className="w-full accent-[#8FA93D] cursor-pointer"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => {
                      setPopcorns([]);
                      setHeatLevel(30);
                    }}
                    className="w-full py-2.5 text-xs text-[#F7F4EB]/60 hover:text-[#F7F4EB] transition-colors flex items-center justify-center gap-1"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Clear Machine
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
