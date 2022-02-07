import { toTamilLetters, vowels } from "../utils";

const verify = (letters) => {
  let word = "உதயசூரியன்";
  let REF = toTamilLetters(word);
  let results = Array(letters.length).fill("LETTER_NOT_FOUND");

  for (let i = 0; i < letters.length; i++) {
    // letter exists in the exact position
    console.log("processing: ", letters[i]);

    if (REF[i] === letters[i]) {
      results[i] = "FOUND";
      console.log("FOUND");
      continue;
    }
    if (REF.indexOf(letters[i]) !== -1) {
      results = "OTHER POSITION";
      console.log("OTHER POSITION");
      continue;
    }

    // MEI match
    let mei = letters[i][0];
    if (vowels[mei]) {
      console.log("Vowel found");
      continue;
    } else {
      if (REF[i].includes(mei)) {
        console.log("MEI MATCH");
        results[i] = "MEI MATCH";
        continue;
      }
    }

    if (letters[i].length === 2) {
      let kombu = letters[i][1];
      if (REF[i].includes(kombu)) {
        console.log("UYIR MATCH");
        results[i] = "UYIR MATCH";
      }
    }
    console.log("INVALID");
  }
  return results;
};

export default verify;
