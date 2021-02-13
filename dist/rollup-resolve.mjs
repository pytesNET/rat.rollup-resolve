/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

const glob = require('tiny-glob');
function deepClone(object1, object2) {
    let result = Object.assign({}, object1);
    for (let key in object2) {
        if (key in result) {
            if (object2[key] instanceof Object && !Array.isArray(result[key])) {
                result[key] = Object.assign(result[key], object2[key]);
            }
            else if (Array.isArray(result[key])) {
                result[key] = result[key].concat(object2[key]);
            }
            else {
                result[key] = object2[key];
            }
        }
        else {
            if (object2[key] instanceof Object && !Array.isArray(object2[key])) {
                result[key] = Object.assign({}, object2[key]);
            }
            else {
                result[key] = object2[key];
            }
        }
    }
    return result;
}
function RatRollupResolve(match, rollupOptions, sharedOptions) {
    return __awaiter(this, void 0, void 0, function* () {
        let files = [];
        if (Array.isArray(match)) {
            for (let single of match) {
                files = files.concat(yield glob(single));
            }
        }
        else {
            files = files.concat(yield glob(match));
        }
        if (files.length === 0) {
            return [];
        }
        if (!Array.isArray(rollupOptions)) {
            rollupOptions = [rollupOptions];
        }
        let result = [];
        for (let file of files) {
            for (let singleOptions of rollupOptions) {
                if (typeof sharedOptions === 'undefined') {
                    var options = singleOptions;
                }
                else {
                    var options = deepClone(singleOptions, sharedOptions);
                }
                result.push(Object.assign({ input: file }, options));
            }
        }
        return result;
    });
}

export { RatRollupResolve };
