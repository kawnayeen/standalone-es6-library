(function () {
    "use strict";
    const gulp = require('gulp');
    const browserify = require('browserify');
    const babelify = require('babelify');
    const mocha = require('gulp-mocha');
    const source = require('vinyl-source-stream');

    gulp.task('test', () => {
        return gulp.src('./src/test/**/**.js', {read: false})
            .pipe(mocha({
                require: ['@babel/register'],
                reporter: 'spec'
            }));
    });

    gulp.task('bundle', async () => {
        await browserify({
            entries: ['./src/main/app.js'],
            standalone: 'HelloModule'
        }).transform(babelify.configure({presets: ["@babel/env"]}))
            .bundle().on('error', err => console.log(err))
            .pipe(source('hello-lib.js'))
            .pipe(gulp.dest('./build'));
    });

    gulp.task('build', gulp.series('test', 'bundle'));
}());