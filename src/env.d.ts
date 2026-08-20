/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare module 'qrcode';

interface Window {
  QRCode?: any;
}
