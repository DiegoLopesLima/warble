{

	const warble = require('./warble.js');

	test('warble.model', () => {

		var

			model = warble.model({
				paramA : {
					required: true,
					pattern: /[a-z]+/,
					minlength: 0,
					maxlength: 5
				},
				paramB: {
					min: 0,
					max: 10,
					type: 'number',
					is: 'positive'
				},
				paramC: {
					range: [0, 10]
				},
				paramD: {
					conditional: value => value !== 0
				},
				paramE: {
					equal: 'paramA'
				},
				paramF: {
					options: ['lorem', 'ipsum']
				},
				paramG: {
					instance: Date
				},
				paramH: warble.model({
					paramI: {
						required: true
					}
				})
			}),

			validResponse = model.validate({
				paramA: 'lorem',
				paramB: 5,
				paramC: 5,
				paramD: 5,
				paramE: 'lorem',
				paramF: 'lorem',
				paramG: new Date,
				paramH: {
					paramI: 'lorem'
				}
			}),

			invalidResponse = model.validate({
				paramA: 0,
				paramB: -1,
				paramC: -1,
				paramD: 0,
				paramE: 0,
				paramF: false,
				paramG: false,
				paramH: {}
			});

		expect(validResponse).toBeDefined();

		expect(validResponse.data).toBeDefined();

		expect(validResponse.valid).toBe(true);

		expect(invalidResponse).toBeDefined();

		expect(invalidResponse.data).toBeDefined();

		expect(invalidResponse.valid).toBe(false);

		expect(() => model.validate()).toThrow();

		expect(() => warble.model()).toThrow();

	});

	test('warble.validate', () => {

		var

			responseFragment = warble.validate('lorem', {
				required: true,
				minlength: 3
			});

		expect(responseFragment.value).toBeDefined();

		expect(responseFragment.status).toBeDefined();

		expect(responseFragment.valid).toBe(true);

		expect(responseFragment.status.minlength).toBe(true);

		expect(responseFragment.status.required).toBe(true);

		expect(() => warble.validate()).toThrow();

		expect(() => warble.validate('lorem', { test: true })).toThrow();

		expect(warble.validate(0, { maxlength: 3 }).valid).toBe(false);

		expect(() => warble.validate(5, { range: null})).toThrow();

	});

	test('warble.type', () => {

		expect(warble.type([])).toBe('array');

		expect(warble.type(true)).toBe('boolean');

		expect(warble.type(new Date)).toBe('date');

		expect(warble.type(new Error)).toBe('error');

		expect(warble.type(() => {})).toBe('function');

		expect(warble.type(0)).toBe('number');

		expect(warble.type({})).toBe('object');

		expect(warble.type(/(?:)/)).toBe('regexp');

		expect(warble.type('')).toBe('string');

		expect(warble.type(Symbol())).toBe('symbol');

		expect(warble.type(undefined)).toBe('undefined');

		expect(warble.type()).toBe('undefined');

		expect(warble.type(null)).toBe('null');

		expect(warble.type(new Map)).toBe('object');

	});

	test('warble.is', () => {

		expect(warble.is([], 'array')).toBe(true);

		expect(warble.is({}, 'array')).toBe(false);

		expect(warble.is('x@x', 'email')).toBe(true);

		expect(warble.is('foo', 'email')).toBe(false);

		expect(warble.is('-1', ['numeric', 'positive'])).toBe(false);

		expect(warble.is('-1', ['numeric', 'negative', 'string'])).toBe(true);

		expect(warble.is('')).toBe(false);

		expect(warble.is()).toBe(false);

	});

	// Subtypes

	test('warble.subtypes.email', () => {

		expect(warble.subtypes.email('x@x')).toBe(true);

		expect(warble.subtypes.email('foo')).toBe(false);

		expect(warble.subtypes.email('')).toBe(false);

		expect(warble.subtypes.email()).toBe(false);

	});

	test('warble.subtypes.positive', () => {

		expect(warble.subtypes.positive(1)).toBe(true);

		expect(warble.subtypes.positive(-1)).toBe(false);

		expect(warble.subtypes.positive('1')).toBe(true);

		expect(warble.subtypes.positive('')).toBe(false);

		expect(warble.subtypes.positive()).toBe(false);

	});

	test('warble.subtypes.negative', () => {

		expect(warble.subtypes.negative(-1)).toBe(true);

		expect(warble.subtypes.negative(1)).toBe(false);

		expect(warble.subtypes.negative('-1')).toBe(true);

		expect(warble.subtypes.negative('')).toBe(false);

		expect(warble.subtypes.negative()).toBe(false);

	});

	test('warble.subtypes.numeric', () => {

		expect(warble.subtypes.numeric(1)).toBe(true);

		expect(warble.subtypes.numeric(-1)).toBe(true);

		expect(warble.subtypes.numeric('1')).toBe(true);

		expect(warble.subtypes.numeric('-1')).toBe(true);

		expect(warble.subtypes.numeric(1.2)).toBe(true);

		expect(warble.subtypes.numeric('1.2')).toBe(true);

		expect(warble.subtypes.numeric('-1.2')).toBe(true);

		expect(warble.subtypes.numeric(null)).toBe(false);

		expect(warble.subtypes.numeric('')).toBe(false);

		expect(warble.subtypes.numeric()).toBe(false);

	});

	test('warble.subtypes.integer', () => {

		expect(warble.subtypes.integer(1)).toBe(true);

		expect(warble.subtypes.integer(-1)).toBe(true);

		expect(warble.subtypes.integer('1')).toBe(true);

		expect(warble.subtypes.integer('-1')).toBe(true);

		expect(warble.subtypes.integer(1.2)).toBe(false);

		expect(warble.subtypes.integer('1.2')).toBe(false);

		expect(warble.subtypes.integer('-1.2')).toBe(false);

		expect(warble.subtypes.integer(null)).toBe(false);

		expect(warble.subtypes.integer('')).toBe(false);

		expect(warble.subtypes.integer()).toBe(false);

	});

	test('warble.subtypes.even', () => {

		expect(warble.subtypes.even(2)).toBe(true);

		expect(warble.subtypes.even(1)).toBe(false);

		expect(warble.subtypes.even('2')).toBe(true);

		expect(warble.subtypes.even('1')).toBe(false);

		expect(warble.subtypes.even(-2)).toBe(true);

		expect(warble.subtypes.even(-1)).toBe(false);

		expect(warble.subtypes.even(2.2)).toBe(false);

		expect(warble.subtypes.even(null)).toBe(false);

		expect(warble.subtypes.even('')).toBe(false);

		expect(warble.subtypes.even()).toBe(false);

	});

	test('warble.subtypes.odd', () => {

		expect(warble.subtypes.odd(2)).toBe(false);

		expect(warble.subtypes.odd(1)).toBe(true);

		expect(warble.subtypes.odd('2')).toBe(false);

		expect(warble.subtypes.odd('1')).toBe(true);

		expect(warble.subtypes.odd(-2)).toBe(false);

		expect(warble.subtypes.odd(-1)).toBe(true);

		expect(warble.subtypes.odd(2.2)).toBe(true);

		expect(warble.subtypes.odd(null)).toBe(false);

		expect(warble.subtypes.odd('')).toBe(false);

		expect(warble.subtypes.odd()).toBe(false);

	});

	// Validations

	test('warble.validations.required', () => {

		expect(warble.validations.required('', true)).toBe(true);

		expect(warble.validations.required(undefined, true)).toBe(false);

		expect(warble.validations.required('', false)).toBe(true);

		expect(warble.validations.required(undefined, false)).toBe(true);

		expect(() => warble.validations.required('')).toThrow();

		expect(() => warble.validations.required()).toThrow();

	});

	test('warble.validations.pattern', () => {

		var re = /[a-z]/;

		expect(warble.validations.pattern('a', re)).toBe(true);

		expect(warble.validations.pattern('', re)).toBe(false);

		expect(() => warble.validations.pattern('')).toThrow();

		expect(() => warble.validations.pattern()).toThrow();

	});

	test('warble.validations.min', () => {

		expect(warble.validations.min(5, 0)).toBe(true);

		expect(warble.validations.min(5, 6)).toBe(false);

		expect(warble.validations.min(-5, 0)).toBe(false);

		expect(warble.validations.min('5', 0)).toBe(true);

		expect(warble.validations.min('5', 6)).toBe(false);

		expect(warble.validations.min('-5', 0)).toBe(false);

		expect(() => warble.validations.min('')).toThrow();

		expect(() => warble.validations.min()).toThrow();

	});

	test('warble.validations.max', () => {

		expect(warble.validations.max(5, 5)).toBe(true);

		expect(warble.validations.max(6, 5)).toBe(false);

		expect(warble.validations.max(-5, 0)).toBe(true);

		expect(warble.validations.max('5', 5)).toBe(true);

		expect(warble.validations.max('6', 5)).toBe(false);

		expect(warble.validations.max('-5', 0)).toBe(true);

		expect(() => warble.validations.max('')).toThrow();

		expect(() => warble.validations.max()).toThrow();

	});

	test('warble.validations.minlength', () => {

		expect(warble.validations.minlength('lorem', 1)).toBe(true);

		expect(warble.validations.minlength('lorem', 5)).toBe(true);

		expect(warble.validations.minlength('lorem', 6)).toBe(false);

		expect(() => warble.validations.minlength('')).toThrow();

		expect(() => warble.validations.minlength()).toThrow();

	});

	test('warble.validations.maxlength', () => {

		expect(warble.validations.maxlength('lorem', 6)).toBe(true);

		expect(warble.validations.maxlength('lorem', 5)).toBe(true);

		expect(warble.validations.maxlength('lorem', 1)).toBe(false);

		expect(() => warble.validations.maxlength('')).toThrow();

		expect(() => warble.validations.maxlength()).toThrow();

	});

	test('warble.validations.type', () => {

		expect(warble.validations.type([], 'array')).toBe(true);

		expect(warble.validations.type({}, 'object')).toBe(true);

		expect(() => warble.validations.type('lorem', null)).toThrow();

		expect(() => warble.validations.type('')).toThrow();

		expect(() => warble.validations.type()).toThrow();

	});

	test('warble.validations.is', () => {

		expect(warble.validations.is('-1', 'number')).toBe(false);

		expect(warble.validations.is('-1', 'string')).toBe(false);

		expect(warble.validations.is('-1', 'numeric')).toBe(true);

		expect(warble.validations.is('-1', ['numeric', 'positive'])).toBe(false);

		expect(warble.validations.is('-1', ['numeric', 'negative'])).toBe(true);

		expect(() => warble.validations.is(null)).toThrow();

		expect(() => warble.validations.is('')).toThrow();

		expect(() => warble.validations.is()).toThrow();

	});

	test('warble.validations.range', () => {

		expect(warble.validations.range(5, [0, 10])).toBe(true);

		expect(warble.validations.range(5, [0, 5])).toBe(true);

		expect(warble.validations.range(5, [5, 5])).toBe(true);

		expect(warble.validations.range('5', [0, 10])).toBe(true);

		expect(warble.validations.range(0, [-5, 5])).toBe(true);

		expect(warble.validations.range(2, [3, 5])).toBe(false);

		expect(warble.validations.range(6, [3, 5])).toBe(false);

		expect(warble.validations.range('', [0, 5])).toBe(false);

		expect(() => warble.validations.range(null)).toThrow();

		expect(() => warble.validations.range('')).toThrow();

		expect(() => warble.validations.range()).toThrow();

	});

	test('warble.validations.equal', () => {});

	test('warble.validations.conditional', () => {});

	test('warble.validations.options', () => {});

	test('warble.validations.instance', () => {

		var date = new Date;

		expect(warble.validations.instance(date, Date)).toBe(true);

		expect(warble.validations.instance(date, Date)).toBe(true);

		expect(warble.validations.instance(date, String)).toBe(false);

		expect(() => warble.validations.instance('')).toThrow();

		expect(() => warble.validations.instance()).toThrow();

	});

}
