# Warble

A minimalist validation library for client-side and server-side.

## Table of contents

- [Instalation](#instalation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)

## Instalation

Install with [NPM](https://www.npmjs.com/package/warble): `npm install --save warble`

## Usage

### Creating model

#### Source

```javascript
// Create an extension to verify if value is a Gmail address.
warble.hooks.is.gmail = (value) => /\@gmail\.com$/i.test(value);

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
		}
	}),

	// Data example:
	data = {
		name: 'Diego',
		surname: 'Lopes Lima',
		age: 23,
		email: 'web.diego.lima@yahoo.com',
		password: 'a1b2c3',
		passwordConfirmation: '1a2b3c'
	};

// Validating data:
model.validate(data);
```

#### Output

```javascript
Object {
	"data": Object {
		"age": 23,
		"email": "web.diego.lima@yahoo.com",
		"name": "Diego",
		"password": "a1b2c3",
		"passwordConfirmation": "1a2b3c",
		"surname": "Lopes Lima"
	},
	"invalid": true,
	"results": Object {
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

#### Source
```javascript
warble.type([]);
```

#### Output

```javascript
"array"
```

## Changelog

Change log, previous [releases](https://github.com/DiegoLopesLima/warble/releases) and their documentations are also available for download on [releases](https://github.com/DiegoLopesLima/warble/releases).

## Credits

Created and maintained by [Diego Lopes Lima](https://github.com/DiegoLopesLima).

## License

Code and documentation copyright © 2016 Warble.

All content of this repository is licensed under the [MIT License](https://github.com/DiegoLopesLima/warble/blob/master/LICENSE.md).
