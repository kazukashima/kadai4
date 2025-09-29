// setupTests.ts
import { TextEncoder, TextDecoder } from "util";

// JSDOM には TextEncoder / TextDecoder が無いので polyfill
(global as any).TextEncoder = TextEncoder;
(global as any).TextDecoder = TextDecoder as any;

// jest-dom の拡張 matcher を有効化
import "@testing-library/jest-dom";
