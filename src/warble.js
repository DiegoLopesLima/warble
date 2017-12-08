{

	let

		specificTypes = {
			'[object Array]': 'array',
			'[object Boolean]': 'boolean',
			'[object Date]': 'date',
			'[object Error]': 'error',
			'[object Function]': 'function',
			'[object Null]': 'null',
			'[object Number]': 'number',
			'[object Object]': 'object',
			'[object RegExp]': 'regexp',
			'[object String]': 'string',
			'[object Symbol]': 'symbol'
		};

	const testRegExp = regexp => value => regexp.test(value);

	class Core {

		constructor() {

			var

				re = this.re = {
					email: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/, // https://www.w3.org/TR/html5/forms.html#e-mail-state-(type=email)
					numeric: /^\-?\d+(?:\.\d+)?$/,
					positive: /^\d+(?:\.\d+)?$/,
					negative: /^\-\d+(?:\.\d+)?$/
				},

				isNumeric = testRegExp(re.numeric);

			this.subtypes = {
				email: testRegExp(re.email),
				positive: testRegExp(re.positive),
				negative: testRegExp(re.negative),
				numeric: isNumeric,
				integer: value => isNumeric(value) ? Number.isInteger(Number(value)) : false,
				even: value =>  isNumeric(value) ? value % 2 === 0 : false,
				odd: value =>  isNumeric(value) ? (value < 0 ? (value * -1) : value) % 2 > 0 : false
			};

			this.validations = {
				required: (value, isRequired) => isRequired ? value !== undefined : true,
				pattern: (value, pattern) => (core.is(pattern, 'regexp') ? pattern : new RegExp(pattern)).test(value),
				min: (value, min = -Infinity) => value >= min,
				max: (value, max = Infinity) => value <= max,
				minlength: (value, min = 0) => typeof value === 'string' ? value.length >= min : false,
				maxlength: (value, max = Infinity) => typeof value === 'string' ? value.length <= max : false,
				type: (value, type) => core.type(value) === type,
				is: (value, types) => core.is(value, types, true),
				range(value, range) {

					if (core.is(range, 'array') && range.length > 1)

						return value >= range[0] && value <= range[1];

					throw new Error('The range is invalid.');

				},
				equal(value, to) {

					return value === this[to];

				},
				conditional: (value, conditional) => conditional(value),
				options: (value, options) => !!options.find(current => current === value),
				instance: (value, object) => value instanceof object
			};

		}

		type(value) {

			return value === null ? 'null' : (/object|function/.test(typeof value) ? specificTypes[specificTypes.toString.call(value)] || 'object' : typeof value);

		}

		is(value, types, getDetails) {

			var

				response = {},

				{ subtypes, type } = this;

			if (type(types) === 'array') {

				for (let index = 0, size = types.length; index < size; index++) {

					let test = subtypes[types[index]];

					response[types[index]] = typeof test === 'function' ? test.call(this, value) : type(value) === types[index];

				}

			} else if (typeof subtypes[types] === 'function')

				response[types] = subtypes[types].call(this, value);

			else

				response[types] = type(value) === types;

			if (getDetails)

				return response;

			for (let index in response)

				if (!response[index])

					return false;

			return true;

		}

	}

	let core = new Core;

	class Response {

		constructor() {

			this.data = {};

			this.valid = true;

		}

		setData(index, value) {

			this.data[index] = value;

			if (!value.valid)

				this.valid = false;

		}

	}

	class ResponseFragment {

		constructor(value) {

			this.value = value;

			this.valid = true;

			this.status = {};

		}

		validate(name, param, parent) {

			if (typeof core.validations[name] === 'function')

				var response = core.validations[name].call(parent, this.value, param);

			else

				throw new Error(`The param "${name}" is not a recognized validation function.`);

			if (typeof response === 'object') {

				let status = true;

				for (let index in response) {

					this.status[name + index[0].toUpperCase() + index.substr(1)] = response[index];

					if (!response[index]) {

						this.valid = false;

						status = false;

					}

				}

				this.status[name] = status;

			} else {

				if (!response)

					this.valid = false;

				this.status[name] = response;

			}

			return this;

		}

	}

	class Model {

		constructor(model) {

			if (typeof model === 'object')

				this.model = model;

			else

				throw new Error('The expected param must be an object.');

		}

		validate(data) {

			if (typeof data === 'object') {

				let response = new Response;

				for (let index in this.model) {

					let

						responseFragment = new ResponseFragment(data[index]),

						modelFragment = this.model[index];

					if (modelFragment instanceof Model)

						response.setData(index, modelFragment.validate(data[index]));

					else if (typeof modelFragment === 'object') {

						for (let validation in modelFragment)

							responseFragment.validate(validation, modelFragment[validation], data);

						response.setData(index, responseFragment);

					}

				}

				return response;

			} else

				throw new Error('The expected param must be an object.');

		}

	}

	class Warble extends Core {

		model(model) {

			return new Model(model);

		}

		validate(value, options) {

			if (typeof options === 'object') {

				var value = new ResponseFragment(value);

				for (let index in options)

					value.validate(index, options[index]);

				return value;

			} else

				throw new Error('The expected param must be an object.');

		}

	}

	var warble = new Warble;

	if (typeof module === 'object' && typeof module.exports === 'object')

		module.exports = warble;

}
