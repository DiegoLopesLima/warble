;(function(global, undefined) {

	'use strict';

	function Data(data) {

		this.originalData = data;

		this.data = data;

	}

	function Model(model) {

		this.model = model;

	}

	var

		re = {
			'integer': /^\d+$/,
			'numeric': /^\d+(?:\.\d+)?$/
		},

		is = {
			'integer': function(value) {

				return re.integer.test(value);

			},
			'numeric': function(value) {

				return re.numeric.test(value);

			}
		},

		emptyArray = [],

		toString = emptyArray.toString,

		warble = {
			'type': function(data) {

				return toString.call(data).toLowerCase().replace(/^\[object (\w+)\]$/, '$1');

			},
			'each': function(object, callback) {

				if (warble.type(object) === 'array')

					for (var index = 0, size = object.length; index < size; index++)

						callback.call(object[index], index, object[index]);

				else

					for (var index in object)

						callback.call(object[index], index, object[index]);

				return object;

			},
			'extend': function(target) {

				if (typeof target === 'object')

					warble.each(emptyArray.slice.call(arguments, 1), function(index, argument) {

						warble.each(argument, function(property, value) {

							target[property] = value;

						});

					});

				return target;

			},
			'is': function(data, type) {

				if (warble.type(data) === 'data' && warble.type(type) === 'model')

					return data.is(type);

				else

					if (is.hasOwnProperty(type))

						return is[type](data);

					else

						return warble.type(data) === type;

			},
			'data': function(data) {

				return new Data(data);

			},
			'model': function(model) {

				return new Model(model);

			}
		};

	Data.prototype = {
		'constructor': Data,
		'toString': function() {

			return JSON.stringify(this.data);

		},
		'toQueryString': function() {

			return;

		},
		'is': function(model) {

			var valid = false;

			if (warble.type(model) === 'model')

				valid = true;

			return valid;

		},
		'extend': function() {

			warble.extend.apply(this.data, emptyArray.slice.call(arguments, 1));

			return this.data;

		},
		'isolate': function() {

			return;

		}
	};

	Model.prototype = {
		'constructor': Model,
		'test': function(data) {

			return warble.type(data) === 'data' ? data.is(this) : false;

		}
	};

	if (typeof module === 'object' && typeof module.exports === 'object')

		module.exports = warble;

	else

		global.warble = warble;

})(this);
