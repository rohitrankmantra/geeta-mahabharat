'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Navigation from '@/components/Navigation';
import { ChevronLeft, ChevronRight, Share2, Volume2 } from 'lucide-react';

const chapters = [
  { id: 1, title: 'Arjuna Vishada Yoga', subtitle: 'The Yoga of Arjuna\'s Dejection', verses: 47 },
  { id: 2, title: 'Sankhya Yoga', subtitle: 'The Yoga of Knowledge', verses: 72 },
  { id: 3, title: 'Karma Yoga', subtitle: 'The Yoga of Action', verses: 43 },
  { id: 4, title: 'Jnana Karma Sanyasa Yoga', subtitle: 'The Yoga of Wisdom and Action', verses: 42 },
  { id: 5, title: 'Karma Sanyasa Yoga', subtitle: 'The Yoga of Renunciation', verses: 29 },
  { id: 6, title: 'Dhyana Yoga', subtitle: 'The Yoga of Meditation', verses: 47 },
  { id: 7, title: 'Jnana Vijnana Yoga', subtitle: 'The Yoga of Knowledge and Wisdom', verses: 30 },
  { id: 8, title: 'Aksara Brahma Yoga', subtitle: 'The Yoga of the Imperishable Brahman', verses: 28 },
  { id: 9, title: 'Raja Vidya Raja Guhya Yoga', subtitle: 'The Yoga of Royal Knowledge', verses: 34 },
  { id: 10, title: 'Vibhuti Yoga', subtitle: 'The Yoga of Divine Glories', verses: 42 },
  { id: 11, title: 'Vishvarupa Darshana Yoga', subtitle: 'The Yoga of the Universal Form', verses: 55 },
  { id: 12, title: 'Bhakti Yoga', subtitle: 'The Yoga of Devotion', verses: 20 },
  { id: 13, title: 'Kshetra Kshetrajna Vibhaga Yoga', subtitle: 'The Yoga of Field and Knower', verses: 35 },
  { id: 14, title: 'Gunatraya Vibhaga Yoga', subtitle: 'The Yoga of Three Gunas', verses: 27 },
  { id: 15, title: 'Purushottama Yoga', subtitle: 'The Yoga of the Supreme Person', verses: 20 },
  { id: 16, title: 'Daivasura Sampad Vibhaga Yoga', subtitle: 'The Yoga of Divine and Demoniac', verses: 24 },
  { id: 17, title: 'Shraddhatraya Vibhaga Yoga', subtitle: 'The Yoga of Three Faiths', verses: 28 },
  { id: 18, title: 'Moksha Sanyasa Yoga', subtitle: 'The Yoga of Liberation', verses: 78 },
];

const sampleVerses = {
  1: {
    sanskrit: 'अर्जुन उवाच | दृष्ट्वेमं स्वजनं कृष्ण युयुत्सुं समुपस्थितम्',
    transliteration: 'Arjuna Uvacha | Drishtvemam svajanam krishna yuyutsum samupasthitam',
    meaning: 'Arjuna said: O Krishna, seeing my kinsmen arrayed, eager for battle, my limbs fail and my mouth is parched.',
  },
  2: {
    sanskrit: 'श्रीभगवानुवाच | अशोच्यानन्वशोचस्त्वं प्रज्ञावादांश्च भाषसे',
    transliteration: 'Sri Bhagavan Uvacha | Ashochyan anvashocha stvam prajna-vadamsh cha bhashase',
    meaning: 'The Supreme Lord said: While speaking words of wisdom, you are mourning for what is not worthy of grief.',
  },
  3: {
    sanskrit: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन',
    transliteration: 'Karmanyevadhikaraste ma phaleshu kadachana',
    meaning: 'You have a right to perform your prescribed duties, but you are not entitled to the fruits of your actions.',
  },
};

