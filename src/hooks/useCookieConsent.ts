"use client";

import { useState, useEffect } from 'react';

const CONSENT_KEY = 'webabc_cookie_consent';

export type CookieConsentState = 'granted' | 'denied' | 'pending';

export const useCookieConsent = () => {
    const [state, setState] = useState<{ isMounted: boolean; consentState: CookieConsentState }>({
        isMounted: false,
        consentState: 'pending'
    });

    useEffect(() => {
        const storedConsent = localStorage.getItem(CONSENT_KEY) as CookieConsentState | null;
        requestAnimationFrame(() => {
            setState({
                isMounted: true,
                consentState: storedConsent || 'pending'
            });
        });
    }, []);

    const acceptCookies = () => {
        localStorage.setItem(CONSENT_KEY, 'granted');
        setState(prev => ({ ...prev, consentState: 'granted' }));
    };

    const declineCookies = () => {
        localStorage.setItem(CONSENT_KEY, 'denied');
        setState(prev => ({ ...prev, consentState: 'denied' }));
    };

    return {
        consentState: state.consentState,
        isMounted: state.isMounted,
        acceptCookies,
        declineCookies
    };
};
