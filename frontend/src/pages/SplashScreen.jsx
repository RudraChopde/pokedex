import { useEffect, useState, useRef } from "react";

const ROTOM_IMAGE = "/ROTOM1.png";
const ROTOM_CRY = "https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/479.ogg";
const BOOT_SOUND = "/GBL.mp3";
const DIALOGUE = "Zzt! Rotom Dex... powering up-zzzt! All systems go! Tap me to begin~!";

export default function SplashScreen({ onEnter }) {
  const [phase, setPhase] = useState("black");
  // phases: black → flicker → rotom → typing → idle → exit
  const [typedText, setTypedText] = useState("");
  const [showClick, setShowClick] = useState(false);
  const audioRef = useRef(null);
  const exitingRef = useRef(false);
  const audioCtxRef = useRef(null);
  const unlockedRef = useRef(false);

  const getAudioCtx = () => {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioCtxRef.current;
    };

  const playZzt = () => {
      if (exitingRef.current) return 
      try {
        const ctx = getAudioCtx();
        const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.04, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < data.length; i++) {
        data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
            }
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        const gain = ctx.createGain();
        gain.gain.value = 0.08;
        source.connect(gain);
        gain.connect(ctx.destination);
        source.start();
        } catch (e) {}

    };

    const unlockAudio = () => {
        if (unlockedRef.current) return;
        unlockedRef.current = true;
        const ctx = getAudioCtx();
        ctx.resume();
    };
    // Sequence for the Phases
    useEffect(() => {
        // Phase 1: black screen for a moment
        const t1 = setTimeout(() => setPhase("flicker"), 800);
        return () => clearTimeout(t1);
    }, []);
    
    useEffect(() => {
        if (phase === "flicker") {
        // Phase 2: little flicker then show rotom
        const t = setTimeout(() => setPhase("rotom"), 1500);
        return () => clearTimeout(t);
        }

        if (phase === "rotom") {
        // Rotom cry being played
        unlockAudio();
        audioRef.current = new Audio(ROTOM_CRY);
        audioRef.current.volume = 0.3;
        audioRef.current.play().catch(() => {});

        // Phase 3: Typewrite Dialogue Incoming after rotom fades in
        const t = setTimeout(() => setPhase("typing"), 1200);
        return () => clearTimeout(t);
        }

        if (phase === "typing") {
        let i = 0;
        const interval = setInterval(() => {
            i++;
            if (i > DIALOGUE.length) {
            clearInterval(interval);
            setPhase("idle");
            return;
            }
            setTypedText(DIALOGUE.slice(0, i));
            playZzt();
        }, 35);
        return () => clearInterval(interval);
        }

        if (phase === "idle") {
        const t = setTimeout(() => setShowClick(true), 400);
          return () => clearTimeout(t);
        }
    }, [phase]);

    const handleClick = () => {
        if (phase !== "idle") return;

        exitingRef.current=true;
        // Play GBL
        const sound = new Audio(BOOT_SOUND);
        sound.volume = 0.1;
        sound.play().catch(() => {});

        setPhase("exit");
        setTimeout(() => {
            audioCtxRef.current?.close();
            onEnter();
        }, 1200);
    };

    return (
        <div
        onClick={handleClick} onMouseMove={unlockAudio} onTouchStart={unlockAudio}
        className={`fixed inset-0 flex flex-col items-center justify-center cursor-pointer transition-opacity duration-700
            ${phase === "exit" ? "opacity-0" : "opacity-100"}
            ${phase === "black" ? "bg-black" : "bg-[#0a0a0f]"}
        `}
        >
        {/* SCANLINES OVERLAY */}
        <div className="pointer-events-none fixed inset-0 z-10"
            style={{
            background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)"
            }}
        />

        {/* FLICKER EFFECT */}
        {phase === "flicker" && (
            <div className="fixed inset-0 z-20 animate-pulse bg-white/5" />
          )}

        {/* ROTOM IMAGE */}
        {(phase === "rotom" || phase === "typing" || phase === "idle" || phase === "exit") && (
            <div className={`flex flex-col items-center gap-8 z-30 transition-all duration-1000
              ${phase === "rotom" ? "opacity-0 scale-95" : "opacity-100 scale-100"}
            `}>

            {/* GLOW + IMAGE */}
            <div className={`relative ${phase === "idle" ? "animate-pulse" : ""}`}>
                <div className="absolute inset-0 rounded-full bg-yellow-400/20 blur-3xl scale-150" />
                <img
                src={ROTOM_IMAGE}
                alt="Rotom Dex"
                className="w-48 h-48 lg:w-64 lg:h-64 object-contain relative z-10 drop-shadow-[0_0_30px_rgba(250,204,21,0.4)]"
                />
            </div>

            {/* DIALOGUE */}
            <div className="max-w-md text-center px-6">
                <p className="text-yellow-300 text-lg lg:text-xl font-medium tracking-wide">
                {typedText}
                {phase === "typing" && (
                    <span className="animate-pulse text-white ml-1">|</span>
                )}
            </p>
            </div>

            {/* TAP HINT */}
            {showClick && (
                <p className="text-white/30 text-sm tracking-widest animate-pulse">
                — Tap anywhere to Move Ahead —
                </p>
            )}
    
        </div>
      )}
    </div>
  );
}