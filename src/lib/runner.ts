import { logError, logInfo, logNote, logSuccess } from './helpers';
import { TestEntrySet, TestResult } from './types'

export const getTestsResults = async (
    tests: TestEntrySet,
    initialize?: () => Promise<any>,
    terminate?: (params: any) => Promise<void>): Promise<Array<TestResult>> =>
{
    const results: Array<TestResult> = [];

    const params: any = initialize ? await initialize() : null;

    for (const testName of Object.keys(tests))
    {
        try
        {
            await tests[testName](params);
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

    if (terminate) await terminate(params);

    return results;
}

export const runTests = async (tests: TestEntrySet): Promise<void> =>
{
    const results = await getTestsResults(tests);

    const successes = results.filter(x => x.status === 'success');
    const fails = results.filter(x => x.status === 'fail');

    logInfo('\n==================================================\n');

    logSuccess(`Tests succeeded: ${successes.length}`);
    logError(`Tests failed: ${fails.length}\n`);

    logInfo('TESTS FAILED:\n');

    if (fails.length > 0)
        fails.forEach(test => logError(`${test.testName}:   ${test.message ?? 'No message'}`));
    else
        logNote('No result');

    logInfo('\nTESTS SUCCEEDED:\n');

    if (successes.length > 0)
        successes.forEach(test => logSuccess(`${test.testName}`));
    else
        logNote('No result');

    logInfo('\n==================================================\n');
}