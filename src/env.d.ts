/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare module 'qrcode';

interface Window {
  QRCode?: any;
  openConsultationModal?: (serviceName?: string) => void;
  bindLookSwitcher?: (asciiElementId: string, buttonContainerSelector: string) => void;
}

declare namespace astroHTML.JSX {
  interface IntrinsicElements {
    'ascii-art': astroHTML.JSX.HTMLAttributes & {
      piece?: string;
      size?: string | number;
      speed?: string | number;
      look?: string;
      still?: string | boolean;
      bg?: string;
    };
  }
}
