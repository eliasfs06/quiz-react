import { useState } from 'react';
import { QuestionType } from '../types/types';

interface QuestionProps {
  question: QuestionType;
  handleAnswer: (answer: string) => void;
}

function Question({ question, handleAnswer }: QuestionProps) {
  const { question: questionText, answer } = question;
  const [userAnswer, setUserAnswer] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserAnswer(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleAnswer(userAnswer);
    setUserAnswer('');
  };

  return (
    <div>
      <h4>{questionText}</h4>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={userAnswer}
          onChange={handleChange}
          className="form-control"
          placeholder="Enter your answer"
        />
        <button type="submit" className="btn btn-primary mt-4">
          Submit Answer
        </button>
      </form>
      {answer && <p>Correct answer: {answer}</p>}
    </div>
  );
}

export default Question;
