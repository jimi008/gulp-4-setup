// =========================================================
// Gulp Task: sass
// Description: transpiles sass, adds sourcemaps, prefixes
// npm install --save-dev node-sass gulp-sass gulp-sourcemaps gulp-autoprefixer gulp-load-plugins
// =========================================================

module.exports = function(gulp, plugins, config) {
  return function() {
    return gulp.src(config.sass.src)
      .pipe(plugins.if(!config.production, plugins.sourcemaps.init()))
      .pipe(plugins.sass(config.sass.opts).on('error', plugins.sass.logError))
      .pipe(plugins.autoprefixer())
      .pipe(plugins.if(!config.production, plugins.sourcemaps.write('.')))
      .pipe(gulp.dest(config.sass.dest));
  }
};