import React, { useState } from "react";
import { b64EncodeUnicode } from "../utils";

function WordSetter() {
  const [device, setDevice] = useState("");
  const [words, setWords] = useState([]);

  const startPlaying = () => {
    let hash = encodeURIComponent(b64EncodeUnicode(words.join(",")));
    if (hash.length > 1024) {
      alert(
        "நீங்கள் உள்ளிட்ட சொற்களின் எண்ணிக்கை மிக அதிகமாக உள்ளது. சிலவற்றை நீக்கிவிட்டு மீன்டும் முயற்சிக்கவும்."
      );
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
        alert(
          "இணைப்பு உங்களின் 'கிளிப் போர்டிற்கு' அணுப்பப் பட்டுவிட்டது. ctrl+v அல்லது ⌘+v விசைகளை அமுக்கித் தேவையான இடத்தில் உள்ளிட்டுக் கொள்ளவும்."
        );
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
          <h3 className="h3 mb-6">எந்த கருவியில் விளையாட உள்ளீர்கள்?</h3>
          <div className="buttons is-justify-content-center">
            <button
              className="button is-primary"
              onClick={() => setDevice("this")}
            >
              இதே கருவியில்
            </button>
            <button
              className="button is-link"
              onClick={() => setDevice("others")}
            >
              வேறு கருவியில்
            </button>
          </div>
        </div>
      ) : (
        <div className="section has-text-centered">
          <p>உங்களின் விருப்பச் சொற்களை வரிசைக்கு ஒன்றாக உள்ளிடவும்</p>
          <textarea
            className="textarea my-5"
            name="words"
            id="words"
            rows="5"
            onChange={handleTextChange}
          ></textarea>

          {device !== "this" ? (
            <p className="my-3">
              நீங்கள் விளையாட அழைக்கும் நண்பர்களிடம் இணைப்பைப் பகிரவும்
            </p>
          ) : null}

          <button className="button is-primary" onClick={startPlaying}>
            {device === "this" ? "விளையாடத் தயார்" : "இணைப்பைப் பகிர்"}
          </button>
        </div>
      )}
    </div>
  );
}

export default WordSetter;
