'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Navigation from '@/components/Navigation';
import { X, ZoomIn } from 'lucide-react';

const galleryImages = [
  {
    id: 1,
    title: 'Krishna and Arjuna',
    description: 'Lord Krishna imparting divine wisdom to Arjuna on the battlefield',
    image: 'https://images.pexels.com/photos/6480707/pexels-photo-6480707.jpeg?auto=compress&cs=tinysrgb&w=1200',
    category: 'Divine',
  },
  {
    id: 2,
    title: 'The Dice Game',
    description: 'The fateful game of dice that changed the course of history',
    image: 'https://images.pexels.com/photos/4224099/pexels-photo-4224099.jpeg?auto=compress&cs=tinysrgb&w=1200',
    category: 'Events',
  },
  {
    id: 3,
    title: 'Kurukshetra Battlefield',
    description: 'The sacred ground where dharma and adharma clashed',
    image: 'https://images.pexels.com/photos/247599/pexels-photo-247599.jpeg?auto=compress&cs=tinysrgb&w=1200',
    category: 'Places',
  },
  {
    id: 4,
    title: 'Draupadi',
    description: 'The fire-born princess who emerged from the sacred yagna',
    image: 'https://images.pexels.com/photos/3621953/pexels-photo-3621953.jpeg?auto=compress&cs=tinysrgb&w=1200',
    category: 'Characters',
  },
  {
    id: 5,
    title: 'Bhima',
    description: 'The mighty Pandava with the strength of ten thousand elephants',
    image: 'https://images.pexels.com/photos/7176325/pexels-photo-7176325.jpeg?auto=compress&cs=tinysrgb&w=1200',
    category: 'Characters',
  },
  {
    id: 6,
    title: 'Vishvarupa Darshan',
    description: 'Krishna reveals his cosmic universal form to Arjuna',
    image: 'https://images.pexels.com/photos/4666751/pexels-photo-4666751.jpeg?auto=compress&cs=tinysrgb&w=1200',
    category: 'Divine',
  },
  {
    id: 7,
    title: 'Ancient Temple',
    description: 'Sacred temples where the epic was preserved through generations',
    image: 'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=1200',
    category: 'Places',
  },
  {
    id: 8,
    title: 'Karna',
    description: 'The tragic hero and master archer with unwavering loyalty',
    image: 'https://images.pexels.com/photos/6480729/pexels-photo-6480729.jpeg?auto=compress&cs=tinysrgb&w=1200',
    category: 'Characters',
  },
  {
    id: 9,
    title: 'The War Chariot',
    description: 'The divine chariot that carried truth through the battlefield',
    image: 'https://images.pexels.com/photos/5214995/pexels-photo-5214995.jpeg?auto=compress&cs=tinysrgb&w=1200',
    category: 'Events',
  },
  {
    id: 10,
    title: 'Sacred Fire',
    description: 'The eternal flame of dharma burning through the ages',
    image: 'https://images.pexels.com/photos/1705254/pexels-photo-1705254.jpeg?auto=compress&cs=tinysrgb&w=1200',
    category: 'Divine',
  },
  {
    id: 11,
    title: 'Warriors in Battle',
    description: 'The great warriors facing their destiny',
    image: 'https://images.pexels.com/photos/6480714/pexels-photo-6480714.jpeg?auto=compress&cs=tinysrgb&w=1200',
    category: 'Events',
  },
  {
    id: 12,
    title: 'Sacred Scriptures',
    description: 'Ancient texts preserving eternal wisdom',
    image: 'https://images.pexels.com/photos/1907785/pexels-photo-1907785.jpeg?auto=compress&cs=tinysrgb&w=1200',
    category: 'Places',
  },
];

const categories = ['All', 'Divine', 'Characters', 'Events', 'Places'];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const heroRef = useRef(null);
  const imagesRef = useRef([]);

  useEffect(() => {
    gsap.fromTo(
      heroRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }
    );

    animateImages();
  }, [activeCategory]);

  const animateImages = () => {
    imagesRef.current.forEach((img, index) => {
      if (img) {
        gsap.fromTo(
          img,
          { opacity: 0, scale: 0.5, rotationY: 90 },
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
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    gsap.fromTo(
      '.lightbox-modal',
      { opacity: 0, scale: 0.5 },
      { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.7)' }
    );
  };

  const closeLightbox = () => {
    gsap.to('.lightbox-modal', {
      opacity: 0,
      scale: 0.5,
      duration: 0.3,
      ease: 'back.in(1.7)',
      onComplete: () => setSelectedImage(null),
    });
  };

  const filteredImages =
    activeCategory === 'All'
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory);

  return (
    <>
      <Navigation />
      <main className="royal-gradient min-h-screen pt-28 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div ref={heroRef} className="text-center mb-12">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 gold-text text-shadow-gold">
              Sacred Gallery
            </h1>
            <p className="text-xl sm:text-2xl text-[#f4e4b7] decorative-text">
              Visual Journey Through the Epic
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-lg transition-all ${
                  activeCategory === category
                    ? 'bg-[#d4af37] text-[#0a1929] font-bold shadow-[0_0_20px_rgba(212,175,55,0.5)]'
                    : 'bg-[#d4af37]/20 text-[#f4e4b7] hover:bg-[#d4af37]/40'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredImages.map((image, index) => (
              <div
                key={image.id}
                ref={(el) => (imagesRef.current[index] = el)}
                onClick={() => handleImageClick(image)}
                className="royal-card cursor-pointer group overflow-hidden p-0 hover-glow"
              >
                <div className="relative h-64 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-125"
                    style={{ backgroundImage: `url(${image.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a1929] via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ZoomIn className="text-[#d4af37] w-12 h-12" />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold gold-text mb-1">{image.title}</h3>
                  <p className="text-sm text-gray-400 line-clamp-2">{image.description}</p>
                  <div className="mt-2">
                    <span className="inline-block px-2 py-1 text-xs rounded-full bg-[#d4af37]/20 text-[#f4e4b7]">
                      {image.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-lg px-4 py-8"
          onClick={closeLightbox}
        >
          <div className="lightbox-modal max-w-6xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 p-3 rounded-full bg-[#d4af37]/20 hover:bg-[#d4af37]/40 transition-all z-10"
              aria-label="Close lightbox"
            >
              <X size={24} />
            </button>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <div className="relative rounded-lg overflow-hidden" style={{ height: '70vh' }}>
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${selectedImage.image})` }}
                  />
                </div>
              </div>

              <div className="royal-card flex flex-col justify-center">
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 text-sm rounded-full bg-[#d4af37]/20 text-[#f4e4b7] mb-4">
                    {selectedImage.category}
                  </span>
                  <h2 className="text-3xl font-bold gold-text mb-4">{selectedImage.title}</h2>
                  <p className="text-lg text-gray-300 body-elegant leading-relaxed">
                    {selectedImage.description}
                  </p>
                </div>
                <div className="mt-6 pt-6 border-t border-[#d4af37]/30">
                  <div className="text-center text-4xl mb-2">ॐ</div>
                  <p className="text-center text-sm text-gray-400 italic">Sacred Imagery from the Epic</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
