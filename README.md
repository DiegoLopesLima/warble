# Warble

A minimalist validation library for client side and server side.

## Table of contents

- [Instalation](#instalation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)

## Instalation

Install with [NPM](https://www.npmjs.com/package/warble): `npm install warble@1.0.0-alpha.1`

## Usage

```javascript
warble.hooks.is.gmail = (value) => /\@gmail\.com$/i.test(value);

let

	schema = warble.model({
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

	data = {
		name: 'Diego',
		surname: 'Lopes Lima',
		age: 23,
		email: 'web.diego.lima@yahoo.com',
		password: 'a1b2c3',
		passwordConfirmation: '1a2b3c'
	};
```

Validating object:

```javascript
console.log(schema.validate(data));
```

Returns:

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

Validating a single data:

```javascript
console.log(warble.validate(data.name, {
	'required': true,
	'minlength': 3
}));
```

Returns:

```javascript
WarbleFragment {
	"error": Object {},
	"invalid": false,
	"valid": true,
	"value": "Diego"
}
```

Getting a data type:

```javascript
console.log(warble.type([]));
```

Returns:

```javascript
"array"
```

## Changelog

Previous [releases](https://github.com/DiegoLopesLima/warble/releases) and their documentation are also available for download.

## Credits

Created and maintained by [Diego Lopes Lima](https://github.com/DiegoLopesLima).

## License

Code and documentation copyright © 2016 Warble.

All content of this repository is licensed under the [MIT License](https://github.com/DiegoLopesLima/warble/blob/master/LICENSE.md).
