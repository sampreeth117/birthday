import { useState } from "react";

interface Question {
  question: string;
  options: string[];
  answer: number;
}

const quizData: Question[] = [
  {
    question: "Where did we take our first photo together?",
    options: ["Canteen","Hotel" , "Park" , "College Trip" ],
    answer: 3,
  },
  {
    question: "What did we eat on our first birthday celebration?",
    options: ["Pizza", "Burgers and Softies", "Home-cooked Pasta", "Ice Cream"],
    answer: 1,
  },
  {
    question: "What was one of the first food we had together after we met at office?",
    options: ["Dosa", "Poori", "Golgappa", "Pizza"],
    answer: 3,
  },
  {
    question: "What was the first cafe we visited together?",
    options: ["Bangalore Central Cafe", "Starbucks", "Frozen Bottle", "Cafe Coffee Day"],
    answer: 2,
  },
  {
    question: "What did I lose when I first visited E-city Office?",
    options: ["Bike Key", "Wallet", "Charger", "Phone"],
    answer: 0,
  },
  {
    question: "Whom did I like and you disliked in bigg boss?",
    options: ["Gouthami Jadav", "Mokshitha Pai", "Bhavya Gowda", "Chaithra Kundapura"],
    answer: 2,
  },
  {
    question: "What was the chocolate you bought me from E-city Office?",
    options: ["Dairy Milk", "Milk Chocolate", "Cadbury Silk", "Dark Chocolate"],
    answer: 1,
  },
  {
    question: "What do I still have with me which you have given me?",
    options: ["Imli wrapper", "Keychain", "Chocolate", "Pen"],
    answer: 0,
  },
  {
    question: "What was my first birthday gift to you?",
    options: ["Chocolates", "Earphone", "Book", "Watch"],
    answer: 1,
  },
  {
    question: "For the last question, when did I first confess my feelings?",
    options: ["2025-04-01", "2025-02-14", "2025-03-19", "2025-03-01"],
    answer: 2,
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
            <h2 className="text-4xl font-bold text-white mb-4">You did it 🎉</h2>
            <p className="text-xl text-white mb-6">
              You guessed: {score} / {quizData.length}
            </p>
            <p className="text-white font-bold mb-4">
              {score === quizData.length
                ? "Flawless memory Muddu! 💖"
                : score >= 2
                ? "Pretty impressive Ammi!"
                : "Every memory is still special — no worries ❤️"}
            </p>
            <br/>
            <p>
              <span className="text-white">This quiz was made with love. I hope it brings back some beautiful memories! 💕</span>
              <br/>
              <span className="text-blue-200">PS - You can retake the quiz anytime by refreshing the web page.</span>
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
