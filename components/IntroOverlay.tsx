'use client';

import { motion, useAnimate } from 'framer-motion';
import { useEffect, useState } from 'react';

const InkMountains = () => (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110vw] h-[100vh] pointer-events-none opacity-0 z-0 ink-mountains mix-blend-multiply">
        <svg viewBox="0 0 1000 600" className="w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
            <defs>
                <filter id="ink-texture" filterUnits="objectBoundingBox">
                    <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="6" />
                </filter>
                <linearGradient id="mountain-fade" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1a1a1a" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#1a1a1a" stopOpacity="0.1" />
                </linearGradient>
            </defs>
            
            {/* Red Sun */}
            <circle cx="200" cy="150" r="50" fill="var(--accent)" filter="url(#ink-texture)" opacity="0.9" />
            
            {/* Birds */}
            <g fill="none" stroke="#1a1a1a" strokeWidth="2" filter="url(#ink-texture)">
                <path d="M150,180 q10,-10 20,0 m-10,0 q-10,-10 -10,0" />
                <path d="M180,160 q8,-8 16,0 m-8,0 q-8,-8 -8,0" />
                <path d="M130,200 q12,-12 24,0 m-12,0 q-12,-12 -12,0" />
            </g>

            {/* Mt. Fuji Style Mountain - Removed */}
            
            {/* Sakura Branch (Right Side) */}
            <g transform="translate(700, 0) scale(0.8)">
                 <path d="M400,0 Q350,100 200,150 T50,300 M200,150 Q250,200 300,250" stroke="#1a1a1a" strokeWidth="3" fill="none" filter="url(#ink-texture)" />
                 {/* Blossoms */}
                 <circle cx="200" cy="150" r="8" fill="var(--accent)" opacity="0.8" />
                 <circle cx="50" cy="300" r="6" fill="var(--accent)" opacity="0.6" />
                 <circle cx="300" cy="250" r="7" fill="var(--accent)" opacity="0.7" />
                 <circle cx="180" cy="130" r="5" fill="var(--accent)" opacity="0.5" />
                 <circle cx="60" cy="280" r="5" fill="var(--accent)" opacity="0.8" />
                 <path d="M100,200 Q110,210 120,200" stroke="var(--accent)" strokeWidth="2" fill="none" />
            </g>
        </svg>
    </div>
);

const SplitContent = ({ text, isJapanese }: { text: string, isJapanese: boolean }) => (
    <div className="flex flex-col items-center justify-center w-full h-full relative">
        <InkMountains />
        <div className="relative z-10">
            <h1 className={`
                text-5xl md:text-8xl tracking-tight leading-none text-center select-none
                ${isJapanese 
                    ? 'font-serif font-medium text-[var(--ink-black)] tracking-widest' 
                    : 'font-sans font-bold text-black tracking-tighter'}
                intro-text transition-all duration-0
            `}>
                {text}
            </h1>
            
            {/* Hanko Seal */}
            <div className="hanko-seal absolute -right-12 md:-right-20 top-0 opacity-0 w-12 h-12 md:w-16 md:h-16 border-2 border-[var(--accent)] flex items-center justify-center rounded-sm">
                <span className="text-[var(--accent)] font-serif text-[10px] md:text-xs font-bold writing-vertical-rl select-none tracking-widest">
                    NISHIT
                </span>
            </div>
        </div>
    </div>
);

