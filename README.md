# PlumeTesting

## Table of contents

* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)
* [Usage](#usage)
* [Contributors](#contributors)
* [Links](#links)

## General info

PlumeTesting is a very light testing library

I was bored so I wanted to create a very easy to use test library in Node.js
The purpose was to make it as lightweight as possible

## Technologies

* Node.js
* Typescript

## Setup

```
npm i @jeje-devs/plume-testing
```

## Usage

Simply run

```
import { runTests, theArray, theNumber, theBoolean } from '@jeje-devs/plume-testing';

runTests({

    'ArrayShould': () =>
    {
        theArray(['foo', 'bar', 'baz']).shouldHaveLength(3);
        theArray([{ name: 'Foo' }, { name: 'Bar' }, { name: 'Baz' }])
            .shouldVerify(array => array.length === 3 && array[1].name === 'Bar');
    },

    'NumberShould': () =>
    {
        theNumber(15.15).shouldBe(15.15);
        theNumber(9.81).shouldNotBe(10);
    },

    'BooleanShould': () =>
    {
        // This test will fail
        theBoolean(false).shouldBeTrue();
    }

    // All remaining tests

});
```

This method will log the test results:

```
==================================================

Tests succeeded: 2
Tests failed: 1

TESTS FAILED:

BooleanShould:   Assert failed. Actual boolean 'false' should be true

TESTS SUCCEEDED:

ArrayShould
NumberShould

==================================================
```

You can also run tests asynchronously:

```
runTests({

    'SomethingShould': async () =>
    {
        const actual = await giveMeANumberAsynchronously();

        theObject(actual).shouldNotBeNil();
        theNumber(actual).shouldBe(123);
    }

});
```

If you don't want to display the results but storing them to a variable, just use the method **getTestsResults**

```
import { getTestsResults, theObject } from '@jeje-devs/plume-testing';

const results = await getTestsResults({

    'SomeTest': () =>
    {
        theObject(null).shouldBeNil();
    }

});
```

The different testing methods are:
- assert
- theObject
- theArray
- theDate
- theString
- theNumber
- theBoolean

## Contributors

- [Jérémie Primas](https://github.com/JeremiePr)

## Links

- [npm](https://www.npmjs.com/package/@jeje-devs/plume-testing)
- [GitHub](https://github.com/JeremiePr/PlumeTesting)