export type TestMethod = (params: any) => (void | Promise<void>);

export type TestEntrySet = { [testName: string]: TestMethod };

export type TestResultStatus = 'success' | 'fail';

export interface TestResult
{
    testName: string;
    status: TestResultStatus;
    message: string | null;
}