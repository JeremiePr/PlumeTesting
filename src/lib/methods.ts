export const assert = (predicate: () => boolean, failureMessage?: string): void =>
{
    const result = predicate();

    if (failureMessage) failureMessage = `Assert failed. ${failureMessage}`;
    else failureMessage = 'Assert failed.';

    if (!result) throw new Error(failureMessage);
}

export const theObject = <T extends Object>(actual: T) => ({

    shouldBe: (expected: T) => assert(() => actual === expected, `Actual object '${actual}' should be equal to expected object '${expected}'`),

    shouldNotBe: (notExpected: T) => assert(() => actual !== notExpected, `Actual object '${actual}' should not be equal to '${notExpected}'`),

    shouldBeNil: () => assert(() => actual == null, `Actual object '${actual}' should be 'null' or 'undefined'`),

    shouldNotBeNil: () => assert(() => actual != null, `Actual object '${actual}' should not be 'null' nor 'undefined'`),

    shouldHavePropertyCheckingPredicateWith: (expected: T, predicate: (actualItem: T, expectedItem: T) => boolean) => assert(() => predicate(actual, expected), `Actual object should match predicate with expected object`),

    shouldHaveEqualPropertiesWith: (expected: T, ...selectors: Array<(item: T) => any>) =>
    {
        for (let s = 0; s < selectors.length; s++)
        {
            const selector = selectors[s];
            assert(() => selector(actual) === selector(expected), `Actual object property should be equal to the expected object property. The failure happened with the selector index '${s}'`);
        }
    },

    shouldHaveTheSameNumberOfPropertiesWith: <U>(expected: U) =>
        assert(() => Object.keys(actual).length === Object.keys(expected).length, `Actual object must have as many properties (${Object.keys(actual).length}) as expected object (${Object.keys(expected).length})`),

    shouldVerify: (predicate: (object: T) => boolean) => assert(() => predicate(actual), `Actual object predicate should verify`)

});

export const theArray = <T>(actual: Array<T>) => ({

    shouldHaveLength: (expectedLength: number) => assert(() => actual.length === expectedLength, `Actual array length '${actual.length}' should be '${expectedLength}'`),

    shouldHaveAllItemsCheckingPredicateWith: (expected: Array<T>, predicate: (actualItem: T, expectedItem: T) => boolean) =>
    {
        theArray(actual).shouldHaveLength(expected.length);

        for (let i = 0; i < actual.length; i++)
        {
            assert(() => predicate(actual[i], expected[i]), `Actual array item (index '${i}') should match predicate with expected array item`);
        }
    },

    shouldHaveAllItemsEqualPropertiesWith: (expected: Array<T>, ...selectors: Array<(item: T) => any>) =>
    {
        theArray(actual).shouldHaveLength(expected.length);

        for (let i = 0; i < actual.length; i++)
        {
            for (let s = 0; s < selectors.length; s++)
            {
                const selector = selectors[s];
                assert(() => selector(actual[i]) === selector(expected[i]), `Actual array item (index '${i}') property should be equal to the expected array item property. The failure happened with the selector index '${s}'`);
            }
        }
    },

    shouldVerify: (predicate: (array: Array<T>) => boolean) => assert(() => predicate(actual), `Actual array predicate should verify`)

});

