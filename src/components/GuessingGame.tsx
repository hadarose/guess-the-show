import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_KEY } from "../constants/api-key";
import Points from "./Points";
import Show from "./Show";
import Hint from "./Hint";
import WrongGuesses from "./WrongGuesses";
import PopUp from "./PopUp";
import type { TVShow } from "../App";

const GuessingGame = () => {
  const [apiShows, setApiShows] = useState<Array<TVShow>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [shouldPlay, setShouldPlay] = useState<boolean>(true);
  const [correctGuesses, setCorrectGuesses] = useState<Array<string>>([]);
  const [wrongGuesses, setWrongGuesses] = useState<Array<string>>([]);
  const [points, setPoints] = useState<number>(3);
  const [displayHint, setDisplayHint] = useState<boolean>(false);
  const [randomShowName, setRandomShowName] = useState<string | undefined>("");
  const [randomShowHint, setRandomShowHint] = useState<string | undefined>("");

  useEffect(() => {
    try {
      axios
        .get("https://api.themoviedb.org/3/tv/top_rated?api_key=" + API_KEY)
        .then((response) => {
          setApiShows(response.data.results);
          setIsLoading(false);
        });
    } catch (error) {
      console.log("Error fetching the data ", error);
    }
  }, []);

  useEffect(() => {
    if (apiShows.length === 0) {
      return;
    }

    const randomIndex: number = Math.floor(Math.random() * apiShows.length);

    setRandomShowName(
      apiShows[randomIndex]?.name.toLowerCase().replace(/[^a-zA-Z ]/g, "")
    );
    setRandomShowHint(apiShows[randomIndex]?.overview);
  }, [apiShows]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      const { key } = event;

      if (
        shouldPlay &&
        !/[^a-zA-Z]/.test(key) &&
        key !== "Enter" &&
        key !== "Space" &&
        key !== "Escape" &&
        key !== "Shift" &&
        key !== "Alt" &&
        key !== "CapsLock" &&
        key !== "Control" &&
        key !== "Meta"
      ) {
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
  });

  const nextStage = () => {
    setShouldPlay(true);
    setCorrectGuesses([]);
    setWrongGuesses([]);

    const randomIndex = Math.floor(Math.random() * apiShows.length);
    setRandomShowName(
      apiShows[randomIndex]?.name.toLowerCase().replace(/[^a-zA-Z ]/g, "")
    );
    setRandomShowHint(apiShows[randomIndex]?.overview);
  };

  const replay = () => {
    console.log("am I in replay?");

    setShouldPlay(true);
    setCorrectGuesses([]);
    setWrongGuesses([]);
    setPoints(3);
  };

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
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
                  wrongGuesses.length > 0
                    ? "col-8 text-white"
                    : "col text-white"
                }
              >
                <Points points={points} />
                {randomShowName && (
                  <Show
                    randomShow={randomShowName}
                    correctGuesses={correctGuesses}
                  />
                )}
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
      )}
    </>
  );
};

export default GuessingGame;
