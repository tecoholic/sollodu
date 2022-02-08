import { toTamilLetters, vowels } from "../utils";

const verify = (word, attempt) => {
  const target = toTamilLetters(word);
  const guess = toTamilLetters(attempt);

  // pull out the exact matches from ref and mark everything else as invalid
  let results = target.map((letter, i) => {
    if (letter === guess[i]) {
      target[i] = "";
      return "FOUND";
    }
    return "INVALID";
  });

  for (let i = 0; i < guess.length; i++) {
    if (results[i] === "FOUND") {
      continue;
    }

    let otherPos = target.indexOf(guess[i]);
    if (otherPos > -1) {
      // exact match - elsewhere
      results[i] = "OTHER POSITION";
      target[otherPos] = ""; // use up the other position match, so no more mathces are made
    } else if (guess[i][0] === target[i][0]) {
      // partial match - MEI
      results[i] = "MEI MATCH";
    } else if (
      guess[i].length === 2 &&
      target[i].length === 2 &&
      guess[i][1] === target[i][1] // the diacritics match
    ) {
      results[i] = "UYIR MATCH";
    } else if (
      guess[i].length === 1 &&
      target[i].length === 1 &&
      !vowels[target[i]] &&
      target[i] !== "ஃ" &&
      guess[i] !== "ஃ" &&
      !vowels[guess[i]] // akara varisai
    ) {
      results[i] = "UYIR MATCH";
    }
  }

  return results;
};

export default verify;
