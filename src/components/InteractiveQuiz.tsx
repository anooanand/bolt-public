import React, { useState } from 'react';

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  points: number;
}

interface QuizProps {
  questions: QuizQuestion[];
  onComplete: (score: number, totalPoints: number) => void;
  title: string;
}

export function InteractiveQuiz({ questions, onComplete, title }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (!showExplanation) {
      setShowExplanation(true);
      return;
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowExplanation(false);
    } else {
      // Calculate final score
      let totalScore = 0;
      let totalPoints = 0;
      
      questions.forEach((question, index) => {
        totalPoints += question.points;
        if (selectedAnswers[index] === question.correctAnswer) {
          totalScore += question.points;
        }
      });
      
      setScore(totalScore);
      setQuizCompleted(true);
      onComplete(totalScore, totalPoints);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setShowExplanation(false);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowExplanation(false);
    setQuizCompleted(false);
    setScore(0);
  };

  const getScorePercentage = () => {
    const totalPoints = questions.reduce((sum, q) => sum + q.points, 0);
    return Math.round((score / totalPoints) * 100);
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 80) return 'text-blue-600';
    if (percentage >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreEmoji = (percentage: number) => {
    if (percentage >= 90) return '🌟';
    if (percentage >= 80) return '🎉';
    if (percentage >= 70) return '👍';
    return '💪';
  };

  if (quizCompleted) {
    const percentage = getScorePercentage();
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <div className="text-center">
          <div className="text-6xl mb-4">{getScoreEmoji(percentage)}</div>
          <h2 className="text-2xl font-bold mb-4">Quiz Complete!</h2>
          <div className={`text-4xl font-bold mb-2 ${getScoreColor(percentage)}`}>
            {percentage}%
          </div>
          <p className="text-gray-600 mb-6">
            You scored {score} out of {questions.reduce((sum, q) => sum + q.points, 0)} points
          </p>
          
          {/* Performance feedback */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold mb-2">Performance Breakdown:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-green-600">✓ Correct: </span>
                {selectedAnswers.filter((answer, index) => answer === questions[index].correctAnswer).length}
              </div>
              <div>
                <span className="text-red-600">✗ Incorrect: </span>
                {selectedAnswers.filter((answer, index) => answer !== questions[index].correctAnswer).length}
              </div>
            </div>
          </div>

          {/* Motivational message */}
          <div className="mb-6">
            {percentage >= 90 && (
              <p className="text-green-600 font-medium">Excellent work! You've mastered this topic! 🌟</p>
            )}
            {percentage >= 80 && percentage < 90 && (
              <p className="text-blue-600 font-medium">Great job! You have a solid understanding! 🎉</p>
            )}
            {percentage >= 70 && percentage < 80 && (
              <p className="text-yellow-600 font-medium">Good effort! Review the explanations to improve further. 👍</p>
            )}
            {percentage < 70 && (
              <p className="text-red-600 font-medium">Keep practicing! Review the material and try again. 💪</p>
            )}
          </div>

          <div className="flex space-x-4 justify-center">
            <button
              onClick={restartQuiz}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
            <button
              onClick={() => window.history.back()}
              className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Back to Lesson
            </button>
          </div>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const isAnswered = selectedAnswers[currentQuestion] !== undefined;
  const isCorrect = selectedAnswers[currentQuestion] === question.correctAnswer;

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">{title}</h2>
          <div className="text-sm opacity-90">
            Question {currentQuestion + 1} of {questions.length}
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="mt-4">
          <div className="w-full bg-white bg-opacity-20 rounded-full h-2">
            <div 
              className="bg-white h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Question content */}
      <div className="p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {question.question}
          </h3>
          
          {/* Answer options */}
          <div className="space-y-3">
            {question.options.map((option, index) => {
              let buttonClass = "w-full p-4 text-left border-2 rounded-lg transition-all ";
              
              if (!isAnswered) {
                buttonClass += selectedAnswers[currentQuestion] === index
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-blue-300 hover:bg-gray-50";
              } else {
                if (index === question.correctAnswer) {
                  buttonClass += "border-green-500 bg-green-50 text-green-800";
                } else if (selectedAnswers[currentQuestion] === index && !isCorrect) {
                  buttonClass += "border-red-500 bg-red-50 text-red-800";
                } else {
                  buttonClass += "border-gray-200 bg-gray-50 opacity-60";
                }
              }

              return (
                <button
                  key={index}
                  onClick={() => !showExplanation && handleAnswerSelect(index)}
                  disabled={showExplanation}
                  className={buttonClass}
                >
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full border-2 border-current mr-3 flex-shrink-0 flex items-center justify-center">
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span>{option}</span>
                    {showExplanation && index === question.correctAnswer && (
                      <span className="ml-auto text-green-600">✓</span>
                    )}
                    {showExplanation && selectedAnswers[currentQuestion] === index && !isCorrect && (
                      <span className="ml-auto text-red-600">✗</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Explanation */}
        {showExplanation && (
          <div className={`p-4 rounded-lg mb-6 ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
            <div className="flex items-start space-x-3">
              <div className={`text-xl ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                {isCorrect ? '✅' : '❌'}
              </div>
              <div>
                <div className={`font-medium mb-2 ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                  {isCorrect ? 'Correct!' : 'Incorrect'}
                </div>
                <p className="text-gray-700">{question.explanation}</p>
                <div className="mt-2 text-sm text-gray-600">
                  Points: {isCorrect ? question.points : 0}/{question.points}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation buttons */}
        <div className="flex justify-between items-center">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className={`px-4 py-2 rounded-lg ${
              currentQuestion === 0
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gray-600 text-white hover:bg-gray-700'
            }`}
          >
            Previous
          </button>

          <div className="text-sm text-gray-500">
            {!showExplanation && isAnswered && "Click Next to see explanation"}
            {!isAnswered && "Select an answer to continue"}
          </div>

          <button
            onClick={handleNext}
            disabled={!isAnswered}
            className={`px-6 py-2 rounded-lg ${
              !isAnswered
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : showExplanation
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {showExplanation ? (
              currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question'
            ) : (
              'Show Answer'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// Sample quiz data for Day 1
export const day1AssessmentQuiz: QuizQuestion[] = [
  {
    id: "q1",
    question: "Which assessment criterion carries the highest weight in NSW Selective School writing evaluation?",
    options: [
      "Ideas & Content (30%)",
      "Structure & Organization (25%)",
      "Language & Vocabulary (25%)",
      "Spelling & Grammar (20%)"
    ],
    correctAnswer: 0,
    explanation: "Ideas & Content is weighted at 30% because original, creative thinking and relevant content are considered most important in demonstrating a student's writing ability.",
    points: 10
  },
  {
    id: "q2",
    question: "What should a strong opening paragraph include?",
    options: [
      "Only an attention-grabbing hook",
      "A hook, background information, and clear thesis statement",
      "Just the main argument",
      "A summary of all points to be discussed"
    ],
    correctAnswer: 1,
    explanation: "A strong opening should hook the reader, provide necessary background context, and present a clear thesis that guides the entire piece.",
    points: 10
  },
  {
    id: "q3",
    question: "Which of these demonstrates 'show, don't tell' writing?",
    options: [
      "She was very angry.",
      "Sarah felt frustrated with the situation.",
      "Sarah slammed the door, her knuckles white as she gripped the handle.",
      "The girl was mad and upset."
    ],
    correctAnswer: 2,
    explanation: "Option C shows anger through specific actions and physical details rather than simply stating the emotion, making the writing more vivid and engaging.",
    points: 15
  },
  {
    id: "q4",
    question: "What is the most important factor in paragraph organization?",
    options: [
      "Having exactly 5 sentences per paragraph",
      "Starting each paragraph with 'Firstly', 'Secondly', etc.",
      "Ensuring each paragraph has one clear main idea with supporting details",
      "Making all paragraphs the same length"
    ],
    correctAnswer: 2,
    explanation: "Good paragraph structure focuses on one clear main idea per paragraph, supported by relevant details and examples, regardless of length or transition words used.",
    points: 10
  },
  {
    id: "q5",
    question: "How can you improve your vocabulary score in the assessment?",
    options: [
      "Use the longest words possible",
      "Repeat the same descriptive words throughout",
      "Use varied, appropriate vocabulary that fits the context and audience",
      "Include as many adjectives as possible"
    ],
    correctAnswer: 2,
    explanation: "Effective vocabulary use means choosing words that are appropriate for your audience and purpose, showing variety without being unnecessarily complex or repetitive.",
    points: 15
  }
];