import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^[$](.*)$': '<rootDir>/src/$1',
    '^@data(.*)$': '<rootDir>/data/$1',
  },
};

export default config;
