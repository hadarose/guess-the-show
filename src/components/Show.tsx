import React from "react";

type Props = {
  randomShow: String | undefined;
  correctGuesses: Array<string>;
};

const Show = ({ randomShow, correctGuesses }: Props) => {
  console.log({ randomShow });
  return (
    <div>
      {randomShow?.split("").map((letter, index) => {
        if (letter === " ") {
          return <span key={index}>&nbsp;&nbsp;&nbsp;&nbsp;</span>;
        } else {
          return (
            <span className="letter" key={index}>
              {correctGuesses.includes(letter) ? letter : ""}
            </span>
          );
        }
      })}
    </div>
  );
};
export default Show;