export const theDate = (actual: Date) => ({

    shouldBe: (expected: Date) => assert(() => actual.getTime() === expected.getTime(), `Actual date '${actual.toISOString().split('T')[0]}' should be equal to expected date '${expected.toISOString().split('T')[0]}'`),

    shouldBeHigherThan: (minimumExclusive: Date) => assert(() => actual.getTime() > minimumExclusive.getTime(), `Actual date '${actual.toISOString().split('T')[0]}' should be higher than '${minimumExclusive.toISOString().split('T')[0]}'`),

    shouldBeLowerThan: (maximumExclusive: Date) => assert(() => actual.getTime() < maximumExclusive.getTime(), `Actual date '${actual.toISOString().split('T')[0]}' should be lower than '${maximumExclusive.toISOString().split('T')[0]}'`),

    shouldBeHigherOrEqualThan: (minimumInclusive: Date) => assert(() => actual.getTime() >= minimumInclusive.getTime(), `Actual date '${actual.toISOString().split('T')[0]}' should be higher of equal than '${minimumInclusive.toISOString().split('T')[0]}'`),

    shouldBeLowerOrEqualThan: (maximumInclusive: Date) => assert(() => actual.getTime() <= maximumInclusive.getTime(), `Actual date '${actual.toISOString().split('T')[0]}' should be lower of equal than '${maximumInclusive.toISOString().split('T')[0]}'`),

    shouldNotBe: (notExpected: Date) => assert(() => actual.getTime() !== notExpected.getTime(), `Actual date '${actual.toISOString().split('T')[0]}' should not be equal to '${notExpected.toISOString().split('T')[0]}'`),

    shouldBeYear: (expectedYear: number) => assert(() => actual.getFullYear() === expectedYear, `Actual date year '${actual.getFullYear()}' should be equal to '${expectedYear}'`),

    shouldBeMonth: (expectedMonth: number) => assert(() => actual.getMonth() + 1 === expectedMonth, `Actual date month '${actual.getMonth() + 1}' should be equal to '${expectedMonth}'`),

    shouldBeDay: (expectedDay: number) => assert(() => actual.getDate() === expectedDay, `Actual date day '${actual.getDate()}' should be equal to '${expectedDay}'`),

    shouldVerify: (predicate: (date: Date) => boolean) => assert(() => predicate(actual), `Actual date predicate should verify`)

});

export const theString = (actual: string) => ({

    shouldBe: (expected: string) => assert(() => actual === expected, `Actual string '${actual}' should be equal to expected string '${expected}'`),

    shouldNotBe: (notExpected: string) => assert(() => actual !== notExpected, `Actual string '${actual}' should not be equal to '${notExpected}'`),

    shouldHaveLength: (expectedLength: number) => assert(() => actual.length === expectedLength, `Actual string length '${actual.length}' should be '${expectedLength}'`),

    shouldVerify: (predicate: (string: string) => boolean) => assert(() => predicate(actual), `Actual string predicate should verify`)

});

export const theNumber = (actual: number) => ({

    shouldBe: (expected: number) => assert(() => actual === expected, `Actual number '${actual}' should be equal to expected number '${expected}'`),

    shouldBeHigherThan: (minimumExclusive: number) => assert(() => actual > minimumExclusive, `Actual number '${actual}' should be higher than '${minimumExclusive}'`),

    shouldBeLowerThan: (maximumExclusive: number) => assert(() => actual < maximumExclusive, `Actual number '${actual}' should be lower than '${maximumExclusive}'`),

    shouldBeHigherOrEqualThan: (minimumInclusive: number) => assert(() => actual >= minimumInclusive, `Actual number '${actual}' should be higher or equal than '${minimumInclusive}'`),

    shouldBeLowerOrEqualThan: (maximumInclusive: number) => assert(() => actual <= maximumInclusive, `Actual number '${actual}' should be lower or equal than '${maximumInclusive}'`),

    shouldNotBe: (notExpected: number) => assert(() => actual !== notExpected, `Actual number '${actual}' should not be equal to '${notExpected}'`),

    shouldVerify: (predicate: (number: number) => boolean) => assert(() => predicate(actual), `Actual number predicate should verify`)

});

export const theBoolean = (actual: boolean) => ({

    shouldBe: (expected: boolean) => assert(() => actual === expected, `Actual boolean '${actual}' should be equal to expected boolean '${expected}'`),

    shouldBeTrue: () => assert(() => actual === true, `Actual boolean '${actual}' should be 'true'`),

    shouldBeFalse: () => assert(() => actual === false, `Actual boolean '${actual}' should be 'false'`),

    shouldNotBe: (notExpected: boolean) => assert(() => actual !== notExpected, `Actual boolean '${actual}' should not be equal to '${notExpected}'`),

    shouldVerify: (predicate: (boolean: boolean) => boolean) => assert(() => predicate(actual), `Actual boolean predicate should verify`)

});