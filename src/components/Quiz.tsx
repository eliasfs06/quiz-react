import { useState } from 'react';
import { QuestionType } from '../types/types';
import Question from './Question';

interface QuizProps {
  questions: QuestionType[];
  finishQuiz: (userScore: number) => void;
}

function Quiz({ questions, finishQuiz }: QuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  let updatedScore = score;

  const handleAnswer = (answer: string) => {
    const currentQuestion = questions[currentQuestionIndex];

    if (answer === currentQuestion.answer) {
      updatedScore += 1;
      setScore(updatedScore);
    }

    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      finishQuiz(updatedScore); 
    }
  };

  return (
    <div className="mt-3">
      <div className="card-body">
        <h2 className="card-title">Quiz</h2>
          <p className="mt-2 mb-2">Score: {updatedScore}</p>
          <Question question={questions[currentQuestionIndex]} handleAnswer={handleAnswer} />
      </div>
    </div>
  );
}

export default Quiz;
