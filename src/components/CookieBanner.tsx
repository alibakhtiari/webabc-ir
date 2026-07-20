"use client";

import { useCookieConsent } from '@/hooks/useCookieConsent';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from './ui/button';
import Script from 'next/script';
import { useEffect, useState } from 'react';

// We should ideally get this from env vars, using a placeholder for now
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX';

export default function CookieBanner() {
    const { consentState, isMounted, acceptCookies, declineCookies } = useCookieConsent();
    const { t } = useLanguage();

    const isVisible = isMounted && consentState === 'pending';

    return (
        <>
            {/* Load Google Analytics only if consent is granted */}
            {consentState === 'granted' && (
                <>
                    <Script
                        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
                        strategy="afterInteractive"
                    />
                    <Script id="google-analytics" strategy="afterInteractive">
                        {`
                          window.dataLayer = window.dataLayer || [];
                          function gtag(){window.dataLayer.push(arguments);}
                          gtag('js', new Date());

                          gtag('config', '${GA_MEASUREMENT_ID}', {
                            page_path: window.location.pathname,
                          });
                        `}
                    </Script>
                </>
            )}

            {/* Cookie Banner UI */}
            {isVisible && (
                <div className="fixed bottom-0 left-0 right-0 z-100 p-4 pb-6 bg-white border-t border-gray-200 shadow-xl sm:p-6 dark:bg-gray-900 dark:border-gray-800">
                    <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-sm text-gray-600 dark:text-gray-300 flex-1">
                            {t('cookieNotice.message')}
                        </p>
                        <div className="flex gap-3 w-full sm:w-auto shrink-0">
                            <Button
                                variant="outline"
                                onClick={declineCookies}
                                className="w-full sm:w-auto"
                            >
                                {t('cookieNotice.decline')}
                            </Button>
                            <Button
                                onClick={acceptCookies}
                                className="w-full sm:w-auto"
                            >
                                {t('cookieNotice.accept')}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
