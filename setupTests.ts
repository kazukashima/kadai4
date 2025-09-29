import "@testing-library/jest-dom";
// setupTests.ts
import { TextEncoder, TextDecoder } from "util";
(global as any).TextEncoder = TextEncoder;
(global as any).TextDecoder = TextDecoder as any;
// setupTests.ts
process.env.VITE_SUPABASE_URL = "http://localhost:54321";
process.env.VITE_SUPABASE_ANON_KEY = "test-anon-key";
