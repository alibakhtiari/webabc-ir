"use client";

import { useLanguage } from '@/contexts/LanguageContext';

const ContactMap = () => {
    const { t } = useLanguage();

    return (
        <div className="mt-12 rounded-2xl overflow-hidden shadow-xl border border-gray-100">
            <iframe
                title={t('contact.locationMap')}
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3239.676897237655!2d51.38910441526849!3d35.73296868018775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8e07118a35a56d%3A0x67cce5d4674ffa0f!2sAzadi%20Tower!5e0!3m2!1sen!2sir!4v1627987654325!5m2!1sen!2sir"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                {...{ fetchpriority: "low" }}
            ></iframe>
        </div>
    );
};

export default ContactMap;
