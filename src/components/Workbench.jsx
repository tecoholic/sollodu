import React, { useState, useEffect, useRef } from "react";
import InputBoxes from "./InputBoxes";
import HistoryBoxes from "./HistoryBoxes";
import verify from "./verifier";
import { toTamilLetters } from "../utils";

function Workbench({
  word,
  length,
  letters,
  complete,
  blacklist,
  onVerified,
  onSuccess,
}) {
  const [guesses, setGuesses] = useState([]);
  const [highlightEmpty, setHighlightEmpty] = useState(false);
  const verfiyBtn = useRef(null);
  const [readyForSuccess, setReadyForSuccess] = useState(false);

  const checkWord = () => {
    if (letters.length !== length) {
      setHighlightEmpty(true);
      return;
    }
    // call the API only when all the boxes are full
    let results = verify(word, letters);
    setGuesses([...guesses, { letters, results }]);
    let refLetters = toTamilLetters(word);
    let wrongLetters = letters.filter(
      (l, i) => results[i] === "INVALID" && refLetters.indexOf(l) === -1
    );
    onVerified({ wrongLetters });

    if (results.reduce((p, cur) => p && cur === "FOUND", true)) {
      setReadyForSuccess(true);
    }
    verfiyBtn.current.scrollIntoView();
  };

  const handleVerifyBtn = () => {
    if (readyForSuccess) {
      onSuccess();
      return;
    }
    checkWord();
  };

  // reset red border when user starts to type again
  useEffect(() => {
    setHighlightEmpty(false);
  }, [letters]);

  // reset the work area if the word is changed
  useEffect(() => {
    setGuesses([]);
    setReadyForSuccess(false);
  }, [word]);

  return (
    <div className="is-flex is-flex-direction-column is-justify-content-space-between workbench">
      <div id="historyboxes">
        {guesses.map((g, i) => (
          <HistoryBoxes key={i} guess={g} />
        ))}
      </div>
      {!complete ? (
        <div>
          {!readyForSuccess ? (
            <InputBoxes
              length={length}
              letters={letters}
              highlightEmpty={highlightEmpty}
              blacklist={blacklist}
            />
          ) : null}
          <div className="my-3 buttons">
            <button
              id="verify-button"
              ref={verfiyBtn}
              className="button is-primary mx-auto"
              onClick={handleVerifyBtn}
            >
              {readyForSuccess ? "?????????????????? ????????????" : "?????????????????????"}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Workbench;
