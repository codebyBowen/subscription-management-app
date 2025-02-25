const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // 指向 Next.js 应用的路径
  dir: './',
})

// Jest 自定义配置
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '^@/lib/(.*)$': '<rootDir>/lib/$1',
    '^@/models/(.*)$': '<rootDir>/models/$1',
    '^@/utils/(.*)$': '<rootDir>/utils/$1',
  },
}

// createJestConfig 会自动处理一些配置，如 Next.js 的转换
module.exports = createJestConfig(customJestConfig)