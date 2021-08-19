module.exports = {
  production: false,
  rename: {
    min: { suffix: '.min' }
  },
  // --------------------------------------------- browsersync
  browsersync: {
    opts: {
      proxy: "http://localhost", // The URL of the website you want to browsersync
      port: 4000, // The port, from which the browsersync tab will be opened
      serveStatic: [{
        route: '/', // The route, from which the "live" website serves CSS and JS files
        dir: './dist' // Your local path coming from the gulpfile.js where the newly local generated files are laying
      }],
    },
    watch: [
      './dist/assets/css',
      './dist/assets/js'
    ]
  },
  // ---------------------------------------------------- sass
  sass: {
    src: [
      "./source/sass/**/*.scss",
    ],
    opts: { }, // add sass options here
    dest: "./dist/assets/css"
  },
  // ------------------------------------------------- scripts
  scripts: {
    src: [
      'source/js/main.js'
    ],
    base: 'source/js', // common base folder of all concatenated JS files so sourcempas are working correctly
    filename: 'main.js', // filename of outputted, concatenated JS file
    dest: "./dist/assets/js" // folder where the JS files should be populated
  },
  // -------------------------------------------------- styles
  styles: {
    src: [
      "./source/css/**/*.css",
    ],
    dest: './dist/assets/css'
  },
};