Standalone ES6 Library
========

The idea is develop a es6 library, bundle it as standalone module and use it as a library in new or existing legacy frontend project that will run in browser.

[hello-lib](/hello-lib) is the library project and [example-project](/example-project) is an example of how this library can be 
used in frontend project.

Technical details of hello-lib
------

`hello-lib` project required on the following:-

- Node version 14+
- babel 7
- gulp 4

It also usages `mocha` as test runner and `chai` as assertion library.

### test task

Here is the gulp task for test:-
```
gulp.task('test', () => {
        return gulp.src('./src/test/**/**.js', {read: false})
            .pipe(mocha({
                require: ['@babel/register'],
                reporter: 'spec'
            }));
    });
``` 

So, it look all the javascript files under [src/test](hello-lib/src/test) and run 
the tests. `@babel/register` is used as compiler. to run this task we also need to 
set `@babel/preset-env` as preset of babel in [.babelrc](hello-lib/.babelrc) file.

for running the test task, just execute the following in terminal

```
./test.sh
```

### task bundle

Here is the gulp task for bundle:-
```
gulp.task('bundle', async () => {
        await browserify({
            entries: ['./src/main/app.js'],
            standalone: 'HelloModule'
        }).transform(babelify.configure({presets: ["@babel/env"]}))
            .bundle().on('error', err => console.log(err))
            .pipe(source('hello-lib.js'))
            .pipe(gulp.dest('./build'));
    });
```

So, it start bundling from the [app.js](/hello-lib/src/main/app.js) file. The important thing to notice 
that we use `standalone: 'HelloModule'` in the browserfiy configuration. That will allow us to use the 
functionality of this library in external js file and they are accessible in `HelloModule`

All the es6 code is transpiled to es5 and bundle into `hello-lib.js` file under `build` directory

### task build

build task is just the combination of `test` and `bundle` task in sequence. It will first run the test task. 
If all test passes, then proceed to the bundle task which will generate the newer version of `hello-lib.js` file.

To run the build task, try following in terminal:-
```
./build.sh
```
