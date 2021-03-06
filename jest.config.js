module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.jest.json'
    }
  },
  coverageReporters: ['json-summary', 'text'],
  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts']
}
