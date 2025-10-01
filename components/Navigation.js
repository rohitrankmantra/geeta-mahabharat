'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Music, VolumeX } from 'lucide-react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/geeta-gyan', label: 'Geeta Gyan' },
    { href: '/characters', label: 'Characters' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/timeline', label: 'Timeline' },
    { href: '/quiz', label: 'Quiz' },
    { href: '/contact', label: 'Contact' },
  ];

  const toggleMusic = () => {
    setMusicPlaying(!musicPlaying);
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0a1929]/95 backdrop-blur-lg shadow-lg border-b-2 border-[#d4af37]/30'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#d4af37] to-[#b8941e] flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="text-2xl">ॐ</span>
            </div>
            <span className="text-xl font-bold gold-text hidden sm:block">श्रीमद्भगवद्गीता</span>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  pathname === link.href
                    ? 'bg-[#d4af37]/20 text-[#f4e4b7] border border-[#d4af37]'
                    : 'text-gray-300 hover:text-[#d4af37] hover:bg-[#1a2332]'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={toggleMusic}
              className="ml-4 p-2 rounded-full bg-[#d4af37]/20 hover:bg-[#d4af37]/30 transition-all"
              aria-label={musicPlaying ? 'Mute music' : 'Play music'}
            >
              {musicPlaying ? <VolumeX size={20} /> : <Music size={20} />}
            </button>
          </div>

          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleMusic}
              className="p-2 rounded-full bg-[#d4af37]/20"
              aria-label={musicPlaying ? 'Mute music' : 'Play music'}
            >
              {musicPlaying ? <VolumeX size={20} /> : <Music size={20} />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg hover:bg-[#d4af37]/20 transition-all"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-[#0a1929]/98 backdrop-blur-lg border-t border-[#d4af37]/30">
          <div className="px-4 pt-2 pb-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-lg transition-all ${
                  pathname === link.href
                    ? 'bg-[#d4af37]/20 text-[#f4e4b7] border border-[#d4af37]'
                    : 'text-gray-300 hover:bg-[#1a2332]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
