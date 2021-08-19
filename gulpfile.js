/**
 * Created Gulp setup on this basis https://gist.github.com/tristanisfeld/9deea503260324f5e9b0
 * See README.md or https://devguide.at for explanation of how this setup works
 */

const gulp = require('gulp'),
      gulpLoadPlugins = require('gulp-load-plugins'),
      plugins = gulpLoadPlugins(),
      config = require('./gulp/config');

// --------------------function to get tasks from gulp/tasks
function getTask(task) {
  return require('./gulp/tasks/' + task)(gulp, plugins, config);
}

// ---------------------------------------------- Gulp Tasks
gulp.task('sass',             getTask('sass'));
gulp.task('scripts',          getTask('scripts'));
gulp.task('styles',           getTask('styles'));
gulp.task('watch',            getTask('watch'));
gulp.task('browsersync',      getTask('browsersync'));

// --------------------------------------- Default Gulp Task
gulp.task('default', gulp.series('watch'));