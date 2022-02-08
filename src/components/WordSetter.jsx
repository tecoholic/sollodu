import React, { useState } from "react";
import { b64EncodeUnicode } from "../utils";

function WordSetter() {
  const [device, setDevice] = useState("");
  const [words, setWords] = useState([]);

  const startPlaying = () => {
    let hash = encodeURIComponent(b64EncodeUnicode(words.join(",")));
    if (hash.length > 1024) {
      alert("Too many words to play. Please reduce the number of words.");
      return;
    }
    if (device === "this") {
      window.location = `/?q=${hash}`;
    } else {
      let url = `${window.location.origin}/?q=${hash}`;

      if (navigator.share) {
        navigator.share({ url });
      } else {
        navigator.clipboard.writeText(url);
        alert("Link copied to clipboard");
      }
    }
  };

  const handleTextChange = (e) => {
    console.log(e.target.value);
    let items = e.target.value.trim().split("\n");
    setWords(items.filter((i) => i.length > 1).map((i) => i.trim()));
  };

  return (
    <div>
      <h1 className="h1 has-text-centered py-5 has-text-weight-bold">
        சொல்லொடு
      </h1>
      {!device ? (
        <div className="section has-text-centered">
          <h3 className="h3 mb-6">
            Which device are you going to play the game in?
          </h3>
          <div className="buttons is-justify-content-center">
            <button
              className="button is-primary"
              onClick={() => setDevice("this")}
            >
              This device
            </button>
            <button
              className="button is-link"
              onClick={() => setDevice("others")}
            >
              other device
            </button>
          </div>
        </div>
      ) : (
        <div className="section has-text-centered">
          <p>Please enter your words one by one</p>
          <textarea
            className="textarea my-5"
            name="words"
            id="words"
            rows="5"
            onChange={handleTextChange}
          ></textarea>

          <button className="button is-primary" onClick={startPlaying}>
            {device === "this" ? "Start playing" : "Share link"}
          </button>
        </div>
      )}
    </div>
  );
}

export default WordSetter;
