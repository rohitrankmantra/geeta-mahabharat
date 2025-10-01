'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Navigation from '@/components/Navigation';
import { X, Volume2 } from 'lucide-react';

const characters = [
  {
    id: 1,
    name: 'Lord Krishna',
    sanskrit: 'श्री कृष्ण',
    role: 'Divine Charioteer & Supreme Guide',
    image: 'https://images.pexels.com/photos/6480707/pexels-photo-6480707.jpeg?auto=compress&cs=tinysrgb&w=800',
    bio: 'Lord Krishna is the eighth avatar of Vishnu and the Supreme Personality of Godhead. In the Mahabharata, he serves as Arjuna\'s charioteer and guide, delivering the immortal teachings of the Bhagavad Gita. His wisdom, divine play (leela), and compassion make him the most beloved deity in Hindu philosophy. He orchestrates the victory of dharma over adharma while maintaining his role as a friend, philosopher, and guide to the Pandavas.',
    qualities: ['Divine Wisdom', 'Strategic Mind', 'Compassionate', 'Supreme Lord'],
  },
  {
    id: 2,
    name: 'Arjuna',
    sanskrit: 'अर्जुन',
    role: 'The Mighty Warrior & Disciple',
    image: 'https://images.pexels.com/photos/6480714/pexels-photo-6480714.jpeg?auto=compress&cs=tinysrgb&w=800',
    bio: 'Arjuna is the third Pandava prince and the greatest archer of his time. He is the devoted disciple to whom Lord Krishna reveals the Bhagavad Gita on the battlefield of Kurukshetra. Torn between duty and emotion when facing his relatives in battle, Arjuna receives divine guidance that transforms him from a confused warrior to an enlightened soul. His questions represent the doubts of all humanity, and Krishna\'s answers provide eternal solutions.',
    qualities: ['Master Archer', 'Devoted Disciple', 'Righteous', 'Courageous'],
  },
  {
    id: 3,
    name: 'Draupadi',
    sanskrit: 'द्रौपदी',
    role: 'The Fire-born Princess',
    image: 'https://images.pexels.com/photos/3621953/pexels-photo-3621953.jpeg?auto=compress&cs=tinysrgb&w=800',
    bio: 'Draupadi, born from fire, is the wife of all five Pandavas and one of the most complex characters in the Mahabharata. Her public humiliation in the Kaurava court becomes the catalyst for the great war. She represents strength, resilience, and the righteous anger against injustice. Her unwavering faith in Krishna and her determination to see justice prevail make her a symbol of feminine power and dignity.',
    qualities: ['Strong-willed', 'Devoted', 'Resilient', 'Righteous Anger'],
  },
  {
    id: 4,
    name: 'Bhima',
    sanskrit: 'भीम',
    role: 'The Mighty Warrior',
    image: 'https://images.pexels.com/photos/7176325/pexels-photo-7176325.jpeg?auto=compress&cs=tinysrgb&w=800',
    bio: 'Bhima is the second Pandava, known for his incredible strength and appetite. Son of the wind god Vayu, he possesses the strength of ten thousand elephants. His fierce loyalty to his brothers and his burning desire to avenge Draupadi\'s humiliation fuel his devastating performance in the war. Despite his fearsome nature, he is deeply devoted to his family and represents the power of righteous force.',
    qualities: ['Superhuman Strength', 'Loyal', 'Fierce', 'Protective'],
  },
  {
    id: 5,
    name: 'Karna',
    sanskrit: 'कर्ण',
    role: 'The Tragic Hero',
    image: 'https://images.pexels.com/photos/6480729/pexels-photo-6480729.jpeg?auto=compress&cs=tinysrgb&w=800',
    bio: 'Karna is the secret firstborn son of Kunti, abandoned at birth. Raised by a charioteer, he faces rejection and discrimination despite being one of the greatest warriors. His unwavering loyalty to Duryodhana, even knowing the truth of his birth, makes him a tragic figure. Karna represents the conflict between dharma and loyalty, making him one of the most complex and sympathetic characters in the epic.',
    qualities: ['Loyal Friend', 'Skilled Warrior', 'Generous', 'Tragic Figure'],
  },
  {
    id: 6,
    name: 'Yudhishthira',
    sanskrit: 'युधिष्ठिर',
    role: 'The Righteous King',
    image: 'https://images.pexels.com/photos/7176308/pexels-photo-7176308.jpeg?auto=compress&cs=tinysrgb&w=800',
    bio: 'Yudhishthira is the eldest Pandava and the embodiment of dharma. Known as Dharmaraja, he never lies except once during the war. His commitment to truth and righteousness sometimes conflicts with practical needs, especially his gambling addiction that leads to the Pandavas\' exile. Despite his weaknesses, he represents the ideal of moral kingship and the eternal struggle to uphold dharma.',
    qualities: ['Truthful', 'Just', 'Wise', 'Dharmic'],
  },
  {
    id: 7,
    name: 'Duryodhana',
    sanskrit: 'दुर्योधन',
    role: 'The Ambitious Prince',
    image: 'https://images.pexels.com/photos/6480734/pexels-photo-6480734.jpeg?auto=compress&cs=tinysrgb&w=800',
    bio: 'Duryodhana is the eldest Kaurava and the primary antagonist of the Mahabharata. His jealousy of the Pandavas and refusal to share the kingdom leads to the great war. Despite his negative portrayal, he is a skilled warrior, a loyal friend to Karna, and displays certain noble qualities. He represents the destructive nature of envy and the consequences of refusing to follow dharma.',
    qualities: ['Ambitious', 'Skilled Fighter', 'Stubborn', 'Loyal Friend'],
  },
  {
    id: 8,
    name: 'Bhishma',
    sanskrit: 'भीष्म',
    role: 'The Grand Patriarch',
    image: 'https://images.pexels.com/photos/6480742/pexels-photo-6480742.jpeg?auto=compress&cs=tinysrgb&w=800',
    bio: 'Bhishma is the grand patriarch of the Kuru dynasty, blessed with the power to choose the time of his death. His vow of celibacy and loyalty to the throne makes him fight on the side of the Kauravas despite knowing they are wrong. His character explores the complex nature of duty and the conflicts that arise when personal vows clash with moral righteousness.',
    qualities: ['Immortal Warrior', 'Dutiful', 'Wise', 'Celibate'],
  },
];

