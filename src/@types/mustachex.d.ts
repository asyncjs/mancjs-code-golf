declare module 'mustachex' {
  export const express: (
    path: string,
    options: object,
    callback: (e: any, rendered?: string) => void
  ) => void;
}
