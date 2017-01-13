{

	'use strict';

	let

		objectTypes = ['Boolean', 'Number', 'String', 'Function', 'Array', 'Date', 'RegExp', 'Object', 'Error', 'Symbol'],

		typesReference = {},

		toString = typesReference.toString;

	for (let index = 0, size = objectTypes.length; index < size; index++)

		typesReference['[object ' + objectTypes[index] + ']'] = objectTypes[index].toLowerCase();

	class WarbleCore {

		re = {
			// https://www.w3.org/TR/html5/forms.html#e-mail-state-(type=email)
			'email': /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
			'integer': /^\d+$/
		};

		isHooks = {
			emptyObject(object) {

				for (let index in object)

					return false;

				return true;

			},
			email: (value) => this.re.email.test(value),
			integer: (value) => this.re.integer.test(value)
		};

		validateHooks = {
			required: (value, isRequired) => isRequired ? value !== undefined : true,
			pattern: (value, pattern) => (typeof pattern === 'object' && typeof pattern.test === 'function' ? pattern : new RegExp(pattern)).test(value),
			min: (value, min = 0) => (Number(value) || 0) >= (Number(min) || 0),
			max: (value, max = Infinity) => (Number(value) || 0) <= (Number(max) || 0),
			minlength: (value, min = 0) => typeof value === 'string' ? value.length >= (Number(min) || 0) : false,
			maxlength: (value, max = Infinity) => typeof value === 'string' ? value.length <= (Number(max) || 0) : false,
			type: (value, type) => core.type(value) === type,
			is(value, types) {

				var response = [];

				if (core.is(types, 'array')) {

					for (let index = 0, size = types.length; index < size; index++)

						if (!core.is(value, types[index]))

							response.push(types[index]);

				} else if (!core.is(value, types))

					response.push(types);

				return response.length > 0 ? response : true;

			}
		};

		type = (value) => value === null ? 'null' : (typeof value === 'object' || typeof value === 'function' ? typesReference[toString.call(value)] || 'object' : typeof value);

		is = (value, type) => this.isHooks.hasOwnProperty(type) ? !!this.isHooks[type](value) : this.type(value) === type;

	}

	let core = new WarbleCore;

	class WarbleFragment {

		constructor(value) {

			this.value = value;

			this.valid = true;

			this.invalid = false;

			this.error = {};

		}

		validate(name, param) {

			var response = core.validateHooks.hasOwnProperty(name) ? core.validateHooks[name](this.value, param) : true;

			if (!response || core.is(response, 'array')) {

				this.valid = false;

				this.invalid = true;

				this.error[name] = true;

				if (core.is(response, 'array'))

					for (let index = 0, size = response.length; index < size; index++)

						this.error[name + ':' + response[index]] = true;

			} else

				delete this.error[name];

			return this;

		}

	}

	class WarbleModel {

		constructor(model) {

			if (typeof model === 'object')

				this.model = model;

			else

				throw new Error('WarbleModel expects an object.');

		}

		validate(data) {

			if (typeof data === 'object') {

				let

					response = {
						'data': {},
						'valid': true,
						'invalid': false
					};

				for (let index in this.model) {

					let value = new WarbleFragment(data[index]);

					if (this.model.hasOwnProperty(index) && typeof this.model[index] === 'object')

						for (let validation in this.model[index]) {

							let current = value.validate(validation, this.model[index][validation]);

							if (current.invalid) {

								response.valid = false;

								response.invalid = true;

							}

						}

					response.data[index] = value;

				}

				return response;

			} else

				throw new Error('WarbleModel.validate expects an object.');

		}

	}

	class Warble extends WarbleCore {

		model = (model) => new WarbleModel(model);

		validate(value, options) {

			if (typeof options === 'object') {

				var value = new WarbleFragment(value);

				for (let index in options)

					value.validate(index, options[index]);

				return value;

			} else

				throw new Error('Warble.validate expects an object.');

		}

	}

	var warble = new Warble;

};

//

warble.isHooks.gmail = function(value) {

	return /\@gmail\.com$/i.test(value);

};

let

	schema = warble.model({
		'name': {
			'required': true,
			'minlength': 3
		},
		'surname': {
			'required': true,
			'minlength': 3
		},
		'age': {
			'required': true,
			'min': 18
		},
		'email': {
			'is': ['email', 'gmail']
		}
	}),

	data = {
		'name': 'Diego',
		'surname': 'Lopes Lima',
		'age': 23,
		'email': 'web.diego.lima@yahoo.com'
	};

console.log(schema.validate(data));

console.log(warble.validate(data.name, schema.model.name));

console.log(warble.type([]));
