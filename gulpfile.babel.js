import gulp from 'gulp'
import babel from 'gulp-babel'
import sass from 'gulp-sass'
import uglify from 'gulp-uglify'
import concat from 'gulp-concat'
import postcss from 'gulp-postcss'
import purgecss from 'gulp-purgecss'
// import { includePaths as bourbon } from 'node-bourbon'
// import { includePaths as neat } from 'node-neat'

let neat = require("node-neat").includePaths
let bourbon = require("node-bourbon").includePaths

// import nodeSass from 'node-sass'
// sass.compiler = nodeSass

const paths = {
  scripts: {
    src: 'src/js/*.js',
    dest: 'dist/js/'
  },
  scss: {
    src: 'src/scss/*.scss',
    dest: 'dist/css/',
  },
};

function scripts() {
  gulp.src(paths.scripts.src, { sourcemaps: true })
    .pipe(babel())
    .pipe(uglify())
    .pipe(concat('scripts.min.js'))
    .pipe(gulp.dest(paths.scripts.dest))
}

function scss() {
  gulp.src(paths.scss.src, { sourcemaps: true })
    .pipe(sass({
      includePaths: [neat, bourbon]
    }))
    .pipe(gulp.dest("dist/css"))
}

const compile = gulp.parallel(scripts, scss);

// Setup the BrowserSync server
import browserSync from 'browser-sync';
const server = browserSync.create();

function reload(done) {
  server.reload();
  done();
}

function serve(done) {
  server.init({
    server: {
      baseDir: './dist/',
    },
  });
  done();
}

// Define watchers for each build component, and cumulative watcher
const watchScripts = () => gulp.watch(paths.scripts.src, gulp.series(scripts, reload));
const watchStyles = () => gulp.watch(paths.scss.src, gulp.series(scss, reload));

const watch = gulp.parallel(watchScripts, watchStyles);

// Default Task
const defaultTasks = gulp.series(compile, serve, watch);

// Export named tasks
export { 
  scripts, 
  scss, 
  compile,
}

export default defaultTasks