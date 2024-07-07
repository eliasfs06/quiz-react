import { useState, useEffect } from 'react';
import { QuestionType } from '../types/types';
import { fetchQuestions } from '../utils/questionsUtils';

interface QuizSetupProps {
  startQuiz: (selectedQuestions: QuestionType[], userName: string) => void;
}

function QuizSetup({ startQuiz }: QuizSetupProps) {
  const [numQuestions, setNumQuestions] = useState<number>(1);
  const [userName, setUserName] = useState<string>('');
  const [allQuestions, setAllQuestions] = useState<QuestionType[]>([]);

  useEffect(() => {
    const fetchAndSetQuestions = async () => {
      const questions = await fetchQuestions();
      if (questions) {
        setAllQuestions(questions);
      }
    };
    fetchAndSetQuestions();
  }, []);

  const handleStart = () => {
    const selectedQuestions = [];
    const usedIndices = new Set();
  
    while (selectedQuestions.length < numQuestions) {
      const randomIndex = Math.floor(Math.random() * allQuestions.length);
      if (!usedIndices.has(randomIndex)) {
        usedIndices.add(randomIndex);
        selectedQuestions.push(allQuestions[randomIndex]);
      }
    }
  
    startQuiz(selectedQuestions, userName); 
  };
  

  return (
    <div className="mt-3">
      <div className="card-body">
        <h4 className="card-title mb-3">Setup do Quiz</h4>
        <div className="form-group">
          <label>Seu Nome:</label>
          <input
            type="text"
            className="form-control mt-1"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Número de perguntas:</label>
          <input
            type="number"
            className="form-control mt-1"
            value={numQuestions}
            onChange={(e) => setNumQuestions(Number(e.target.value))}
          />
        </div>
        <button className="btn btn-primary mt-3" onClick={handleStart}>Iniciar</button>
      </div>
    </div>
  );
}

export default QuizSetup;
