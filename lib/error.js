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

class SyntaxErr {
    constructor(line, lineNr, lineCol) {
        this.line = line;
        this.lineNr = lineNr;
        this.lineCol = lineCol;
    }

    getMessage() {
        // This method should be overridden.
        return "";
    }

    getPointer() {
        return this.line + "\n" + new Array(this.lineCol).join(" ") + "^";
    }

    toString() {
        return this.getPointer() + "\n" +
                "SyntaxError: " + this.getMessage() + "\n";
    }
}

class InvalidCharacterErr extends SyntaxErr {
    constructor(line, invalidCharacter, lineNr, lineCol) {
        super(line, lineNr, lineCol);
        this.invalidCharacter = invalidCharacter;
    }

    getMessage() {
        return "Unexpected character '" + this.invalidCharacter + "'\n" +
            "    on line " + this.lineNr + " column " + this.lineCol;
    }
}

class EOLErr extends SyntaxErr {
    constructor(line, lineNr, lineCol) {
        super(line, lineNr, lineCol);
    }

    getMessage() {
        return "Unexpected end of line\n" +
            "    on line " + this.lineNr + " column " + this.lineCol;
    }
}

module.exports = {
    SyntaxErr: SyntaxErr,
    InvalidCharacterErr: InvalidCharacterErr,
    EOLErr: EOLErr
};
