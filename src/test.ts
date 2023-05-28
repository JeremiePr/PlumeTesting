import { assert, theArray, theBoolean, theDate, theNumber, theObject, theString } from './lib/methods';
import { getTestsResults } from './lib/runner';

const resultsPromise = getTestsResults({

    'SomeObjectsShouldSucceed': () =>
    {
        theObject(5).shouldBe(5);
        theObject(6).shouldNotBe(4);
        theObject(undefined).shouldBeNil();
        theObject({}).shouldNotBeNil();
        theObject({ a: 5 }).shouldVerify(x => x.a === 5);
    },

    'SomeObjectsShouldFail': () =>
    {
        theObject(null).shouldNotBeNil();
    },

    'SomeArraysShouldSucceed': () =>
    {
        theArray(['foo', 'bar', 'baz']).shouldHaveLength(3);
        theArray([{ name: 'Foo' }, { name: 'Bar' }, { name: 'Baz' }]).shouldHaveAllItemsCheckingPredicateWith(
            [{ name: 'Foo' }, { name: 'Bar' }, { name: 'Baz' }], (actual, expected) => actual.name === expected.name);
        theArray([{ name: 'Foo', ref: 'ff001' }, { name: 'Bar', ref: 'br002' }]).shouldHaveAllItemsEqualPropertiesWith(
            [{ name: 'Foo', ref: 'ff001' }, { name: 'Bar', ref: 'br002' }], x => x.name, x => x.ref);
        theArray([{ name: 'Foo' }, { name: 'Bar' }, { name: 'Baz' }]).shouldVerify(array => array.length === 3 && array[1].name === 'Bar');
    },

    'SomeArraysShouldFail': () =>
    {
        theArray([{ name: 'Foo', ref: 'ff001' }, { name: 'Bar', ref: 'br002' }]).shouldHaveAllItemsEqualPropertiesWith(
            [{ name: 'Foo', ref: 'ff0000001' }, { name: 'Bar', ref: 'br0000002' }], x => x.name, x => x.ref);
    },

    'SomeDatesShouldSucceed': () =>
    {
        theDate(new Date(2023, 3, 5)).shouldBe(new Date(2023, 3, 5));
        theDate(new Date(2023, 7, 15)).shouldBeHigherThan(new Date(2023, 5, 30));
        theDate(new Date(2023, 4, 15)).shouldBeLowerThan(new Date(2025, 0, 1));
        theDate(new Date(2020, 0, 1)).shouldBeHigherOrEqualThan(new Date(2020, 0, 1));
        theDate(new Date(2025, 11, 31)).shouldBeLowerOrEqualThan(new Date(2026, 10, 30));
        theDate(new Date(2022, 0, 1)).shouldNotBe(new Date(2023, 4, 1));
        theDate(new Date(2025, 0, 1)).shouldBeYear(2025);
        theDate(new Date(2025, 0, 1)).shouldBeMonth(1);
        theDate(new Date(2025, 2, 15)).shouldBeDay(15);
        theDate(new Date(2020, 2, 5)).shouldVerify(date => date.getTime() === new Date(2020, 2, 5).getTime());
    },

    'DomeDatesShouldFail': () =>
    {
        theDate(new Date(2023, 5, 12)).shouldBeMonth(5);
    },

    'SomeStringsShouldSucceed': () =>
    {
        theString('Hello World!').shouldBe('Hello World!');
        theString('Hello World').shouldNotBe('Goodbye World!');
        theString('QWERTZ').shouldHaveLength(6);
        theString('Music').shouldVerify(string => string.length === 5 && string.startsWith('M'));
    },

    'SomeStringsShouldFail': () =>
    {
        theString('Dagger').shouldVerify(string => string.endsWith('D'));
    },

    'SomeNumbersShouldSucceed': () =>
    {
        theNumber(15.15).shouldBe(15.15);
        theNumber(2).shouldBeHigherThan(-3);
        theNumber(-87).shouldBeLowerThan(-6);
        theNumber(5).shouldBeHigherOrEqualThan(5);
        theNumber(78).shouldBeLowerOrEqualThan(580);
        theNumber(3.14).shouldNotBe(3.1456);
        theNumber(99).shouldVerify(number => number / 3 - 20 === 13);
    },

    'SomeNumbersShouldFail': () =>
    {
        theNumber(10).shouldBe(9.81);
    },

    'SomeBooleansShouldSucceed': () =>
    {
        theBoolean(true).shouldBe(true);
        theBoolean(true).shouldBeTrue();
        theBoolean(false).shouldBeFalse();
        theBoolean(false).shouldNotBe(true);
        theBoolean(true).shouldVerify(boolean => boolean === true);
    },

    'SomeBooleansShouldFail': () =>
    {
        theBoolean(false).shouldBeTrue();
    }

});

resultsPromise.then(results =>
{
    assert(() => results.length === 12);
    assert(() => results.filter(x => x.status === 'success').length === 6);
    assert(() => results.filter(x => x.status === 'fail').length === 6);
    assert(() => results[6].testName === 'SomeStringsShouldSucceed');
    assert(() => results[5].status === 'fail');
    assert(() => results[11].testName === 'SomeBooleansShouldFail');
    assert(() => results[9].message === `Assert failed. Actual number '10' should be equal to expected number '9.81'`);
});