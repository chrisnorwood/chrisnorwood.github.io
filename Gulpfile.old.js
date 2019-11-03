"use strict";

var gulp = require("gulp"),
    browserSync = require("browser-sync"),
    sass = require("gulp-sass"),
    bourbon = require("node-bourbon").includePaths,
    neat = require("node-neat").includePaths,
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'); 

// Compiles all gulp tasks
// gulp.task("default", ["sass", "scripts"]);

gulp.task("default", gulp.parallel("sass", "scripts"));

// Live reload anytime a file changes
// gulp.task("watch", ["browserSync", "sass", "scripts"], function() {

gulp.task("watch", gulp.parallel("browserSync", "sass", "scripts"), function() {
  gulp.watch("src/scss/**/*.scss", ["sass"]);
  gulp.watch("src/js/**/*.js", ["scripts"]);
  gulp.watch("dist/*.html").on("change", browserSync.reload);
});

// Spin up a server
gulp.task("browserSync", function() {
  browserSync({
    server: {
      baseDir: "dist"
    }
  })
});

// Compile SASS files
gulp.task("sass", function() {
  gulp.src("src/scss/**/*.scss")
      .pipe(sass({
        includePaths: bourbon,
        includePaths: neat
      }))
      .pipe(gulp.dest("dist/css"))
      .pipe(browserSync.reload({
        stream: true
      }))
});

// Compile JS files
var jsFiles = 'src/js/**/*.js',  
    jsDest = 'dist/js';

gulp.task('scripts', function() {  
    return gulp.src(jsFiles)
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest(jsDest))
        .pipe(rename('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(jsDest))
        .pipe(browserSync.reload({
          stream: true
        }));
});




