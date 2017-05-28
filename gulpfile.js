var gulp = require('gulp'),
  minifycss = require('gulp-clean-css'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  clean = require('gulp-clean'),
  concat = require('gulp-concat'),
  htmlreplace = require('gulp-html-replace'),
  streamqueue = require('streamqueue');

// HTML
gulp.task('html', function() {
  return gulp.src('index.html')
    .pipe(htmlreplace({
      'vendorstyles': 'css/vendor.min.css',
      'nivostyles': 'css/nivo_themes/default/nivo.min.css',
      'appstyles': 'css/app.min.css',
      'vendorscripts': 'js/vendor.min.js',
      'appscripts': 'js/app.min.js'
    }))
    .pipe(gulp.dest('dist'));
});

// JSON
gulp.task('json', function() {
  return gulp.src('js/**/*.json', { 'base' : '.'})
    .pipe(gulp.dest('dist'));
});

// FONTS
gulp.task('fonts', function() {
  return gulp.src('fonts/**/*', { 'base' : '.'})
    .pipe(gulp.dest('dist'));
});


// Vendor Styles
gulp.task('vendorstyles', function() {
  var concatStream = gulp.src([
    'css/bootstrap.min.css',
    'css/font-awesome.min.css',
    'css/animate.min.css']);
  var minStream = gulp.src([
    'css/nivo-lightbox.css',
    'css/nivo_themes/default/default.css'
  ]).pipe(minifycss());

  return streamqueue({ objectMode: true }, concatStream, minStream)
    .pipe(concat('vendor.min.css'))
    .pipe(gulp.dest('dist/css'));
});

// Nivo Styles
gulp.task('nivostyles', function() {
  return gulp.src([
    'css/nivo-lightbox.css',
    'css/nivo_themes/default/default.css'])
    .pipe(minifycss())
    .pipe(concat('nivo.min.css'))
    .pipe(gulp.dest('dist/css/nivo_themes/default'));
});

// App Styles
gulp.task('appstyles', function() {
  return gulp.src('css/style.css')
    .pipe(minifycss())
    .pipe(rename('app.min.css'))
    .pipe(gulp.dest('dist/css'));
});

// Vendor Scripts
gulp.task('vendorscripts', function() {

  var concatStream = gulp.src([
    'js/jquery.js',
    'js/bootstrap.min.js',
    'js/nivo-lightbox.min.js',
    'js/smoothscroll.js',
    'js/wow.min.js']);

  var minStream = gulp.src([
    'js/jquery.parallax.js',
    'js/lib/jquery.i18n/jquery.i18n.js',
    'js/lib/jquery.i18n/jquery.i18n.messagestore.js',
    'js/lib/jquery.i18n/jquery.i18n.fallbacks.js',
    'js/lib/jquery.i18n/jquery.i18n.language.js',
    'js/lib/jquery.i18n/jquery.i18n.parser.js',
    'js/lib/jquery.i18n/jquery.i18n.emitter.js',
    'js/lib/jquery.i18n/jquery.i18n.emitter.bidi.js',
    'js/lib/CLDRPluralRuleParser/*.js']).pipe(uglify());

  return streamqueue({ objectMode: true }, concatStream, minStream)
    .pipe(concat('vendor.min.js'))
    .pipe(gulp.dest('dist/js'));

});

// App Scripts
gulp.task('appscripts', function() {
  return gulp.src('js/custom.js')
    .pipe(uglify())
    .pipe(rename('app.min.js'))
    .pipe(gulp.dest('dist/js'));
});

// Images
gulp.task('images', function() {
  return gulp.src('images/**/*')
    .pipe(gulp.dest('dist/images'));
});

// CSS Images
gulp.task('cssimages', function() {
  return gulp.src(['css/**/*.png', 'css/**/*.gif'], { 'base' : '.'})
    .pipe(gulp.dest('dist'));
});

// Clean
gulp.task('clean', function() {
  return gulp.src(['dist/css', 'dist/js', 'dist/images'], {read: false})
    .pipe(clean());
});

// Default task
gulp.task('default', ['clean'], function() {
  gulp.run('vendorstyles', 'nivostyles', 'appstyles', 'vendorscripts', 'appscripts', 'images', 'cssimages', 'html', 'json', 'fonts');
});
