import path from 'path';
import type { Configuration } from 'webpack';
import nodeExternals from 'webpack-node-externals';
import { ESBuildMinifyPlugin } from 'esbuild-loader';

const config: Configuration = {
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
  optimization: {
    minimizer: [
      new ESBuildMinifyPlugin({
        target: 'es2015',
      }),
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      src: path.resolve(process.cwd(), 'src/'),
    },
  },
  externals: [nodeExternals()],
};

export default config;
