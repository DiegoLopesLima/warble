# Warble

A validation library for client-side and server-side.

> See the [documentation](https://github.com/DiegoLopesLima/warble/wiki/Documentation) for more information.

## Table of contents

- [Instalation](#instalation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)

## Instalation

### Install with [NPM](https://www.npmjs.com/package/warble)

```
npm install --save warble
```

## Usage

### Creating a model

#### Source

```javascript
// Create an extension to verify if value is a Gmail address.
warble.fn.is.gmail = (value) => /\@gmail\.com$/i.test(value);

let

	// Create a data model:
	model = warble.model({
		name: {
			required: true,
			minlength: 3
		},
		surname: {
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
			country: {
				required: true
			},
			postalCode: {
				required: true,
				is: ['numeric', 'positive']
			},
			street: {
				required: true
			}
		})
	}),

	// Data example:
	data = {
		name: 'Diego',
		surname: 'Lopes Lima',
		age: 23,
		email: 'web.diego.lima@yahoo.com',
		password: 'a1b2c3',
		passwordConfirmation: '1a2b3c',
		gender: 'male',
		address: {
			country: 'Brazil',
			postalCode: 54321,
			street: 'Lorem ipsum dolor, 123'
		}
	};

// Validating data:
model.validate(data);
```

#### Output

```javascript
WarbleResponse {
	"data": Object {
		"address": Object {
			"country": "Brazil",
			"postalCode": 54321,
			"street": "Lorem ipsum dolor, 123"
		},
		"age": 23,
		"email": "web.diego.lima@yahoo.com",
		"gender": "male",
		"name": "Diego",
		"password": "a1b2c3",
		"passwordConfirmation": "1a2b3c",
		"surname": "Lopes Lima"
	},
	"invalid": true,
	"response": Object {
		"address": WarbleResponse {
			"data": Object {
				"country": "Brazil",
				"postalCode": 54321,
				"street": "Lorem ipsum dolor, 123"
			},
			"invalid": false,
			"response": Object {
				"country": WarbleFragment {
					"error": Object {},
					"invalid": false,
					"valid": true,
					"value": "Brazil"
				},
				"postalCode": WarbleFragment {
					"error": Object {},
					"invalid": false,
					"valid": true,
					"value": 54321
				},
				"street": WarbleFragment {
					"error": Object {},
					"invalid": false,
					"valid": true,
					"value": "Lorem ipsum dolor, 123"
				}
			},
			"valid": true
		},
		"age": WarbleFragment {
			"error": Object {},
			"invalid": false,
			"valid": true,
			"value": 23
		},
		"email": WarbleFragment {
			"error": Object {
				"is": true,
				"is:gmail": true
			},
			"invalid": true,
			"valid": false,
			"value": "web.diego.lima@yahoo.com"
		},
		"gender": WarbleFragment {
			"error": Object {},
			"invalid": false,
			"valid": true,
			"value": "male"
		},
		"name": WarbleFragment {
			"error": Object {},
			"invalid": false,
			"valid": true,
			"value": "Diego"
		},
		"password": WarbleFragment {
			"error": Object {},
			"invalid": false,
			"valid": true,
			"value": "a1b2c3"
		},
		"passwordConfirmation": WarbleFragment {
			"error": Object {
				"equal": true
			},
			"invalid": true,
			"valid": false,
			"value": "1a2b3c"
		},
		"surname": WarbleFragment {
			"error": Object {},
			"invalid": false,
			"valid": true,
			"value": "Lopes Lima"
		}
	},
	"valid": false
}
```

### Validating a single data:

#### Source

```javascript
warble.validate(data.name, {
	'required': true,
	'minlength': 3
});
```

#### Output

```javascript
WarbleFragment {
	"error": Object {},
	"invalid": false,
	"valid": true,
	"value": "Diego"
}
```

### Getting data type:

#### Example
```javascript
warble.type(['lorem', 'ipsum']); // "array"

warble.type({ name: 'Diego Lopes Lima' }); // "object"

warble.type('Hello world!'); // "string"
```

### Testing data:

#### Example
```javascript
var value = '-1';

warble.is(value, 'number'); // false

warble.is(value, 'string'); // true

warble.is(value, ['numeric', 'negative']); // true
```

## Changelog

Change log, previous [releases](https://github.com/DiegoLopesLima/warble/releases) and their documentations are also available for download on [releases](https://github.com/DiegoLopesLima/warble/releases).

## Credits

Created and maintained by [Diego Lopes Lima](https://github.com/DiegoLopesLima).

## License

Code and [documentation](https://github.com/DiegoLopesLima/warble/wiki/Documentation) copyright © 2017 Warble.

All content of this repository is licensed under the [MIT License](https://github.com/DiegoLopesLima/warble/blob/master/LICENSE.md).
