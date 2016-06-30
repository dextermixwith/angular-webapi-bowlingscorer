/// <binding Clean='clean' />
"use strict";

var gulp = require("gulp"),
  rimraf = require("rimraf"),
  concat = require("gulp-concat"),
  cssmin = require("gulp-cssmin"),
  uglify = require("gulp-uglify"),
  ignore = require('gulp-ignore'),
  jshint = require('gulp-jshint'),
  shell = require("gulp-shell");

var Server = require('karma').Server;

var webroot = "./BowlingScorer.MVC/wwwroot/";

var paths = {
  js:  "js/**/*.js",
  minJs: webroot + "js/**/*.min.js",
  css: "css/**/*.css",
  minCss: webroot + "css/**/*.min.css",
  concatAppJsDest: webroot + "js/site.js",
  concatJsDest: webroot + "js/site.min.js",
  concatCssDestNonMin: webroot + "css/site.css",
  concatCssDest: webroot + "css/site.min.css"
};

gulp.task("default", ["clean", "copy-dev-js", "copy-dev-css", "lint", "runTests", "min", "dotnet-build-mvc", "dotnet-build-mvc-test", "dotnet-test-mvc", "dotnet-run-mvc"])

gulp.task("test", ["clean", "lint", "watchTests"])

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
    .pipe(gulp.dest("./BowlingScorer.MVC/"));
});

gulp.task("min:css", function () {
  return gulp.src([paths.css, "!" + paths.minCss])
    .pipe(concat(paths.concatCssDest))
    .pipe(cssmin())
    .pipe(gulp.dest("./BowlingScorer.MVC/"));
});

gulp.task("min", ["min:js", "min:css"]);

gulp.task("copy-dev-js", function() {
   gulp.src(paths.js)
      .pipe(concat(paths.concatAppJsDest)) 
      .pipe(gulp.dest("./BowlingScorer.MVC/")) 
});


gulp.task("copy-dev-css", function() {
   gulp.src(paths.css)
      .pipe(concat(paths.concatCssDestNonMin)) 
      .pipe(gulp.dest("./BowlingScorer.MVC/")) 
});

var sources = ['./BowlingScorer.MVC/wwwroot/lib/angular/angular.js', './BowlingScorer.MVC/wwwwroot/lib/angular-confirm-modal/angular-confirm.js', './BowlingScorer.MVC/wwwroot/lib/angular-bootstrap/ui-bootstrap-tpls.js', './BowlingScorer.MVC/wwwroot/js/site.js'];

gulp.task('watch-lint', function () {
    gulp.watch(sources, ['lint']);
});
 
gulp.task('lint', function () {
    return gulp.src(sources)
     .pipe(ignore.exclude(/angular\.js/))
     .pipe(ignore.exclude(/angular-confirm\.js/))
     .pipe(ignore.exclude(/ui-bootstrap-tpls\.js/))
     .pipe(jshint({"predef": ["angular"]}))
     .pipe(jshint.reporter('default'))
     .pipe(jshint.reporter('fail'))
     .on('error', function(){
       process.exit(1);
     });
});

gulp.task('watchTests', ["clean"], function () {
    new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: false
    }).start();
});

gulp.task('runTests', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('dotnet-build-mvc', shell.task("dotnet build BowlingScorer.MVC/"));
gulp.task('dotnet-build-mvc-test', shell.task("dotnet build BowlingScorer.MVC.Tests/"));
gulp.task('dotnet-test-mvc', shell.task("dotnet test BowlingScorer.MVC.Tests/"));
gulp.task('dotnet-run-mvc', shell.task("dotnet run --project BowlingScorer.MVC/"));

