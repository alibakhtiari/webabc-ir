import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col" dir="rtl">
      <Navbar />
      
      <main className="flex-1 max-w-6xl mx-auto pt-20 pb-12 px-4 sm:px-6 lg:px-8 w-full">
        <div className="space-y-16">
          {/* Hero Section */}
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">درباره وب آ ب ث</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              پیشرو در ارائه راهکارهای دیجیتال مارکتینگ و توسعه وب با بیش از یک دهه تجربه موفق
            </p>
          </div>

          {/* Mission Section */}
          <Card className="p-8 bg-gradient-to-br from-blue-50 to-purple-50 border-0">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">ماموریت ما</h2>
              <p className="text-gray-600 leading-relaxed">
                ما در وب آ ب ث با تکیه بر دانش روز و تیمی متخصص، کسب و کارها را در مسیر دیجیتالی شدن همراهی می‌کنیم.
                هدف اصلی ما ایجاد ارزش پایدار برای مشتریان از طریق راهکارهای نوآورانه و نتیجه‌محور است.
              </p>
            </div>
          </Card>

          {/* Team Section */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">تیم ما</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="p-6 border-0 bg-white shadow-lg">
                  <Avatar className="w-24 h-24 mx-auto mb-4">
                    <AvatarImage src={`/images/team-${i}.jpg`} />
                    <AvatarFallback>TM</AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">نام عضو تیم</h3>
                  <p className="text-gray-600">توسعه دهنده ارشد</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <Card className="py-6 border-0 bg-blue-50">
              <div className="text-3xl font-bold text-blue-600 mb-2">۱۰+</div>
              <div className="text-gray-700">سال تجربه</div>
            </Card>
            <Card className="py-6 border-0 bg-purple-50">
              <div className="text-3xl font-bold text-purple-600 mb-2">۵۰۰+</div>
              <div className="text-gray-700">پروژه موفق</div>
            </Card>
            <Card className="py-6 border-0 bg-green-50">
              <div className="text-3xl font-bold text-green-600 mb-2">۹۸%</div>
              <div className="text-gray-700">رضایت مشتریان</div>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
