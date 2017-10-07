/* Copyright (c) 2017 Ramon Hagenaars
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE. */

/* jshint esversion: 6 */

const prologSyntax = require("../index").prologSyntax;
const SyntaxChecker = require("../index").SyntaxChecker;
const SyntaxErr = require("../index").SyntaxErr;

// Create a SyntaxChecker with a proper syntax. A syntax must be a JSON object with a "start" and an "end" key.
const syntaxChecker = new SyntaxChecker(prologSyntax);

// The source can consist of multiple lines.
const source =
    "man(john).\n" +
    "man(george)\n" + // This line is wrong: it misses an ending dot.
    "man(VARIABLE). \n" + // This line is considered syntactically correct, though it's semantically incorrect.
    "friend(john, george).\n" +
    "friend(X, Y) :- friend?(Y, X)."; // This line is wrong too: it has an unexpected question mark.

// Check the above source with the SyntaxChecker instance. Two errors are to be expected.
const result = syntaxChecker.check(source);
// dit mag niet
// Run this file to see the errors.
result.forEach(err => console.error(err.toString()));
