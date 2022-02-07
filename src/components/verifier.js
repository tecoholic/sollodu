import { toTamilLetters, vowels } from "../utils";

const verify = (word, attempt) => {
  const REF = toTamilLetters(word);
  const ATT = toTamilLetters(attempt);
  let results = Array(ATT.length).fill("INVALID");

  for (let i = 0; i < ATT.length; i++) {
    let mei = ATT[i][0];

    // letter exists in the exact position
    if (REF[i] === ATT[i]) {
      results[i] = "FOUND";
    } else if (REF.indexOf(ATT[i]) !== -1) {
      results[i] = "OTHER POSITION";
    } else if (vowels[mei]) {
      // MEI match
      continue; // vowel found - no uyir mei checks
    } else if (REF[i].includes(mei)) {
      results[i] = "MEI MATCH";
    } else if (
      (ATT[i].length === 2 && REF[i].includes(ATT[i][1])) || // the diacritic matches
      (ATT[i].length === 1 && REF[i].length === 1 && !vowels[ATT[i]]) // akara varisai matches (without diacritic)
    ) {
      results[i] = "UYIR MATCH";
    }
  }
  return results;
};

export default verify;
