import assert from "assert";

import { isValidColumn, parseFiles } from "../utils.mjs";
import { describe, it } from "mocha";

describe("#isValidColumn()", function () {
  const tests = [
    {
      input: ["test1.csv", "hello", 1234, "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"],
      expected: true,
    },
    {
      input: [
        "test1.csv",
        "mytext",
        5768907,
        "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      ],
      expected: true,
    },
    {
      input: [
        "test1.csv",
        "hello",
        78439217,
        "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
      ],
      expected: true,
    },
    {
      input: [
        "test1.csv",
        "hello",
        "1234o",
        "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      ],
      expected: false,
    },
    {
      input: ["test1.csv", "hello", 1234, "aaaaaaaaaaaa"],
      expected: false,
    },
    {
      input: ["test1.csv", 11111, 1234, "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"],
      expected: false,
    },
    {
      input: ["test1.csv", "hello", 1234],
      expected: false,
    },
    {
      input: ["test1.csv", "hello"],
      expected: false,
    },
    {
      input: ["test1.csv", "hello", 1234, ""],
      expected: false,
    },
  ];
  it("should return the expected value", function () {
    for (const test of tests) {
      assert.equal(isValidColumn(test.input), test.expected);
    }
  });
});

describe("#parseFiles()", function () {
  const tests = [
    {
      input: [
        {
          fileName: "file15.csv",
          data: `file,text,number,hex
file15.csv,RgTya,64075909,
`,
        },
      ],
      expected: [
        {
          file: "file15.csv",
          lines: [],
        },
      ],
    },
    {
      input: [
        {
          fileName: "file1.csv",
          data: `file,text,number,hex
file1.csv,RgTya,64075909,70ad29aacf0b690b0467fe2b2767f765
`,
        },
      ],
      expected: [
        {
          file: "file1.csv",
          lines: [
            {
              text: "RgTya",
              number: 64075909,
              hex: "70ad29aacf0b690b0467fe2b2767f765",
            },
          ],
        },
      ],
    },
    {
      input: [
        {
          fileName: "file2.csv",
          data: `file,text,number,hex
file2.csv,mygoodText,123456890,70ad29aacf0b690b0467fe2b2767f766
`,
        },
        {
          fileName: "file3.csv",
          data: `file,text,number,hex
file3.csv,myothergoodTextyeah,12347893,70ad29aacf0b690b0467fe2b2767f766
`,
        },
      ],
      expected: [
        {
          file: "file2.csv",
          lines: [
            {
              text: "mygoodText",
              number: 123456890,
              hex: "70ad29aacf0b690b0467fe2b2767f766",
            },
          ],
        },
        {
          file: "file3.csv",
          lines: [
            {
              text: "myothergoodTextyeah",
              number: 12347893,
              hex: "70ad29aacf0b690b0467fe2b2767f766",
            },
          ],
        },
      ],
    },
  ];
  it("should return the expected value", function () {
    for (const test of tests) {
      assert.deepEqual(parseFiles(test.input), test.expected);
    }
  });
});
