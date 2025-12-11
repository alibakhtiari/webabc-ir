"use client";

import React, { useMemo, useEffect, useState } from 'react';
import { useParams, useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/seo/Breadcrumb';
import LocationSchema from '@/components/seo/schemas/LocationSchema';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, CheckCircle2, ArrowRight, TrendingUp, Users, Award } from 'lucide-react';
import enServiceAreas from '@/i18n/en/service-areas.json';
import faServiceAreas from '@/i18n/fa/service-areas.json';
import arServiceAreas from '@/i18n/ar/service-areas.json';

interface LocationData {
  name: string;
  slug: string;
  country: string;
  description: string;
  longDescription: string;
  services: string[];
  image: string;
  benefits: string[];
  stats: {
    projects: string;
    clients: string;
    experience: string;
  };
}

const LocationPage = () => {
  const params = useParams();
  const slug = (params?.location || params?.slug) as string;
  const router = useRouter();
  const pathname = usePathname();
  const { t, language, languageMeta } = useLanguage();
  const [origin, setOrigin] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setOrigin(window.location.origin);
    }
  }, []);

  // Get service areas data based on language
  const serviceAreasData = useMemo(() => {
    switch (language) {
      case 'fa':
        return faServiceAreas;
      case 'ar':
        return arServiceAreas;
      default:
        return enServiceAreas;
    }
  }, [language]);

  // Find location by slug
  const location = useMemo(() => {
    return serviceAreasData.locations.find(
      (loc: LocationData) => loc.slug === slug
    );
  }, [serviceAreasData, slug]);

  useEffect(() => {
    if (!location && slug) {
      router.replace(`/${language}/service-areas`);
    }
  }, [location, language, router, slug]);

  if (!location) {
    return null; // Or a loading spinner while redirecting
  }

  return (
    <div>
      <LocationSchema location={location} />

      <Navbar />

      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={location.image}
              alt={`${location.name}, ${location.country}`}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = '/images/placeholder.svg';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-background/80"></div>
          </div>

          <div className="container mx-auto px-4 relative">
            <div className="max-w-4xl mx-auto text-center">
              <div className="mb-8">
                <Breadcrumb customItems={[
                  { name: t('common.home'), path: `/${language}` },
                  { name: t('service-areas.title'), path: `/${language}/service-areas` },
                  { name: location.name, path: `/${language}/service-areas/${location.slug}` }
                ]} />
              </div>
              <div className="flex items-center justify-center gap-2 mb-6 animate-fade-in">
                <MapPin className="w-6 h-6 text-primary" />
                <Badge variant="secondary" className="text-base px-4 py-1">
                  {location.country}
                </Badge>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent animate-fade-in">
                {t('common.webDesignAndDevelopment')} {location.name}
              </h1>

              <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed animate-fade-in">
                {location.description}
              </p>

              <div className="flex flex-wrap gap-4 justify-center animate-fade-in">
                <Button asChild size="lg" className="group">
                  <Link href={`/${language}/contact`}>
                    {t('service-areas.ctaButton')}
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href={`/${language}/portfolio`}>
                    {t('common.viewPortfolio')}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <Card className="text-center border-primary/20 hover:shadow-lg transition-all hover:scale-105">
                <CardContent className="pt-8">
                  <TrendingUp className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <div className="text-4xl font-bold mb-2 text-primary">
                    {location.stats.projects}
                  </div>
                  <p className="text-muted-foreground">{t('common.completedProjects')}</p>
                </CardContent>
              </Card>

              <Card className="text-center border-primary/20 hover:shadow-lg transition-all hover:scale-105">
                <CardContent className="pt-8">
                  <Users className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <div className="text-4xl font-bold mb-2 text-primary">
                    {location.stats.clients}
                  </div>
                  <p className="text-muted-foreground">{t('common.happyClients')}</p>
                </CardContent>
              </Card>

              <Card className="text-center border-primary/20 hover:shadow-lg transition-all hover:scale-105">
                <CardContent className="pt-8">
                  <Award className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <div className="text-4xl font-bold mb-2 text-primary">
                    {location.stats.experience}
                  </div>
                  <p className="text-muted-foreground">{t('common.yearsExperience')}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* About Location Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
                {t('common.aboutOurServices')} {location.name}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-12 text-center">
                {location.longDescription}
              </p>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                {t('common.ourServices')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {location.services.map((service, index) => (
                  <Card key={index} className="group hover:shadow-xl transition-all hover:scale-105 border-primary/20">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                        <span className="text-lg font-medium">{service}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                {t('service-areas.whyChooseUs')}
              </h2>
              <div className="space-y-4">
                {location.benefits.map((benefit, index) => (
                  <Card key={index} className="group hover:shadow-lg transition-all hover:translate-x-2 border-l-4 border-l-primary">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                        <span className="text-lg text-muted-foreground">{benefit}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-primary/10 via-primary/5 to-background relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="container mx-auto px-4 relative">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {t('service-areas.ctaTitle')}
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                {t('service-areas.ctaDescription')}
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button asChild size="lg" className="text-lg px-8 py-6 group">
                  <Link href={`/${language}/contact`}>
                    {t('service-areas.ctaButton')}
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="text-lg px-8 py-6">
                  <Link href={`/${language}/service-areas`}>
                    {t('common.viewAllLocations')}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div >
  );
};

export default LocationPage;
