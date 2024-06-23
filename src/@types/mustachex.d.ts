declare module 'mustachex' {
  export const express: (
    path: string,
    options: object,
    callback: (e: unknown, rendered?: string) => void
  ) => void;
}
