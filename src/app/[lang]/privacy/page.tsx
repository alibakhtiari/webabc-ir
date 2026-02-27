import { getDictionary } from '@/i18n/get-dictionary';
import { SupportedLanguage } from '@/types/language';
import { Metadata } from 'next';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ lang: string }>;
}): Promise<Metadata> {
    const { lang } = await params;
    const dictionary = await getDictionary(lang as SupportedLanguage);

    return {
        title: dictionary.privacyPolicy.title,
        description: dictionary.privacyPolicy.introduction.substring(0, 160),
    };
}

const renderContent = (content: string) => {
    return content.split('\n').map((line, i) => {
        // Basic formatting for **text**
        const parts = line.split(/(\*\*.*?\*\*)/g);
        return (
            <p key={i} className="mb-4">
                {parts.map((part, j) => {
                    if (part.startsWith('**') && part.endsWith('**')) {
                        return <strong key={j} className="text-gray-900 dark:text-gray-100">{part.slice(2, -2)}</strong>;
                    }
                    return <span key={j}>{part}</span>;
                })}
            </p>
        );
    });
};

export default async function PrivacyPolicyPage({
    params,
}: {
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;
    const dictionary = await getDictionary(lang as SupportedLanguage);
    const privacy = dictionary.privacyPolicy;

    return (
        <div className="container mx-auto px-4 py-16 md:py-24 max-w-4xl pt-32">
            <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">{privacy.title}</h1>
            <p className="text-gray-500 mb-12">{privacy.lastUpdated} {new Date().toLocaleDateString(lang)}</p>

            <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
                <p className="text-lg mb-8 leading-relaxed">{privacy.introduction}</p>

                <section className="mb-10">
                    <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">{privacy.dataCollection.title}</h2>
                    <div>{renderContent(privacy.dataCollection.content)}</div>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">{privacy.dataUsage.title}</h2>
                    <div>{renderContent(privacy.dataUsage.content)}</div>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">{privacy.thirdPartySharing.title}</h2>
                    <div>{renderContent(privacy.thirdPartySharing.content)}</div>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">{privacy.dataRetentionAndDeletion.title}</h2>
                    <div>{renderContent(privacy.dataRetentionAndDeletion.content)}</div>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">{privacy.cookieUsage.title}</h2>
                    <div>{renderContent(privacy.cookieUsage.content)}</div>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">{privacy.contactInformation.title}</h2>
                    <div>{renderContent(privacy.contactInformation.content)}</div>
                </section>
            </div>
        </div>
    );
}
