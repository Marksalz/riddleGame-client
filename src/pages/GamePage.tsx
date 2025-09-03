import { useState, useEffect } from "react";
import Header from "../components/Header";
import Riddle from "../components/Riddle";

export default function GamePage() {
  loadRiddlesToLocalStorage();
  const riddlesString = localStorage.getItem("riddles");
  const riddlesFromStorage = riddlesString ? JSON.parse(riddlesString) : [];
  const [currentRiddleIdx, setCurrentRiddleIdx] = useState(0);
  const [isSolved, setIsSolved] = useState(false);
  const riddles = riddlesFromStorage;
  //const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (isSolved && currentRiddleIdx < riddles.length - 1) {
      const timer = setTimeout(() => {
        setCurrentRiddleIdx((idx) => idx + 1);
        setIsSolved(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isSolved, currentRiddleIdx, riddles.length]);

  return (
    <div>
      <Header headerText="Game" btnText="Light/Dark mode" />
      {currentRiddleIdx < riddles.length ? (
        <Riddle
          riddle={riddles[currentRiddleIdx]}
          isSolved={isSolved}
          setIsSolved={setIsSolved}
          //timeLeft={timeLeft}
          
        />
      ) : (
        <div>All riddles solved!</div>
      )}
    </div>
  );
}

function loadRiddlesToLocalStorage() {
  const riddles = [
    {
      name: "Logic Puzzle",
      taskDescription:
        "I speak without a mouth and hear without ears. What am I?",
      correctAnswer: "Echo",
      difficulty: "medium",
      timeLimit: 25,
      hint: "You can hear it in a canyon.",
    },
    {
      name: "Hiiii",
      taskDescription: "What gets wetter the more it dries?",
      correctAnswer: "Towel",
      difficulty: "medium",
      timeLimit: 20,
      hint: "You use it after a shower.",
    },
    {
      name: "kkk",
      taskDescription: "Which of the following numbers is even?",
      correctAnswer: "8",
      choices: ["7", "8", "13", "21"],
      difficulty: "easy",
      timeLimit: 15,
      hint: "It's the only number divisible by 2.",
    },
    {
      name: "ABC",
      taskDescription: "What comes after D?",
      correctAnswer: "E",
      difficulty: "easy",
      timeLimit: 8,
      hint: "maybe E...",
    },
    {
      name: "Sample Riddle",
      taskDescription: "What has a head and a tail but no body?",
      correctAnswer: "Coin",
      difficulty: "easy",
      timeLimit: 10,
      hint: "It's money.",
    },
    {
      name: "Sample Riddle",
      taskDescription: "What has a head and a tail but no body?",
      correctAnswer: "Coin",
      difficulty: "easy",
      timeLimit: 10,
      hint: "It's money.",
    },
    {
      name: "Sample Riddle",
      taskDescription: "What has a head and a tail but no body?",
      correctAnswer: "Coin",
      difficulty: "easy",
      timeLimit: 10,
      hint: "It's money.",
    },
    {
      name: "Test1",
      taskDescription: "2+2",
      correctAnswer: "4",
      difficulty: "easy",
      timeLimit: 5,
      hint: "4...",
    },
    {
      name: "Numbers",
      taskDescription: "What comes after 3?",
      correctAnswer: "4",
      difficulty: "easy",
      timeLimit: 6,
      hint: "after 3",
      choices: ["77", "5", "6", "4"],
    },
  ];
  localStorage.setItem("riddles", JSON.stringify(riddles));
}
