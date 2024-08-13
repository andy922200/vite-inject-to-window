module.exports = {
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  moduleFileExtensions: ['js', 'ts'],
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    customExportConditions: ['node', 'node-addons'],
  },
  transformIgnorePatterns: [],
  testMatch: ['**/*.test.(js|ts)'],
  testResultsProcessor: './node_modules/jest-html-reporter',
}
