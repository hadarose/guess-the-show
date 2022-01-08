import React, { useEffect, useState } from "react";
import Show from "./Show";
import WrongGuesses from "./WrongGuesses";
import PopUp from "./PopUp";

const GuessingGame = ({ shows }) => {
  const [shouldPlay, setShouldPlay] = useState(true);
  const [correctGuesses, setCorrectGuesses] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState([]);
  const [points, setPoints] = useState(3);
  const [displayHint, setDisplayHint] = useState(false);
  const [randomShowName, setRandomShowName] = useState("");
  const [randomShowHint, setRandomShowHint] = useState("");

  useEffect(() => {
    if (shows.length === 0) {
      return;
    }

    const randomIndex = Math.floor(Math.random() * shows.length);
    setRandomShowName(
      shows[randomIndex].name.toLowerCase().replace(/[^a-zA-Z ]/g, "")
    );
    setRandomShowHint(shows[randomIndex].overview);
  }, [shows]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const { key, keyCode } = event;

      if (shouldPlay && keyCode > 64 && keyCode < 91) {
        const letter = key.toLowerCase();
        if (randomShowName.includes(letter)) {
          if (!correctGuesses.includes(letter)) {
            setCorrectGuesses((current) => [...current, letter]);
          }
        } else if (!wrongGuesses.includes(letter)) {
          setWrongGuesses((current) => [...current, letter]);
          setPoints(points - 1);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [correctGuesses, wrongGuesses, points, randomShowName, shouldPlay]);

  const nextStage = () => {
    setCorrectGuesses([]);
    setWrongGuesses([]);

    const randomIndex = Math.floor(Math.random() * shows.length);
    setRandomShowName(
      shows[randomIndex].name.toLowerCase().replace(/[^a-zA-Z ]/g, "")
    );
    setRandomShowHint(shows[randomIndex].overview);
  };

  const replay = () => {
    setShouldPlay(true);
    setCorrectGuesses([]);
    setWrongGuesses([]);
    setPoints(3);
  };

  return (
    <>
      <div>
        <div>
          <h1 className="display-6">You have {points} life points left!</h1>
          <Show randomShow={randomShowName} correctGuesses={correctGuesses} />
          <div className="mt-3" style={{ height: "400px" }}>
            <div className="d-flex flex-column align-items-center">
              <button
                className="btn btn-warning"
                onClick={() => setDisplayHint(!displayHint)}
              >
                Hint
              </button>
              {displayHint && (
                <div className="w-75 p-2 mt-2 border rounded">
                  {randomShowHint}
                </div>
              )}
            </div>
          </div>
        </div>
        <WrongGuesses wrongGuesses={wrongGuesses} />
      </div>
      <PopUp
        setShouldPlay={setShouldPlay}
        points={points}
        correctGuesses={correctGuesses}
        wrongGuesses={wrongGuesses}
        randomShow={randomShowName}
        nextStage={nextStage}
        replay={replay}
      />
    </>
  );
};

export default GuessingGame;
