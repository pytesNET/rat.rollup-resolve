@RAT - Rollup Resolve
=====================

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
```


### Single Output Example

```javascript
const langs = RatRollupResolve('src/ts/langs/*.ts', {
    output: {
        dir: 'dist/js/langs',
        esModule: false,
        format: 'umd',
        interop: false
    },
    plugins: [
        typescript({ sourceMap: false })
    ]
});
```


### Multi Output Example

```javascript
const plugins = RatRollupResolve('src/ts/plugins/*.ts', [
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
], {
   /* Shared rollup options */
    output: {
        name: pkg.name,
        plugins: [
            terser()
        ],
    },
    external: ['rat.select'],
    plugins: [
        RatSassSkip()
    ]
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
    ...plugins
];
```


Copyright & License
-------------------

Written by SamBrishes (sam@pytes.net) and Lenivyy (lenivyy@pytes.net).

Published under the MIT license, Copyright &copy; 2020 - 2021 pytesNET.
