import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col" dir="rtl">
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
                  <Input className="text-right" placeholder="نام خود را وارد کنید" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">ایمیل</label>
                  <Input type="email" className="text-right" placeholder="example@domain.com" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">پیام</label>
                  <Textarea rows={5} className="text-right" placeholder="متن پیام خود را بنویسید..." />
                </div>

                <Button type="submit" className="w-full bg-primary hover:bg-primary-dark">
                  ارسال پیام
                </Button>
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
