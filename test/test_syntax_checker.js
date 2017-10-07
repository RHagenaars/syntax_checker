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

const expect = require("chai").expect;
const prologSyntax = require("../index").prologSyntax;
const SyntaxChecker = require("../index").SyntaxChecker;
const SyntaxErr = require("../index").SyntaxErr;

describe('#SyntaxChecker', function() {
    "use strict";

    it('should tell syntax errors in a clause', function () {
        const sc = new SyntaxChecker(prologSyntax);
        const source1 = "this_is_(right).";
        const source2 = "this_is?_(wrong).";
        const source3 = "this_is_(wr?ong).";
        const source4 = "this_is _(wrong).";
        const source5 = "this_is_(wr ong).";
        const source6 = "this_is_(wrong)";
        const source7 = "this_is_(wrong";

        expect(sc.check(source1).length).to.equal(0);
        expect(sc.check(source2).length).to.equal(1);
        expect(sc.check(source3).length).to.equal(1);
        expect(sc.check(source4).length).to.equal(1);
        expect(sc.check(source5).length).to.equal(1);
        expect(sc.check(source6).length).to.equal(1);
        expect(sc.check(source7).length).to.equal(1);
    });

    it('should tell syntax errors in a rule', function () {
        const sc = new SyntaxChecker(prologSyntax);
        const source1 = "right(X) :- right(X).";
        const source2 = "also_right(X)       :-        right(X).";
        const source3 = "fine(AS_WELL) :- right(AS_WELL), and_right(TOO).";
        const source4 = "fine(AS_WELL) :- right(aS_wElL); also(FiNe).";
        const source5 = "fine(AS_WELL) :- this(works); also(FiNe)   ; also(   fine), also(FiNE);     also(fine).";
        const source6 = "wrong(X) : - wrong(X).";
        const source7 = "wrong(X) :";
        const source8 = "wrong(X) :- wrong(?X).";
        const source9 = "wrong(X) :- wrong(.";

        expect(sc.check(source1).length).to.equal(0);
        expect(sc.check(source2).length).to.equal(0);
        expect(sc.check(source3).length).to.equal(0);
        expect(sc.check(source4).length).to.equal(0);
        expect(sc.check(source5).length).to.equal(0);
        expect(sc.check(source6).length).to.equal(1);
        expect(sc.check(source7).length).to.equal(1);
        expect(sc.check(source8).length).to.equal(1);
        expect(sc.check(source9).length).to.equal(1);
    });

    it('should tell syntax errors in multiple lines', function () {
        const sc = new SyntaxChecker(prologSyntax);
        const source =
                "this_is_(right).\n" +
                "this_is_also(      right      ).\n" +
                "this_too_is(FINE).\n" +
                "this_is_(wro?ng).\n" +
                "this_is_right(as_well).\n" +
                "this_is_wrong(too.";

        expect(sc.check(source).length).to.equal(2);
    });
});
