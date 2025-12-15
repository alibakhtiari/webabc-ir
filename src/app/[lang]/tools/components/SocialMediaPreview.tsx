"use client";

import React, { useState } from 'react';
import { Share2, Upload, Layout, Image as ImageIcon } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { toast } from 'sonner';

export default function SocialMediaPreview() {
    const { t } = useLanguage();
    const [ogTitle, setOgTitle] = useState('');
    const [ogDescription, setOgDescription] = useState('');
    const [ogImage, setOgImage] = useState('');
    const [activeTab, setActiveTab] = useState<'facebook' | 'twitter' | 'linkedin'>('facebook');

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setOgImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="p-8 border-b border-gray-100">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-indigo-50 rounded-xl">
                            <Share2 className="w-8 h-8 text-indigo-600" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">
                                {t('socialPreview.title')}
                            </h2>
                            <p className="text-gray-600">
                                {t('socialPreview.description')}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2">
                    {/* Input Section */}
                    <div className="p-8 border-b lg:border-b-0 lg:border-r border-gray-100 bg-gray-50/50">
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {t('socialPreview.imageLabel')}
                                </label>
                                <div className="flex items-center gap-4">
                                    <div className="relative flex-1">
                                        <input
                                            type="text"
                                            value={ogImage}
                                            onChange={(e) => setOgImage(e.target.value)}
                                            placeholder="https://example.com/image.jpg"
                                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        />
                                    </div>
                                    <label className="cursor-pointer bg-white px-4 py-3 rounded-xl border border-gray-300 hover:bg-gray-50 transition-colors">
                                        <Upload className="w-5 h-5 text-gray-600" />
                                        <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                                    </label>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {t('socialPreview.titleLabel')}
                                </label>
                                <input
                                    type="text"
                                    value={ogTitle}
                                    onChange={(e) => setOgTitle(e.target.value)}
                                    placeholder={t('socialPreview.titlePlaceholder')}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {t('socialPreview.descriptionLabel')}
                                </label>
                                <textarea
                                    value={ogDescription}
                                    onChange={(e) => setOgDescription(e.target.value)}
                                    placeholder={t('socialPreview.descriptionPlaceholder')}
                                    rows={4}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Preview Section */}
                    <div className="p-8 bg-gray-100/50">
                        <div className="flex gap-2 mb-6 bg-white p-1 rounded-xl shadow-sm w-fit mx-auto">
                            {(['facebook', 'twitter', 'linkedin'] as const).map((platform) => (
                                <button
                                    key={platform}
                                    onClick={() => setActiveTab(platform)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === platform
                                        ? 'bg-indigo-600 text-white shadow-md'
                                        : 'text-gray-600 hover:bg-gray-50'
                                        }`}
                                >
                                    {platform.charAt(0).toUpperCase() + platform.slice(1)}
                                </button>
                            ))}
                        </div>

                        <div className="max-w-sm mx-auto">
                            {/* Facebook Preview */}
                            {activeTab === 'facebook' && (
                                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
                                    <div className="aspect-[1.91/1] bg-gray-100 relative">
                                        {ogImage ? (
                                            <img src={ogImage} alt="Preview" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="flex items-center justify-center h-full text-gray-400">
                                                <ImageIcon className="w-12 h-12" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-4 bg-[#f0f2f5] border-t border-gray-200">
                                        <p className="text-xs text-gray-500 uppercase font-medium mb-1 truncate">example.com</p>
                                        <h3 className="text-base font-bold text-gray-900 leading-tight mb-1 line-clamp-2">
                                            {ogTitle || t('socialPreview.defaultTitle')}
                                        </h3>
                                        <p className="text-sm text-gray-600 line-clamp-1">
                                            {ogDescription || t('socialPreview.defaultDesc')}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Twitter Preview */}
                            {activeTab === 'twitter' && (
                                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                                    <div className="aspect-[2/1] bg-gray-100 relative">
                                        {ogImage ? (
                                            <img src={ogImage} alt="Preview" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="flex items-center justify-center h-full text-gray-400">
                                                <ImageIcon className="w-12 h-12" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-4">
                                        <h3 className="text-base font-bold text-gray-900 mb-1">
                                            {ogTitle || t('socialPreview.defaultTitle')}
                                        </h3>
                                        <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                                            {ogDescription || t('socialPreview.defaultDesc')}
                                        </p>
                                        <p className="text-sm text-gray-500">example.com</p>
                                    </div>
                                </div>
                            )}

                            {/* LinkedIn Preview */}
                            {activeTab === 'linkedin' && (
                                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
                                    <div className="aspect-[1.91/1] bg-gray-100 relative">
                                        {ogImage ? (
                                            <img src={ogImage} alt="Preview" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="flex items-center justify-center h-full text-gray-400">
                                                <ImageIcon className="w-12 h-12" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-4 bg-white border-t border-gray-200">
                                        <h3 className="text-base font-semibold text-gray-900 mb-1 line-clamp-2">
                                            {ogTitle || t('socialPreview.defaultTitle')}
                                        </h3>
                                        <p className="text-xs text-gray-500">example.com</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <p className="text-center text-sm text-gray-500 mt-6">
                            {t('socialPreview.previewNote')}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
