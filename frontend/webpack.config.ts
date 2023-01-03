import { Configuration } from 'webpack';

export default {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          {
            loader: 'postcss-loader',
            options: {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              implementation: require('postcss'),
              postcssOptions: {
                plugins: ['postcss-import', 'tailwindcss', 'autoprefixer'],
              },
            },
          },
        ],
      },
    ],
  },
} as Configuration;
