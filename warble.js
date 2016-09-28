;(function(global, undefined) {

	'use strict';

	function Data(data) {

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

		is = {},

		toString = re.toString,

		validate = {
			'data': function(data) {

				return new Data(data);

			},
			'model': function(model) {

				return new Model(model);

			},
			'is': function(data, type) {

				return;

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
		'toQuery': function() {

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

			return;

		}
	};

	if (typeof module === 'object' && typeof module.exports === 'object')

		module.exports = validate;

	else

		global.validate = validate;

})(this);
