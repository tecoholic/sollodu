export const diacritics = {
  "\u0B82": true,
  "\u0BBE": true,
  "\u0BBF": true,
  "\u0BC0": true,
  "\u0BC1": true,
  "\u0BC2": true,
  "\u0BC6": true,
  "\u0BC7": true,
  "\u0BC8": true,
  "\u0BCA": true,
  "\u0BCB": true,
  "\u0BCC": true,
  "\u0BCD": true,
  "\u0BD7": true,
};

export const vowels = {
  "\u0B85": true,
  "\u0B86": true,
  "\u0B87": true,
  "\u0B88": true,
  "\u0B89": true,
  "\u0B8A": true,
  "\u0B8E": true,
  "\u0B8F": true,
  "\u0B90": true,
  "\u0B92": true,
  "\u0B93": true,
  "\u0B94": true,
};

export const vowelOfDiacritic = {
  "்": "்",
  "\u0B82": "\u0B82",
  "": "\u0B85",
  "\u0BBE": "\u0B86",
  "\u0BBF": "\u0B87",
  "\u0BC0": "\u0B88",
  "\u0BC1": "\u0B89",
  "\u0BC2": "\u0B8A",
  "\u0BC6": "\u0B8E",
  "\u0BC7": "\u0B8F",
  "\u0BC8": "\u0B90",
  "\u0BCA": "\u0B92",
  "\u0BCB": "\u0B93",
  "\u0BCC": "\u0B94",
};

/**
 * Convert a string into an array of strings representing Tamil letters
 *
 * @param {string} word String containing the word to convert to letters
 * @returns an Array of strings that is equivalent to letters in Tamil
 */
export function toTamilLetters(word) {
  let letters = [];
  for (let i = 0; i !== word.length; i++) {
    let ch = word[i];
    diacritics[ch] && letters.length && letters[letters.length - 1].length < 2
      ? (letters[letters.length - 1] += ch)
      : letters.push(ch);
  }
  return letters;
}

/**
 * Word length by count of tamil letters
 *
 * @param {string} word Tamil word to check
 * @returns length of the word in Tamil letters
 */
export function tamilLength(word) {
  return toTamilLetters(word).length;
}

export const PAGES = {
  WORDSETTER: "wordsetter",
  INSTRUCTIONS: "instructions",
  SETTINGS: "settings",
  WORKBENCH: "workbench",
  SUCCESS: "success",
};

/**
 * Convert unicode to Base64 encoded string
 *
 * @param {string} str Unicode string to be encoded
 * @returns base64 encoded string
 */

export function b64EncodeUnicode(str) {
  return btoa(
    encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
      return String.fromCharCode(parseInt(p1, 16));
    })
  );
}

/**
 * Convert Base64 encoded string to unicode
 *
 * @param {string} str Base64 encoded string to be decoded
 * @returns unicode string
 */
export function b64DecodeUnicode(str) {
  return decodeURIComponent(
    Array.prototype.map
      .call(atob(str), function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
}

/**
 * Convert the URL query param "q" into an array of strings representing Tamil letters
 *
 * @returns {Array} an array of unicode strings
 */
export function parseWordsFromQuery() {
  let params = new URLSearchParams(window.location.search);
  if (params.has("q")) {
    let encoded = params.get("q");
    try {
      let unicode_str = b64DecodeUnicode(encoded);
      return unicode_str.split(",");
    } catch (e) {
      console.log(e);
    }
  }
  return [];
}
