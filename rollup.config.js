export default {
  input: 'dist/index.js',
  name: 'VuePhoenix',
  output: {
    file: 'dist/index.umd.js',
    format: 'umd'
  },
  external: [
    'vue', 'vue-class-component', 'phoenix'
  ],
  exports: 'named',
  name: 'vue-phoenix',
  globals: {
    'vue': 'Vue',
    'vue-class-component': 'VueClassComponent',
    'phoenix': 'phoenix'
  }
}
