// rollup.config.js
import resolve from 'rollup-plugin-node-resolve';
import uglify from 'rollup-plugin-uglify';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';

export default {
  input: 'main.js',
  output: {
    format: 'umd',
    name: 'ForceGraph3D',
    file: 'public/bundle.js'
  },
  moduleContext: {
    [require.resolve('three')]: 'window'
  },
  plugins: [ babel({ exclude: 'node_modules/**' }), resolve(), commonjs()]
};
