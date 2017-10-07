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

const prologSyntax = {
    "start": {
        "\\s": "start",
        "[a-z]": "literal"
    },
    "end": {
        "\\s": "end"
    },
    "literal": {
        "\\w": "literal",
        "\\(": "args_start",
        "\\.": "end"
    },
    "args_start": {
        "\\s": "args_start",
        "[0-9]": "args_number",
        "\\w": "arg_literal",
        "\'": "args_singlequote",
        "\"": "args_doublequote",
        "\\.": "end"
    },
    "args_end": {
        "\\s": "args_end",
        "\\:": "arrow_start",
        "\\.": "end"
    },
    "arg_literal": {
        "\\w": "arg_literal",
        "\\)": "args_end",
        "\\s": "args_separation",
        ",": "args_start"
    },
    "args_separation": {
        "\\s": "args_separation",
        "\\)": "args_end",
        ",": "args_start"
    },
    "arrow_start": {
        "\\-": "condition_start"
    },
    "condition_start": {
        "\\s": "condition_start",
        "[a-z]": "condition_literal"
    },
    "condition_literal": {
        "\\w": "condition_literal",
        "\\(": "condition_args_start",
        "\\.": "end",
        "\\,": "condition_start",
        "\\;": "condition_start"
    },
    "condition_args_start": {
        "\\s": "condition_args_start",
        "[0-9]": "condition_args_number",
        "\\w": "condition_arg_literal",
        "\'": "condition_args_singlequote",
        "\"": "condition_args_doublequote"
    },
    "condition_args_end": {
        "\\s": "condition_args_end",
        "\\.": "end",
        "\\,": "condition_start",
        "\\;": "condition_start"
    },
    "condition_arg_literal": {
        "\\w": "condition_arg_literal",
        "\\)": "condition_args_end",
        "\\s": "condition_args_separation",
        ",": "condition_args_start"
    },
    "condition_args_separation": {
        "\\s": "condition_args_separation",
        "\\)": "condition_args_end",
        ",": "condition_args_start"
    }
};

module.exports = {
    prologSyntax: prologSyntax
};
