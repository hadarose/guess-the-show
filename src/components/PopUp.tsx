import React, { useEffect } from "react";

type Props = {
  correctGuesses: Array<string>;
  points: number;
  randomShow: string | undefined;
  setShouldPlay: (shouldPlay: boolean) => void;
  nextStage: (event: React.MouseEvent<HTMLButtonElement>) => void;
  replay: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const PopUp = ({
  correctGuesses,
  points,
  randomShow,
  setShouldPlay,
  nextStage,
  replay,
}: Props) => {
  const randomShowNoSpaces = randomShow?.split(" ").join("").split("");

  let message = "";
  let loseMessage = "";
  let shouldPlay = true;
  const checkWin = () => {
    let status = "win";
    randomShowNoSpaces?.forEach((letter) => {
      if (!correctGuesses.includes(letter)) {
        status = "";
      }
    });

    if (!points) {
      status = "lose";
    }

    return status;
  };

  if (checkWin() === "win") {
    message = "Execellent! 😃 ";
  } else if (checkWin() === "lose") {
    message = "Game Over 😕";
    loseMessage = `The show was: ${randomShow?.toUpperCase()}`;
    shouldPlay = false;
  }

  useEffect(() => {
    setShouldPlay(shouldPlay);
  });

  return (
    <div
      className="popup-container"
      style={message !== "" ? { display: "flex" } : {}}
    >
      <div className="popup">
        <h2>{message}</h2>
        <h3>{loseMessage}</h3>
        <button onClick={shouldPlay ? nextStage : replay}>
          {shouldPlay ? "Next Stage " : "Play Again"}
        </button>
      </div>
    </div>
  );
};

export default PopUp;
