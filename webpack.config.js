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
    entry: './src/index.tsx',
    output: {
      ...baseConfig.output,
      filename: 'minifarm-shopifybuy.js',
      library: 'MiniFarmShopifyBuyJS',
    },
  }
];
