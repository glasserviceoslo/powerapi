import path from 'path';
import type { Configuration } from 'webpack';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';

const config: Configuration = {
  target: 'node',
  entry: './src/server.ts',
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)?$/,
        exclude: /node_modules/,
        loader: 'esbuild-loader',
        options: {
          loader: 'ts',
          target: 'es2015',
        },
      },
    ],
  },
  resolve: {
    plugins: [new TsconfigPathsPlugin()],
    extensions: ['.ts', '.js'],
  },
  plugins: [new ForkTsCheckerWebpackPlugin()],
};

export default config;
