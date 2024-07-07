import React from 'react';

interface RankingProps {
  results: { name: string; score: number }[];
}

const Ranking: React.FC<RankingProps> = ({ results }) => {
  const sortedResults = results.sort((a, b) => b.score - a.score);

  return (
    <div className="mt-1">
      <h3>Ranking</h3>
      <ol>
        {sortedResults.map((result, index) => (
          <li key={index}>{result.name} - Score: {result.score}</li>
        ))}
      </ol>
    </div>
  );
};

export default Ranking;
