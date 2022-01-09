import React, { useEffect, useState } from "react";
import Show from "./Show";
import Hint from "./Hint";
import WrongGuesses from "./WrongGuesses";
import PopUp from "./PopUp";
import type { TVShow } from "../App";

type Props = {
  shows: Array<TVShow>;
};

const GuessingGame = ({ shows }: Props) => {
  const [shouldPlay, setShouldPlay] = useState<boolean>(true);
  const [correctGuesses, setCorrectGuesses] = useState<Array<string>>([]);
  const [wrongGuesses, setWrongGuesses] = useState<Array<string>>([]);
  const [points, setPoints] = useState<number>(3);
  const [displayHint, setDisplayHint] = useState<boolean>(false);
  const [randomShowName, setRandomShowName] = useState<string | undefined>("");
  const [randomShowHint, setRandomShowHint] = useState<string | undefined>("");

  useEffect(() => {
    if (shows.length === 0) {
      return;
    }

    const randomIndex: number = Math.floor(Math.random() * shows.length);
    setRandomShowName(
      shows[randomIndex]?.name.toLowerCase().replace(/[^a-zA-Z ]/g, "")
    );
    setRandomShowHint(shows[randomIndex]?.overview);
  }, [shows]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      const { key } = event;

      if (shouldPlay && !/[^a-zA-Z]/.test(key)) {
        const letter: string = key.toLowerCase();
        if (randomShowName?.includes(letter)) {
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
    setShouldPlay(true);
    setCorrectGuesses([]);
    setWrongGuesses([]);

    const randomIndex = Math.floor(Math.random() * shows.length);
    setRandomShowName(
      shows[randomIndex]?.name.toLowerCase().replace(/[^a-zA-Z ]/g, "")
    );
    setRandomShowHint(shows[randomIndex]?.overview);
  };

  const replay = () => {
    setShouldPlay(true);
    setCorrectGuesses([]);
    setWrongGuesses([]);
    setPoints(3);
  };

  return (
    <>
      <div className="container">
        <div className="row">
          {wrongGuesses.length > 0 && (
            <div className="col-4">
              <WrongGuesses wrongGuesses={wrongGuesses} />
            </div>
          )}
          <div
            className={
              wrongGuesses.length > 0 ? "col-8 text-white" : "col text-white"
            }
          >
            <h1 className="display-6">You have {points} life points left!</h1>
            <Show randomShow={randomShowName} correctGuesses={correctGuesses} />
            <Hint
              setDisplayHint={setDisplayHint}
              displayHint={displayHint}
              randomShowHint={randomShowHint}
            />
          </div>
        </div>
      </div>
      <PopUp
        setShouldPlay={setShouldPlay}
        points={points}
        correctGuesses={correctGuesses}
        randomShow={randomShowName}
        nextStage={nextStage}
        replay={replay}
      />
    </>
  );
};

export default GuessingGame;
