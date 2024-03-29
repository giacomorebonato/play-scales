import type P5 from 'p5'
declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'production' | 'development' | 'test'
  }
}

declare global {
  interface Window {
    p5: P5
  }
}
