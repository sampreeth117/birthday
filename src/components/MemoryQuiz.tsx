import { useState } from "react";

interface Question {
  question: string;
  options: string[];
  answer: number;
}

const quizData: Question[] = [
  {
    question: "Where did we take our first photo together?",
    options: ["College Canteen", "Graduation Day", "Cafe in E-city", "Temple"],
    answer: 1,
  },
  {
    question: "What did we eat on our first birthday celebration?",
    options: ["Pizza", "Burgers and Softies", "Home-cooked Pasta", "Ice Cream"],
    answer: 1,
  },
  {
    question: "Which memory involved sharing earphones?",
    options: ["Cafe Tour", "Lawn Memories", "First Temple Visit", "First Movie Night"],
    answer: 1,
  },
  {
    question: "Which memory involved sharing earphones?",
    options: ["Cafe Tour", "Lawn Memories", "First Temple Visit", "First Movie Night"],
    answer: 1,
  },
  {
    question: "Which memory involved sharing earphones?",
    options: ["Cafe Tour", "Lawn Memories", "First Temple Visit", "First Movie Night"],
    answer: 1,
  },
  {
    question: "Which memory involved sharing earphones?",
    options: ["Cafe Tour", "Lawn Memories", "First Temple Visit", "First Movie Night"],
    answer: 1,
  },
  {
    question: "Which memory involved sharing earphones?",
    options: ["Cafe Tour", "Lawn Memories", "First Temple Visit", "First Movie Night"],
    answer: 1,
  }
];

export default function MemoryQuiz() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const currentQuestion = quizData[current];

  const handleSelect = (index: number) => {
    if (selected !== null) return; // prevent re-answering

    setSelected(index);
    if (index === currentQuestion.answer) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (current + 1 < quizData.length) {
        setCurrent(current + 1);
        setSelected(null);
      } else {
        setShowResult(true);
      }
    }, 1200);
  };

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-blue-800/30 via-teal-800/20 to-transparent backdrop-blur-sm">
      <div className="max-w-xl mx-auto bg-white/10 backdrop-blur-md rounded-3xl p-10 shadow-2xl">
        {!showResult ? (
          <>
            <h2 className="text-3xl font-bold text-white mb-6 text-center">
              Memory Quiz
            </h2>
            <p className="text-white/80 mb-4 text-lg">{currentQuestion.question}</p>
            <div className="space-y-4">
              {currentQuestion.options.map((option, index) => {
                const isCorrect = selected !== null && index === currentQuestion.answer;
                const isWrong = selected === index && index !== currentQuestion.answer;

                return (
                  <button
                    key={index}
                    onClick={() => handleSelect(index)}
                    className={`w-full text-left px-6 py-3 rounded-xl transition-all duration-300 text-white ${
                      selected === null
                        ? "bg-white/20 hover:bg-white/30"
                        : isCorrect
                        ? "bg-green-600"
                        : isWrong
                        ? "bg-red-600"
                        : "bg-white/10"
                    }`}
                    disabled={selected !== null}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
            <div className="mt-6 text-center text-white/50 text-sm">
              Question {current + 1} of {quizData.length}
            </div>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-4xl font-bold text-white mb-4">You did it! 🎉</h2>
            <p className="text-xl text-white mb-6">
              Your Score: {score} / {quizData.length}
            </p>
            <p className="text-white/70">
              {score === quizData.length
                ? "Flawless memory Muddu! 💖"
                : score >= 2
                ? "Pretty impressive Ammi!"
                : "Every memory is still special — no worries ❤️"}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
