import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import BenefitsSection from '@/components/BenefitsSection';
import CTASection from '@/components/CTASection';
// HomeSchema removed in favor of Server Side Rendering
import { SupportedLanguage, languages } from "@/types/language";

import { Metadata } from "next";
import { getDictionary } from "@/i18n/get-dictionary";
import { constructMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    const supportedLang = lang as SupportedLanguage;
    const t = await getDictionary(supportedLang);

    return {
        ...constructMetadata({
            title: t.home?.title || "WebABC",
            description: t.home?.description || "Web Design and Development Services",
            preloadHero: '/images/homepage-hero.webp',
        }),
        alternates: {
            canonical: `https://webabc.ir/${supportedLang}`,
            languages: {
                'en': '/en',
                'fa': '/fa',
                'ar': '/ar',
            },
        },
    };
}

export async function generateStaticParams() {
    return Object.keys(languages).map((lang) => ({ lang }));
}

import { getImageData } from '@/lib/imageUtils';
import { createOrganizationSchema } from '@/lib/schema';
import { LanguageProvider } from "@/contexts/LanguageContext";

export default async function Page({
    params,
}: {
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;

    // Fetch critical image data on server
    const rawHeroData = getImageData('/images/homepage-hero.webp');

    // Optimization: Create a clean copy without the placeholder to avoid bloating HTML
    const heroImgData = rawHeroData ? { ...rawHeroData } : null;
    if (heroImgData) {
        delete heroImgData.placeholder;
    }

    // SEO: Generate Organization Schema Server Side
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://webabc.ir';
    const organizationSchema = createOrganizationSchema(
        baseUrl,
        "/images/logo.webp",
        [{ telephone: "+989123456789", contactType: "customer service" }], // Update with actual phone if available or keep generic
        lang as SupportedLanguage
    );

    // Filter dictionary for Home Page
    const dictionary = await getDictionary(lang as SupportedLanguage);
    const homeDictionary = {
        ...dictionary, // We need to pass everything the components might need. 
        // Optimization: We could cherry-pick ONLY home + common + benefits + cta, 
        // but passing the full dictionary here is safer for now to ensure no regressions 
        // on the page level, while the Root Layout is optimized.
        // To really optimize page load, we should whitelist:
        common: dictionary.common,
        home: dictionary.home,
        services: dictionary.services,
        benefits: dictionary.benefits,
        cta: dictionary.cta,
        contact: dictionary.contact,
        consultation: dictionary.consultation,
        // Exclude strictly unused namespaces like 'about', 'portfolio' (content), 'tools' (content) etc.
    };

    return (
        <LanguageProvider defaultLanguage={lang as SupportedLanguage} dictionary={homeDictionary}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
            />

            <div className="relative overflow-x-hidden">
                <HeroSection heroImgData={heroImgData} />
                <ServicesSection />
                <BenefitsSection />
                <CTASection />
            </div>
        </LanguageProvider>
    );
}
