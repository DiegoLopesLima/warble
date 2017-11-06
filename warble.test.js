{

	const

		warble = require('./warble'),

		emptyArray = [],

		emptyObject = {},

		emptyString = '';

	test('warble.type', () => {

		expect(warble.type(emptyArray)).toBe('array');

		expect(warble.type(emptyObject)).toBe('object');

		expect(warble.type(emptyString)).toBe('string');

	});

	test('warble.is', () => {

		var value = '-1';

		expect(warble.is(value, 'number')).toBe(false);

		expect(warble.is(value, 'string')).toBe(true);

		expect(warble.is(value, ['numeric', 'negative'])).toBe(true);

		expect(warble.is(value, ['numeric', 'positive'])).toBe(false);

	});

}
