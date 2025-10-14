import React, { useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import SchemaMarkup from '@/components/SchemaMarkup';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, CheckCircle2, Globe, TrendingUp, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import enServiceAreas from '@/i18n/en/service-areas.json';
import faServiceAreas from '@/i18n/fa/service-areas.json';
import arServiceAreas from '@/i18n/ar/service-areas.json';

interface Location {
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

const ServiceAreas = () => {
  const { t, language, languageMeta } = useLanguage();

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

  const locations: Location[] = serviceAreasData.locations;

  const serviceAreaSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: t('service-areas.title'),
    description: t('service-areas.description'),
    provider: {
      "@type": "Organization",
      name: language === 'en' ? 'WebABC' : language === 'ar' ? 'ويب إيه بي سي' : 'وب آ ب ث'
    },
    areaServed: locations.map(loc => ({
      "@type": "City",
      name: loc.name,
      containedInPlace: {
        "@type": "Country",
        name: loc.country
      }
    }))
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: t('common.home'),
        item: `${window.location.origin}/${language}`
      },
      {
        "@type": "ListItem",
        position: 2,
        name: t('service-areas.title'),
        item: window.location.href
      }
    ]
  };

  return (
    <div>
      <SEOHead
        title={t('service-areas.title')}
        description={t('service-areas.description')}
      />
      <SchemaMarkup schema={[serviceAreaSchema, breadcrumbSchema]} />

      <Navbar />

      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary/10 via-primary/5 to-background relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="container mx-auto px-4 relative pt-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge variant="secondary" className="mb-4 text-sm">
                <MapPin className="w-4 h-4 inline mr-2" />
                {t('service-areas.locationTitle')}
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-primary">
                {t('service-areas.title')}
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-8">
                {t('service-areas.subtitle')}
              </p>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                {t('service-areas.description')}
              </p>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              {t('service-areas.whyChooseUs')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card className="text-center border-primary/20 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto mb-4 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <Globe className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle>{t('service-areas.localExpertise')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {t('service-areas.localExpertiseDesc')}
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="text-center border-primary/20 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto mb-4 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle>{t('service-areas.provenResults')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {t('service-areas.provenResultsDesc')}
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="text-center border-primary/20 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto mb-4 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle>{t('service-areas.multilingualSupport')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {t('service-areas.multilingualSupportDesc')}
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Locations Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="space-y-12">
              {locations.map((location, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                  <div className="grid md:grid-cols-2 gap-0">
                    <div className={`order-1 ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
                      <div className="aspect-video md:aspect-auto md:h-full overflow-hidden">
                        <img
                          src={location.image}
                          alt={`${location.name}, ${location.country}`}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                          onError={(e) => {
                            e.currentTarget.src = '/placeholder.svg';
                          }}
                        />
                      </div>
                    </div>
                    <div className={`order-2 ${index % 2 === 0 ? 'md:order-2' : 'md:order-1'} p-8 md:p-12 flex flex-col justify-center`}>
                      <div className="flex items-center gap-2 mb-4">
                        <MapPin className="w-5 h-5 text-primary" />
                        <Badge variant="secondary">{location.country}</Badge>
                      </div>
                      <h3 className="text-3xl md:text-4xl font-bold mb-4">{location.name}</h3>
                      <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                        {location.description}
                      </p>
                      <div className="mb-6">
                        <h4 className="font-semibold mb-3 text-lg">{t('common.services')}:</h4>
                        <ul className="space-y-2">
                          {location.services.map((service, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                              <span className="text-muted-foreground">{service}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex gap-3">
                        <Button asChild className="flex-1">
                          <Link to={`/${language}/${location.slug}`}>
                            {t('common.learnMore')}
                          </Link>
                        </Button>
                        <Button asChild variant="outline" className="flex-1">
                          <Link to={`/${language}/contact`}>
                            {t('common.contactUs')}
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-primary/10 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {t('service-areas.ctaTitle')}
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                {t('service-areas.ctaDescription')}
              </p>
              <Button asChild size="lg" className="text-lg px-8 py-6">
                <Link to={`/${language}/contact`}>
                  {t('service-areas.ctaButton')}
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ServiceAreas;
