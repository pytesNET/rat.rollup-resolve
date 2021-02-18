'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

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
async function RatRollupResolve(options, rollupOptions, sharedOptions) {
    let files = [];
    if (options instanceof Object && !(options instanceof Array)) {
        var match = options.match;
        var rollupOptions = options.options;
        var sharedOptions = options.sharedOptions;
    }
    else {
        var match = options;
    }
    if (Array.isArray(match)) {
        for (let single of match) {
            files = files.concat(await glob(single));
        }
    }
    else {
        files = files.concat(await glob(match));
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
                var bundleOptions = singleOptions;
            }
            else {
                var bundleOptions = deepClone(singleOptions, sharedOptions);
            }
            result.push(Object.assign({ input: file }, bundleOptions));
        }
    }
    return result;
}

exports.RatRollupResolve = RatRollupResolve;