export default function Characters() {
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const heroRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    gsap.fromTo(
      heroRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1.2, ease: 'elastic.out(1, 0.5)' }
    );

    cardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(
          card,
          { opacity: 0, y: 100, rotationX: -45 },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'back.out(1.7)',
          }
        );
      }
    });
  }, []);

  const handleCardClick = (character) => {
    setSelectedCharacter(character);
    gsap.fromTo(
      '.character-modal',
      { scale: 0, rotation: -180 },
      { scale: 1, rotation: 0, duration: 0.6, ease: 'back.out(1.7)' }
    );
  };

  const closeModal = () => {
    gsap.to('.character-modal', {
      scale: 0,
      rotation: 180,
      duration: 0.4,
      ease: 'back.in(1.7)',
      onComplete: () => setSelectedCharacter(null),
    });
  };

  return (
    <>
      <Navigation />
      <main className="royal-gradient min-h-screen pt-28 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div ref={heroRef} className="text-center mb-12">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 gold-text text-shadow-gold">
              Epic Characters
            </h1>
            <p className="text-xl sm:text-2xl text-[#f4e4b7] decorative-text">
              Meet the Legendary Heroes of Mahabharata
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {characters.map((character, index) => (
              <div
                key={character.id}
                ref={(el) => (cardsRef.current[index] = el)}
                onClick={() => handleCardClick(character)}
                className="royal-card cursor-pointer group hover-glow"
              >
                <div className="relative overflow-hidden rounded-lg mb-4 h-64">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url(${character.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a1929] via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-2xl font-bold gold-text">{character.name}</h3>
                    <p className="text-lg sanskrit text-[#f4e4b7]">{character.sanskrit}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-400 text-center">{character.role}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {selectedCharacter && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4 overflow-y-auto py-8"
          onClick={closeModal}
        >
          <div
            className="character-modal royal-card max-w-4xl w-full relative my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 p-2 rounded-full bg-[#d4af37]/20 hover:bg-[#d4af37]/40 transition-all z-10"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative h-96 md:h-full rounded-lg overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${selectedCharacter.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1929] via-transparent to-transparent" />
              </div>

              <div className="flex flex-col justify-between">
                <div>
                  <div className="mb-6">
                    <h2 className="text-4xl font-bold gold-text mb-2">{selectedCharacter.name}</h2>
                    <p className="text-2xl sanskrit text-[#f4e4b7] mb-2">{selectedCharacter.sanskrit}</p>
                    <p className="text-lg text-gray-400 decorative-text">{selectedCharacter.role}</p>
                  </div>

                  <div className="royal-border p-4 bg-[#0a1929]/50 mb-6">
                    <p className="text-base body-elegant text-gray-300 leading-relaxed">
                      {selectedCharacter.bio}
                    </p>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-sm uppercase tracking-wider text-[#d4af37] mb-3">Key Qualities</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedCharacter.qualities.map((quality, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/50 text-sm text-[#f4e4b7]"
                        >
                          {quality}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <button className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#d4af37]/20 hover:bg-[#d4af37]/40 transition-all">
                  <Volume2 size={20} />
                  <span>Listen to Story (Coming Soon)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
