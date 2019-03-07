const gulp = require('gulp');
const ts = require('gulp-typescript');
const config = require('./config');
const sourcemaps = require('gulp-sourcemaps');
const gulpLoadPlugins = require('gulp-load-plugins');
const del = require('del');
$ = gulpLoadPlugins();

const tsProject = ts.createProject('tsconfig.json');

gulp.task('copy-config', async () => {
    gulp.src(`src/config/**`).pipe(gulp.dest(`${config.paths.build}/src/config`))
});

gulp.task('copy-app', async () => {
    gulp.src(`app.js`).pipe(gulp.dest(`${config.paths.build}`))

});

gulp.task('clean', async () => {
    await del.sync([config.paths.build]);
});

gulp.task('run-unit-tests', async () => {
    await gulp.src(`${config.paths.build}/${config.files.spec.unit}`)
        .pipe($.mocha({}))
        .on('error', function (error) {
            $.util.log(err);
            process.exit(1);
        }).on('end', function () {
            process.exit();
        })
});

gulp.task('compile', async ()=> {
    return tsProject.src()
        .pipe(sourcemaps.init())
        .pipe(tsProject())
        .on('error', function () {
            process.exit(1);
        }).pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.paths.build));
});

gulp.task('build', gulp.series('compile','copy-config'));
