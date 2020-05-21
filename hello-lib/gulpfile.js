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
}());