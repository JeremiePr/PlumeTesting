import { logError, logInfo, logSuccess } from './helpers';
import { TestEntrySet, TestResult } from './types'

export const getTestsResults = async (tests: TestEntrySet): Promise<Array<TestResult>> =>
{
    const results: Array<TestResult> = [];

    for (const testName of Object.keys(tests))
    {
        try
        {
            await tests[testName]();
            results.push({
                testName,
                status: 'success',
                message: null
            });
        }
        catch (err)
        {
            results.push({
                testName,
                status: 'fail',
                message: err.message
            });
        }
    }

    return results;
}

export const runTests = async (tests: TestEntrySet): Promise<void> =>
{
    const results = await getTestsResults(tests);

    const successes = results.filter(x => x.status === 'success');
    const fails = results.filter(x => x.status === 'fail');

    console.log('\n');
    logInfo('==================================================');
    console.log();
    logSuccess(`Tests succeeded: ${successes.length}`);
    logError(`Tests failed: ${fails.length}`);
    console.log();
    logInfo('TESTS FAILED:');
    console.log();
    fails.forEach(test => logError(`${test.testName}:   ${test.message ?? 'No message'}`));
    console.log();
    logInfo('TESTS SUCCEEDED:');
    console.log();
    successes.forEach(test => logSuccess(`${test.testName}`));
    console.log();
    logInfo('==================================================');
    console.log('\n');
}