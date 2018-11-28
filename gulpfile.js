var gulp = require('gulp'),
    nodemon = require('gulp-nodemon');

    gulp.task('default', function(){
        nodemon({
            script: 'server.js',
            exr: 'js',
            env: {
                PORT:3000
            },
            ignore: ['./node_modules/**']
        })
        .on('restart', function(){
            console.log('Restarting')
        });
    });