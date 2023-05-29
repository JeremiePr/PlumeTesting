export type TestMethod<T> = (params: T | null) => (void | Promise<void>);

export type TestEntrySet<T> = { [testName: string]: TestMethod<T> };

export type TestResultStatus = 'success' | 'fail';

export interface TestResult
{
    testName: string;
    status: TestResultStatus;
    message: string | null;
}