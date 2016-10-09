describe('warble', function() {

	function noop() {}

	var

		warble = require('./warble'),

		emptyString = '',

		emptyObject = {}

		emptyArray = [],

		noopInstance = new noop,

		dateInstance = new Date,

		user = {
			'name': 'Diego',
			'surname': 'Lopes Lima'
		};

	describe('type', function() {

		it('tests the value types', function() {

			expect(warble.type(emptyString)).toEqual('string');

			expect(warble.type(emptyObject)).toEqual('object');

			expect(warble.type(noopInstance)).toEqual('object');

			expect(warble.type(noop)).toEqual('function');

			expect(warble.type(emptyArray)).toEqual('array');

			expect(warble.type(dateInstance)).toEqual('date');

			expect(warble.type(null)).toEqual('null');

			expect(warble.type(undefined)).toEqual('undefined');

			expect(warble.type()).toEqual('undefined');

		});

	});

	describe('is', function() {

		describe('integer', function() {

			it('tests if value is a integer', function() {

				expect(warble.is(0, 'integer')).toBe(true);

				expect(warble.is(emptyString, 'integer')).toBe(false);

				expect(warble.is(null, 'integer')).toBe(false);

				expect(warble.is(undefined, 'integer')).toBe(false);

				expect(warble.is('0', 'integer')).toBe(true);

				expect(warble.is(0.1, 'integer')).toBe(false);

				expect(warble.is(0)).toBe(false);

			});

		});

		describe('numeric', function() {

			it('tests if value is numeric', function() {

				expect(warble.is(0, 'numeric')).toBe(true);

				expect(warble.is(0.1, 'numeric')).toBe(true);

				expect(warble.is('0', 'numeric')).toBe(true);

				expect(warble.is('0.1', 'numeric')).toBe(true);

				expect(warble.is(null, 'numeric')).toBe(false);

				expect(warble.is(emptyString, 'numeric')).toBe(false);

				expect(warble.is(NaN, 'numeric')).toBe(false);

			});

		});

		describe('plain-object', function() {

			it('tests if value is a plain object', function() {

				expect(warble.is(emptyObject, 'plain-object')).toBe(true);

				expect(warble.is(emptyString, 'plain-object')).toBe(false);

				expect(warble.is(dateInstance, 'plain-object')).toBe(false);

				expect(warble.is(noopInstance, 'plain-object')).toBe(false);

			});

		});

		describe('empty-object', function() {

			it('tests if value is a empty object', function() {

				expect(warble.is(emptyObject, 'empty-object')).toBe(true);

				expect(warble.is(emptyArray, 'empty-object')).toBe(true);

				expect(warble.is(noopInstance, 'empty-object')).toBe(false);

				expect(warble.is(emptyString, 'empty-object')).toBe(false);

				expect(warble.is(dateInstance, 'empty-object')).toBe(false);

				expect(warble.is(user, 'empty-object')).toBe(false);

			});

		});

	});

	describe('each', function() {

		it('', function() {

			// 

		});

	});

	describe('extend', function() {

		it('', function() {

			// 

		});

	});

	describe('data', function() {

		describe('toString', function() {

			it('', function() {

				// 

			});

		});

		describe('toQueryString', function() {

			it('', function() {

				// 

			});

		});

		describe('is', function() {

			it('', function() {

				// 

			});

		});

		describe('extend', function() {

			it('', function() {

				// 

			});

		});

		describe('isolate', function() {

			it('', function() {

				// 

			});

		});

	});

	describe('model', function() {

		describe('test', function() {

			it('', function() {

				// 

			});

		});

	});

});

// expect(expect).toEqual(value);

// expect(expect).not.toEqual(value);

// expect(expect).toBe(value);

// expect(expect).not.toBe(value);

// expect(expect).toBeUndefined();

// expect(expect).toBeDefined();
