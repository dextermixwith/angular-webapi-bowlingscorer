/// <binding Clean='clean' />
"use strict";

var gulp = require("gulp"),
  rimraf = require("rimraf"),
  concat = require("gulp-concat"),
  cssmin = require("gulp-cssmin"),
  uglify = require("gulp-uglify"),
  exec = require("gulp-exec");

var plugins = require('gulp-load-plugins')();

var webroot = "./wwwroot/";

var paths = {
  js: webroot + "js/**/*.js",
  minJs: webroot + "js/**/*.min.js",
  css: webroot + "css/**/*.css",
  minCss: webroot + "css/**/*.min.css",
  concatJsDest: webroot + "js/site.min.js",
  concatCssDest: webroot + "css/site.min.css"
};

gulp.task("clean:js", function (cb) {
  rimraf(paths.concatJsDest, cb);
});

gulp.task("clean:css", function (cb) {
  rimraf(paths.concatCssDest, cb);
});

gulp.task("default", ["clean", "watch-lint", "server"])

gulp.task("clean", ["clean:js", "clean:css"]);

gulp.task("min:js", function () {
  return gulp.src([paths.js, "!" + paths.minJs], {
    base: "."
  })
    .pipe(concat(paths.concatJsDest))
    .pipe(uglify())
    .pipe(gulp.dest("."));
});

gulp.task("min:css", function () {
  return gulp.src([paths.css, "!" + paths.minCss])
    .pipe(concat(paths.concatCssDest))
    .pipe(cssmin())
    .pipe(gulp.dest("."));
});

gulp.task("min", ["min:js", "min:css"]);

gulp.task('server', ['node', 'karma']);

var options = {
    continueOnError: false, // default = false, true means don't emit error event 
    pipeStdout: false, // default = false, true means stdout is written to file.contents 
    customTemplatingThing: "test" // content passed to gutil.template() 
};

var reportOptions = {
    err: true, // default = true, false means don't write err 
    stderr: true, // default = true, false means don't write stderr 
    stdout: true // default = true, false means don't write stdout 
};

gulp.task('node', function() {
  gulp.src('./**/**')
    .pipe(exec('node app.js', options))
    .pipe(exec.reporter(reportOptions));
});

gulp.task('karma', function() {
  gulp.src('./**/**')
    .pipe(exec('karma start karma.conf.js', options))
    .pipe(exec('open -a Google\ Chrome ".\_reports\html-results.html"', options))
    .pipe(exec.reporter(reportOptions));
});

var sources = ['./Scripts/*.js', '!./Scripts/libs/*.js'];

gulp.task('watch-lint', function () {
    gulp.watch(sources, ['lint']);
});
 
gulp.task('lint', function () {
    return gulp.src(sources)
        .pipe(plugins.jshint({
            strict: true,
            predef: [""]
        }))
        .pipe(plugins.jshint.reporter('default'))
        .pipe(plugins.jshint.reporter('fail'))
    ;
});



