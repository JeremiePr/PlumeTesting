# PlumeTesting

## Table of contents

* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)
* [Usage](#usage)
* [Contributors](#contributors)

## General info

PlumeTesting is a very light testing library

I was bored so I wanted to create a very easy to use test library in Node.js
The purpose was to make it as lightweight as possible

## Setup

On its way...

## Usage

Simply run

```
import { runTests, theArray } from '@jeje-devs/plume-testing';

runTests({

    'ArrayShould': () =>
    {
        theArray(['foo', 'bar', 'baz']).shouldHaveLength(3);
        theArray([{ name: 'Foo' }, { name: 'Bar' }, { name: 'Baz' }]).shouldVerify(array => array.length === 3 && array[1].name === 'Bar');
    },

    'NumberShould': () =>
    {
        theNumber(15.15).shouldBe(15.15);
        theNumber(10).shouldNotBe(9.81);
    },

    // All remaining tests

})
```

This method will log the test results.

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