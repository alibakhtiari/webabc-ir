import localFont from 'next/font/local';

export const iranSansX = localFont({
    src: '../../public/fonts/rtl.woff2',
    variable: '--font-iran-sans-x',
    display: 'swap',
    preload: false,
});

export const lato = localFont({
    src: '../../public/fonts/ltr.woff2',
    variable: '--font-lato',
    display: 'swap',
    preload: false,
});
