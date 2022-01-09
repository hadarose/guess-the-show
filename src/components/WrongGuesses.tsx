import React from "react";

type Props = {
  wrongGuesses: Array<string>;
};

const WrongGuesses = ({ wrongGuesses }: Props) => (
  <div>
    {wrongGuesses.length > 0 && (
      <div>
        <h1 className="display-6">Wrong Guesses:</h1>
        {wrongGuesses.map((letter, index) => (
          <span className="fs-3" key={index}>
            {letter} &nbsp;
          </span>
        ))}
      </div>
    )}
  </div>
);

export default WrongGuesses;
