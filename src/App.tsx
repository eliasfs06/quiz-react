import { useState } from 'react';
import QuizSetup from './components/QuizSetup';
import Quiz from './components/Quiz';
import Result from './components/Result';
import Ranking from './components/Ranking';
import { QuestionType } from './types/types';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [selectedQuestions, setSelectedQuestions] = useState<QuestionType[]>([]);
  const [results, setResults] = useState<{ name: string; score: number }[]>([]); 
  const [userName, setUserName] = useState("");

  const startQuiz = (questions: QuestionType[], name: string) => {
    setSelectedQuestions(questions);
    setQuizStarted(true);
    setQuizFinished(false);
    setUserName(name);
  };

  const finishQuiz = (updatedScore: number) => {
    setQuizStarted(false);
    setQuizFinished(true);

    const newResult = { name: userName, score: updatedScore };
    setResults([...results, newResult]);
  };

  const restartQuiz = () => {
    setQuizStarted(false);
    setQuizFinished(false);
    setSelectedQuestions([]);
  };

  return (
    <div className="d-flex align-items-center justify-content-center" style={{ height: "100vh", backgroundColor: "azure" }}>
      <div className="card text-center shadow" style={{ width: "600px", height: "500px" }}>
        <div className="card-body d-flex flex-column justify-content-center">
          <h1 className="mt-4 mb-4">Quiz App</h1>
          {!quizStarted && !quizFinished && <QuizSetup startQuiz={startQuiz} />}
          {quizStarted && selectedQuestions.length > 0 && <Quiz questions={selectedQuestions} finishQuiz={finishQuiz} />}
          {quizStarted && selectedQuestions.length === 0 && <p>Carregando perguntas...</p>}
          {quizFinished && <Result score={selectedQuestions.length === 0 ? 0 : selectedQuestions.length} restartQuiz={restartQuiz} />}
          {(quizFinished || !quizStarted) && <Ranking results={results} />}
        </div>
      </div>
    </div>
  );
}

export default App;
