//define components


var gulp = require('gulp'),
	gutil = require('gulp-util'),
	livereload = require('gulp-livereload'),

	//css processing
	postcss = require('gulp-postcss'),
	autoprefixer = require('autoprefixer'),
	cssnano = require('cssnano'),
	precss = require('precss'),

	//js processing
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),

	//define directories
	themeDirectory = 'out/',
	dev = 'dev/',
	devCSS = 'dev/css/',
	devJS = 'dev/js/'


//copy html
gulp.task('html', function () {
	gulp.src(dev + '/html/**/*.html')
	.pipe(gulp.dest(themeDirectory))
	.pipe(livereload());
});


//compile SASS synthax / minify
gulp.task('cssPrep', function() {

	gulp.src(devCSS + 'style.css')
		.pipe(postcss([
			precss(),
			autoprefixer(),
			cssnano()
	]))

	.on('error', gutil.log)
		.pipe(gulp.dest(themeDirectory + '/css'))
		.pipe(livereload());

});


//concatinate & minify & rename javascript
gulp.task('jsConcat', function(){

	gulp.src(devJS + '*.js')
		.pipe(concat('script.js'))
		.pipe(uglify())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest(themeDirectory + '/js'))
		.pipe(livereload());

});


//watch & process
gulp.task('watch', function() {

	livereload.listen();
	gulp.watch(devCSS + '**/*.css', ['cssPrep']);
	gulp.watch(dev + '**/*.html', ['html']);
	gulp.watch(devJS + '*.js', ['jsConcat']);

});


gulp.task( 'default', [ 'html', 'cssPrep', 'jsConcat', 'watch' ] );