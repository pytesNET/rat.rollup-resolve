
import { RollupOptions } from 'rollup';
import { RatResolveOptions } from './types/index.d';

const glob = require('tiny-glob');

function deepClone(object1: RollupOptions, object2: RollupOptions): RollupOptions {
    let result = Object.assign({ }, object1);

    // Deep Clone of Object 2
    for (let key in object2) {
        if (key in result) {
            if (object2[key] instanceof Object && !Array.isArray(result[key])) {
                result[key] = Object.assign(result[key], object2[key]);
            } else if(Array.isArray(result[key])) {
                result[key] = result[key].concat(object2[key]);
            } else {
                result[key] = object2[key];
            }
        } else {
            if (object2[key] instanceof Object && !Array.isArray(object2[key])) {
                result[key] = Object.assign({ }, object2[key]);
            } else {
                result[key] = object2[key];
            }
        }
    }
    return result;
}

async function RatRollupResolve(options: string | string[] | RatResolveOptions, rollupOptions?: RollupOptions | RollupOptions[], sharedOptions?: RollupOptions): Promise<RollupOptions[]> {
    let files = [];

    // Check New Syntax
    if (options instanceof Object && !(options instanceof Array)) {
        var match = options.match;
        var rollupOptions = options.options;
        var sharedOptions = options.sharedOptions;
    } else {
        var match = options;
    }

    // Parse Files
    if (Array.isArray(match)) {
        for (let single of match) {
            files = files.concat(await glob(single));
        }

    } else {
        files = files.concat(await glob(match));
    }
    if (files.length === 0) {
        return [];
    }

    // Convert To Array
    if (!Array.isArray(rollupOptions)) {
        rollupOptions = [rollupOptions];
    }

    // Prepare Rollup Options
    let result = [];
    for (let file of files) {
        for (let singleOptions of rollupOptions) {
            if (typeof sharedOptions === 'undefined') {
                var bundleOptions = singleOptions;
            } else {
                var bundleOptions = deepClone(singleOptions, sharedOptions);
            }
            result.push({
                input: file,
                ...bundleOptions
            });
        }
    }
    return result;
}

export { RatRollupResolve };
