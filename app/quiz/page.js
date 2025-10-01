'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Navigation from '@/components/Navigation';
import { CircleCheck as CheckCircle, Circle as XCircle, RefreshCw, Trophy } from 'lucide-react';

const quizQuestions = [
  {
    id: 1,
    question: 'Who delivered the Bhagavad Gita to Arjuna?',
    options: ['Lord Rama', 'Lord Krishna', 'Lord Shiva', 'Lord Brahma'],
    correct: 1,
    explanation: 'Lord Krishna delivered the Bhagavad Gita to Arjuna on the battlefield of Kurukshetra.',
  },
  {
    id: 2,
    question: 'How many chapters are there in the Bhagavad Gita?',
    options: ['12', '15', '18', '21'],
    correct: 2,
    explanation: 'The Bhagavad Gita contains 18 chapters with 700 verses in total.',
  },
  {
    id: 3,
    question: 'Who was the eldest Pandava brother?',
    options: ['Bhima', 'Arjuna', 'Yudhishthira', 'Nakula'],
    correct: 2,
    explanation: 'Yudhishthira, also known as Dharmaraja, was the eldest of the five Pandava brothers.',
  },
  {
    id: 4,
    question: 'What does "Karma Yoga" refer to in the Bhagavad Gita?',
    options: ['Yoga of Devotion', 'Yoga of Action', 'Yoga of Knowledge', 'Yoga of Meditation'],
    correct: 1,
    explanation: 'Karma Yoga is the yoga of selfless action, performing duty without attachment to results.',
  },
  {
    id: 5,
    question: 'Who dragged Draupadi by her hair into the Kaurava court?',
    options: ['Duryodhana', 'Dushasana', 'Karna', 'Shakuni'],
    correct: 1,
    explanation: 'Dushasana dragged Draupadi by her hair and attempted to disrobe her in the court.',
  },
  {
    id: 6,
    question: 'How many days did the Kurukshetra war last?',
    options: ['7 days', '14 days', '18 days', '21 days'],
    correct: 2,
    explanation: 'The great war at Kurukshetra lasted for 18 days, resulting in massive casualties.',
  },
  {
    id: 7,
    question: 'Who was Karna\'s true mother?',
    options: ['Gandhari', 'Kunti', 'Madri', 'Draupadi'],
    correct: 1,
    explanation: 'Kunti was Karna\'s biological mother who abandoned him at birth out of fear.',
  },
  {
    id: 8,
    question: 'What is the famous verse about duty in the Gita?',
    options: [
      'Satyameva Jayate',
      'Karmanyevadhikaraste',
      'Vasudhaiva Kutumbakam',
      'Ahimsa Paramo Dharma',
    ],
    correct: 1,
    explanation: 'Karmanyevadhikaraste ma phaleshu kadachana - You have the right to perform your duty, but not to the fruits of action.',
  },
  {
    id: 9,
    question: 'Who was granted the divine vision to see Krishna\'s universal form?',
    options: ['Yudhishthira', 'Arjuna', 'Bhima', 'Draupadi'],
    correct: 1,
    explanation: 'Krishna granted Arjuna divine vision to see his Vishvarupa (universal form) on the battlefield.',
  },
  {
    id: 10,
    question: 'What was the relationship between Krishna and Arjuna?',
    options: ['Brothers', 'Friends and Cousins', 'Teacher and Student', 'Father and Son'],
    correct: 1,
    explanation: 'Krishna and Arjuna were friends, cousins, and also had a guru-disciple relationship.',
  },
];

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState([]);
  const heroRef = useRef(null);
  const questionRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      heroRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1.2, ease: 'elastic.out(1, 0.5)' }
    );
  }, []);

  useEffect(() => {
    if (questionRef.current) {
      gsap.fromTo(
        questionRef.current,
        { opacity: 0, x: 100 },
        { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' }
      );
    }

    if (progressRef.current) {
      gsap.to(progressRef.current, {
        width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%`,
        duration: 0.5,
        ease: 'power2.out',
      });
    }
  }, [currentQuestion]);

  const handleAnswerClick = (index) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(index);
    const isCorrect = index === quizQuestions[currentQuestion].correct;

    if (isCorrect) {
      setScore(score + 1);
    }

    setAnswers([...answers, { question: currentQuestion, selected: index, correct: isCorrect }]);

    setTimeout(() => {
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        setShowResult(true);
        gsap.fromTo(
          '.result-card',
          { scale: 0, rotation: -180 },
          { scale: 1, rotation: 0, duration: 0.8, ease: 'back.out(1.7)' }
        );
      }
    }, 1500);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
    setAnswers([]);
  };

  const getScoreMessage = () => {
    const percentage = (score / quizQuestions.length) * 100;
    if (percentage === 100) return 'Perfect! You are a true scholar of the Gita!';
    if (percentage >= 80) return 'Excellent! Your knowledge is impressive!';
    if (percentage >= 60) return 'Good job! Keep learning!';
    if (percentage >= 40) return 'Not bad! There\'s room for improvement!';
    return 'Keep studying! The wisdom awaits you!';
  };

  if (showResult) {
    return (
      <>
        <Navigation />
        <main className="royal-gradient min-h-screen pt-28 pb-16 px-4 flex items-center justify-center">
          <div className="result-card royal-card max-w-2xl w-full text-center">
            <div className="mb-8">
              <Trophy className="w-20 h-20 mx-auto text-[#d4af37] mb-4" />
              <h1 className="text-5xl font-bold gold-text mb-4">Quiz Complete!</h1>
              <div className="text-6xl font-bold text-[#f4e4b7] mb-2">
                {score} / {quizQuestions.length}
              </div>
              <p className="text-xl text-gray-300 decorative-text">{getScoreMessage()}</p>
            </div>

            <div className="royal-border p-6 bg-[#0a1929]/50 mb-6">
              <div className="flex justify-center gap-8 mb-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-1">{score}</div>
                  <div className="text-sm text-gray-400">Correct</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-400 mb-1">
                    {quizQuestions.length - score}
                  </div>
                  <div className="text-sm text-gray-400">Incorrect</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold gold-text mb-1">
                    {Math.round((score / quizQuestions.length) * 100)}%
                  </div>
                  <div className="text-sm text-gray-400">Score</div>
                </div>
              </div>
            </div>

            <button
              onClick={resetQuiz}
              className="flex items-center justify-center gap-3 px-8 py-4 rounded-lg bg-gradient-to-r from-[#d4af37] to-[#b8941e] text-[#0a1929] font-bold text-lg hover:scale-105 transition-transform mx-auto"
            >
              <RefreshCw size={24} />
              Take Quiz Again
            </button>

            <div className="mt-8 text-center text-4xl">ॐ</div>
          </div>
        </main>
      </>
    );
  }

  const question = quizQuestions[currentQuestion];

  return (
    <>
      <Navigation />
      <main className="royal-gradient min-h-screen pt-28 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div ref={heroRef} className="text-center mb-12">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 gold-text text-shadow-gold">
              Test Your Knowledge
            </h1>
            <p className="text-xl sm:text-2xl text-[#f4e4b7] decorative-text">
              Challenge yourself with questions about Bhagavad Gita and Mahabharata
            </p>
          </div>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm text-gray-400">
                Question {currentQuestion + 1} of {quizQuestions.length}
              </span>
              <span className="text-sm text-[#d4af37] font-bold">Score: {score}</span>
            </div>
            <div className="w-full h-3 bg-[#1a2332] rounded-full overflow-hidden">
              <div
                ref={progressRef}
                className="h-full bg-gradient-to-r from-[#d4af37] to-[#b8941e] rounded-full"
                style={{ width: '0%' }}
              />
            </div>
          </div>

          <div ref={questionRef} className="royal-card">
            <div className="mb-8">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#d4af37] to-[#b8941e] text-2xl font-bold text-[#0a1929] mb-6 mx-auto">
                {currentQuestion + 1}
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#f4e4b7] decorative-text">
                {question.question}
              </h2>
            </div>

            <div className="space-y-4 mb-6">
              {question.options.map((option, index) => {
                let bgClass = 'bg-[#1a2332]/50 hover:bg-[#1a2332] border-[#d4af37]/30';

                if (selectedAnswer !== null) {
                  if (index === question.correct) {
                    bgClass = 'bg-green-500/20 border-green-500';
                  } else if (index === selectedAnswer) {
                    bgClass = 'bg-red-500/20 border-red-500';
                  }
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerClick(index)}
                    disabled={selectedAnswer !== null}
                    className={`w-full p-4 rounded-lg border-2 transition-all text-left flex items-center gap-4 ${bgClass} ${
                      selectedAnswer === null ? 'hover:scale-102 hover:shadow-lg' : ''
                    } disabled:cursor-not-allowed`}
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#d4af37]/20 flex items-center justify-center font-bold">
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className="flex-1 text-lg">{option}</span>
                    {selectedAnswer !== null && index === question.correct && (
                      <CheckCircle className="text-green-500" size={24} />
                    )}
                    {selectedAnswer === index && index !== question.correct && (
                      <XCircle className="text-red-500" size={24} />
                    )}
                  </button>
                );
              })}
            </div>

            {selectedAnswer !== null && (
              <div className="royal-border p-6 bg-[#0a1929]/50 animate-pulse">
                <h3 className="text-sm uppercase tracking-wider text-[#d4af37] mb-2">Explanation</h3>
                <p className="text-base body-elegant text-gray-300">{question.explanation}</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
