// Imports
// ========================================================
import type { Config } from 'jest';

// Config
// ========================================================
const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/*.test.ts']
};

// Exports
// ========================================================
export default config;