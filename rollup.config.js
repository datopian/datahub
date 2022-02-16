import babel from '@rollup/plugin-babel';
import external from 'rollup-plugin-peer-deps-external';
import del from 'rollup-plugin-delete';
import pkg from './package.json';

import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';

const EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx', '.json'];

const commonPlugins = () => [
    external({
        includeDependencies: true,
    }),
    babel({
        babelrc: false,
        presets: [['@babel/preset-env', { modules: false }], '@babel/preset-react'],
        extensions: EXTENSIONS,
        exclude: 'node_modules/**',
    }),
    commonjs({
        include: /node_modules/,
    }),
    resolve({
        extensions: EXTENSIONS,
        preferBuiltins: false,
    }),
    del({ targets: ['dist/*'] }),
];

export default {
    input: pkg.source,
    output: [
        {
            file: pkg.main,
            format: 'cjs',
            globals: {
                react: 'React',
                'react-dom': 'ReactDOM',
            }
        },
        {
            file: pkg.module,
            format: 'esm',
            globals: {
                react: 'React',
                'react-dom': 'ReactDOM',
            },
        }
    ],
    plugins: commonPlugins(),
};