import { b64EncodeUnicode, b64DecodeUnicode } from "./utils.js";

// test b64EncodeUnicode

test("encode unicode to base64 and back", () => {
  const str = "குறள்";
  const encoded = b64EncodeUnicode(str);
  const decoded = b64DecodeUnicode(encoded);
  expect(str).toEqual(decoded);

  // test for empty input
  expect(b64DecodeUnicode("")).toEqual("");
});
