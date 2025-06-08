const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const typescript = require('rollup-plugin-typescript2');
const terser = require('@rollup/plugin-terser');
const external = require('rollup-plugin-peer-deps-external');
const postcss = require('rollup-plugin-postcss');
const path = require('path');
const fs = require('fs');

// Lee el package.json
const packageJson = JSON.parse(
  fs.readFileSync(path.resolve('./package.json'), 'utf-8')
);

module.exports = {
  input: 'src/index.ts',
  output: [
    {
      file: packageJson.main,
      format: 'cjs',
      exports: 'named',
      sourcemap: true
    },
    {
      file: packageJson.module,
      format: 'esm',
      exports: 'named',
      sourcemap: true
    }
  ],
  plugins: [
    external(),
    resolve(),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
      exclude: ['**/*.stories.tsx', '**/*.test.tsx']
    }),
    postcss({
      modules: true,
      extract: false,
      minimize: true,
      sourceMap: true,
      extensions: ['.css']
    }),
    terser()
  ],
  external: ['react', 'react-dom']
}; 