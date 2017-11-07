const

	gulp = require('gulp'),

	gulpBabel = require('gulp-babel'),

	gulpSourcemaps = require('gulp-sourcemaps'),

	gulpConcat = require('gulp-concat'),

	gulpJest = require('gulp-jest').default,

	sourcePath = './src';

gulp

	.task('test', () => {

		gulp

			.src(sourcePath)

			.pipe(gulpJest({
				coverage: true,
				coverageReporters: ['text-summary'],
				coverageDirectory: './warble.coverage.json',
				verbose: true
			}));

	})

	.task('build', () => {

		gulp

			.src('warble.js')

			.pipe(gulpSourcemaps.init())

			.pipe(gulpConcat('warble.min.js'))

			.pipe(
				gulpBabel({
					presets: ['es2015'],
					compact: true
				})
			)

			.pipe(gulpSourcemaps.write('.'))

			.pipe(gulp.dest('dist'));

	})

	.task('watch', () => {

		gulp.watch(`${sourcePath}/warble.js`, ['build']);

		gulp.watch([`${sourcePath}/warble.js`, `${sourcePath}/warble.test.js`], ['test']);

	})

	.task('default', ['build']);
