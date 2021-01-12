const path = require('path');

const baseConfig = {
    output: {
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'umd',
    },
    module: {
        rules: [
            { test: /\.(js|ts|tsx?)$/, loader: "ts-loader" },
            {
                test: /\.svg$/,
                use: [
                  {
                    loader: 'svg-url-loader',
                    options: {
                      limit: 10000,
                    },
                  },
                ],
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx'],
    },
};

module.exports = [
    {
        ...baseConfig,
        entry: './src/pages/cart-header/index.tsx',
        output: {
            ...baseConfig.output,
            filename: 'minifarm-cart-header.js',
            library: 'MiniFarmCartHeader',
        },
    },
    {
        ...baseConfig,
        entry: './src/pages/buy-button/index.tsx',
        output: {
            ...baseConfig.output,
            filename: 'minifarm-shopifybuy-button.js',
            library: 'MiniFarmShopifyBuyButton',
        },
    },
    {
        ...baseConfig,
        entry: './src/pages/cart-body/index.tsx',
        output: {
            ...baseConfig.output,
            filename: 'minifarm-cart-body.js',
            library: 'MiniFarmCartBody',
        },
    }
];
