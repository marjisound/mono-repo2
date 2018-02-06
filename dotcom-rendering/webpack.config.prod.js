// @flow
/* eslint-disable no-console */
import path from 'path';

import webpack from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import Progress from 'simple-progress-webpack-plugin';

export default ({
    dist,
    bundleName,
}: {
    dist: string,
    bundleName: string,
}) => ({
    devtool: 'source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            parallel: true,
        }),
        new BundleAnalyzerPlugin({
            reportFilename: path.join(
                dist,
                `${bundleName.replace(/.js/, '')}.stats.html`,
            ),
            analyzerMode: 'static',
            openAnalyzer: false,
            logLevel: 'warn',
        }),
        new Progress({
            format: 'compact',
        }),
    ],
});
