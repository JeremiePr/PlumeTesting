# PlumeTesting

## Table of contents

* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)
* [Usage](#usage)
* [Contributors](#contributors)
* [Links](#links)

## General info

PlumeTesting is a very light testing library.

I was bored so I wanted to create a very easy to use test library in Node.js.
The purpose was to make it as lightweight as possible.

## Technologies

* Node.js
* Typescript

## Setup

```
npm install @jeje-devs/plume-testing
```

## Usage

Simply run

```ts
import { runTests, theArray, theNumber, theBoolean } from '@jeje-devs/plume-testing';

runTests<void>({

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

BooleanShould:   Assert failed. Actual boolean 'false' should be 'true'

TESTS SUCCEEDED:

ArrayShould
NumberShould

==================================================
```

You can also run tests asynchronously:

```ts
runTests<void>({

    'SomethingShould': async () =>
    {
        const actual = await giveMeANumberAsynchronously();

        theObject(actual).shouldNotBeNil();
        theNumber(actual).shouldBe(123);
    }

});
```

If you don't want to display the results but storing them to a variable, just use the method **getTestsResults**:

```ts
import { getTestsResults, theObject } from '@jeje-devs/plume-testing';

const results = await getTestsResults<void>({

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

### Tests lifecycle

You can also pass 2 optional methods for the tests:
* **initialize**: If you need something to run before the tests and also store variables during the whole testing lifecycle, you can use this method
* **terminate**: If you need to call stuff after the tests have run, you can call this method

Example:
```ts
interface TestParams
{
    message: string;
}

function initialize(): TestParams
{
    // Tests initialization
    return { message: 'Hello World!' };
}

function terminate(params: TestParams)
{
    // Tests termination
}

runTests<TestParams>({

    // We can also access the parameters inside test methods
    'SomethingShould': async params =>
    {
        const actual = await giveMeANumberAsynchronously();

        theObject(actual).shouldNotBeNil();
        theNumber(actual).shouldBe(123);
    }

}, initialize, terminate);
```

## Contributors

- [Jérémie Primas](https://github.com/JeremiePr)

## Links

- [npm](https://www.npmjs.com/package/@jeje-devs/plume-testing)
- [GitHub](https://github.com/JeremiePr/PlumeTesting)