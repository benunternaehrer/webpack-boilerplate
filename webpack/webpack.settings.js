/* eslint-env node */

const
    PATH = require(`path`),
    ROOT_PATH = PATH.join(__dirname, `../`),
    SRC_PATH_RELATIVE = `src`;

const CONFIGURATION = {
    paths: {
        root: PATH.join(__dirname, `../`),
        dist: PATH.join(ROOT_PATH, `dist`),
        modules: PATH.join(ROOT_PATH, `node_modules`),
        srcRelative: SRC_PATH_RELATIVE,
        src: PATH.join(ROOT_PATH, SRC_PATH_RELATIVE),
    },
    devServer: {
        host: `127.0.0.1`,
        port: `3000`,
        proxyTarget: `http://boilerplate.dev/`,
    },
    browsers: {
        legacy: [
            '> 1%',
            'last 2 versions',
            'Firefox ESR',
        ],
        modern: [
            'Chrome >= 61',
            'Edge >= 16',
            'Safari >= 10.1',
            'iOS >= 10.3',
            'ChromeAndroid >= 62',
        ],
    },
};

module.exports = CONFIGURATION;