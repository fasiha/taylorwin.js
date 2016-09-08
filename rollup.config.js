import babel from 'rollup-plugin-babel';

export default {
  entry : 'src/taylorwin.js',
  format : 'umd',
  moduleName : 'taylorwin',
  plugins : [
    babel()
  ],
  dest : './dist/taylorwin.js',
  sourceMap : true,
  sourceMapFile : 'dist/taylorwin.js.map',
};
