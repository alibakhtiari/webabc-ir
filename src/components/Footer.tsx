
import React from 'react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';

const Footer = () => {
  const { t, language, languageMeta } = useLanguage();
  const isRtl = languageMeta.direction === 'rtl';

  return (
    <footer className="bg-gray-50 py-16 border-t border-gray-100">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-1">
            <div className="flex flex-col space-y-4">
              <Link to={`/${language}`} className="flex items-center space-x-2">
                <span className={cn("text-2xl font-bold tracking-tight text-primary", languageMeta.fontFamily)}>
                  WebABC
                </span>
              </Link>
              
              <p className={cn("text-foreground/70 mt-2", languageMeta.fontFamily)}>
                {t('home.footer.aboutCompany')}
              </p>
              
              <div className={cn("flex space-x-4 mt-4", isRtl && "space-x-reverse")}>
                {['twitter', 'instagram', 'linkedin', 'facebook'].map((social) => (
                  <a
                    key={social}
                    href={`https://${social}.com/webabc`}
                    className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm transition-all hover:bg-primary hover:text-white"
                  >
                    <span className="sr-only">{social}</span>
                    <div className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                title: t('home.footer.services'),
                links: [
                  { name: t('services.seoTitle'), href: `/${language}/seo-services` },
                  { name: t('services.webDesignTitle'), href: `/${language}/web-design` },
                  { name: t('wordpress.contentCreation'), href: `/${language}/content-creation` },
                  { name: t('services.technicalOptimization'), href: `/${language}/technical-optimization` },
                  { name: t('services.linkBuilding'), href: `/${language}/link-building` },
                ]
              },
              {
                title: t('home.footer.company'),
                links: [
                  { name: t('common.about'), href: `/${language}/about` },
                  { name: t('about.ourTeam'), href: `/${language}/team` },
                  { name: t('common.portfolio'), href: `/${language}/portfolio` },
                  { name: t('blog.title'), href: `/${language}/blog` },
                  { name: t('common.contact'), href: `/${language}/contact` },
                ]
              },
              {
                title: t('home.footer.resources'),
                links: [
                  { name: t('resources.seoGuide'), href: `/${language}/seo-guide` },
                  { name: t('resources.webDesignGuide'), href: `/${language}/web-design-guide` },
                  { name: t('resources.specializedArticles'), href: `/${language}/articles` },
                  { name: t('resources.freeTools'), href: `/${language}/tools` },
                  { name: t('resources.faq'), href: `/${language}/faq` },
                ]
              }
            ].map((category, idx) => (
              <div key={idx}>
                <h3 className={cn("text-lg font-medium mb-4", languageMeta.fontFamily)}>
                  {category.title}
                </h3>
                <ul className="space-y-2">
                  {category.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <a 
                        href={link.href} 
                        className={cn("text-foreground/70 hover:text-primary transition-colors", languageMeta.fontFamily)}
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between">
          <p className={cn("text-foreground/70 text-sm", languageMeta.fontFamily)}>
            {t('home.footer.companySince')}
          </p>
          
          <div className={cn("flex space-x-4 mt-4 md:mt-0", isRtl && "space-x-reverse")}>
            {[
              { name: t('home.footer.privacyPolicy'), href: `/${language}/privacy` },
              { name: t('home.footer.termsOfService'), href: `/${language}/terms` },
              { name: t('home.footer.cookiePolicy'), href: `/${language}/cookies` }
            ].map((item, idx) => (
              <a 
                key={idx} 
                href={item.href} 
                className={cn("text-sm text-foreground/70 hover:text-primary transition-colors", languageMeta.fontFamily)}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
