module.exports = {
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: 'test/.*.spec\\.(ts|tsx|js)$',
  moduleFileExtensions: ['ts', 'js'],
  coveragePathIgnorePatterns: ['/node_modules/'],
  collectCoverageFrom: [
    'src/**/*.{ts}',
  ],
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0,
    },
  },
  globals: {
    "ts-jest": {
      "tsConfig": "./test/tsconfig.json",
    },
  },
  coverageReporters: ['json', 'lcov', 'text'],
  bail: true,
  verbose: true,
}
