'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function LoadingAnimation({ onComplete }) {
  const loaderRef = useRef(null);
  const lightRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete();
      },
    });

    tl.fromTo(
      lightRef.current,
      { x: '-100%', opacity: 0 },
      { x: '100%', opacity: 1, duration: 2, ease: 'power2.inOut' }
    )
      .fromTo(
        textRef.current,
        { scale: 0, opacity: 0, rotation: -180 },
        { scale: 1, opacity: 1, rotation: 0, duration: 1.5, ease: 'elastic.out(1, 0.5)' },
        '-=1'
      )
      .to(loaderRef.current, { opacity: 0, duration: 0.8, ease: 'power2.inOut' }, '+=0.5')
      .to(loaderRef.current, { display: 'none' });

    return () => tl.kill();
  }, [onComplete]);

  return (
    <div ref={loaderRef} className="loader-overlay">
      <div className="relative">
        <div
          ref={lightRef}
          className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-50 blur-3xl"
        />
        <div ref={textRef} className="relative z-10 text-center">
          <div className="text-6xl sm:text-7xl md:text-8xl mb-4">ॐ</div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold gold-text text-shadow-gold sanskrit">
            श्रीमद्भगवद्गीता
          </h1>
          <p className="text-[#f4e4b7] mt-4 text-lg">Loading Sacred Wisdom...</p>
        </div>
      </div>
    </div>
  );
}
