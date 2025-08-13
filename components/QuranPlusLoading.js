// components/QuranPlusLoading.js
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { CSSPlugin } from "gsap/CSSPlugin";

gsap.registerPlugin(CSSPlugin);

const QuranPlusLoading = () => {
  const arcRef = useRef(null);
  const glowRef = useRef(null);
  const coreRef = useRef(null);
  const shapesRef = useRef([]);
  const textRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !arcRef.current || !glowRef.current || !coreRef.current || !textRef.current) {
      return;
    }

    const masterTimeline = gsap.timeline();

    // Background animation
    masterTimeline.to(containerRef.current, {
      backgroundPosition: "200% 0",
      duration: 20,
      ease: "linear",
      repeat: -1,
    }, 0);

    // Core pulse animation
    masterTimeline.to(coreRef.current, {
      scale: 1.15,
      opacity: 0.8,
      duration: 1.5,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
      boxShadow: "0 0 20px 5px rgba(255, 215, 0, 0.9)",
    }, 0);

    // Circle fill and shadow animation
    const arcLength = arcRef.current.getTotalLength();
    gsap.set(arcRef.current, {
      strokeDasharray: arcLength,
      strokeDashoffset: arcLength,
      filter: "none",
    });

    gsap.set(glowRef.current, { opacity: 0, filter: "blur(0px)" });

    masterTimeline.to(arcRef.current, {
      strokeDashoffset: 0,
      duration: 5,
      ease: "power2.inOut",
      onUpdate: () => {
        if (arcRef.current) {
          const progress = 1 - parseFloat(arcRef.current.style.strokeDashoffset) / arcLength;
          arcRef.current.style.filter = `drop-shadow(0 0 ${progress * 10}px rgba(255,215,0,0.8))`;
        }
      },
    }, 0);

    masterTimeline.to(glowRef.current, {
      opacity: 0.7,
      filter: "blur(12px)",
      duration: 1.5,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1,
    }, 0);

    // Floating shapes (stars) animation
    shapesRef.current.forEach((shape, i) => {
      const tl = gsap.timeline({ repeat: -1, delay: gsap.utils.random(0, 5) });
      const size = gsap.utils.random(2, 6);
      const startX = gsap.utils.random(0, window.innerWidth);
      const startY = gsap.utils.random(0, window.innerHeight);

      tl.set(shape, {
          x: startX,
          y: startY,
          opacity: 0,
          scale: 0,
        })
        .to(shape, {
          opacity: gsap.utils.random(0.4, 1),
          scale: gsap.utils.random(0.8, 1.2),
          duration: gsap.utils.random(1, 2),
          ease: "power2.inOut",
        })
        .to(shape, {
          x: gsap.utils.random(-200, 200),
          y: gsap.utils.random(-200, 200),
          duration: gsap.utils.random(8, 15),
          ease: "sine.inOut",
        })
        .to(shape, {
          opacity: 0,
          scale: 0,
          duration: gsap.utils.random(1, 2),
          ease: "power2.inOut",
        }, "+=1");
    });

    // Text typing animation
    const texts = ["Illuminating your path with wisdom...", "تنویر طریقک بالحکمة..."];
    let textIndex = 0;
    
    const animateText = () => {
        if (!textRef.current) return;
        const currentText = texts[textIndex];
        textRef.current.innerHTML = "";
        gsap.to(textRef.current, { opacity: 1, duration: 0.5 });
        
        currentText.split("").forEach((letter, i) => {
            const span = document.createElement("span");
            span.textContent = letter;
            textRef.current.appendChild(span);
            gsap.fromTo(span, { opacity: 0, y: 10 }, {
                opacity: 1,
                y: 0,
                duration: 0.1,
                delay: i * 0.05,
                ease: "back.out(1.7)",
                onComplete: () => {
                    if (i === currentText.length - 1) {
                        gsap.delayedCall(2, () => {
                            gsap.to(textRef.current, {
                                opacity: 0,
                                duration: 0.5,
                                onComplete: () => {
                                    textIndex = (textIndex + 1) % texts.length;
                                    animateText();
                                },
                            });
                        });
                    }
                },
            });
        });
    };
    animateText();
    
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 flex flex-col items-center justify-center text-white overflow-hidden 
                 bg-gradient-to-br from-teal-900 to-green-950 bg-[200%_200%] 
                 shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]"
    >
      {/* Floating shapes (stars) */}
      {[...Array(40)].map((_, i) => (
        <div
          key={i}
          ref={(el) => (shapesRef.current[i] = el)}
          className="absolute rounded-full"
          style={{
            background: `rgba(255, 215, 0, ${gsap.utils.random(0.5, 1)})`,
            boxShadow: `0 0 ${gsap.utils.random(4, 10)}px gold`,
            width: `${gsap.utils.random(2, 6)}px`,
            height: `${gsap.utils.random(2, 6)}px`,
            top: `${gsap.utils.random(10, 90)}%`,
            left: `${gsap.utils.random(10, 90)}%`,
            zIndex: 1,
          }}
        />
      ))}

      {/* Main SVG content */}
      <div className="relative z-20 flex items-center justify-center flex-shrink-0">
        <svg width="450" height="450" viewBox="0 0 450 450">
          {/* Golden glow */}
          <circle
            ref={glowRef}
            cx="225" cy="225" r="150"
            fill="none"
            stroke="gold"
            strokeWidth="20"
            opacity="0.5"
            style={{ filter: "blur(12px)" }}
          />
          {/* Background circle */}
          <circle
            cx="225" cy="225" r="150"
            stroke="rgba(255,215,0,0.2)"
            strokeWidth="6"
            fill="none"
          />
          {/* Main arc */}
          <circle
            ref={arcRef}
            cx="225" cy="225" r="150"
            stroke="gold"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
            transform="rotate(-90 225 225)"
          />
          {/* Core */}
          <circle
            cx="225" cy="225" r="35"
            fill="gold"
            ref={coreRef}
            style={{ filter: "drop-shadow(0 0 15px rgba(255,215,0,0.9))" }}
          />
        </svg>
      </div>

      {/* Text container */}
      <div className="mt-6 text-center h-12 flex items-center justify-center z-20">
        <div 
          ref={textRef} 
          className="text-2xl font-light text-yellow-400"
          style={{ textShadow: '0 0 10px rgba(255,255,0,0.6)' }}
        ></div>
      </div>

      {/* Bottom logo */}
      <div className="absolute bottom-12 flex items-center gap-4 z-30">
        <div className="w-14 h-14 bg-gradient-to-br from-yellow-300 to-amber-500 rounded-full flex items-center justify-center text-black font-extrabold text-3xl shadow-xl">
          ق
        </div>
        <div className="flex flex-col">
          <strong className="text-2xl font-extrabold text-white">QuranPlus</strong>
          <span className="text-sm block text-yellow-300 tracking-wide font-light">
            Your AI-Powered Spiritual Companion
          </span>
        </div>
      </div>
    </div>
  );
};

export default QuranPlusLoading;