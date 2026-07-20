"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Breadcrumb from '@/components/seo/Breadcrumb';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { CheckCircle2, AlertCircle, RefreshCw, Eye, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

const POWER_WORDS = [
  'best', 'free', 'top', 'guide', 'checklist', 'how', 'why', 'easy', 'simple',
  'fast', 'ultimate', 'secrets', 'strategy', 'tips', 'new', 'latest', 'complete',
  'بهترین', 'رایگان', 'راهنما', 'آموزش', 'چگونه', 'چرا', 'سریع', 'جامع', 'جدید', 'فرمول'
];

export default function SeoTitleChecker() {
  const { t, language, languageMeta } = useLanguage();
  const isRtl = languageMeta.direction === 'rtl';

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [keyword, setKeyword] = useState('');
  const [activeDevice, setActiveDevice] = useState<'desktop' | 'mobile'>('desktop');

  // Load defaults on client to make tool interactive instantly
  useEffect(() => {
    requestAnimationFrame(() => {
      setTitle(t('seoTitleChecker.placeholders.title') || '');
      setDescription(t('seoTitleChecker.placeholders.description') || '');
      setKeyword(t('seoTitleChecker.placeholders.keyword') || '');
    });
  }, [t]);

  const handleReset = () => {
    setTitle('');
    setDescription('');
    setKeyword('');
  };

  // Metrics
  const titleCharCount = title.length;
  const descCharCount = description.length;

  // Approximate pixel widths for title & description
  // Different character weights for LTR (English) vs RTL (Arabic/Persian)
  const titlePixelWidth = useMemo(() => {
    let width = 0;
    const isArabicPersian = /[\u0600-\u06FF]/.test(title);
    const scaleFactor = isArabicPersian ? 9.2 : 8.4;
    for (let i = 0; i < title.length; i++) {
      const char = title[i];
      if (/[A-Z]/.test(char)) width += 10.5;
      else if (/[iI' l]/.test(char)) width += 3.5;
      else if (/[wW]/.test(char)) width += 12.5;
      else width += scaleFactor;
    }
    return Math.round(width);
  }, [title]);

  const descPixelWidth = useMemo(() => {
    let width = 0;
    const isArabicPersian = /[\u0600-\u06FF]/.test(description);
    const scaleFactor = isArabicPersian ? 7.6 : 6.8;
    for (let i = 0; i < description.length; i++) {
      const char = description[i];
      if (/[A-Z]/.test(char)) width += 8.5;
      else if (/[iI' l]/.test(char)) width += 2.8;
      else if (/[wW]/.test(char)) width += 10.0;
      else width += scaleFactor;
    }
    return Math.round(width);
  }, [description]);

  // Title Status
  const titleStatus = useMemo(() => {
    if (titleCharCount === 0) return 'tooShort';
    if (titleCharCount > 60 || titlePixelWidth > 580) return 'tooLong';
    if (titleCharCount < 40 || titlePixelWidth < 350) return 'tooShort';
    return 'perfect';
  }, [titleCharCount, titlePixelWidth]);

  // Description Status
  const descStatus = useMemo(() => {
    if (descCharCount === 0) return 'tooShort';
    if (descCharCount > 160 || descPixelWidth > 990) return 'tooLong';
    if (descCharCount < 110 || descPixelWidth < 680) return 'tooShort';
    return 'perfect';
  }, [descCharCount, descPixelWidth]);

  // Keyword Checks
  const keywordChecks = useMemo(() => {
    if (!keyword.trim()) return { found: false, atStart: false };
    const cleanTitle = title.toLowerCase();
    const cleanKeyword = keyword.toLowerCase().trim();
    const found = cleanTitle.includes(cleanKeyword);
    const atStart = cleanTitle.indexOf(cleanKeyword) >= 0 && cleanTitle.indexOf(cleanKeyword) <= 15;
    return { found, atStart };
  }, [title, keyword]);

  // Title Checks for numbers/power words
  const titleHasNumber = /\d+/.test(title);
  const titleHasPowerWord = useMemo(() => {
    const cleanTitle = title.toLowerCase();
    return POWER_WORDS.some(word => cleanTitle.includes(word));
  }, [title]);

  // Score Calculation
  const scores = useMemo(() => {
    let titleScore = 0;
    if (titleStatus === 'perfect') titleScore = 40;
    else if (titleCharCount > 0 && titleCharCount <= 70) titleScore = 25;
    else if (titleCharCount > 0) titleScore = 15;

    let descScore = 0;
    if (descStatus === 'perfect') descScore = 45;
    else if (descCharCount > 0 && descCharCount <= 200) descScore = 30;
    else if (descCharCount > 0) descScore = 15;

    let bonusScore = 0;
    if (keyword.trim()) {
      if (keywordChecks.found) bonusScore += 5;
      if (keywordChecks.atStart) bonusScore += 5;
    } else {
      // Default bonus buffer if no keyword entered
      bonusScore += 5;
    }
    if (titleHasNumber) bonusScore += 3;
    if (titleHasPowerWord) bonusScore += 2;

    const overall = titleScore + descScore + bonusScore;
    return {
      title: Math.round((titleScore / 40) * 100),
      description: Math.round((descScore / 45) * 100),
      overall: Math.min(overall, 100)
    };
  }, [titleStatus, titleCharCount, descStatus, descCharCount, keyword, keywordChecks, titleHasNumber, titleHasPowerWord]);

  // Suggestions List
  const suggestions = useMemo(() => {
    const list = [];

    // Title Length
    if (titleStatus === 'perfect') {
      list.push({ type: 'success', text: t('seoTitleChecker.tipsList.titleLengthPerfect') });
    } else if (titleStatus === 'tooLong') {
      list.push({ type: 'error', text: t('seoTitleChecker.tipsList.titleTooLong') });
    } else {
      list.push({ type: 'warning', text: t('seoTitleChecker.tipsList.titleTooShort') });
    }

    // Description Length
    if (descStatus === 'perfect') {
      list.push({ type: 'success', text: t('seoTitleChecker.tipsList.descLengthPerfect') });
    } else if (descStatus === 'tooLong') {
      list.push({ type: 'error', text: t('seoTitleChecker.tipsList.descTooLong') });
    } else {
      list.push({ type: 'warning', text: t('seoTitleChecker.tipsList.descTooShort') });
    }

    // Keyword
    if (keyword.trim()) {
      if (keywordChecks.found) {
        list.push({ type: 'success', text: t('seoTitleChecker.tipsList.keywordInTitle') });
      } else {
        list.push({ type: 'error', text: t('seoTitleChecker.tipsList.keywordMissingTitle') });
      }
    }

    // CTR Enhancers
    if (titleHasNumber) {
      list.push({ type: 'success', text: t('seoTitleChecker.tipsList.hasNumber') });
    }
    if (titleHasPowerWord) {
      list.push({ type: 'success', text: t('seoTitleChecker.tipsList.hasPowerWord') });
    } else {
      list.push({ type: 'warning', text: t('seoTitleChecker.tipsList.missingPowerWord') });
    }

    return list;
  }, [titleStatus, descStatus, keyword, keywordChecks, titleHasNumber, titleHasPowerWord, t]);

  // Helper to truncate text with ellipsis visually in SERP preview
  const truncatedTitle = useMemo(() => {
    if (titlePixelWidth <= 580) return title;
    // Simple truncation approximation
    let currentWidth = 0;
    let cutIdx = 0;
    const scaleFactor = /[\u0600-\u06FF]/.test(title) ? 9.2 : 8.4;
    for (let i = 0; i < title.length; i++) {
      const char = title[i];
      if (/[A-Z]/.test(char)) currentWidth += 10.5;
      else if (/[iI' l]/.test(char)) currentWidth += 3.5;
      else if (/[wW]/.test(char)) currentWidth += 12.5;
      else currentWidth += scaleFactor;

      if (currentWidth > 550) {
        cutIdx = i;
        break;
      }
    }
    return title.slice(0, cutIdx) + '...';
  }, [title, titlePixelWidth]);

  const truncatedDesc = useMemo(() => {
    if (descPixelWidth <= 990) return description;
    let currentWidth = 0;
    let cutIdx = 0;
    const scaleFactor = /[\u0600-\u06FF]/.test(description) ? 7.6 : 6.8;
    for (let i = 0; i < description.length; i++) {
      const char = description[i];
      if (/[A-Z]/.test(char)) currentWidth += 8.5;
      else if (/[iI' l]/.test(char)) currentWidth += 2.8;
      else if (/[wW]/.test(char)) currentWidth += 10.0;
      else currentWidth += scaleFactor;

      if (currentWidth > 960) {
        cutIdx = i;
        break;
      }
    }
    return description.slice(0, cutIdx) + '...';
  }, [description, descPixelWidth]);

  return (
    <div className="grow w-full overflow-x-hidden bg-gray-50/50 pb-20">
      {/* Hero Section */}
      <section className="bg-linear-to-b from-primary/5 to-white pt-24 pb-12 md:pt-40 md:pb-24 border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Breadcrumb customItems={[
              { name: t('common.home'), path: `/${language}` },
              { name: t('tools.title'), path: `/${language}/tools` },
              { name: t('seoTitleChecker.title'), path: `/${language}/tools/seo-title-analyzer` }
            ]} />
            <h1 className="text-3xl md:text-5xl font-bold mb-6 bg-linear-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent leading-normal">
              {t('seoTitleChecker.title')}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              {t('seoTitleChecker.description')}
            </p>
          </div>
        </div>
      </section>

      {/* Main Workspace */}
      <section className="container mx-auto px-4 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
          {/* Inputs Panel */}
          <div className="lg:col-span-7 space-y-6">
            <Card className="border-gray-100 shadow-sm">
              <CardContent className="p-6 space-y-6">
                {/* Keyword Input */}
                <div className="space-y-2">
                  <label htmlFor="keyword-input" className="block text-sm font-semibold text-gray-700">
                    {t('seoTitleChecker.labels.keywordInput')}
                  </label>
                  <Input
                    id="keyword-input"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder={t('seoTitleChecker.placeholders.keyword')}
                    className="h-11"
                  />
                </div>

                {/* Title Input */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label htmlFor="title-input" className="block text-sm font-semibold text-gray-700">
                      {t('seoTitleChecker.labels.titleInput')}
                    </label>
                    <span className={cn(
                      "text-xs font-mono px-2 py-0.5 rounded-sm",
                      titleStatus === 'perfect' ? "bg-green-50 text-green-600" :
                      titleStatus === 'tooLong' ? "bg-red-50 text-red-600" : "bg-yellow-50 text-yellow-600"
                    )}>
                      {titleCharCount} / 60 {t('seoTitleChecker.metrics.charCount')} ({titlePixelWidth}px)
                    </span>
                  </div>
                  <Input
                    id="title-input"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder={t('seoTitleChecker.placeholders.title')}
                    className="h-11"
                  />
                </div>

                {/* Description Input */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label htmlFor="desc-input" className="block text-sm font-semibold text-gray-700">
                      {t('seoTitleChecker.labels.descriptionInput')}
                    </label>
                    <span className={cn(
                      "text-xs font-mono px-2 py-0.5 rounded-sm",
                      descStatus === 'perfect' ? "bg-green-50 text-green-600" :
                      descStatus === 'tooLong' ? "bg-red-50 text-red-600" : "bg-yellow-50 text-yellow-600"
                    )}>
                      {descCharCount} / 160 {t('seoTitleChecker.metrics.charCount')} ({descPixelWidth}px)
                    </span>
                  </div>
                  <Textarea
                    id="desc-input"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder={t('seoTitleChecker.placeholders.description')}
                    rows={4}
                    className="resize-none"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <Button variant="outline" onClick={handleReset} className="gap-2">
                    <RefreshCw className="w-4 h-4" />
                    {t('common.clear')}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Google SERP Preview Box */}
            <Card className="border-gray-100 shadow-sm overflow-hidden">
              <div className="bg-gray-50 border-b border-gray-100 px-6 py-4 flex justify-between items-center">
                <span className="font-semibold text-gray-800 flex items-center gap-2">
                  <Eye className="w-5 h-5 text-gray-600" />
                  {t('seoTitleChecker.labels.serpPreview')}
                </span>
                <div className="flex bg-white rounded-md p-0.5 border border-gray-200">
                  <button
                    onClick={() => setActiveDevice('desktop')}
                    className={cn(
                      "px-3 py-1 text-xs rounded-sm transition-colors",
                      activeDevice === 'desktop' ? "bg-primary text-white font-medium" : "text-gray-600 hover:text-gray-900"
                    )}
                  >
                    {t('seoTitleChecker.labels.desktop')}
                  </button>
                  <button
                    onClick={() => setActiveDevice('mobile')}
                    className={cn(
                      "px-3 py-1 text-xs rounded-sm transition-colors",
                      activeDevice === 'mobile' ? "bg-primary text-white font-medium" : "text-gray-600 hover:text-gray-900"
                    )}
                  >
                    {t('seoTitleChecker.labels.mobile')}
                  </button>
                </div>
              </div>
              <CardContent className="p-6 bg-white">
                <div className={cn(
                  "border border-gray-200 rounded-lg p-5 mx-auto bg-white transition-all shadow-xs",
                  activeDevice === 'mobile' ? "max-w-[375px]" : "max-w-full"
                )}>
                  {/* Google Snippet elements */}
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 shrink-0">
                      <Globe className="w-3.5 h-3.5" />
                    </div>
                    <div className="overflow-hidden">
                      <div className="text-xs text-gray-600 flex items-center gap-1 font-mono truncate">
                        <span>webabc.ir</span>
                        <span>›</span>
                        <span className="text-gray-400 truncate">{language}/tools/seo-title-analyzer</span>
                      </div>
                    </div>
                  </div>

                  {/* Title Link */}
                  <h3 className={cn(
                    "text-xl hover:underline font-medium mb-1 break-words cursor-pointer",
                    activeDevice === 'mobile' ? "text-[#15c]" : "text-[#1a0dab]"
                  )}>
                    {truncatedTitle || 'Google Search Snippet Preview'}
                  </h3>

                  {/* Description Snippet */}
                  <p className="text-sm text-[#4d5156] leading-relaxed break-words font-sans">
                    {truncatedDesc || 'Write your page title and meta description tag inside the fields above to see how they will look when rendered inside Google Search results.'}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Scores & Tips Panel */}
          <div className="lg:col-span-5 space-y-6">
            {/* Overall Score Card */}
            <Card className="border-gray-100 shadow-sm text-center">
              <CardContent className="p-8">
                <h3 className="text-lg font-bold text-gray-700 mb-6">
                  {t('seoTitleChecker.labels.overallScore')}
                </h3>
                <div className="relative inline-flex items-center justify-center mb-6">
                  {/* Circle SVG Progress Bar */}
                  <svg className="w-36 h-36 transform -rotate-90">
                    <circle
                      cx="72"
                      cy="72"
                      r="64"
                      className="stroke-gray-100"
                      strokeWidth="10"
                      fill="transparent"
                    />
                    <circle
                      cx="72"
                      cy="72"
                      r="64"
                      className={cn(
                        "transition-all duration-500 ease-out",
                        scores.overall >= 80 ? "stroke-green-500" :
                        scores.overall >= 50 ? "stroke-yellow-500" : "stroke-red-500"
                      )}
                      strokeWidth="10"
                      strokeDasharray={2 * Math.PI * 64}
                      strokeDashoffset={2 * Math.PI * 64 * (1 - scores.overall / 100)}
                      strokeLinecap="round"
                      fill="transparent"
                    />
                  </svg>
                  <span className="absolute text-3xl font-bold font-mono">
                    {scores.overall}/100
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-6">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">{t('seoTitleChecker.labels.titleScore')}</div>
                    <div className={cn(
                      "text-lg font-bold font-mono",
                      scores.title >= 80 ? "text-green-500" :
                      scores.title >= 50 ? "text-yellow-500" : "text-red-500"
                    )}>{scores.title}%</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">{t('seoTitleChecker.labels.descScore')}</div>
                    <div className={cn(
                      "text-lg font-bold font-mono",
                      scores.description >= 80 ? "text-green-500" :
                      scores.description >= 50 ? "text-yellow-500" : "text-red-500"
                    )}>{scores.description}%</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recommendations & Tips */}
            <Card className="border-gray-100 shadow-sm">
              <div className="bg-gray-50 border-b border-gray-100 px-6 py-4">
                <span className="font-semibold text-gray-800">
                  {t('seoTitleChecker.labels.tips')}
                </span>
              </div>
              <CardContent className="p-6">
                <ul className="space-y-4">
                  {suggestions.map((suggestion, idx) => (
                    <li key={idx} className="flex gap-3 items-start text-sm">
                      {suggestion.type === 'success' ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                      ) : (
                        <AlertCircle className={cn(
                          "w-5 h-5 shrink-0 mt-0.5",
                          suggestion.type === 'error' ? "text-red-500" : "text-yellow-500"
                        )} />
                      )}
                      <span className={cn(
                        suggestion.type === 'success' ? "text-gray-700" :
                        suggestion.type === 'error' ? "text-red-700 font-medium" : "text-yellow-700"
                      )}>
                        {suggestion.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
