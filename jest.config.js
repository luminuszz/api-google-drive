// eslint-disable-next-line @typescript-eslint/no-var-requires
const { pathsToModuleNameMapper } = require('ts-jest/utils');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { compilerOptions } = require('./tsconfig.json');

module.exports = {
  setupFiles: ['dotenv/config'],

  clearMocks: true,
  preset: 'ts-jest',
  collectCoverageFrom: [
    '<rootDir>/src/modules/**/services/*.ts',
    '<rootDir>/src/modules/**/controllers/*.ts',
    '<rootDir>/src/**/**/*.pipe.ts',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text-summary', 'lcov'],
  testEnvironment: 'node',
  testMatch: ['**/*.spec.ts'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>',
  }),

  coverageThreshold: {
    branches: 100,
    lines: 100,
    functions: 100,
    statements: 100,
  },
};
