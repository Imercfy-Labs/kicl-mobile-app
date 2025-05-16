/// <reference types="expo" />

declare module '*.png' {
  const value: any;
  export = value;
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      EXPO_PUBLIC_API_URL: string;
    }
  }
}

export {};