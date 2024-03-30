// global.d.ts
declare global {
  interface Window {
    Xendit: never; // You can replace 'any' with a more specific type if you have one
  }
}
