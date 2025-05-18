import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import replace from '@rollup/plugin-replace';

const production = !process.env.ROLLUP_WATCH;

export default [
  {
    input: 'src/main.jsx',
    output: {
      file: 'dist/main.js',
      format: 'es',
      sourcemap: !production
    },
    plugins: [
      replace({
        preventAssignment: true,
        'process.env.NODE_ENV': JSON.stringify(production ? 'production' : 'development')
      }),
      resolve({
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }),
      commonjs(),
      typescript(),
      postcss({
        config: {
          path: './postcss.config.js'
        },
        extensions: ['.css'],
        minimize: production,
        extract: 'styles.css'
      }),
      !production && serve({
        contentBase: ['dist', 'public'],
        port: 3000
      }),
      !production && livereload('dist'),
      production && terser()
    ]
  },
  {
    input: 'src/embedded.jsx',
    output: {
      file: 'dist/embedded.js',
      format: 'es',
      sourcemap: !production
    },
    plugins: [
      replace({
        preventAssignment: true,
        'process.env.NODE_ENV': JSON.stringify(production ? 'production' : 'development')
      }),
      resolve({
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }),
      commonjs(),
      typescript(),
      postcss({
        config: {
          path: './postcss.config.js'
        },
        extensions: ['.css'],
        minimize: production,
        extract: 'embedded-styles.css'
      }),
      production && terser()
    ]
  }
];