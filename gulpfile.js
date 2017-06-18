var gulp        = require('gulp'),
    path        = require('path');
    sass       = require('gulp-sass'),
    sourcemaps  = require('gulp-sourcemaps');
    concat      = require('gulp-concat');
    gutil       = require('gulp-util');
    browserSync = require('browser-sync').create();
    fs          = require('fs');
    browserify  = require('browserify');

gulp.task('browser-sync', function() {
    browserSync.init({
        server: true
    });
});

// gulp.task('build-css', function() {
//   return gulp.src('src/**/*.scss')
//     .pipe(sourcemaps.init())
//       .pipe(concat('app.css'))
//       .pipe(sass())
//     .pipe(sourcemaps.write())
//     .pipe(gulp.dest('dist/css/'))
//     .pipe(browserSync.stream());
// });

gulp.task('build-general-css', function() {
  return gulp.src('dist/css/*.scss')
    .pipe(sourcemaps.init())
      .pipe(concat('styles.css'))
      .pipe(sass({outputStyle: 'compressed'}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
});

gulp.task('build-js', function() {
  return gulp.src('src/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('bundle.js')) 
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/js/'))
    .pipe(browserSync.stream());
});

gulp.task('build-plugins-js', function() {
 return browserify({entries: ['plugins.js']})
    .bundle()
    .pipe(fs.createWriteStream('dist/js/plugins.js'));
});

// // nmp install --save-dev gulp-minify-css
// gulp.task('css', function(){
//   return gulp.src('dist/css/styles.css')
//          .pipe(minifycss())
//          .pipe(gulp.dest('dist/css'));
// });

gulp.task('reload', function(done) {
  browserSync.reload();
  done();
});

gulp.task('watch', function () {
  gulp.watch(path.join('src/**/*.js'), function(event) {
    gulp.start('build-js');
  });
  gulp.watch(path.join('plugins.js'), function(event) {
    gulp.start('build-plugins-js');
  });
  gulp.watch(path.join('src/**/*.scss'), function(event) {
    gulp.start('build-css');
  });
  gulp.watch(path.join('dist/css/styles.scss'), function(event) {
    gulp.start('build-general-css');
  });
  gulp.watch(path.join('dist/css/variables.scss'), function(event) {
    gulp.start('build-general-css');
  });
  gulp.watch(path.join('dist/css/login.scss'),function(event){
    gulp.start('build-general-css');
  });
  gulp.watch(path.join('dist/css/registerUser.scss'),function(event){
    gulp.start('build-general-css');
  });
  gulp.watch(path.join('dist/css/home.scss'),function(event){
    gulp.start('build-general-css');
  });
  gulp.watch(path.join('dist/css/detailFilm.scss'),function(event){
    gulp.start('build-general-css');
  });
  gulp.watch(path.join('src/**/*.html'), function(event) {
    gulp.start('reload');
  });
});

gulp.task('serve', ['browser-sync', 'build-general-css', 'build-js', 'build-plugins-js', 'watch']);