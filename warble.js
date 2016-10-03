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

		toString = re.toString,

		warble = {
			'data': function(data) {

				return new Data(data);

			},
			'model': function(model) {

				return new Model(model);

			},
			'is': function(data, type) {

				if (warble.type(type) === 'model')

					if (warble.type(data) === 'data')

						return data.is(type);

					else

						return false;

				else

					return warble.type(data) === type;

			},
			'type': function(data) {

				return toString.call(data).toLowerCase().replace(/^\[object (\w+)\]$/, '$1');

			},
			'serialize': function(element) {

				return;

			},
			'extend': function() {

				return;

			},
			'isolate': function() {

				return;

			}
		};

	Data.prototype = {
		'constructor': Data,
		'toString': function() {

			return JSON.stringfy(this.data);

		},
		'toQueryString': function() {

			return;

		},
		'is': function(type) {

			return;

		},
		'extend': function() {

			return;

		},
		'isolate': function() {

			return;

		}
	};

	Model.prototype = {
		'constructor': Model,
		'test': function(data) {

			if (warble.type(data) === 'data')

				return data.is(this);

			else

				return false;

		}
	};

	if (typeof module === 'object' && typeof module.exports === 'object')

		module.exports = warble;

	else

		global.warble = warble;

})(this);
