import BlogPostPage from "@/views/BlogPostPage";
import { SupportedLanguage } from "@/types/language";

export const dynamic = 'force-dynamic';

export default async function Page({
    params,
}: {
    params: Promise<{ lang: string; slug: string }>;
}) {
    const { lang } = await params;
    return <BlogPostPage />;
}
