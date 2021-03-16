/*
 * AngularJS validation plugin for  Bootstrap 4
 *  Copyright (c) 2019-2021 Rodziu <mateusz.rohde@gmail.com>
 *  License: MIT
 */

!function() {
    'use strict';
    const gulp = require('gulp'),
        rename = require('gulp-rename'),
        ts = require('gulp-typescript'),
        sourcemaps = require('gulp-sourcemaps'),
        eslint = require('gulp-eslint'),
        glob = require('glob'),
        path = require('path'),
        ngAnnotate = require('@rodziu/gulp-ng-annotate-patched'),
        plumber = require('gulp-plumber'),
        log = require('fancy-log'),
        merge = require('merge2'),
        webpack = require('webpack'),
        webpackStream = require('webpack-stream');

    // ts
    gulp.task('ts', () => {
        const tsProject = ts.createProject('tsconfig.app.json'),
            tsResult = gulp.src([
                'src/ts/**/*.ts',
                '!src/ts/i18n/*.ts'
            ])
                .pipe(eslint())
                .pipe(eslint.format())
                .pipe(eslint.failOnError())
                .pipe(sourcemaps.init())
                .pipe(tsProject());

        return merge([
            tsResult.dts.pipe(gulp.dest('dist')),
            tsResult.js
                .pipe(plumber())
                .pipe(ngAnnotate().on('error', (e) => {
                    log('\x1b[31mngAnnotate\x1b[0m ', e.message);
                }))
                .pipe(plumber.stop())
                .pipe(sourcemaps.write())
                .pipe(gulp.dest('.build'))
        ]);
    });

    gulp.task('i18n', () => {
        const tsProject = ts.createProject('tsconfig.i18n.json');
        return gulp.src([
            'src/ts/i18n/*.ts'
        ])
            .pipe(sourcemaps.init())
            .pipe(tsProject())
            .pipe(sourcemaps.write())
            .pipe(gulp.dest('.build/i18n'))
    });

    gulp.task('bundle', () => {
        return _bundle(false);
    });

    gulp.task('bundle:prod', () => {
        return _bundle(true);
    });

    function _bundle(production) {
        const entries = {
            'angularjs-bootstrap4-validate': './.build/angularjs-bootstrap4-validate.js'
        };

        glob.sync('i18n/*.js', {
            cwd: path.join(process.cwd(), '.build')
        }).forEach((filePath) => {
            entries[filePath.replace('.js', '')] = {
                import: './' + path.join('.build', filePath),
                dependOn: 'angularjs-bootstrap4-validate'
            }
        });

        return gulp.src('dummy', {allowEmpty: true})
            .pipe(webpackStream({
                entry: entries,
                mode: production ? 'production' : 'development',
                externals: {
                    angular: 'angular'
                },
                output: {
                    devtoolNamespace: 'validate',
                    filename: (pathData) => {
                        let name = pathData.chunk.name;
                        return name.substring(0, 1).toLowerCase()
                            + name.substring(1).replace(/[A-Z]/g, (letter) => {
                                return '-' + letter.toLowerCase();
                            })
                            + (production ? '.min' : '') + '.js'
                    },
                    library: '[name]',
                    libraryTarget: 'umd',
                    libraryExport: 'default',
                    umdNamedDefine: true,
                    globalObject: 'window'
                },
                module: {
                    rules: [
                        {
                            test: /\.js$/,
                            enforce: 'pre',
                            use: ['source-map-loader'],
                        },
                    ],
                },
                devtool: 'source-map'
            }, webpack))
            .pipe(gulp.dest('dist'));
    }

    // css
    const cssMin = require('gulp-clean-css'),
        sass = require('gulp-sass');

    gulp.task('scss', function() {
        return gulp.src('src/scss/*.scss')
            .pipe(sourcemaps.init())
            .pipe(sass())
            .pipe(gulp.dest('dist'))
            .pipe(rename({suffix: '.min'}))
            .pipe(cssMin())
            .pipe(sourcemaps.write('./', {includeContent: false}))
            .pipe(gulp.dest('dist'));
    });

    gulp.task('watch', function() {
        [
            ['src/**/*.ts', 'ts'],
            ['src/**/.scss', 'scss']
        ].forEach(([src, task]) => {
            gulp.watch(src, {}, gulp.series(task, 'bundle', 'bundle:prod'));
        });
    });

    exports.default = gulp.series(gulp.parallel('ts', 'i18n', 'scss'), gulp.parallel('bundle', 'bundle:prod'));
}();
