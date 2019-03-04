// var gulp = require('gulp'),
//     nodemon = require('gulp-nodemon');
// var sass = require('gulp-sass');
// var wait = require('gulp-wait');

// //refresh
// gulp.task('default', function () {
//     nodemon({
//         script: 'server.js',
//         exr: 'js',
//         env: {
//             PORT: 3000
//         },
//         ignore: ['./node_modules/**']
//     })
//         // .on('start', ['watch'])
//         .on('change', ['watch'])
//         .on('restart', function () {
//             console.log('Restarting')
//         });
// });


// //compile Sass
// gulp.task('sass', function () {
//   gulp.src('app/assets/stylesheets/**/*.scss')
//         .pipe(wait(200))
//         .pipe(sass().on('error', sass.logError))
//         .pipe(gulp.dest('./app/assets/css'));
// });

// //compile and watch
// gulp.task('watch', function() {
//     gulp.watch('app/assets/stylesheets/**/_*.scss', ['sass']);
//     gulp.watch('app/assets/stylesheets/*.scss', ['sass']);
//     gulp.watch('app/Js/*.js');
//    });

var gulp = require('gulp');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var nodemon = require('gulp-nodemon');

gulp.task('sass', function () {
	return gulp.src('app/assets/stylesheets/**/*.scss')
	.pipe(sass({outputStyle: 'compressed', sourceComments: 'map'}, {errLogToConsole: true}))
	.pipe(prefix("last 2 versions", "> 1%", "ie 8", "Android 2", "Firefox ESR"))
	.pipe(gulp.dest('./app/assets/css'))
	.pipe(reload({stream:true}));
});

gulp.task('browser-sync', ['nodemon'], function() {
	browserSync.init(null, {
		proxy: "localhost:8000"
		
	});
});

gulp.task('default', ['sass', 'browser-sync'], function () {
	gulp.watch('app/assets/stylesheets/**/_*.scss', ['sass'], reload);
    gulp.watch('app/assets/stylesheets/*.scss', ['sass'], reload);
	gulp.watch(['app/Js/*.js', 'app/*.html'], reload);
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