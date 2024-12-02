/*
  Copyright (C) 2012-2013 Yusuke Suzuki <utatane.tea@gmail.com>

  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
  ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

"use strict";

var data,
  esprima = require("./3rdparty/esprima-1.0.0-dev"),
  escodegen = require("./loader"),
  chai = require("chai"),
  expect = chai.expect;

data = {
  "Import attributes (with)": [
    {
      type: "Program",
      body: [
        {
          type: "ImportDeclaration",
          start: 0,
          end: 53,
          loc: {
            start: { line: 1, column: 0 },
            end: { line: 1, column: 53 },
          },
          range: [0, 53],
          specifiers: [
            {
              type: "ImportDefaultSpecifier",
              start: 7,
              end: 10,
              loc: {
                start: { line: 1, column: 7 },
                end: { line: 1, column: 10 },
              },
              range: [7, 10],
              local: {
                type: "Identifier",
                start: 7,
                end: 10,
                loc: {
                  start: { line: 1, column: 7 },
                  end: { line: 1, column: 10 },
                },
                range: [7, 10],
                name: "pkg",
              },
            },
          ],
          source: {
            type: "Literal",
            start: 16,
            end: 30,
            loc: {
              start: { line: 1, column: 16 },
              end: { line: 1, column: 30 },
            },
            range: [16, 30],
            value: "package.json",
            raw: '"package.json"',
          },
          attributes: [
            {
              type: "ImportAttribute",
              start: 38,
              end: 50,
              loc: {
                start: { line: 1, column: 38 },
                end: { line: 1, column: 50 },
              },
              range: [38, 50],
              key: {
                type: "Identifier",
                start: 38,
                end: 42,
                loc: {
                  start: { line: 1, column: 38 },
                  end: { line: 1, column: 42 },
                },
                range: [38, 42],
                name: "type",
              },
              value: {
                type: "Literal",
                start: 44,
                end: 50,
                loc: {
                  start: { line: 1, column: 44 },
                  end: { line: 1, column: 50 },
                },
                range: [44, 50],
                value: "json",
                raw: '"json"',
              },
            },
          ],
        },
      ],
      expected: `import pkg from "package.json" with { type: "json" };`,
    },
  ],
  "Import assertions (assert)": [
    {
      type: "Program",
      body: [
        {
          type: "ImportDeclaration",
          start: 0,
          end: 53,
          loc: {
            start: { line: 1, column: 0 },
            end: { line: 1, column: 53 },
          },
          range: [0, 53],
          specifiers: [
            {
              type: "ImportDefaultSpecifier",
              start: 7,
              end: 10,
              loc: {
                start: { line: 1, column: 7 },
                end: { line: 1, column: 10 },
              },
              range: [7, 10],
              local: {
                type: "Identifier",
                start: 7,
                end: 10,
                loc: {
                  start: { line: 1, column: 7 },
                  end: { line: 1, column: 10 },
                },
                range: [7, 10],
                name: "pkg",
              },
            },
          ],
          source: {
            type: "Literal",
            start: 16,
            end: 30,
            loc: {
              start: { line: 1, column: 16 },
              end: { line: 1, column: 30 },
            },
            range: [16, 30],
            value: "package.json",
            raw: '"package.json"',
          },
          assertions: [
            {
              type: "ImportAttribute",
              start: 38,
              end: 50,
              loc: {
                start: { line: 1, column: 38 },
                end: { line: 1, column: 50 },
              },
              range: [38, 50],
              key: {
                type: "Identifier",
                start: 38,
                end: 42,
                loc: {
                  start: { line: 1, column: 38 },
                  end: { line: 1, column: 42 },
                },
                range: [38, 42],
                name: "type",
              },
              value: {
                type: "Literal",
                start: 44,
                end: 50,
                loc: {
                  start: { line: 1, column: 44 },
                  end: { line: 1, column: 50 },
                },
                range: [44, 50],
                value: "json",
                raw: '"json"',
              },
            },
          ],
        },
      ],
      expected: `import pkg from "package.json" assert { type: "json" };`,
    },
  ],
};

function runTest(ast, expected) {
  var actual, options;

  options = {
    indent: "    ",
    parse: esprima.parse,
  };

  actual = escodegen.generate(ast, options);
  expect(actual).to.be.equal(expected);
}

describe("AST", function () {
  Object.keys(data).forEach(function (category) {
    it(category + " test", function () {
      data[category].forEach(function (ast) {
        runTest(ast, ast.expected);
      });
    });
  });
});
/* vim: set sw=4 ts=4 et tw=80 : */
