'use client';

import { useState } from 'react';
import { ScreenName, Question } from '@/types';
import { buildShuffledQuestions } from '@/lib/scoring';
import IntroScreen from './IntroScreen';
import TestScreen from './TestScreen';
import ResultScreen from './ResultScreen';

export default function App() {
  const [screen, setScreen] = useState<ScreenName>('intro');
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);

  function startTest() {
    setAnswers({});
    setShuffledQuestions(buildShuffledQuestions());
    setScreen('test');
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function goToIntro() {
    setScreen('intro');
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function goToResult() {
    setScreen('result');
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  return (
    <div className="shell">
      {screen === 'intro' && <IntroScreen onStart={startTest} />}
      {screen === 'test' && (
        <TestScreen
          shuffledQuestions={shuffledQuestions}
          answers={answers}
          onAnswerChange={(id, value) => setAnswers(prev => ({ ...prev, [id]: value }))}
          onAnswersChange={setAnswers}
          onSubmit={goToResult}
          onBack={goToIntro}
        />
      )}
      {screen === 'result' && (
        <ResultScreen
          answers={answers}
          shuffledQuestions={shuffledQuestions}
          onRestart={startTest}
          onHome={goToIntro}
        />
      )}
    </div>
  );
}
