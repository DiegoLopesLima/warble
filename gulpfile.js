var

	path = require('path'),

	gulp = require('gulp'),

	jasmine = require('gulp-jasmine');

gulp

	.task('test', function() {

		gulp

			.src(path.join('source', '*.test.js'))

			.pipe(jasmine());

	})

	.task('default', []);