const IntroOverlay = ({ onComplete }: { onComplete: () => void }) => {
    const [scope, animate] = useAnimate();
    const [text, setText] = useState("PORTFOLIO");
    const [isJapanese, setIsJapanese] = useState(false);
    const [showOverlay, setShowOverlay] = useState(true);
    const [hasStarted, setHasStarted] = useState(false);

    useEffect(() => {
        if (!hasStarted) return;

        const sequence = async () => {
            if (!scope.current) return;

            // Initial state - locked scroll handled by parent or body class potentially, 
            // but we'll assume fixed overlay covers it.
            
            // Wait for initial suspense
            await new Promise(resolve => setTimeout(resolve, 500));

            // SLASH SEQUENCE
            const slashDuration = 0.15;
            
            if (!scope.current) return;

             // Sound Effect
            try {
                const audio = new Audio('/slice.mp3');
                audio.volume = 0.5;
                await audio.play();
            } catch (e) {
                console.error("Audio play failed", e);
            }

            // 1. The Line Animations (Slash)
            // We animate the slash line which is absolutely positioned over the split container
            await animate("#slash-line", { 
                scaleX: [0, 1.5],
                opacity: [0, 1, 0],
                x: ["-10%", "10%"] 
            }, { 
                duration: slashDuration, 
                ease: "circOut"
            });
            
            if (!scope.current) return;

            // 2. Impact & Transformation (Mid-slash)
            // Flash overlay on screen
            animate("#flash-overlay", { opacity: [0, 0.5, 0] }, { duration: 0.1 });
            
            // Burst at center
            animate("#cut-burst", { opacity: [0, 1, 0], scaleX: [0.5, 1.5] }, { duration: 0.1 });

            // Text Glitch Effect (Targeting classes or IDs inside the halves)
            animate(".intro-text", { 
                x: [0, -5, 5, -2, 2, 0], 
                filter: ["blur(0px)", "blur(4px)", "blur(0px)"]
            }, { duration: 0.2 });

            // Swap Text State
            setText("ポートフォリオ"); 
            setIsJapanese(true);
            
            // Show Seal
            try {
                const stampAudio = new Audio('/stamp.mp3');
                stampAudio.volume = 0.5;
                stampAudio.play().catch(() => {});
            } catch (e) {}
            
            // Animate both seal and mountains together
            await Promise.all([
                 animate(".hanko-seal", { opacity: 1, scale: [2, 1], rotate: [0, -10] }, { duration: 0.3, ease: "backOut" }),
                 animate(".ink-mountains", { opacity: [0, 1], scale: [0.95, 1], y: [20, 0] }, { duration: 1.5, ease: "easeOut" })
            ]);


            // 3. The Opening (Split Screen)
            // Wait a moment after the text change for the user to register it
            await new Promise(resolve => setTimeout(resolve, 1200));
            
            if (!scope.current) return;

            // Animate the halves opening
            await Promise.all([
                animate("#top-half", { y: "-100%" }, { duration: 0.8, ease: [0.76, 0, 0.24, 1] }),
                animate("#bottom-half", { y: "100%" }, { duration: 0.8, ease: [0.76, 0, 0.24, 1] }),
                animate("#content-wrapper", { opacity: 0 }, { duration: 0.3 }) // Fade out slash/flash layers just in case
            ]);

            // Cleanup
            setShowOverlay(false);
            onComplete();
        }
        sequence();
    }, [animate, onComplete, hasStarted]);

    if (!showOverlay) return null;

    return (
        <div 
            ref={scope} 
            className="fixed inset-0 z-[9999] flex flex-col cursor-pointer" 
            onClick={() => !hasStarted && setHasStarted(true)}
        >
            
            {/* Click to Start Hint - Only show if not started */}
            {!hasStarted && (
                <div className="absolute inset-0 z-[100] flex items-end justify-center pb-12 pointer-events-none animate-pulse">
                    <span className="font-sans text-sm uppercase tracking-[0.2em] opacity-40">
                        Click to Enter
                    </span>
                </div>
            )}

            {/* Shared overlays that float ON TOP of the split (The flash, the slash) */}
            <div id="content-wrapper" className="absolute inset-0 z-50 pointer-events-none flex items-center justify-center">
                 {/* Screen Flash Overlay */}
                <div id="flash-overlay" className="absolute inset-0 bg-white z-30 opacity-0 mix-blend-overlay" />
                
                {/* The Cut Line */}
                <motion.div 
                    id="slash-line"
                    className="absolute h-[2px] w-full bg-[var(--accent)] z-40 origin-left opacity-0 shadow-[0_0_15px_rgba(193,18,31,0.8)]"
                />

                {/* The Burst Impact */}
                <motion.div
                    id="cut-burst"
                    className="absolute h-[4px] w-[200px] bg-white z-50 opacity-0 mix-blend-difference"
                />
            </div>

            {/* TOP HALF */}
            <motion.div 
                id="top-half" 
                className="relative w-full h-[50dvh] bg-white overflow-hidden border-b border-transparent will-change-transform"
            >
                {/* Texture */}
                <div className="absolute inset-0 opacity-60 mix-blend-multiply pointer-events-none"
                     style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E")` }}
                />
                
                {/* Content Container - Aligned to bottom of this half (which is screen center) */}
                <div className="absolute w-full h-[100dvh] flex items-center justify-center bottom-0 translate-y-[50%]">
                     <SplitContent text={text} isJapanese={isJapanese} />
                </div>
            </motion.div>

            {/* BOTTOM HALF */}
            <motion.div 
                id="bottom-half" 
                className="relative w-full h-[50dvh] bg-white overflow-hidden border-t border-transparent will-change-transform"
            >
                {/* Texture */}
                 <div className="absolute inset-0 opacity-60 mix-blend-multiply pointer-events-none"
                     style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E")` }}
                />

                {/* Content Container - Aligned to top of this half (which is screen center) */}
                <div className="absolute w-full h-[100dvh] flex items-center justify-center top-0 -translate-y-[50%]">
                    <SplitContent text={text} isJapanese={isJapanese} />
                </div>
            </motion.div>

            <style jsx global>{`
                .writing-vertical-rl {
                    writing-mode: vertical-rl;
                    text-orientation: upright;
                }
            `}</style>
        </div>
    );
};

export default IntroOverlay;