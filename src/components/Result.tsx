interface ResultProps {
  score: number;
  restartQuiz: () => void;
}

function Result({ score, restartQuiz }: ResultProps) {
  return (
    <div className="card-body">
      <h3 className="mt-3 card-title">Quiz result</h3>
      <p>Your score is: {score}</p>
      <button className="mt-2 btn btn-primary" onClick={restartQuiz}>Restart</button>
    </div>
  );
}

export default Result;