import React from "react";
import { vowels, diacritics } from "../utils";

function KeyRow({ glyphs, prevChar, blacklist, onType }) {
  return (
    <div className="my-1 is-flex is-justify-content-center">
      {glyphs.map((g) => (
        <button
          className={`key ${g}`}
          key={g}
          onClick={() => onType(g)}
          disabled={
            blacklist.has(prevChar + g) ||
            (vowels[g] && blacklist.has(g)) ||
            (g === "" && blacklist.has(prevChar))
          }
        >
          {!vowels[prevChar] &&
          diacritics[g] &&
          !diacritics[prevChar] &&
          prevChar !== "\u2190" &&
          prevChar !== "\u2191"
            ? prevChar + g
            : g}
        </button>
      ))}
    </div>
  );
}

export default KeyRow;
