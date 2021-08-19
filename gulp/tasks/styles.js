// =========================================================
// Gulp Task: styles
// Description: minify all css, add sourcemaps, rename
// npm install --save-dev gulp-minify-css gulp-rename gulp-sourcemaps gulp-load-plugins
// =========================================================

module.exports = function(gulp, plugins, config) {
  return function () {
    return gulp.src(config.styles.src)
      .pipe(plugins.if(!config.production, plugins.sourcemaps.init(), plugins.minifyCss()))
      .pipe(plugins.rename(config.rename.min))
      .pipe(plugins.if(!config.production, plugins.sourcemaps.write('.')))
      .pipe(gulp.dest(config.styles.dest));
  };
};