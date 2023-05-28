export const logInfo = (text: string) => console.log('\x1b[36m%s\x1b[0m', text);
export const logSuccess = (text: string) => console.log('\x1b[32m%s\x1b[0m', text);
export const logError = (text: string) => console.log('\x1b[31m%s\x1b[0m', text);