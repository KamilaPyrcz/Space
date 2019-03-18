var gulp = require('gulp');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var nodemon = require('gulp-nodemon');
var wait = require('gulp-wait');


gulp.task('default', ['sass', 'nodemon'], function () {
	gulp.watch('app/assets/stylesheets/**/_*.scss', ['sass'], );
    gulp.watch('app/assets/stylesheets/*.scss', ['sass'], );
	gulp.watch(['app/Js/*.js', 'app/*.html'],);
});


gulp.task('sass', function () {
	return gulp.src('app/assets/stylesheets/**/*.scss')
	.pipe(wait(200))
	.pipe(sass({outputStyle: 'compressed', sourceComments: 'map'}, {errLogToConsole: true}))
	.pipe(prefix("last 2 versions", "> 1%", "ie 8", "Android 2", "Firefox ESR"))
	.pipe(gulp.dest('./app/assets/css'))
});


gulp.task('nodemon', function (cb) {
	var called = false;
	return nodemon({script: 'server.js'}).on('start', function () {
		if (!called) {
			called = true;
			cb();
		}
	});
});