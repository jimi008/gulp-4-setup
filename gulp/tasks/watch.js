// =========================================================
// Gulp Task: watch
// Description: Watch JS and SCSS folders and
// npm install --save-dev gulp-watch
// =========================================================

module.exports = function(gulp, plugins, config){
  return function(){

    // Execute sass and scripts task when we first start the watch task
    (gulp.parallel('sass', 'scripts'))();

    gulp.watch(config.sass.src, gulp.series('sass'));
    gulp.watch(config.scripts.src, gulp.series('scripts'));
  }
};