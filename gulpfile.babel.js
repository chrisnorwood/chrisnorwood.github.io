import gulp from 'gulp'
import babel from 'gulp-babel'
import concat from 'gulp-concat'
import del from 'del'
import sass from 'gulp-sass'
import uglify from 'gulp-uglify'
import rename from 'gulp-rename'
import imageMin from 'gulp-imagemin'

const paths = {
  scripts: {
    src: 'src/js/*.js',
    dest: 'dist/js/'
  },
  html: {
    src: 'src/**/*.html',
    dest: 'dist/',
  },
  scss: {
    src: 'src/scss/*.scss',
    dest: 'dist/css/',
  },
  images: {
    src: 'src/img/**/*',
    dest: 'dist/img/',
  },
};

// Task to clean /dist/ folder
const clean = () => del(['dist']);

function scripts() {
  return gulp.src(paths.scripts.src, { sourcemaps: true })
    .pipe(babel())
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(uglify())
    .pipe(rename('scripts.min.js'))
    .pipe(gulp.dest(paths.scripts.dest))
}

function scss() {
  return gulp.src(paths.scss.src, { sourcemaps: true })
    .pipe(sass())
    .pipe(gulp.dest(paths.scss.dest))
}

function html() {
  return gulp.src(paths.html.src, { sourcemaps: true })
    .pipe(gulp.dest(paths.html.dest))
}

function images() {
  return gulp.src(paths.images.src)
    .pipe(imageMin())
    .pipe(gulp.dest(paths.images.dest))
}

function copyCNAME() {
  return gulp.src('./src/CNAME')
    .pipe(gulp.dest('./dist/'));
}

const compile = gulp.parallel(scripts, scss, html, images, copyCNAME);

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
const watchScripts = () => gulp.watch(paths.scripts.src, gulp.series(scripts, reload))
const watchStyles = () => gulp.watch(paths.scss.src, gulp.series(scss, reload))
const watchHtml = () => gulp.watch(paths.html.src, gulp.series(html, reload))
const watchImages = () => gulp.watch(paths.images.src, gulp.series(images, reload));

const watch = gulp.parallel(watchScripts, watchStyles, watchHtml, watchImages);

// Default Task
const defaultTasks = gulp.series(clean, compile, serve, watch);

// Export named tasks
export {
  clean,
  scripts, 
  scss,
  html,
  copyCNAME,
  compile,
}

export default defaultTasks