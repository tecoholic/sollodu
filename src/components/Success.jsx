import React from "react";

const ICONS = {
  INVALID: "⚫",
  "OTHER POSITION": "🟡",
  FOUND: "🟢",
  "MEI MATCH": "",
  "UYIR MATCH": "",
};

function Success({ words, attempts }) {
  let guesses = [];

  const triggerShare = () => {
    let text = `${words.length} சொற்கள் உடைய இந்த சொல்லோடு புதிரை ${attempts} முயற்சிகளில் முறியடித்தேன்.\n\nநீங்கள் விளையாட இந்த 👇️ இணைப்பைச் சொடுக்குங்கள்.`;
    if (navigator.share) {
      navigator.share({ text, url: window.location.href });
    } else {
      navigator.clipboard.writeText(text + "\n" + window.location.href);
      alert("Content copied to clipboard");
    }
  };

  return (
    <div className="card">
      <header className="card-header">
        <p className="card-header-title">
          <span className="has-text-centered mx-auto">
            🎉️ வாழ்த்துகள்! 🎊️
          </span>
        </p>
      </header>
      <div className="card-content">
        <p className="has-text-centered">
          கொடுக்கப்பட்ட {words.length} சொற்களையும் {attempts} முயற்சிகளில்
          கண்டுபிடித்து விட்டீர்கள்.
        </p>
        <div className="is-flex is-flex-direction-column">
          {guesses.map(({ results }, i) => (
            <div key={i}>
              {results.reduce((acc, curr) => acc + ICONS[curr], "")}
            </div>
          ))}
        </div>
      </div>
      <footer className="card-footer">
        <button
          href="#"
          className="card-footer-item is-ghost"
          onClick={() => triggerShare()}
        >
          📣️ பகிர்
        </button>
      </footer>
    </div>
  );
}

export default Success;
