var gulp = require('gulp'),
    nodemon = require('gulp-nodemon');
var sass = require('gulp-sass');

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
        .on('start', ['watch'])
        .on('change', ['watch'])
        .on('restart', function () {
            console.log('Restarting')
        });
});

//compile Sass
gulp.task('sass', function () {
    gulp.src('app/assets/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('app/assets/css'));
});

//compile and watch
gulp.task('watch', function() {
    gulp.watch('app/scss/app.scss', ['sass']);
   });