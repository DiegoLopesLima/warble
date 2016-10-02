# Warble

Warble is a client side and server side library to quickly handle your data writing less and doing more.

## Table of contents

- [Instalation](#instalation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Credits](#credits)
- [License](#license)

## Instalation

Install with [NPM](https://www.npmjs.com/): `npm install warble@1.0.0-alpha.1 --save`

Install with [Bower](https://bower.io/): `bower install warble#1.0.0-alpha.1 --save`

## Usage

```javascript
var

	data = warble.data({
		'name': 'Diego'
		'surname': 'Lopes Lima',
		'age': 23
	}),

	model = warble.model({
		'name': {
			'required': true
		},
		'surname': {
			'required': true
		},
		'age': {
			'required': true,
			'type': 'number'
		}
	});

model.test(data); // true

data.is(model); // true

warble.is([], 'array'); // true

warble.type(new Date, 'date'); // true

```

## Contributing

Please read [contributing]() documentation.

## Credits

Created and maintained by [Diego Lopes Lima](https://github.com/DiegoLopesLima).

## License

Code and documentation copyright © 2016 Warble.

All content of this repository is licensed under the [MIT License](https://github.com/Tradusy/Warble/blob/master/LICENSE.md).
