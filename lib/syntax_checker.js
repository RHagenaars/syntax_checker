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

const SyntaxErr = require("./error").SyntaxErr;
const InvalidCharacterErr = require("./error").InvalidCharacterErr;
const EOLErr = require("./error").EOLErr;

class SyntaxChecker {
    constructor(syntax) {
        this._syntax = syntax;// TODO check if the syntax has a start and an end
    }

    check(source) {
        let curLineNr = 1;
        return source.split("\n")
                .map(line => this._checkLine(line, curLineNr++))
                .filter(error => error);
    }

    _checkLine(line, lineNr) {
        let error;
        let state = "start";
        for (let i = 0; i < line.length && !error; i++) {
            if (!(state = SyntaxChecker._nextState(line[i], this._syntax[state]))) {
                error = new InvalidCharacterErr(line, line[i], lineNr, i + 1);
            }
        }

        if (!error && state !== "end") {
            error = new EOLErr(line, lineNr, line.length + 1);
        }

        return error;
    }

    static _nextState(character, regexDict) {
        let result;
        const keys = Object.keys(regexDict);
        for (let i = 0; i < keys.length && !result; i++) {
            if (character.match(new RegExp(keys[i]))) {
                result = regexDict[keys[i]];
            }
        }

        return result;
    }
}

module.exports = {
    SyntaxChecker: SyntaxChecker
};
