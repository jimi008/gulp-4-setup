// =========================================================
// Gulp Task: browsersync
// NOTE: Using gulp v4
// Description: Sync sass, js and browser
// npm install --save-dev browser-sync gulp-load-plugins
// =========================================================
var browserSync = require('browser-sync').create();

module.exports = function(gulp, plugins, config) {
  return function () {
    var stream = browserSync.init(config.browsersync.opts);

    browserSync.watch(config.sass.src, gulp.series('sass'));
    browserSync.watch(config.scripts.src, gulp.series('scripts'));
    browserSync.watch(config.browsersync.watch).on('change', browserSync.reload);
    return stream;
  };
};
