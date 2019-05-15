/*
 * AngularJS validation plugin for  Bootstrap 4
 *  Copyright (c) 2019 Rodziu <mateusz.rohde@gmail.com>
 *  License: MIT
 */
!function(){
	'use strict';
	const pkg = require('./package'),
		gulp = require('gulp'),
		concat = require('gulp-concat'),
		rename = require('gulp-rename'),
		sourcemaps = require('gulp-sourcemaps');

	// js
	const ngAnnotate = require('@rodziu/gulp-ng-annotate-patched'),
		uglify = require('gulp-uglify-es').default,
		eslint = require('gulp-eslint');

	gulp.task('js:app', function(){
		return gulp.src([
			'src/js/**/*.module.js',
			'src/js/**/*.js',
			'!src/js/i18n/*.js'
		])
			.pipe(ngAnnotate())
			.pipe(eslint())
			.pipe(eslint.format())
			.pipe(eslint.failOnError())
			.pipe(concat(pkg.name + '.js'))
			.pipe(gulp.dest('dist'))
			.pipe(rename(pkg.name + '.min.js'))
			.pipe(sourcemaps.init())
			.pipe(uglify())
			.pipe(sourcemaps.write('./', {includeContent: false}))
			.pipe(gulp.dest('dist'));
	});

	gulp.task('js:i18n', function(){
		return gulp.src('src/js/i18n/*.js')
			.pipe(ngAnnotate())
			.pipe(eslint())
			.pipe(eslint.format())
			.pipe(eslint.failOnError())
			.pipe(gulp.dest('dist/i18n'))
			.pipe(rename({suffix: '.min'}))
			.pipe(sourcemaps.init())
			.pipe(uglify())
			.pipe(sourcemaps.write('./', {includeContent: false}))
			.pipe(gulp.dest('dist/i18n'));
	});

	// css
	const cssMin = require('gulp-clean-css'),
		sass = require('gulp-sass');

	gulp.task('scss', function(){
		return gulp.src('src/scss/*.scss')
			.pipe(sass())
			.pipe(gulp.dest('dist'))
			.pipe(rename({suffix: '.min'}))
			.pipe(sourcemaps.init())
			.pipe(cssMin())
			.pipe(sourcemaps.write('./', {includeContent: false}))
			.pipe(gulp.dest('dist'));
	});

	//
	exports.default = gulp.series('js:app', 'js:i18n');
}();
