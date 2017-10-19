# Warble

An universal javascript validation library.

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
warble.subtypes.gmail = value => /\@gmail\.com$/i.test(value);

let

	// Creating an object model:

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
	}),

	// Data example:

	data = {
		name: 'Diego Lopes Lima',
		age: 23,
		email: 'web.diego.lima@yahoo.com',
		password: 'a1b2c3',
		passwordConfirmation: '1a2b3c',
		gender: 'male',
		address: {
			postalCode: 54321,
			street: 'Lorem ipsum dolor, 123'
		}
	};

// Testing data:

model.validate(data);
```

#### Output

```json
{
	"data": {
		"name": {
			"value": "Diego Lopes Lima",
			"valid": true,
			"status": {
				"required": true,
				"minlength": true
			}
		},
		"age": {
			"value": 23,
			"valid": true,
			"status": {
				"required": true,
				"min": true,
				"isInteger": true,
				"isPositive": true,
				"is": true
			}
		},
		"email": {
			"value": "web.diego.lima@yahoo.com",
			"valid": true,
			"status": {
				"isEmail": true,
				"isGmail": false,
				"is": false
			}
		},
		"password": {
			"value": "a1b2c3",
			"valid": true,
			"status": {
				"required": true
			}
		},
		"passwordConfirmation": {
			"value": "1a2b3c",
			"valid": false,
			"status": {
				"required": true,
				"equal": false
			}
		},
		"gender": {
			"value": "male",
			"valid": true,
			"status": {
				"options": true
			}
		},
		"address": {
			"data": {
				"postalCode": {
					"value": 54321,
					"valid": true,
					"status": {
						"required": true,
						"isNumeric": true,
						"isPositive": true,
						"is": true
					}
				},
				"street": {
					"value": "Lorem ipsum dolor, 123",
					"valid": true,
					"status": {
						"required": true
					}
				}
			},
			"valid": true
		}
	},
	"valid": false
}
```

### Validating a single data:

#### Source

```javascript
warble.validate(data.name, {
	required: true,
	minlength: 3
});
```

#### Output

```json
{
	"value": "Diego Lopes Lima",
	"valid": true,
	"status": {
		"required": true,
		"minlength": true
	}
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

warble.is(value, ['numeric', 'positive']); // false
```

## Changelog

See [releases page](https://github.com/DiegoLopesLima/warble/releases).

## Credits

Created and maintained by [Diego Lopes Lima](https://github.com/DiegoLopesLima).

## License

Code and [documentation](https://github.com/DiegoLopesLima/warble/wiki/Documentation) copyright © 2017 Warble.

All content of this repository is licensed under the [MIT License](https://github.com/DiegoLopesLima/warble/blob/master/LICENSE.md).
