import type P5 from 'p5'
declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'production' | 'development' | 'test'
  }

  interface Process {
    browser: boolean
  }
}

declare global {
  interface Window {
    p5: P5
  }

  type browser = any
}
