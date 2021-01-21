// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  clearMocks: true,
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  transformIgnorePatterns: ['/node_modules/'],
  testMatch: ['**/__tests__/**/*.spec.+(ts|tsx|js)', '**/*.test.+(ts|tsx|js)'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testTimeout: 10000,
  coveragePathIgnorePatterns: [
    'node_modules',
    '__tests__/factories',
  ],
}
