@RAT - Rollup Resolve
=====================
[![Minfied Size](https://b.rat.md/rollup-resolve/~minified)](https://b.rat.md/rollup-resolve/+minified)
[![Version](https://b.rat.md/rollup-resolve/~version)](https://b.rat.md/rollup-resolve/+version)
[![Downloads](https://b.rat.md/rollup-resolve/~downloads)](https://b.rat.md/rollup-resolve/+downloads)
[![Support](https://b.rat.md/global/~bmac)](https://b.rat.md/global/+bmac)

**Rat's Rollup Resolve is NOT a rollup plugin it is more of a utility function !**

Generates multiple rollup definitions based on one or more picomatch strings. This package has been especially designed 
and developed for our rat and tail products, and allows us to easily declare multiple import/export library and plugins 
without flooding the rollup configuration file.


Installation
------------

-   **Requires** node.js 14.13.0 or above
-   **Tested** with Rollup 2.30 and above only

Get the latest version of our Rat Rollup Resolver Extension using npm or yarn:

```
npm install --save-dev @rat.md/rollup-resolve
```

```
yarn add --dev @rat.md/rollup-resolve
```


Usage
-----

```javascript
import { RatRollupResolve } from '@rat.md/rollup-resolve';

// [OLD] Basic Syntax
const rollups1 = await RatRollupResolve(
    /* matching glob(s) */, 
    /* individual rollup options */, 
    /* [optional] shared rollup options */
);

// [NEW] Advanced Syntax
const rollups2 = await RatRollupResolve(
    match: /* matching glob(s) */,
    options: /* individual rollup options */, 
    sharedOptions: /* [optional] shared rollup options */,
);
```

### Single Output Example

```javascript
const langs = await RatRollupResolve({
    match: 'src/ts/langs/*.ts',
    options: {
        output: {
            dir: 'dist/js/langs',
            esModule: false,
            format: 'umd',
            interop: false
        },
        plugins: [
            typescript({ sourceMap: false })
        ]
    }
});
```


### Multi Output Example with shared options

```javascript
const plugins = await RatRollupResolve({
    match: 'src/ts/plugins/*.ts',
    options: [
        /* Individual Rollup Options */
        {
            output: {
                dir: 'dist/js/plugins',
                esModule: false,
                format: 'umd',
                interop: false
            },
            plugins: [
                typescript({ sourceMap: false })
            ]
        },
        {
            output: {
                dir: 'dist/es/plugins',
                esModule: true,
                format: 'es'
            },
            plugins: [
                typescript({ sourceMap: false, target: 'ES6' })
            ]
        }
    ],
    sharedOptions: {
    /* Shared rollup options */
        output: {
            name: 'package.name',
            plugins: [
                terser()
            ],
        },
        external: ['rat'],
        plugins: [
            RatSassSkip()
        ]
    }
});
```


### Extend Rollup Definitions

```javascript
export default [
    /* Core Definitions */
    {
        input: '...',
        output: { },
        /* ... */
    }

    /* Unpack generated Definitions */
    ...langs
    ...plugins
];
```


Copyright & License
-------------------

Written by SamBrishes (sam@pytes.net) and Lenivyy (lenivyy@pytes.net).

Published under the MIT license, Copyright &copy; 2020 - 2021 pytesNET.
