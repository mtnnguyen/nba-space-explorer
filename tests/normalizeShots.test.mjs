import test from "node:test";
import assert from "node:assert/strict";
import { normalizeShots } from "../src/utils/normalizeShots.js";
const cases = [
  [
    "valid",
    [
      {
        "x": 0,
        "y": 0,
        "made": false
      }
    ],
    1
  ],
  [
    "numeric strings",
    [
      {
        "loc_x": "-12",
        "loc_y": "20",
        "shot_made_flag": "1"
      }
    ],
    1
  ],
  [
    "missing coordinate",
    [
      {
        "y": 2,
        "made": true
      }
    ],
    0
  ],
  [
    "blank",
    [
      {
        "x": " ",
        "y": 2,
        "made": true
      }
    ],
    0
  ],
  [
    "boolean coordinate",
    [
      {
        "x": true,
        "y": 2,
        "made": true
      }
    ],
    0
  ],
  [
    "out of court",
    [
      {
        "x": 26,
        "y": 2,
        "made": true
      },
      {
        "x": 0,
        "y": 42,
        "made": true
      }
    ],
    0
  ],
  [
    "unknown result",
    [
      {
        "x": 0,
        "y": 2,
        "made": "maybe"
      }
    ],
    0
  ],
  [
    "edges",
    [
      {
        "x": -25,
        "y": -6,
        "made": 0
      },
      {
        "x": 25,
        "y": 41,
        "made": 1
      }
    ],
    2
  ],
  [
    "null row",
    [
      null
    ],
    0
  ],
  [
    "nonfinite",
    [
      {
        "x": null,
        "y": 0,
        "made": true
      }
    ],
    0
  ]
];
for (const [name, input, count] of cases) test(name, () => assert.equal(normalizeShots(input).length, count));
test("preserves outcomes", () => { assert.equal(normalizeShots(cases[0][1])[0].made,false); assert.equal(normalizeShots(cases[1][1])[0].made,true); });
