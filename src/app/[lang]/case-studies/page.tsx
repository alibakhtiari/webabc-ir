import { redirect } from 'next/navigation';

export default async function CaseStudiesPage({
    params,
}: {
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;
    // Redirect to portfolio for now as case studies might be part of it
    redirect(`/${lang}/portfolio`);
}
