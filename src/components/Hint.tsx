import React from "react";

type Props = {
  setDisplayHint: (displayHint: boolean) => void;
  displayHint: boolean;
  randomShowHint: string | undefined;
};

const Hint = ({ setDisplayHint, displayHint, randomShowHint }: Props) => (
  <div className="mt-3" style={{ height: "400px" }}>
    <div className="d-flex flex-column align-items-center">
      <button
        className="btn btn-warning"
        onClick={() => setDisplayHint(!displayHint)}
      >
        Hint
      </button>
      {displayHint && (
        <div className="w-75 p-2 mt-2 border rounded">{randomShowHint}</div>
      )}
    </div>
  </div>
);

export default Hint;
