import { QuestionType } from '../types/types';


export const fetchQuestions = async () => {
  try {
    const response = await fetch('./data/data.txt');
    const content = await response.text();
    const questionsArray = parseQuestions(content);
    return questionsArray;
    console.log(questionsArray)
  } catch (error) {
    console.error('Error fetching questions:', error);
  }
};


const parseQuestions = (content: string): QuestionType[] => {
  const questions: QuestionType[] = [];
  const lines = content.split('\n');

  lines.forEach((line: string) => {
    if (line.trim().length > 0) {
      try {
        const [question, answer] = JSON.parse(line);
        questions.push({
          question: question.trim(),
          answer: answer.trim()
        });
      } catch (parseError) {
        console.debug(parseError);
      }
    }
  });

  return questions;
};