import React from "react";

const WrongGuesses = ({ wrongGuesses }) => (
  <div>
    {wrongGuesses.length > 0 && <p>Wrong Guesses:</p>}
    {wrongGuesses.map((letter, index) => (
      <span key={index}>{letter} &nbsp;</span>
    ))}
  </div>
);

export default WrongGuesses;