export default function GeetaGyan() {
  const [selectedChapter, setSelectedChapter] = useState(1);
  const [dailyVerse, setDailyVerse] = useState(null);
  const heroRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const randomChapter = Math.floor(Math.random() * 3) + 1;
    setDailyVerse(sampleVerses[randomChapter]);

    gsap.fromTo(
      heroRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }
    );

    cardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(
          card,
          { opacity: 0, scale: 0.8, rotationY: 45 },
          {
            opacity: 1,
            scale: 1,
            rotationY: 0,
            duration: 0.6,
            delay: index * 0.05,
            ease: 'back.out(1.7)',
          }
        );
      }
    });
  }, []);

  const handleChapterClick = (id) => {
    setSelectedChapter(id);
    gsap.fromTo(
      '.verse-display',
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' }
    );
  };

  const handleShare = () => {
    if (dailyVerse && navigator.share) {
      navigator.share({
        title: 'Daily Bhagavad Gita Verse',
        text: `${dailyVerse.sanskrit}\n\n${dailyVerse.meaning}`,
      });
    }
  };

  const currentVerse = sampleVerses[Math.min(selectedChapter, 3)] || sampleVerses[1];

  return (
    <>
      <Navigation />
      <main className="royal-gradient min-h-screen pt-28 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div ref={heroRef} className="text-center mb-12">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 gold-text text-shadow-gold">
              गीता ज्ञान
            </h1>
            <p className="text-xl sm:text-2xl text-[#f4e4b7] decorative-text">
              18 Chapters of Divine Wisdom
            </p>
          </div>

          {dailyVerse && (
            <div className="mb-12 royal-card hover-glow">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold gold-text">Verse of the Day</h2>
                <button
                  onClick={handleShare}
                  className="p-2 rounded-full bg-[#d4af37]/20 hover:bg-[#d4af37]/40 transition-all"
                  aria-label="Share verse"
                >
                  <Share2 size={20} />
                </button>
              </div>
              <div className="space-y-4">
                <div className="royal-border p-4 bg-[#0a1929]/50">
                  <p className="text-2xl sanskrit text-[#f4e4b7] leading-relaxed">{dailyVerse.sanskrit}</p>
                </div>
                <div className="royal-border p-4 bg-[#0a1929]/50">
                  <p className="text-lg text-gray-300 body-elegant">{dailyVerse.meaning}</p>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-12">
            {chapters.map((chapter, index) => (
              <button
                key={chapter.id}
                ref={(el) => (cardsRef.current[index] = el)}
                onClick={() => handleChapterClick(chapter.id)}
                className={`royal-card text-center transition-all ${
                  selectedChapter === chapter.id
                    ? 'ring-2 ring-[#d4af37] shadow-[0_0_30px_rgba(212,175,55,0.6)]'
                    : 'hover-glow'
                }`}
              >
                <div className="text-3xl font-bold gold-text mb-2">{chapter.id}</div>
                <div className="text-xs text-gray-400">{chapter.verses} verses</div>
              </button>
            ))}
          </div>

          <div className="verse-display royal-card">
            <div className="mb-6">
              <h2 className="text-3xl sm:text-4xl font-bold gold-text mb-2">
                Chapter {selectedChapter}
              </h2>
              <h3 className="text-xl sm:text-2xl text-[#f4e4b7] decorative-text mb-1">
                {chapters[selectedChapter - 1].title}
              </h3>
              <p className="text-gray-400 body-elegant">{chapters[selectedChapter - 1].subtitle}</p>
            </div>

            <div className="space-y-6">
              <div className="royal-border p-6 bg-[#0a1929]/50">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="text-sm uppercase tracking-wider text-[#d4af37]">Sanskrit Shlok</h4>
                  <button
                    className="p-2 rounded-full bg-[#d4af37]/20 hover:bg-[#d4af37]/40 transition-all"
                    aria-label="Play recitation"
                  >
                    <Volume2 size={16} />
                  </button>
                </div>
                <p className="text-xl sm:text-2xl sanskrit text-[#f4e4b7] leading-relaxed mb-3">
                  {currentVerse.sanskrit}
                </p>
                <p className="text-sm text-gray-400 italic">{currentVerse.transliteration}</p>
              </div>

              <div className="royal-border p-6 bg-[#0a1929]/50">
                <h4 className="text-sm uppercase tracking-wider text-[#d4af37] mb-3">English Meaning</h4>
                <p className="text-lg body-elegant text-gray-300 leading-relaxed">{currentVerse.meaning}</p>
              </div>
            </div>

            <div className="flex justify-between items-center mt-8">
              <button
                onClick={() => handleChapterClick(Math.max(1, selectedChapter - 1))}
                disabled={selectedChapter === 1}
                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-[#d4af37]/20 hover:bg-[#d4af37]/40 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={20} />
                <span>Previous</span>
              </button>
              <button
                onClick={() => handleChapterClick(Math.min(18, selectedChapter + 1))}
                disabled={selectedChapter === 18}
                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-[#d4af37]/20 hover:bg-[#d4af37]/40 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <span>Next</span>
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
