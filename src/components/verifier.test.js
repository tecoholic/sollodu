import { vowelOfDiacritic } from "../utils";
import verify from "./verifier";

test("Exact match", () => {
  let results = verify("குறள்", "குறள்");
  expect(results).toEqual(["FOUND", "FOUND", "FOUND"]);
});

test("Other position", () => {
  let results = verify("பட்டம்", "ட்டம்ப");
  expect(results).toEqual([
    "OTHER POSITION",
    "OTHER POSITION",
    "OTHER POSITION",
    "OTHER POSITION",
  ]);
});

test("Uyir match", () => {
  let results = verify("காவும்", "பாருள்");
  expect(results).toEqual(["UYIR MATCH", "UYIR MATCH", "UYIR MATCH"]);

  expect(verify("க", "த")).toEqual(["UYIR MATCH"]);
  expect(verify("க", "ஃ")).toEqual(["INVALID"]);
});

test("Mei match", () => {
  let results = verify("தாகம்", "தொகைமு");
  expect(results).toEqual(["MEI MATCH", "MEI MATCH", "MEI MATCH"]);

  expect(vowelOfDiacritic["\u0B82"]).toEqual("\u0B82");
  expect(vowelOfDiacritic["்"]).toEqual("்");
});

test("Don't show clues for letters that are already found", () => {
  let resutls = verify("குறள்", "குறகு");
  expect(resutls).toEqual(["FOUND", "FOUND", "INVALID"]);

  resutls = verify("திரும்பு", "ம்ம்ம்ம்");
  expect(resutls).toEqual(["INVALID", "INVALID", "FOUND", "INVALID"]);
});
