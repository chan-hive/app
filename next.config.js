/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,
    compiler: {
        emotion: {
            autoLabel: "always",
            labelFormat: "[local]",
            sourceMap: true,
        },
    },

    output: "standalone",

    publicRuntimeConfig: {
        NEXT_PUBLIC_GRAPHQL_URI: process.env.NEXT_PUBLIC_GRAPHQL_URI,
        NEXT_PUBLIC_WS_GRAPHQL_URI: process.env.NEXT_PUBLIC_WS_GRAPHQL_URI,
    },
    webpack(config) {
        const fileLoaderRule = config.module.rules.find(rule => rule.test && rule.test.test(".svg"), undefined);
        if (fileLoaderRule) {
            fileLoaderRule.exclude = /\.svg$/;
        }

        config.module.rules.push({
            loader: "@svgr/webpack",
            options: {
                prettier: false,
                svgo: true,
                svgoConfig: {
                    plugins: [{ removeViewBox: false }],
                },
                titleProp: true,
            },
            test: /\.svg$/,
        });

        return config;
    },
};
