'use strict';

var autoprefixer = require('autoprefixer'),
    gulp         = require('gulp'),
    imagemin     = require('gulp-imagemin'),
    jade         = require('gulp-jade'),
    plumber      = require('gulp-plumber'),
    postcss      = require('gulp-postcss'),
    sourcemaps   = require('gulp-sourcemaps'),
    svgstore     = require('gulp-svgstore'),
    watch        = require('gulp-watch'),
    gutil        = require('gulp-util'),
    rename       = require('gulp-rename'),
    concat       = require('gulp-concat'),
    uglify       = require('gulp-uglify'),
    calc         = require('postcss-calc'),
    postcssSVG   = require('postcss-svg'),
    cssImport    = require('postcss-import'),
    flexBugs     = require('postcss-flexbugs-fixes'),
    precss       = require('precss'),
    ftp          = require('vinyl-ftp'),
    rimraf       = require('rimraf'),
    seq          = require('run-sequence'),
    R            = require('ramda'),
    browserSync  = require('browser-sync').create();


/* ==========================================================================
   Variables
   ========================================================================== */

var paths = {
  jade: 'src/**/*.jade',
  jadePages: 'src/*.jade',
  css: 'src/css/**/*.css',
  fonts: 'src/fonts/*',
  js: 'src/js/**/*.js',
  jsLibraries: 'src/js/libraries/*.js',
  jsComponents: 'src/js/components/*.js',
  jsOther: 'src/js/*.js',
  img: 'src/img/*',
  spriteSvg: 'src/sprite-svg/*.svg',
  temp: 'src/temp/**/*'
};

var postcssProcessors = [
  cssImport({ glob: true }),
  precss(),
  calc(),
  postcssSVG({ paths: ['src/sprite-css'], svgo: true }),
  flexBugs(),
  autoprefixer({ browsers: ['> 0.1%'] })
];

var ftpConnection = ftp.create({
  host:     'html.kodix.ru',
  user:     'pipanda_html',
  password: 'GAwl04rZ',
  parallel: 10
});

var ftpUploadAddress = '/public_html/_ek/dresscode';

var onError = function(err) {
  gutil.beep();
  console.log(err);
  this.emit('end');
};


/* ==========================================================================
   Tasks
   ========================================================================== */

gulp.task('default', function(cb) {
  seq('watch', 'server', cb);
});

gulp.task('build', function(cb) {
  seq('clean',['html', 'css', 'fonts', 'js', 'img', 'sprite-svg', 'temp'], cb);
});

gulp.task('watch', ['build'], function() {
  watch( paths.jade,      function() { seq('html');       });
  watch( paths.css,       function() { seq('css');        });
  watch( paths.fonts,     function() { seq('fonts');      });
  watch( paths.js,        function() { seq('js');         });
  watch( paths.img,       function() { seq('img');        });
  watch( paths.spriteSvg, function() { seq('sprite-svg'); });
  watch( paths.temp,      function() { seq('temp');       });
});

gulp.task('clean', function(cb) {
  rimraf('dist', cb);
});

gulp.task('server', function() {
  browserSync.init({ server: { baseDir: 'dist' } });
});

gulp.task('html', function() {
  return gulp.src( paths.jadePages )
    .pipe( plumber({ errorHandler: onError }))
    .pipe( jade({
      pretty: true,
      locals: { R: R }
    }) )
    .pipe( gulp.dest('dist') )
    .pipe( browserSync.stream() );
});

gulp.task('css', function() {
  return gulp.src('src/css/base.css')
    .pipe( plumber({ errorHandler: onError }))
    .pipe( sourcemaps.init() )
    .pipe( postcss(postcssProcessors) )
    .pipe( rename('style.css'))
    .pipe( sourcemaps.write('.') )
    .pipe( gulp.dest('dist/resources/css') )
    .pipe( browserSync.stream() );
});

gulp.task('fonts', function() {
  return gulp.src( paths.fonts )
    .pipe( gulp.dest('dist/resources/fonts') )
    .pipe( browserSync.stream() );
});

gulp.task('js-libraries', function() {
  return gulp.src( paths.jsLibraries )
    .pipe( concat('libraries.js') )
    .pipe( uglify() )
    .pipe( gulp.dest('dist/resources/js') )
    .pipe( browserSync.stream() );
});

gulp.task('js-components', function() {
  return gulp.src( paths.jsComponents )
    .pipe( concat('main.js') )
    .pipe( gulp.dest('dist/resources/js') )
    .pipe( browserSync.stream() );
});

gulp.task('js-other', function() {
  return gulp.src( paths.jsOther )
    .pipe( gulp.dest('dist/resources/js') )
    .pipe( browserSync.stream() );
});

gulp.task('js', function(cb) {
  seq(['js-libraries', 'js-components', 'js-other'], cb);
});

gulp.task('img', function () {
  return gulp.src( paths.img )
    .pipe( imagemin({
      optimizationLevel: 2,
      progressive: true,
      interlaced: true,
      multipass: true
    }))
    .pipe( gulp.dest('dist/resources/img') )
    .pipe( browserSync.stream() );
});

gulp.task('sprite-svg', function() {
  return gulp.src( paths.spriteSvg )
    .pipe( svgstore() )
    .pipe( imagemin({ multipass: true }))
    .pipe( rename('sprite.svg'))
    .pipe( gulp.dest('dist/resources/img') )
    .pipe( browserSync.stream() );
});

gulp.task('temp', function() {
  return gulp.src( paths.temp )
    .pipe( gulp.dest('dist/temp') )
    .pipe( browserSync.stream() );
});

gulp.task('ftp', function() {
  return gulp.src('dist/**/*' , { buffer: false })
    .pipe( ftpConnection.dest( ftpUploadAddress ) );
});
