{

	const

		warble = require('./warble'),

		arrayExample = [],

		booleanExample = true,

		dateExample = new Date,

		errorExample = new Error,

		functionExample = () => {},

		numberExample = 0,

		objectExample = {},

		regexpExample = /(?:)/,

		stringExample = '',

		symbolExample = Symbol(),

		data = {
			name: 'Diego Lopes Lima',
			age: 24,
			email: 'example@example',
			password: 'a1b2c3',
			passwordConfirmation: '1a2b3c',
			gender: 'male',
			address: {
				postalCode: 54321,
				street: 'Lorem ipsum dolor, 123'
			}
		},

		model = warble.model({
			name: {
				required: true,
				minlength: 3
			},
			age: {
				required: true,
				min: 18,
				is: ['integer', 'positive']
			},
			email: {
				is: ['email', 'gmail']
			},
			password: {
				required: true
			},
			passwordConfirmation: {
				required: true,
				equal: 'password'
			},
			gender: {
				options: ['male', 'female', 'other']
			},
			address: warble.model({
				postalCode: {
					required: true,
					is: ['numeric', 'positive']
				},
				street: {
					required: true
				}
			})
		});

	test('warble.type', () => {

		expect(warble.type(arrayExample)).toBe('array');

		expect(warble.type(booleanExample)).toBe('boolean');

		expect(warble.type(dateExample)).toBe('date');

		expect(warble.type(errorExample)).toBe('error');

		expect(warble.type(functionExample)).toBe('function');

		expect(warble.type(numberExample)).toBe('number');

		expect(warble.type(objectExample)).toBe('object');

		expect(warble.type(regexpExample)).toBe('regexp');

		expect(warble.type(stringExample)).toBe('string');

		expect(warble.type(symbolExample)).toBe('symbol');

	});

	test('warble.is', () => {

		// Type.

		expect(warble.is(arrayExample, 'array')).toBe(true);

		expect(warble.is(objectExample, 'array')).toBe(false);

		// Subtype email.

		expect(warble.is(data.email, 'email')).toBe(true);

		expect(warble.is(arrayExample, 'email')).toBe(false);

		// Subtype positive.

		expect(warble.is('1', 'positive')).toBe(true);

		expect(warble.is('-1', 'positive')).toBe(false);

		// Subtype negative.

		expect(warble.is('-1', 'negative')).toBe(true);

		expect(warble.is('1', 'negative')).toBe(false);

		// Subtype numeric.

		expect(warble.is('0', 'numeric')).toBe(true);

		expect(warble.is('a', 'numeric')).toBe(false);

		// Subtype integer.

		expect(warble.is(1, 'integer')).toBe(true);

		expect(warble.is(1.2, 'integer')).toBe(false);

		// Subtype even.

		expect(warble.is(2, 'even')).toBe(true);

		expect(warble.is(1, 'even')).toBe(false);

		// Subtype odd.

		expect(warble.is(1, 'odd')).toBe(true);

		expect(warble.is(2, 'odd')).toBe(false);

	});

	test('warble.validate', () => {

		var

			responseFragment = warble.validate(data.name, {
				required: true,
				minlength: 3
			});

		expect(responseFragment.value).toBeDefined();

		expect(responseFragment.status).toBeDefined();

		expect(responseFragment.valid).toBe(true);

		expect(responseFragment.status.minlength).toBe(true);

		expect(responseFragment.status.required).toBe(true);

	});

	test('warble.model', () => {

		var response = model.validate(data);

		expect(response.data).toBeDefined();

		expect(response.valid).toBe(false);

		expect(() => model.validate()).toThrow();

		expect(() => warble.model()).toThrow();

		expect(() => warble.validate()).toThrow();



/*

		data = {
			name: 'Diego',
			birthDate: dateExample,
			email: 'example@example.com',
			password: '1a2b3c',
			passwordConfirmation: 'a1b2c3',
			age: 24
		}

		model = {
			name: {
				required: true,
				minlength: 3
			},
			birthDate: {
				required: true,
				instance: Date
			},
			email: {
				required: true,
				is: ['email', 'gmail']
			},
			password: {
				required: true,
				minlength: 3
			},
			passwordConfirmation: {
				equal: 'password'
			},
			age: {
				required: true,
				type: 'number',
				min: 21
			}
		}*/
/*
		required
		instance
		is
		minlength
		equal
		type
		min

		maxlength
		pattern
		max
		range
		conditional
		options
*/
	});

}
