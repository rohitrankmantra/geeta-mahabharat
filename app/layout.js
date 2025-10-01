import './globals.css';
import { Inter, Cinzel, Playfair_Display, Lora, Noto_Serif_Devanagari } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const cinzel = Cinzel({ subsets: ['latin'], variable: '--font-cinzel' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });
const lora = Lora({ subsets: ['latin'], variable: '--font-lora' });
const notoSerif = Noto_Serif_Devanagari({ subsets: ['devanagari'], variable: '--font-noto' });

export const metadata = {
  title: 'श्रीमद्भगवद्गीता | Sacred Wisdom of Mahabharata',
  description: 'Explore the eternal wisdom of Bhagavad Gita and the epic Mahabharata',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${cinzel.variable} ${playfair.variable} ${lora.variable} ${notoSerif.variable}`}>
        {children}
      </body>
    </html>
  );
}
