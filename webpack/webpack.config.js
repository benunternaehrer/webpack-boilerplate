/* eslint-env node */

const
    webpack = require(`webpack`),
    path = require(`path`),
    config = require(`./webpack.settings`),
    ExtractTextPlugin = require(`extract-text-webpack-plugin`),
    UglifyJSPlugin = require(`uglifyjs-webpack-plugin`);

// ------------------------------------
// PLUGINS
// ------------------------------------
const plugins = {
    dev: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.NamedModulesPlugin(),
        new ExtractTextPlugin({
            disable: true
        })
    ],
    prod: [
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            // filename: "vendor.js"
            // (Give the chunk a different name)

            minChunks: Infinity,
            // (with more entries, this ensures that no other module
            //  goes into the vendor chunk)
        }),
        new UglifyJSPlugin(),
        new ExtractTextPlugin(`[name].css`),
        new webpack.optimize.ModuleConcatenationPlugin(),
    ],
};

// ------------------------------------
// ENTRY
// ------------------------------------
const entry = {
    dev: {
        main: [path.join(config.paths.src, `js/app.js`), path.join(config.paths.src, `js/dev.js`),],
    },
    prod: {
        main: path.join(config.paths.src, `js/app.js`),
        // loading route chunks
        moduleA: path.join(config.paths.src, `js/ui/moduleA.js`),
        // patternLib: path.join(config.paths.src, `pattern-lib.js`),
        // critical: path.join(config.paths.src, `critical-css.js`),
    },
};

// ------------------------------------
// RULES
// ------------------------------------
const rules = {
    dev: [
        {
            enforce: `pre`,
            test: /\.js/,
            exclude: /node_modules/,
            loader: `import-glob`,
        },
        {
            test: /\.s?css$/,
            include: config.paths.src,
            use: ExtractTextPlugin.extract({
                use: [
                    `css-loader?sourceMap`,
                    `sass-loader?sourceMap`,
                ],
                fallback: `style-loader`,
            })
        },
        {
            test: /\.twig$/,
            loader: require.resolve(`./twigCompileLoader`),
        },
    ],
    prod: [
        {
            test: /\.s?css$/,
            include: config.paths.src,
            use: ExtractTextPlugin.extract({
                use: [
                    {
                        loader: 'css-loader',
                        options: {
                            minimize: true,
                        },
                    },
                    {
                        loader: `postcss-loader`,
                        options: {
                            plugins: [
                                require(`autoprefixer`)(
                                    {
                                        browsers: config.browsers.legacy,
                                    }
                                )
                            ]
                        }
                    },
                    `sass-loader`,
                ],
                fallback: `style-loader`,
            })
        },
    ],
};

/**
 * Get Rules according to env
 * @param env - webpack env
 * @param browsers - browsers to support
 * @return {string}
 */
const rulesConfig = (env, browsers) => {
    this.rules = [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [
                        ['env', {
                            modules: false,
                            useBuiltIns: true,
                            targets: {
                                browsers: browsers,
                            },
                        }],
                    ],
                },
            },
        },
    ];

    if(env.dev) {
        return this.rules.concat(rules.dev);
    } else {
        return this.rules.concat(rules.prod);
    }
};


// ------------------------------------
// BASECONFIG
// ------------------------------------
const webpackBase = (env, fileSuffix, browsers) => {
    const isDev = env.dev;

    return {
        entry: isDev ? entry.dev : entry.prod,
        devtool: isDev ? `cheap-eval-source-map` : ``,
        cache: isDev,
        context: config.paths.root,
        resolve: {
            modules: [config.paths.modules],
        },
        devServer: {
            open: false,
            hot: true,
            overlay: true,
            contentBase: config.paths.dist,
            watchContentBase: true,
            watchOptions: {
                poll: true,
            },
            // proxy: [
            //     {
            //         path: [`**`, `!**/*.html`, `!**/*.css`],
            //         target: config.devServer.proxyTarget
            //     }
            // ],
            host: config.devServer.host,
            port: config.devServer.port
        },
        output: {
            path: config.paths.dist,
            publicPath: `/`,
            filename: `[name]${fileSuffix}.js`,
            chunkFilename: `[hash]/js/[id]${fileSuffix}.js`,
        },
        plugins: isDev ? plugins.dev : plugins.prod,
        module: {
            rules: rulesConfig(env, browsers)
        },
    };
};

// ------------------------------------
// EXPORT CONFIG MODERN/LEGACY BROWSERS
// ------------------------------------
const webpackConfig = env => {
    let legacyBrowsers = webpackBase(env, '-legacy', config.browsers.legacy);
    let modernBrowsers = webpackBase(env, '', config.browsers.modern);

    if (env.dev) {
        return modernBrowsers;
    } else {
        return [legacyBrowsers, modernBrowsers];
    }
};

module.exports = webpackConfig;
