// =========================================================
// Gulp Task: scripts
// Description: uglify all js, add sourcemaps, rename
// npm install --save-dev gulp-uglify gulp-rename gulp-sourcemaps gulp-load-plugins
// =========================================================

module.exports = function(gulp, plugins, config) {
  return function() {
    return gulp.src(config.scripts.src, {base: config.scripts.base})
      .pipe(plugins.if(config.production, plugins.uglifyEs.default(), plugins.sourcemaps.init()))
      .pipe(plugins.concat(config.scripts.filename))
      .pipe(plugins.rename(config.rename.min))
      .pipe(plugins.if(!config.production, plugins.sourcemaps.write('.')))
      .pipe(gulp.dest(config.scripts.dest));
  }
};