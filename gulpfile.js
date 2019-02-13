var gulp = require('gulp'),
    nodemon = require('gulp-nodemon');
var sass = require('gulp-sass');
var wait = require('gulp-wait');

//refresh
gulp.task('default', function () {
    nodemon({
        script: 'server.js',
        exr: 'js',
        env: {
            PORT: 3000
        },
        ignore: ['./node_modules/**']
    })
        .on('start', ['sass:watch'])
        .on('change', ['sass:watch'])
        .on('restart', function () {
            console.log('Restarting')
        });
});

//compile Sass
gulp.task('sass', function () {
  gulp.src('app/assets/stylesheets/**/*.scss')
        .pipe(wait(200))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./app/assets/css'));
});

//compile and watch
gulp.task('sass:watch', function() {
    gulp.watch('app/assets/stylesheets/**/_*.scss', ['sass']);
    gulp.watch('app/assets/stylesheets/*.scss', ['sass']);
   });