'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Navigation from '@/components/Navigation';
import { MapPin, Calendar } from 'lucide-react';

const timelineEvents = [
  {
    id: 1,
    year: 'Beginning',
    title: 'Birth of the Princes',
    description: 'The Pandavas and Kauravas are born to the royal family of Hastinapura',
    position: { top: '15%', left: '20%' },
    details: 'Dhritarashtra had 100 sons (Kauravas) and Pandu had 5 sons (Pandavas). The rivalry began from childhood.',
  },
  {
    id: 2,
    year: 'Youth',
    title: 'The Lac House Conspiracy',
    description: 'Duryodhana attempts to kill the Pandavas by burning them alive',
    position: { top: '25%', left: '70%' },
    details: 'The Pandavas escape through a secret tunnel and go into hiding, believed to be dead by most.',
  },
  {
    id: 3,
    year: 'Youth',
    title: "Draupadi's Swayamvara",
    description: 'Arjuna wins Draupadi by hitting the eye of a revolving fish',
    position: { top: '40%', left: '30%' },
    details: 'Due to Kunti\'s words, Draupadi becomes the wife of all five Pandavas, a unique arrangement.',
  },
  {
    id: 4,
    year: 'Prosperity',
    title: 'Division of Kingdom',
    description: 'Kingdom divided; Pandavas establish Indraprastha',
    position: { top: '35%', left: '80%' },
    details: 'The Pandavas transform a barren land into a magnificent city with Krishna\'s help.',
  },
  {
    id: 5,
    year: 'Prosperity',
    title: 'Rajasuya Yajna',
    description: 'Yudhishthira performs the grand royal ceremony',
    position: { top: '50%', left: '15%' },
    details: 'The ceremony establishes Yudhishthira as the emperor. Duryodhana\'s jealousy intensifies.',
  },
  {
    id: 6,
    year: 'Crisis',
    title: 'The Dice Game',
    description: 'Yudhishthira loses everything including Draupadi in a rigged game',
    position: { top: '55%', left: '60%' },
    details: 'Shakuni manipulates the dice. Draupadi is dragged to court and humiliated. Krishna saves her honor.',
  },
  {
    id: 7,
    year: 'Exile',
    title: '13 Years of Exile',
    description: 'Pandavas spend 12 years in forest and 1 year in disguise',
    position: { top: '70%', left: '25%' },
    details: 'They face many trials, gain divine weapons, and grow stronger in exile.',
  },
  {
    id: 8,
    year: 'War',
    title: 'Failed Peace Talks',
    description: 'Krishna attempts peace but Duryodhana refuses to give even five villages',
    position: { top: '75%', left: '75%' },
    details: 'Duryodhana declares: "I will not give them land equal to the tip of a needle without war."',
  },
  {
    id: 9,
    year: 'War',
    title: 'Bhagavad Gita',
    description: 'Krishna delivers divine wisdom to Arjuna on the battlefield',
    position: { top: '85%', left: '40%' },
    details: 'Arjuna refuses to fight his relatives. Krishna reveals the essence of dharma and duty.',
  },
  {
    id: 10,
    year: 'War',
    title: 'The Great War',
    description: '18 days of devastating battle at Kurukshetra',
    position: { top: '90%', left: '85%' },
    details: 'Millions perish. Great warriors fall. Dharma ultimately prevails over adharma.',
  },
];

