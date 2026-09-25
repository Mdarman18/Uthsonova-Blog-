/** @type {import('jest').Config} */
const config = {
  // Use the experimental ESM support so Jest works with "type": "module"
  transform: {},
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.js', '**/*.test.js'],
  collectCoverageFrom: ['src/**/*.js', '!src/**/__tests__/**'],
  coverageDirectory: 'coverage',
  verbose: true,
};

export default config;
