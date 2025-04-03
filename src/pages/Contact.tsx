
import React, { lazy, Suspense } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import SchemaMarkup from '@/components/SchemaMarkup';
import { createBreadcrumbSchema } from '@/lib/schema';

// Lazy loading components
const Button = lazy(() => import('@/components/ui/button').then(mod => ({ default: mod.Button })));
const Input = lazy(() => import('@/components/ui/input').then(mod => ({ default: mod.Input })));
const Textarea = lazy(() => import('@/components/ui/textarea').then(mod => ({ default: mod.Textarea })));

// Fallback components
const ButtonSkeleton = () => (
  <div className="w-full h-10 bg-primary/30 rounded animate-pulse"></div>
);

const InputSkeleton = () => (
  <div className="w-full h-10 bg-gray-100 rounded animate-pulse"></div>
);

const TextareaSkeleton = () => (
  <div className="w-full h-32 bg-gray-100 rounded animate-pulse"></div>
);

const Contact = () => {
  // Schema markup for Contact page
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "صفحه اصلی", url: "https://webabc.com" },
    { name: "تماس با ما", url: "https://webabc.com/contact" }
  ]);

  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "تماس با وب آ ب ث",
    "description": "برای ارتباط با تیم وب آ ب ث و دریافت مشاوره رایگان، با ما تماس بگیرید",
    "mainEntity": {
      "@type": "Organization",
      "name": "WebABC",
      "email": "info@webabc.com",
      "telephone": "۰۲۱-۱۲۳۴۵۶۷۸",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "خیابان آزادی، بلوار کشاورز، پلاک ۱۲۳",
        "addressLocality": "تهران",
        "addressRegion": "تهران",
        "postalCode": "123456",
        "addressCountry": "IR"
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col" dir="rtl">
      <SEOHead 
        title="تماس با وب آ ب ث | مشاوره رایگان طراحی سایت و سئو" 
        description="برای ارتباط با تیم وب آ ب ث و دریافت مشاوره رایگان در زمینه طراحی سایت، سئو و دیجیتال مارکتینگ با ما تماس بگیرید"
        keywords="تماس با وب آ ب ث، مشاوره سئو، مشاوره طراحی سایت، شماره تماس وب آ ب ث"
      />
      
      <SchemaMarkup schema={breadcrumbSchema} />
      <SchemaMarkup schema={contactSchema} />
      
      <Navbar />
      
      <main className="flex-1 max-w-4xl mx-auto mt-20 pb-12 px-4 sm:px-6 lg:px-8 w-full">
        <div className="space-y-12">
          <h1 className="text-3xl font-bold text-center text-gray-800">تماس با ما</h1>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">نام کامل</label>
                  <Suspense fallback={<InputSkeleton />}>
                    <Input className="text-right" placeholder="نام خود را وارد کنید" />
                  </Suspense>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">ایمیل</label>
                  <Suspense fallback={<InputSkeleton />}>
                    <Input type="email" className="text-right" placeholder="example@domain.com" />
                  </Suspense>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">پیام</label>
                  <Suspense fallback={<TextareaSkeleton />}>
                    <Textarea rows={5} className="text-right" placeholder="متن پیام خود را بنویسید..." />
                  </Suspense>
                </div>

                <Suspense fallback={<ButtonSkeleton />}>
                  <Button type="submit" className="w-full bg-primary hover:bg-primary-dark">
                    ارسال پیام
                  </Button>
                </Suspense>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div className="bg-gray-50 p-6 rounded-2xl">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">اطلاعات تماس</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-gray-700">آدرس</h3>
                    <p className="text-gray-600 leading-relaxed">
                      خیابان آزادی، بلوار کشاورز، پلاک ۱۲۳<br/>
                      تهران، ایران
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-700">شماره تماس</h3>
                    <p className="text-gray-600">۰۲۱-۱۲۳۴۵۶۷۸</p>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-700">ایمیل</h3>
                    <p className="text-gray-600">info@webabc.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Map Embed */}
          <div className="mt-12 rounded-2xl overflow-hidden shadow-xl border border-gray-100">
            <iframe
              title="موقعیت ما"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3239.676897237655!2d51.38910441526849!3d35.73296868018775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8e07118a35a56d%3A0x67cce5d4674ffa0f!2sAzadi%20Tower!5e0!3m2!1sen!2sir!4v1627987654325!5m2!1sen!2sir"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