export default function Timeline() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const heroRef = useRef(null);
  const mapRef = useRef(null);
  const timelineRef = useRef(null);
  const hotspotsRef = useRef([]);

  useEffect(() => {
    gsap.fromTo(
      heroRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }
    );

    gsap.fromTo(
      timelineRef.current,
      { opacity: 0, x: -100 },
      { opacity: 1, x: 0, duration: 1, delay: 0.3, ease: 'power3.out' }
    );

    hotspotsRef.current.forEach((hotspot, index) => {
      if (hotspot) {
        gsap.fromTo(
          hotspot,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            delay: 0.8 + index * 0.1,
            ease: 'back.out(1.7)',
          }
        );

        gsap.to(hotspot, {
          y: '+=10',
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: index * 0.2,
        });
      }
    });
  }, []);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    gsap.fromTo(
      '.timeline-modal',
      { scale: 0, y: 100 },
      { scale: 1, y: 0, duration: 0.5, ease: 'back.out(1.7)' }
    );
  };

  const closeModal = () => {
    gsap.to('.timeline-modal', {
      scale: 0,
      y: 100,
      duration: 0.3,
      ease: 'back.in(1.7)',
      onComplete: () => setSelectedEvent(null),
    });
  };

  return (
    <>
      <Navigation />
      <main className="royal-gradient min-h-screen pt-28 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div ref={heroRef} className="text-center mb-12">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 gold-text text-shadow-gold">
              Epic Timeline
            </h1>
            <p className="text-xl sm:text-2xl text-[#f4e4b7] decorative-text">
              Journey Through the Events of Mahabharata
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div ref={timelineRef} className="royal-card overflow-x-auto">
              <h2 className="text-3xl font-bold gold-text mb-6 flex items-center gap-3">
                <Calendar className="w-8 h-8" />
                Timeline of Events
              </h2>
              <div className="space-y-6">
                {timelineEvents.map((event, index) => (
                  <div
                    key={event.id}
                    onClick={() => handleEventClick(event)}
                    className="flex gap-4 cursor-pointer group hover:bg-[#d4af37]/10 p-4 rounded-lg transition-all"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#d4af37] to-[#b8941e] flex items-center justify-center font-bold text-[#0a1929] group-hover:scale-110 transition-transform">
                        {event.id}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-[#d4af37] mb-1">{event.year}</div>
                      <h3 className="text-xl font-bold text-[#f4e4b7] mb-2 group-hover:text-[#d4af37] transition-colors">
                        {event.title}
                      </h3>
                      <p className="text-sm text-gray-400">{event.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="royal-card">
              <h2 className="text-3xl font-bold gold-text mb-6 flex items-center gap-3">
                <MapPin className="w-8 h-8" />
                Kurukshetra Map
              </h2>
              <div
                ref={mapRef}
                className="relative w-full rounded-lg overflow-hidden"
                style={{ height: '600px' }}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage:
                      'url(https://images.pexels.com/photos/247599/pexels-photo-247599.jpeg?auto=compress&cs=tinysrgb&w=1200)',
                    filter: 'brightness(0.6) sepia(0.3)',
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a1929]/40 to-[#0a1929]/80" />

                <div className="relative w-full h-full">
                  {timelineEvents.map((event, index) => (
                    <button
                      key={event.id}
                      ref={(el) => (hotspotsRef.current[index] = el)}
                      onClick={() => handleEventClick(event)}
                      className="absolute group"
                      style={{ top: event.position.top, left: event.position.left }}
                      aria-label={event.title}
                    >
                      <div className="relative">
                        <div className="absolute inset-0 w-8 h-8 bg-[#d4af37] rounded-full blur-xl opacity-60 group-hover:opacity-100 transition-opacity" />
                        <div className="relative w-8 h-8 rounded-full bg-gradient-to-br from-[#d4af37] to-[#b8941e] flex items-center justify-center text-sm font-bold text-[#0a1929] shadow-lg group-hover:scale-125 transition-transform">
                          {event.id}
                        </div>
                      </div>
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 whitespace-nowrap bg-[#0a1929]/95 px-3 py-2 rounded-lg border border-[#d4af37] opacity-0 group-hover:opacity-100 transition-opacity z-10">
                        <p className="text-xs font-bold text-[#f4e4b7]">{event.title}</p>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="absolute bottom-4 left-4 right-4 bg-[#0a1929]/90 backdrop-blur-sm p-4 rounded-lg border border-[#d4af37]/30">
                  <p className="text-sm text-gray-300 text-center">
                    Click on the numbered markers to explore key events in the epic
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {selectedEvent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4"
          onClick={closeModal}
        >
          <div
            className="timeline-modal royal-card max-w-2xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#d4af37] to-[#b8941e] flex items-center justify-center text-2xl font-bold text-[#0a1929]">
                  {selectedEvent.id}
                </div>
              </div>
              <div className="flex-1">
                <div className="text-sm uppercase tracking-wider text-[#d4af37] mb-2">
                  {selectedEvent.year}
                </div>
                <h2 className="text-3xl font-bold gold-text mb-2">{selectedEvent.title}</h2>
                <p className="text-lg text-[#f4e4b7]">{selectedEvent.description}</p>
              </div>
            </div>

            <div className="royal-border p-6 bg-[#0a1929]/50 mb-6">
              <p className="text-base body-elegant text-gray-300 leading-relaxed">
                {selectedEvent.details}
              </p>
            </div>

            <button
              onClick={closeModal}
              className="w-full px-6 py-3 rounded-lg bg-[#d4af37]/20 hover:bg-[#d4af37]/40 transition-all text-[#f4e4b7] font-bold"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
