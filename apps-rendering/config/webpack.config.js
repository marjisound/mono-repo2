const { fork } = require('child_process');

class LaunchServerPlugin {
    apply(compiler) {
        compiler.hooks.afterEmit.tap('LaunchServerPlugin', () => {
            console.log('Server starting...');
            this.server = fork('./dist/server.js');
            this.server.on('close', () => console.log('Server stopping...'));
        });

        compiler.hooks.watchRun.tap('LaunchServerPlugin', () => {
            if (this.server) {
                this.server.kill();
            }
        });
    }
}

const serverConfig = {
    name: 'server',
    mode: 'development',
    entry: './server.ts',
    target: 'node',
    node: {
        __dirname: false,
    },
    output: {
        filename: 'server.js',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
    watch: true,
    watchOptions: {
        ignored: /node_modules/,
    },
    plugins: [new LaunchServerPlugin()],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-react',
                                '@emotion/babel-preset-css-prop',
                            ],
                        },
                    },
                    {
                        loader: 'ts-loader',
                        options: { configFile: 'config/tsconfig.server.json' }
                    }
                ],
            },
        ]
    }
};

const clientConfig = {
    name: 'client',
    mode: 'development',
    entry: './client.ts',
    target: 'web',
    output: {
        filename: 'client.js',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-react',
                                '@emotion/babel-preset-css-prop',
                                [
                                    '@babel/preset-env',
                                    { useBuiltIns: 'usage', modules: false }
                                ],
                            ],
                        },
                    },
                    {
                        loader: 'ts-loader',
                        options: { configFile: 'config/tsconfig.client.json' }
                    },
                ],
            },
        ]
    }
};

module.exports = [ serverConfig, clientConfig ];
