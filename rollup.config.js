
import typescript from '@rollup/plugin-typescript';

export default {
    input: 'src/index.ts',
    output: [
        {
            file: 'dist/rollup-resolve.js',
            format: 'cjs'
        },
        {
            file: 'dist/rollup-resolve.mjs',
            format: 'es'
        }
    ],
    plugins: [
        typescript()
    ]
};
