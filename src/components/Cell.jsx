import React from "react";
import { vowelOfDiacritic } from "../utils";

function Cell({ letter, status, borderColor }) {
  let sclass;
  switch (status) {
    case "OTHER POSITION":
      sclass = "has-background-warning";
      break;
    case "FOUND":
      sclass = "has-background-success";
      break;
    case "INVALID":
      sclass = "has-background-grey-lighter";
      break;
    default:
      sclass = "";
      break;
  }
  return (
    <div className={`cell ${sclass}`} style={{ borderColor }}>
      {letter}
      {status === "MEI MATCH" && (
        <span className="badge badge-mei-match">{letter[0]}</span>
      )}
      {status === "UYIR MATCH" && (
        <span className="badge badge-uyir-match">
          {letter.length === 2
            ? vowelOfDiacritic[letter[1]]
            : vowelOfDiacritic[""]}
        </span>
      )}
    </div>
  );
}

export default Cell;
