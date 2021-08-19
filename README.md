# Gulp 4 Setup



## Why?

Our old setup (or more specifically Gulp 3) didn't work any more after 
updating the NodejS Version to 12+.

Therefore we had to rebuild the whole Gulp setup anyway.

Since Gulp 4 really emphasized the change of how functions are being handled, 
each little functionality has to be inside its own function so it can be 
handled better via the new `parallel` and `series` functionality.

See also https://gulpjs.com/docs/en/getting-started/async-completion



## How?

Lets start at the beginning, in the `gulpfile.js`

We start by requiring 3 modules:

- gulp (of course)
- gulp-load-plugins (see below for details)
- config (our config file containing editable configs, see below for details)

Then we have a function, which allows us to add new gulp tasks relatively easy.
Reason behind that is the

Right bellow that you can see examples of how this function is used to add tasks.



## Gulp Plugin Loader

Since we dont want to require every contributed module inside every self defined 
task we use a NodeJS module called `gulp-load-plugins` - see https://www.npmjs.com/package/gulp-load-plugins

Basically it puts all NodeJS modules, which are defined in the `package.json` 
inside an object, which we can then pass onto everything we need.

If you look into the `gulpfile.js` you can see at the top, that we first require the 
`gulp-load-plugins` and then define a variable `plugins` with the function `gulpLoadPlugins()`

This basically does the following for all entries inside our `package.json`

```
plugins.sourcemaps = require('gulp-sourcemaps');
plugins.concat = require('gulp-concat');
plugins.uglifyEs = require('gulp-uglify-es');
```

Therefore we can pass the `modules` object inside every task and have all the 
necessary modules we have without the need to require them over and over again.



## Gulp Tasks

Each tasks is being isolated into its own file inside `gulp/tasks`.

```
module.exports = function(gulp, plugins, config){
  return function(){
    gulp.watch(config.sass.src, gulp.series('sass'));
    gulp.watch(config.scripts.src, gulp.series('scripts'));
  }
};
```

As we already shortly described above gulp handles functions differently then usual 
and therefore we have to wrap our task inside a function.

The `module.exports` is required since we separated the task into a extra file.

The `return function(){...}` is required because of how Gulp 4 handles functions


### Where do gulp, plugins and config inside each task come from?

In the `gulpfile.js` we require each task file with 3 parameters:

- gulp
- plugins
- config

These are being initialized at the start of the `gulpfile.js` and then handed 
to every required task.

Therefore inside every task we have access to the gulp object,
our loaded plugins and our config file.



## How do series and parallel tasks work?

Basically we have 2 possibilities how to tell Gulp how to handle tasks.


### series

```
gulp.task('default', gulp.series('sass', 'scripts'));
```

This example tells gulp that it should execute the task `sass` and 
after that is completed the task `scripts`.


### parallel

```
gulp.task('default', gulp.parallel('sass', 'scripts'));
```

This example tells gulp that it should execute the tasks 
`sass` and `scripts` simultaneously.


### Nesting series and parallels

```
gulp.task('default', gulp.series('lint', gulp.parallel('sass', 'scripts'), 'deploy'));
```

This example tells gulp that it should execute the task `lint`, then `sass` and `scripts` parallel
and after that is finished the final task `deploy`.


## Config file

Inside the `gulp/config.js` we have several possibilities to adjust the behaviour of our tasks

- `production: true/false`
    - If `false`
        - Enables the generation of Sourcemaps for SCSS, CSS and JS
    - If `true`
        - Minifies CSS
        - Uglifies JS
- `rename`
    - Handles which suffix is being added to generated CSS and JS files
- `browsersync`
    - `opts`
        - Handles the options given to the browsersync commannd.
        - See https://www.browsersync.io/docs/options/
    - `watch`
        - Folders which should be watched to trigger a reload of the browsersync
- `sass`
    - `src`
        - Array containing the paths to the SCSS source files
    - `opts`
        - Options which can be set for the `sass()` function
        - See https://www.npmjs.com/package/gulp-sass
    - `dest`
        - The destination folder the generated CSS should be deployed to
- `scripts`
    - `src`
        - Array containing the paths to the JS source files
    - `base`
        - Common base folder of all concatenated JS files so sourcempas are working correctly
    - `filename`
        - The filename of the concatenated JS file
    - `dest`
        - The destination folder the generated JS should be deployed to
- `styles`
    - `src`
        - Array containing the paths to the CSS source files
    - `dest`
        - The destination folder the generated CSS should be deployed to



## Autoprefixer Config

Since the current version of the used `gulp-autoprefixer` doesn't recommend inline config any more 
there is a file called `.browserslistrc` which contains the same info.

See https://www.npmjs.com/package/browserslist for details how this works


## Execute a task inside another task

Add the following inside the task you want to adjust.

```
(gulp.parallel('sass', 'scripts'))();
```

This example is present in the `gulp/tasks/watch.js` task to regenerate CSS and JS when starting the watch task