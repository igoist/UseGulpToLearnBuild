var concat = require('gulp-concat');
var gulp = require('gulp');
var gutil = require('gulp-util'); // !! gutil.log()
var ramda = require('ramda');
var sass = require('gulp-sass');

var browserify = require('browserify');
var shim = require('browserify-shim');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

// 后期优化
// var minifyCss = require('gulp-minify-css');
// var rename = require('gulp-rename');
// var pump = require('pump'); // as to why should use pump, I don't know
var uglify = require('gulp-uglify');


gulp.task('sass', function() {
  return gulp.src('src/assets/sass/*.scss')
    .pipe(sass())
    // .pipe(minifyCss())
    // .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/css'))
});

// gulp.task('js', function() {
//     gulp.src('src/assets/js/*.js')
//     .pipe(concat('bundle.js'))
//     .pipe(uglify())
//     // .pipe(rename({ suffix: '.min' }))
//     .pipe(gulp.dest('dist/js'))
// });

gulp.task('js', function (cb) {
  pump([
      gulp.src('src/assets/js/*.js'),
      concat('bundle.js'),
      uglify(),
      gulp.dest('dist')
    ],
    cb
  );
});

gulp.task('script:build', function() {
  gutil.log('start');
	browserify('src/assets/js/index.js')
		.transform(babelify, {
			presets: ['es2015', 'react']
		})
    .transform(shim)
		.bundle()
		.pipe(source('bundle.js'))
		.pipe(gulp.dest('dist/js'));
});

gulp.task('watch', function() {
  gutil.log('message')
  gulp.watch('src/assets/sass/*.scss', ['sass']);
  // gulp.watch('src/js/*.js', ['js']);
  // gulp.watch('src/images/*', ['images']);
  // gulp.watch(['dist/**/*.*']).on('change', livereload.changed);
});


gulp.task('default', ['script:build']);



// "babel-core": "^6.25.0",
// "babel-loader": "^7.1.0",
// "babel-preset-es2015": "^6.24.1",
// "babel-preset-react": "^6.24.1",
// "react": "^15.6.1",
// "react-dom": "^15.6.1"