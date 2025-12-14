"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Breadcrumb from '@/components/seo/Breadcrumb';
import { useLanguage } from '@/contexts/LanguageContext';
import { PortfolioItem } from '@/types/portfolio';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, ExternalLink, CheckCircle2, Calendar, User, Code } from 'lucide-react';

import ReactMarkdown from 'react-markdown';

interface PortfolioDetailProps {
    project: PortfolioItem;
}

const PortfolioDetail = ({ project }: PortfolioDetailProps) => {
    const { t, language, languageMeta } = useLanguage();
    const slug = project.slug;

    if (!project) {
        notFound();
    }

    // Check if project language matches current language, if not try to find the version for current language
    // This is a simple check, in a real app you might want to link related projects
    if (project.language && project.language !== language) {
        // Optional: Redirect or show warning, but for now we just show it
    }

    const breadcrumbItems = [
        { name: t('common.home'), path: `/${language}` },
        { name: t('common.portfolio'), path: `/${language}/portfolio` },
        { name: project.title, path: `/${language}/portfolio/${slug}` }
    ];

    return (
        <>
            <div className="min-h-screen pt-32 pb-16">
                <div className="container mx-auto px-4">
                    <Breadcrumb customItems={breadcrumbItems} />

                    <div className="mb-8">
                        <Link
                            href={`/${language}/portfolio`}
                            className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-6"
                        >
                            <ArrowLeft className={`h-4 w-4 ${languageMeta.direction === 'rtl' ? 'ml-2 rotate-180' : 'mr-2'}`} />
                            {t('common.backToPortfolio')}
                        </Link>

                        <div className="flex flex-wrap gap-3 mb-4">
                            <Badge variant="secondary" className="text-sm px-3 py-1">
                                {project.category}
                            </Badge>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                            {project.title}
                        </h1>

                        <p className="text-xl text-muted-foreground max-w-3xl">
                            {project.description}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-12">
                            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-xl">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold mb-4">{t('portfolio.projectOverview')}</h2>
                                <div className="prose dark:prose-invert max-w-none text-muted-foreground">
                                    <ReactMarkdown>{project.content}</ReactMarkdown>
                                </div>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold mb-6">{t('portfolio.keyResults')}</h2>
                                <div className="grid sm:grid-cols-2 gap-6">
                                    {project.results.map((result, index) => (
                                        <Card key={index} className="border-l-4 border-l-primary">
                                            <CardContent className="p-6">
                                                <div className="text-3xl font-bold text-primary mb-2">{result.value}</div>
                                                <div className="text-muted-foreground font-medium">{result.label}</div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-8">
                            <Card>
                                <CardContent className="p-6 space-y-6">
                                    <h3 className="text-xl font-bold border-b pb-4">{t('portfolio.projectDetails')}</h3>

                                    <div className="space-y-4">
                                        <div className="flex items-start gap-3">
                                            <User className="h-5 w-5 text-primary mt-1" />
                                            <div>
                                                <div className="font-medium text-muted-foreground text-sm">{t('portfolio.client')}</div>
                                                <div className="font-semibold">{project.client}</div>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-3">
                                            <Code className="h-5 w-5 text-primary mt-1" />
                                            <div>
                                                <div className="font-medium text-muted-foreground text-sm">{t('portfolio.technologies')}</div>
                                                <div className="flex flex-wrap gap-2 mt-1">
                                                    {project.technologies.map((tech, idx) => {
                                                        const key = tech.toLowerCase().replace(/[^a-zA-Z0-9]/g, ' ').trim().replace(/\s+(.)/g, (match, group1) => group1.toUpperCase());
                                                        return (
                                                            <Badge key={idx} variant="outline" className="text-xs">
                                                                {t(`portfolio.tech.${key}`, { fallback: tech })}
                                                            </Badge>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <Button className="w-full gap-2" size="lg" asChild>
                                        <a href={project.projectUrl} target="_blank" rel="noopener noreferrer">
                                            {t('common.viewWebsite')}
                                            <ExternalLink className="h-4 w-4" />
                                        </a>
                                    </Button>
                                </CardContent>
                            </Card>

                            <div className="bg-primary/5 rounded-xl p-6 border border-primary/10">
                                <h3 className="text-xl font-bold mb-4">{t('portfolio.needSimilarProject')}</h3>
                                <p className="text-muted-foreground mb-6">
                                    {t('portfolio.ctaDescription')}
                                </p>
                                <Button variant="default" className="w-full" asChild>
                                    <Link href={`/${language}/contact`}>
                                        {t('common.freeConsultation')}
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PortfolioDetail;
