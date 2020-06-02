/**
 * @file (webpack.common)
 * Created by SmilingXinyi <smilingxinyi@gmail.com> on 2019/12/5
 */

// webpack conf
module.exports = {
    entry: {
        hyperthymesia: './src/hyperthymesia.ts',
        'hyperthymesia.min': './src/hyperthymesia.ts'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    }
};
