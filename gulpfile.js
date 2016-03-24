/// <binding Clean='clean' />
"use strict";

var gulp = require("gulp"),
  rimraf = require("rimraf"),
  concat = require("gulp-concat"),
  cssmin = require("gulp-cssmin"),
  uglify = require("gulp-uglify"),
  ignore = require('gulp-ignore'),
  jshint = require('gulp-jshint');

var plugins = require('gulp-load-plugins')();

var Server = require('karma').Server;

var webroot = "./wwwroot/";

var paths = {
  js: webroot + "js/**/*.js",
  minJs: webroot + "js/**/*.min.js",
  css: webroot + "css/**/*.css",
  minCss: webroot + "css/**/*.min.css",
  concatJsDest: webroot + "js/site.min.js",
  concatCssDest: webroot + "css/site.min.css"
};

gulp.task("default", ["clean", "lint", "runTests", "min"])

gulp.task("clean", ["clean:js", "clean:css"]);


gulp.task("clean:js", function (cb) {
  rimraf(paths.concatJsDest, cb);
});

gulp.task("clean:css", function (cb) {
  rimraf(paths.concatCssDest, cb);
});

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

var sources = ['wwwroot/lib/angular/angular.js', './js/*.js'];

gulp.task('watch-lint', function () {
    gulp.watch(sources, ['lint']);
});
 
gulp.task('lint', function () {
    return gulp.src(sources)
     .pipe(ignore.exclude(/angular\.js/))
     .pipe(jshint({"predef": ["angular"]}))
     .pipe(jshint.reporter('default'))
     .pipe(jshint.reporter('fail'));;
});

gulp.task('watchTests', ["clean"], function () {
    new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: false
    }).start();
});

gulp.task('runTests', function () {
    new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }).start();
});


