// src/polyfills.ts
import { Buffer } from "buffer";

// Adds a property named "Buffer" to the window object
(window as any).Buffer = Buffer;
