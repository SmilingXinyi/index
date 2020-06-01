/**
 * Created by SmilingXinyi <smilingxinyi@gmail.com> on 2020/6/1
 */

import path from 'path';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default [
    {
        input: 'lib/hyperthymesia.js',
        output: {
            name: 'Hyperthymesia',
            file: path.resolve(__dirname, 'dist', 'hyperthymesia.js'),
            format: 'umd'
        },
        plugins: [
            resolve(),
            commonjs()
        ],
        transformIgnorePatterns: [
            'node_modules'
        ]
    }
];
