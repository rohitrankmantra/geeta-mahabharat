'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from '@/components/Navigation';
import { BookOpen, Heart, Sword, Crown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const heroRef = useRef(null);
  const sectionsRef = useRef([]);

  useEffect(() => {
    gsap.fromTo(
      heroRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }
    );

    sectionsRef.current.forEach((section, index) => {
      if (section) {
        gsap.fromTo(
          section,
          { opacity: 0, x: index % 2 === 0 ? -100 : 100, rotationY: 15 },
          {
            opacity: 1,
            x: 0,
            rotationY: 0,
            duration: 1,
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              end: 'top 30%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    });
  }, []);

  const stories = [
    {
      icon: <Crown className="w-12 h-12" />,
      title: 'The Epic Mahabharata',
      content:
        'The Mahabharata is one of the greatest epics of ancient India, composed by Sage Vyasa. It tells the story of the Kuru dynasty, focusing on the conflict between the Pandavas and Kauravas. This epic encompasses dharma, duty, honor, and the eternal battle between good and evil. With over 100,000 verses, it is the longest epic poem in the world.',
    },
    {
      icon: <Sword className="w-12 h-12" />,
      title: 'The Great War',
      content:
        'The Kurukshetra War was fought between the Pandavas and Kauravas over the throne of Hastinapura. It lasted 18 days and resulted in devastating losses on both sides. The war serves as the backdrop for the Bhagavad Gita, where Lord Krishna imparts divine wisdom to Arjuna, who is filled with moral dilemma about fighting his own relatives.',
    },
    {
      icon: <BookOpen className="w-12 h-12" />,
      title: 'The Bhagavad Gita',
      content:
        'The Bhagavad Gita, often referred to as the Gita, is a 700-verse Hindu scripture that is part of the Mahabharata. It is a sacred dialogue between Prince Arjuna and Lord Krishna, who serves as his charioteer. The Gita addresses the moral and philosophical dilemmas faced by Arjuna and provides profound spiritual teachings on duty, righteousness, and the path to liberation.',
    },
    {
      icon: <Heart className="w-12 h-12" />,
      title: 'Eternal Wisdom',
      content:
        'The teachings of the Gita transcend time and culture, offering guidance on how to live a righteous life while fulfilling one\'s duties. It speaks of karma (action), bhakti (devotion), and jnana (knowledge) as paths to moksha (liberation). The Gita emphasizes performing one\'s duty without attachment to results, maintaining equanimity in success and failure.',
    },
  ];

  return (
    <>
      <Navigation />
      <main className="royal-gradient min-h-screen pt-28 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div ref={heroRef} className="text-center mb-16">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 gold-text text-shadow-gold">
              The Sacred Story
            </h1>
            <p className="text-xl sm:text-2xl text-[#f4e4b7] decorative-text max-w-3xl mx-auto">
              Discover the timeless wisdom of Bhagavad Gita and the epic tale of Mahabharata
            </p>
          </div>

          <div className="space-y-12">
            {stories.map((story, index) => (
              <div
                key={index}
                ref={(el) => (sectionsRef.current[index] = el)}
                className="royal-card hover-glow"
              >
                <div className="flex flex-col md:flex-row items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#d4af37] to-[#b8941e] flex items-center justify-center text-[#0a1929]">
                      {story.icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-3xl sm:text-4xl font-bold gold-text mb-4">{story.title}</h2>
                    <p className="text-lg text-gray-300 body-elegant leading-relaxed">{story.content}</p>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-[#d4af37]/30">
                  <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#d4af37] to-transparent rounded-full" />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 royal-card text-center">
            <div className="text-6xl mb-6">ॐ</div>
            <h3 className="text-3xl font-bold gold-text mb-4 sanskrit">धर्मो रक्षति रक्षितः</h3>
            <p className="text-xl text-[#f4e4b7] decorative-text mb-2">Dharmo Rakshati Rakshitah</p>
            <p className="text-lg text-gray-300 body-elegant">
              Dharma protects those who protect dharma
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { number: '18', label: 'Chapters in Gita' },
              { number: '700', label: 'Verses' },
              { number: '18', label: 'Days of War' },
              { number: '100K+', label: 'Verses in Mahabharata' },
            ].map((stat, index) => (
              <div key={index} className="royal-card text-center hover-glow">
                <div className="text-4xl sm:text-5xl font-bold gold-text mb-2">{stat.number}</div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
