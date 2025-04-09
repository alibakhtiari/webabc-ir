
import React, { lazy, Suspense, useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import SEOHead from '@/components/SEOHead';
import SchemaMarkup from '@/components/SchemaMarkup';
import { createBreadcrumbSchema, createOrganizationSchema, createPersonSchema } from '@/lib/schema';
import LazyImage from '@/components/LazyImage';
import { useLanguage } from '@/contexts/LanguageContext';

// Lazy loading components
const Avatar = lazy(() => import('@/components/ui/avatar').then(mod => ({ default: mod.Avatar })));
const AvatarFallback = lazy(() => import('@/components/ui/avatar').then(mod => ({ default: mod.AvatarFallback })));
const AvatarImage = lazy(() => import('@/components/ui/avatar').then(mod => ({ default: mod.AvatarImage })));

// Fallback component for team members
const TeamMemberSkeleton = () => (
  <Card className="p-6 border-0 bg-white shadow-lg animate-pulse">
    <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-200"></div>
    <div className="h-6 bg-gray-200 rounded w-2/3 mx-auto mb-2"></div>
    <div className="h-4 bg-gray-100 rounded w-1/2 mx-auto"></div>
  </Card>
);

const About = () => {
  const { language, t, languageMeta } = useLanguage();
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [schemaMarkup, setSchemaMarkup] = useState<any[]>([]);
  
  useEffect(() => {
    // Load team members from translations
    const teamData = t('about.teamMembers', { fallback: '[]' });
    
    if (typeof teamData === 'string') {
      try {
        setTeamMembers(JSON.parse(teamData));
      } catch (e) {
        console.error('Failed to parse team members data', e);
        setTeamMembers([]);
      }
    } else if (Array.isArray(teamData)) {
      setTeamMembers(teamData);
    }
  }, [language, t]);
  
  useEffect(() => {
    // Create schema markup
    const baseUrl = window.location.origin;
    
    // Breadcrumb schema
    const breadcrumbSchema = createBreadcrumbSchema([
      { name: t('common.home'), url: `${baseUrl}/${language}` },
      { name: t('common.about'), url: `${baseUrl}/${language}/about` }
    ]);

    // Organization schema
    const orgSchema = createOrganizationSchema(
      baseUrl,
      `${baseUrl}/images/logo.jpg`,
      [
        { telephone: "+1234567890", contactType: "customer service" }
      ],
      language
    );
    
    // Person schemas for team members
    const personSchemas = teamMembers.map((member, index) => 
      createPersonSchema(
        member.name,
        member.role,
        member.bio,
        `/images/team-${index + 1}.jpg`,
        undefined,
        language
      )
    );
    
    setSchemaMarkup([breadcrumbSchema, orgSchema, ...personSchemas]);
  }, [teamMembers, language, t]);

  return (
    <div className="min-h-screen flex flex-col" dir={languageMeta.direction}>
      <SEOHead 
        title={t('about.title')} 
        description={t('about.subtitle')}
        keywords={t('seo.keywords')}
      />
      
      {schemaMarkup.length > 0 && <SchemaMarkup schema={schemaMarkup} />}
      
      <Navbar />
      
      <main className="flex-1 max-w-6xl mx-auto pt-20 pb-12 px-4 sm:px-6 lg:px-8 w-full">
        <div className="space-y-16">
          {/* Hero Section */}
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('about.title')}</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('about.subtitle')}
            </p>
          </div>

          {/* Mission Section */}
          <Card className="p-8 bg-gradient-to-br from-blue-50 to-purple-50 border-0">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">{t('about.mission')}</h2>
              <p className="text-gray-600 leading-relaxed">
                {t('about.missionText')}
              </p>
            </div>
          </Card>

          {/* Team Section */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">{t('about.team')}</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <Suspense key={index} fallback={<TeamMemberSkeleton />}>
                  <Card className="p-6 border-0 bg-white shadow-lg">
                    <Avatar className="w-24 h-24 mx-auto mb-4">
                      <AvatarImage src={`/images/team-${index + 1}.jpg`} />
                      <AvatarFallback>{member.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{member.name}</h3>
                    <p className="text-gray-600">{member.role}</p>
                    {member.bio && (
                      <p className="text-gray-500 mt-4 text-sm">{member.bio}</p>
                    )}
                  </Card>
                </Suspense>
              ))}
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <Card className="py-6 border-0 bg-blue-50">
              <div className="text-3xl font-bold text-blue-600 mb-2">10+</div>
              <div className="text-gray-700">{t('about.yearsExperience')}</div>
            </Card>
            <Card className="py-6 border-0 bg-purple-50">
              <div className="text-3xl font-bold text-purple-600 mb-2">500+</div>
              <div className="text-gray-700">{t('about.successfulProjects')}</div>
            </Card>
            <Card className="py-6 border-0 bg-green-50">
              <div className="text-3xl font-bold text-green-600 mb-2">98%</div>
              <div className="text-gray-700">{t('about.clientSatisfaction')}</div>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
