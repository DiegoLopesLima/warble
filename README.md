# Warble

Warble is a client side and server side library to quickly handle your data writing less and doing more.

## Table of contents

- [Instalation](#instalation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Credits](#credits)
- [License](#license)

## Instalation

Install with [NPM](https://www.npmjs.com/): `npm install warble@1.0.0-alpha.1`

Install with [Bower](https://bower.io/): `bower install warble#1.0.0-alpha.1`

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

Return:

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
			"parent": Object {
				"age": 23,
				"email": "web.diego.lima@yahoo.com",
				"name": "Diego",
				"password": "a1b2c3",
				"passwordConfirmation": "1a2b3c",
				"surname": "Lopes Lima"
			},
			"valid": true,
			"value": 23
		},
		"email": WarbleFragment {
			"error": Object {
				"is": true,
				"is:gmail": true
			},
			"invalid": true,
			"parent": Object {
				"age": 23,
				"email": "web.diego.lima@yahoo.com",
				"name": "Diego",
				"password": "a1b2c3",
				"passwordConfirmation": "1a2b3c",
				"surname": "Lopes Lima"
			},
			"valid": false,
			"value": "web.diego.lima@yahoo.com"
		},
		"name": WarbleFragment {
			"error": Object {},
			"invalid": false,
			"parent": Object {
				"age": 23,
				"email": "web.diego.lima@yahoo.com",
				"name": "Diego",
				"password": "a1b2c3",
				"passwordConfirmation": "1a2b3c",
				"surname": "Lopes Lima"
			},
			"valid": true,
			"value": "Diego"
		},
		"password": WarbleFragment {
			"error": Object {},
			"invalid": false,
			"parent": Object {
				"age": 23,
				"email": "web.diego.lima@yahoo.com",
				"name": "Diego",
				"password": "a1b2c3",
				"passwordConfirmation": "1a2b3c",
				"surname": "Lopes Lima"
			},
			"valid": true,
			"value": "a1b2c3"
		},
		"passwordConfirmation": WarbleFragment {
			"error": Object {
				"equal": true
			},
			"invalid": true,
			"parent": Object {
				"age": 23,
				"email": "web.diego.lima@yahoo.com",
				"name": "Diego",
				"password": "a1b2c3",
				"passwordConfirmation": "1a2b3c",
				"surname": "Lopes Lima"
			},
			"valid": false,
			"value": "1a2b3c"
		},
		"surname": WarbleFragment {
			"error": Object {},
			"invalid": false,
			"parent": Object {
				"age": 23,
				"email": "web.diego.lima@yahoo.com",
				"name": "Diego",
				"password": "a1b2c3",
				"passwordConfirmation": "1a2b3c",
				"surname": "Lopes Lima"
			},
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

Return:

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

Return:

```javascript
"array"
```

## Changelog

Previous [releases](https://github.com/Tradusy/warble/releases) and their documentation are also available for download.

## Contributing

Please read [contributing]() documentation.

## Credits

Created and maintained by [Diego Lopes Lima](https://github.com/DiegoLopesLima).

## License

Code and documentation copyright © 2016 Warble.

All content of this repository is licensed under the [MIT License](https://github.com/Tradusy/Warble/blob/master/LICENSE.md).
