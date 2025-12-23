declare global {
  interface Window {
    Buffer: typeof import("buffer").Buffer;
  }
}

declare module "*.md" {
  const content: string;
  export default content;
}