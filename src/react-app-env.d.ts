/// <reference types="react-scripts" />


declare global {
  interface Window {
    ym: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export {};