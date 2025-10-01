'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from '@/components/Navigation';
import LoadingAnimation from '@/components/LoadingAnimation';
import { Sparkles, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const events = [
  {
    id: 1,
    title: 'The Dice Game',
    sanskrit: 'द्यूतक्रीडा',
    position: { top: '20%', left: '15%' },
    shlok: 'अक्षैर्मां देवयन्ति सम गुणकालज्ञा धर्मविदः',
    meaning: 'The righteous ones who know dharma play dice in proper time and measure',
  },
  {
    id: 2,
    title: "Draupadi's Humiliation",
    sanskrit: 'द्रौपदी वस्त्रहरण',
    position: { top: '40%', left: '70%' },
    shlok: 'धर्मो रक्षति रक्षितः',
    meaning: 'Dharma protects those who protect dharma',
  },
  {
    id: 3,
    title: "Arjuna's Dilemma",
    sanskrit: 'अर्जुन विषाद योग',
    position: { top: '60%', left: '25%' },
    shlok: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन',
    meaning: 'You have the right to perform your duty, but not to the fruits of action',
  },
  {
    id: 4,
    title: 'Krishna Reveals Vishvarupa',
    sanskrit: 'विश्वरूप दर्शन',
    position: { top: '70%', left: '80%' },
    shlok: 'कालोऽस्मि लोकक्षयकृत्प्रवृद्धो',
    meaning: 'I am time, the great destroyer of worlds, engaged in destroying all beings',
  },
  {
    id: 5,
    title: 'The Final Battle',
    sanskrit: 'महाभारत युद्ध',
    position: { top: '85%', left: '50%' },
    shlok: 'यदा यदा हि धर्मस्य ग्लानिर्भवति भारत',
    meaning: 'Whenever there is a decline of dharma, O Bharata, I manifest myself',
  },
];

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const heroRef = useRef(null);
  const parallaxRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const hotspotsRef = useRef([]);

  useEffect(() => {
    if (!loading) {
      const tl = gsap.timeline();

      gsap.fromTo(
        parallaxRef.current,
        { scale: 1.2 },
        {
          scale: 1,
          duration: 2,
          ease: 'power2.out',
        }
      );

      const words = titleRef.current.querySelectorAll('.word');
      tl.fromTo(
        words,
        { opacity: 0, y: 50, rotationX: -90 },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'back.out(1.7)',
        }
      ).fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
        '-=0.3'
      );

      hotspotsRef.current.forEach((hotspot, index) => {
        if (hotspot) {
          gsap.fromTo(
            hotspot,
            { scale: 0, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.6,
              delay: 1.5 + index * 0.2,
              ease: 'back.out(1.7)',
            }
          );

          gsap.to(hotspot, {
            y: '+=15',
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: index * 0.3,
          });
        }
      });

      const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5) * 20;
        const yPos = (clientY / window.innerHeight - 0.5) * 20;

        gsap.to(parallaxRef.current, {
          x: xPos,
          y: yPos,
          duration: 1,
          ease: 'power2.out',
        });
      };

      window.addEventListener('mousemove', handleMouseMove);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        tl.kill();
      };
    }
  }, [loading]);

  const handleHotspotClick = (event) => {
    setSelectedEvent(event);
    gsap.fromTo(
      '.event-modal',
      { scale: 0, rotation: -180 },
      { scale: 1, rotation: 0, duration: 0.5, ease: 'back.out(1.7)' }
    );
  };

  const closeModal = () => {
    gsap.to('.event-modal', {
      scale: 0,
      rotation: 180,
      duration: 0.3,
      ease: 'back.in(1.7)',
      onComplete: () => setSelectedEvent(null),
    });
  };

  if (loading) {
    return <LoadingAnimation onComplete={() => setLoading(false)} />;
  }

  return (
    <>
      <Navigation />
      <main className="relative min-h-screen overflow-hidden">
        <div
          ref={parallaxRef}
          className="absolute inset-0 parallax-bg"
          style={{
            backgroundImage:
              'url(https://images.pexels.com/photos/247599/pexels-photo-247599.jpeg?auto=compress&cs=tinysrgb&w=1920)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.4)',
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1929]/80 via-[#0a1929]/60 to-[#0a1929]/90" />

        <div ref={heroRef} className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
          <div ref={titleRef} className="text-center mb-8">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 sanskrit text-shadow-gold">
              <span className="word inline-block gold-text">श्रीमद्</span>{' '}
              <span className="word inline-block gold-text">भगवद्</span>{' '}
              <span className="word inline-block gold-text">गीता</span>
            </h1>
          </div>

          <div ref={subtitleRef} className="text-center max-w-3xl">
            <p className="text-xl sm:text-2xl md:text-3xl text-[#f4e4b7] decorative-text mb-4">
              The Sacred Song of the Divine
            </p>
            <p className="text-base sm:text-lg text-gray-300 body-elegant max-w-2xl mx-auto">
              Explore the eternal wisdom of Bhagavad Gita and witness the epic tale of Mahabharata.
              Click on the sacred hotspots to discover key moments of this timeless story.
            </p>
          </div>

          <div className="absolute inset-0 pointer-events-none">
            {events.map((event, index) => (
              <button
                key={event.id}
                ref={(el) => (hotspotsRef.current[index] = el)}
                onClick={() => handleHotspotClick(event)}
                className="absolute pointer-events-auto group cursor-pointer"
                style={{ top: event.position.top, left: event.position.left }}
                aria-label={event.title}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-[#d4af37] rounded-full blur-xl opacity-50 group-hover:opacity-100 transition-opacity animate-pulse" />
                  <Sparkles className="relative text-[#d4af37] w-8 h-8 sm:w-10 sm:h-10 group-hover:scale-125 transition-transform" />
                </div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 whitespace-nowrap bg-[#0a1929]/90 px-3 py-1 rounded-lg border border-[#d4af37] opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-xs sm:text-sm text-[#f4e4b7]">{event.title}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {selectedEvent && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4"
            onClick={closeModal}
          >
            <div
              className="event-modal royal-card max-w-2xl w-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 p-2 rounded-full bg-[#d4af37]/20 hover:bg-[#d4af37]/40 transition-all"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>

              <div className="text-center mb-6">
                <h2 className="text-3xl sm:text-4xl font-bold gold-text mb-2">{selectedEvent.title}</h2>
                <p className="text-xl sanskrit text-[#f4e4b7]">{selectedEvent.sanskrit}</p>
              </div>

              <div className="space-y-6">
                <div className="royal-border p-6 bg-[#0a1929]/50">
                  <h3 className="text-sm uppercase tracking-wider text-[#d4af37] mb-3">Sanskrit Shlok</h3>
                  <p className="text-xl sm:text-2xl sanskrit text-[#f4e4b7] leading-relaxed">
                    {selectedEvent.shlok}
                  </p>
                </div>

                <div className="royal-border p-6 bg-[#0a1929]/50">
                  <h3 className="text-sm uppercase tracking-wider text-[#d4af37] mb-3">Meaning</h3>
                  <p className="text-lg body-elegant text-gray-300 leading-relaxed">{selectedEvent.meaning}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
