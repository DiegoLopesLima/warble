const

	gulp = require('gulp'),

	gulpBabel = require('gulp-babel'),

	gulpSourcemaps = require('gulp-sourcemaps'),

	gulpConcat = require('gulp-concat');

gulp

	.task('build', () => {

		gulp.src('warble.js')

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

		gulp.watch('warble.js', ['build']);

	})

	.task('default', ['build']);
