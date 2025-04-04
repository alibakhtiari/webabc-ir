
import React, { lazy, Suspense } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import SEOHead from '@/components/SEOHead';
import SchemaMarkup from '@/components/SchemaMarkup';
import { createBreadcrumbSchema } from '@/lib/schema';
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
  
  // Schema markup for About page
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: t('common.home'), url: `https://webabc.com/${language}` },
    { name: t('common.about'), url: `https://webabc.com/${language}/about` }
  ]);

  const teamMembers = [
    { id: 1, name: language === 'en' ? "Ali Rezaei" : language === 'ar' ? "علي رضائي" : "علی رضایی", role: language === 'en' ? "Senior Developer" : language === 'ar' ? "مطور رئيسي" : "توسعه دهنده ارشد" },
    { id: 2, name: language === 'en' ? "Maryam Ahmadi" : language === 'ar' ? "مريم أحمدي" : "مریم احمدی", role: language === 'en' ? "SEO Specialist" : language === 'ar' ? "أخصائي تحسين محركات البحث" : "متخصص سئو" },
    { id: 3, name: language === 'en' ? "Mohammad Karimi" : language === 'ar' ? "محمد كريمي" : "محمد کریمی", role: language === 'en' ? "UI Designer" : language === 'ar' ? "مصمم واجهة المستخدم" : "طراح رابط کاربری" }
  ];

  return (
    <div className="min-h-screen flex flex-col" dir={languageMeta.direction}>
      <SEOHead 
        title={t('about.title')} 
        description={t('about.subtitle')}
        keywords={t('seo.keywords')}
      />
      
      <SchemaMarkup schema={breadcrumbSchema} />
      
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
              {teamMembers.map((member) => (
                <Suspense key={member.id} fallback={<TeamMemberSkeleton />}>
                  <Card className="p-6 border-0 bg-white shadow-lg">
                    <Avatar className="w-24 h-24 mx-auto mb-4">
                      <AvatarImage src={`/images/team-${member.id}.jpg`} />
                      <AvatarFallback>{member.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{member.name}</h3>
                    <p className="text-gray-600">{member.role}</p>
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
