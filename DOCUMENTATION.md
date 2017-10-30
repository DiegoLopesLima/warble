# Documentation

## Table of contents

- [warble.type](#warbletype)
- [warble.is](#warbleis)

## Methods

### warble.type

```javascript
warble.type(value);
```

| Param | Type | Default   | Description              |
| ----- | ---- | --------- | ------------------------ |
| value | Any  | undefined | A value to get the type. |

#### Example

##### Source

```javascript
warble.type(['lorem', 'ipsum']);
```

##### Output

```javascript
"array"
```

### warble.is

```javascript
warble.is(value, type, getDetails);
```

| Param      | Type          | Default   | Description                                    |
| ---------- | ------------- | --------- | ---------------------------------------------- |
| value      | Any           | undefined | A value to be tested.                          |
| type       | String, Array | undefined | The type that the parameter `value` should be. |
| getDetails | Boolean       | false     | Enable a detailed return.                      |

#### Simple example

##### Source

```javascript
var value = 'Lorem ipsum';

warble.is(value, 'number');
```

##### Output

```javascript
false
```

#### Multiple tests

##### Source

```javascript
var value = '-1';

warble.is(value, ['numeric', 'positive']);
```

##### Output

```javascript
false
```

#### Detailed results

##### Source

```javascript
var value = '-1';

warble.is(value, ['numeric', 'negative'], true);
```

##### Output

```javascript
{
	"negative": false,
	"numeric": true
}
```
