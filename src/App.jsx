import React, { useState, useEffect } from "react";
import { set as dbset, get as dbget } from "lockr";
import "./App.css";
import Header from "./components/Header";
import Workbench from "./components/Workbench";
import Keyboard from "./components/Keyboard";
import {
  diacritics,
  toTamilLetters,
  parseWordsFromQuery,
  tamilLength,
} from "./utils";
import Settings from "./components/Settings";
import { PAGES } from "./utils";
import Success from "./components/Success";
import Joyride, { STATUS } from "react-joyride";
import DemoSteps from "./components/JoyRide";
import WordSetter from "./components/WordSetter";

const defaultPreferences = {
  helperMode: true,
  disableKeys: true,
};
const words = parseWordsFromQuery();

function App() {
  const [currentWordIdx, setCurrentWordIdx] = useState(0);
  const [wordLength, setWordLength] = useState(
    words.length ? tamilLength(words[currentWordIdx]) : 0
  );
  const [attempt, setAttempt] = useState("");
  const [blacklist, setBlackList] = useState(new Set());
  const [settings, setSettings] = useState(dbget("userPreferences"));
  const [runDemo, setRunDemo] = useState(false);
  const [currentPage, setCurrentPage] = useState(
    words.length ? PAGES.WORKBENCH : PAGES.WORDSETTER
  );
  const [succeeded, setSucceeded] = useState(
    dbget("lastSuccess") === new Date().toDateString()
  );
  const [attempts, setAttempts] = useState(0);

  if (!settings) {
    setSettings(defaultPreferences);
  }
  // update any new settings added by app upgrades
  if (settings) {
    for (let pref in defaultPreferences) {
      if (!settings.hasOwnProperty(pref)) {
        setSettings({ ...settings, [pref]: defaultPreferences[pref] });
      }
    }
  }

  const typeChar = (c) => {
    let letters = toTamilLetters(attempt);

    if (c === "\u2190") {
      setAttempt(attempt.slice(0, attempt.length - 1));
    } else if (
      letters.length < wordLength ||
      // last letter + a diacritic
      (letters.length === wordLength &&
        letters[letters.length - 1].length === 1 &&
        diacritics[c])
    ) {
      setAttempt(attempt + c);
    }
  };

  const handleVerified = ({ wrongLetters }) => {
    setAttempt("");
    let _black = new Set(Array.from(blacklist).concat(wrongLetters));
    setBlackList(_black);
    setAttempts(attempts + 1);
  };

  const onUpdateSettings = (key, value) => {
    setSettings({ ...settings, [key]: value });
  };

  useEffect(() => dbset("userPreferences", settings), [settings]);

  const handleSuccess = () => {
    if (currentWordIdx < words.length - 1) {
      // move to the next word
      setCurrentWordIdx(currentWordIdx + 1);
      return;
    }
    setAttempt("");
    setCurrentPage(PAGES.SUCCESS);
    setSucceeded(true);
  };

  // update the UI when the words change
  useEffect(() => {
    setBlackList(new Set());
    setWordLength(tamilLength(words[currentWordIdx]));
  }, [currentWordIdx]);

  const handleJoyrideCallback = (data) => {
    const { status } = data;
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      setRunDemo(false);
    }
  };

  const handleHeaderOnShow = (page) => {
    if (page === PAGES.INSTRUCTIONS) {
      setRunDemo(true);
      return;
    }
    setCurrentPage(page);
  };

  return (
    <div style={{ maxWidth: "600px", minHeight: "100vh" }} className="mx-auto">
      <Joyride
        steps={DemoSteps}
        continuous={true}
        run={runDemo}
        scrollToFirstStep={true}
        showSkipButton={true}
        styles={{
          options: {
            zIndex: 10000,
          },
        }}
        callback={handleJoyrideCallback}
      />
      {currentPage === PAGES.WORDSETTER ? (
        <WordSetter />
      ) : (
        <div
          style={{ minHeight: "100vh" }}
          className={
            "is-flex is-flex-direction-column" +
            (currentPage === PAGES.WORKBENCH
              ? " is-justify-content-space-between"
              : "")
          }
        >
          <Header onShow={handleHeaderOnShow} />
          {currentPage === PAGES.SETTINGS ? (
            <Settings
              settings={settings}
              onClose={() => setCurrentPage(PAGES.WORKBENCH)}
              onUpdate={onUpdateSettings}
            />
          ) : currentPage === PAGES.SUCCESS ? (
            <Success />
          ) : (
            <>
              {words.length ? (
                <div
                  className="is-flex is-justify-content-space-between"
                  style={{ position: "sticky", top: "60px" }}
                >
                  <div>
                    <strong>சொற்கள்: </strong>
                    {currentWordIdx + 1}/{words.length}
                  </div>
                  <div>
                    <strong>முயற்சிகள்: </strong>
                    {attempts}
                  </div>
                </div>
              ) : null}
              <Workbench
                word={words[currentWordIdx]}
                length={wordLength}
                letters={toTamilLetters(attempt)}
                complete={succeeded}
                onVerified={handleVerified}
                onSuccess={handleSuccess}
                blacklist={
                  settings && settings.helperMode ? blacklist : new Set()
                }
              />
            </>
          )}
          {currentPage === PAGES.WORKBENCH ? (
            <Keyboard
              onType={(c) => typeChar(c)}
              blacklist={
                settings && settings.disableKeys ? blacklist : new Set()
              }
            />
          ) : null}
        </div>
      )}
    </div>
  );
}

export default App;
