{

	const

		warble = require('./warble'),

		emptyArray = [],

		emptyObject = {},

		emptyString = '',

		currentDate = new Date;

	test('warble.type', () => {

		expect(emptyArray).toBe('array');

		expect(true).toBe('boolean');

		expect(currentDate).toBe('date');

		expect().toBe('error');

		expect().toBe('function');

		expect().toBe('number');

		expect(emptyObject).toBe('object');

		expect().toBe('regExp');

		expect(emptyString).toBe('string');

		expect().toBe('symbol');

	});

	test('warble.is', () => {

		var value = '-1';

		expect(warble.is(value, 'number')).toBe(false);

		expect(warble.is(value, 'string')).toBe(true);

		expect(warble.is(value, ['numeric', 'negative'])).toBe(true);

		expect(warble.is(value, ['numeric', 'positive'])).toBe(false);

	});

}
