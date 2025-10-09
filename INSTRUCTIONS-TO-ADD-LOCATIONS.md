# How to Add More Service Area Locations

This guide explains how to easily add more cities/locations to your Service Areas page.

## Step-by-Step Instructions

### 1. Open the Translation Files

You need to update the translation files for each language you want to add locations to:

- **English**: `src/i18n/en/service-areas.json`
- **Arabic**: `src/i18n/ar/service-areas.json`
- **Persian/Farsi**: `src/i18n/fa/service-areas.json`

### 2. Add Your New Location

In each file, find the `"locations"` array. Add a new location object following this structure:

```json
{
  "name": "City Name",
  "country": "Country Name",
  "description": "Brief description of your services in this city (2-3 sentences)",
  "services": [
    "Service 1",
    "Service 2",
    "Service 3",
    "Service 4",
    "Service 5"
  ],
  "image": "/images/locations/city-name.jpg"
}
```

### 3. Example: Adding Abu Dhabi (English)

Open `src/i18n/en/service-areas.json` and add this to the locations array:

```json
{
  "name": "Abu Dhabi",
  "country": "UAE",
  "description": "Offering world-class web development and digital marketing services to businesses in Abu Dhabi. We help companies in the UAE capital establish a powerful online presence and achieve their digital goals.",
  "services": [
    "Web Design & Development",
    "SEO Optimization",
    "Mobile Applications",
    "E-commerce Solutions",
    "Digital Strategy"
  ],
  "image": "/images/locations/abu-dhabi.jpg"
}
```

### 4. Example: Adding Isfahan (Persian)

Open `src/i18n/fa/service-areas.json` and add:

```json
{
  "name": "اصفهان",
  "country": "ایران",
  "description": "ارائه خدمات حرفه‌ای طراحی وب و دیجیتال مارکتینگ به کسب‌وکارها در اصفهان. ما به شرکت‌های اصفهانی کمک می‌کنیم تا حضور آنلاین قدرتمند ایجاد کرده و به اهداف دیجیتال خود دست یابند.",
  "services": [
    "طراحی و توسعه وب",
    "بهینه‌سازی سئو",
    "توسعه اپلیکیشن موبایل",
    "راهکارهای تجارت الکترونیک",
    "استراتژی دیجیتال"
  ],
  "image": "/images/locations/isfahan.jpg"
}
```

### 5. Example: Adding Riyadh (Arabic)

Open `src/i18n/ar/service-areas.json` and add:

```json
{
  "name": "الرياض",
  "country": "المملكة العربية السعودية",
  "description": "نقدم خدمات تطوير الويب والتسويق الرقمي عالمية المستوى للشركات في الرياض. نساعد الشركات في عاصمة المملكة على إنشاء حضور قوي على الإنترنت وتحقيق أهدافها الرقمية.",
  "services": [
    "تصميم وتطوير المواقع",
    "تحسين محركات البحث",
    "تطبيقات الموبايل",
    "حلول التجارة الإلكترونية",
    "الاستراتيجية الرقمية"
  ],
  "image": "/images/locations/riyadh.jpg"
}
```

## Important Notes

### Adding Images

1. Place location images in the `public/images/locations/` folder
2. Use descriptive filenames like `dubai.jpg`, `tehran.jpg`, etc.
3. Recommended image size: 1200x800 pixels
4. If image is missing, a placeholder will be shown automatically

### Language-Specific Tips

**English:**
- Use formal but friendly tone
- Focus on business benefits
- Emphasize international standards

**Arabic:**
- Maintain formal tone
- Use proper Arabic characters
- Read right-to-left

**Persian/Farsi:**
- Use Persian characters (not Arabic)
- Maintain respectful tone
- Examples: تهران (Tehran), اصفهان (Isfahan), شیراز (Shiraz)

### Service List Suggestions

Common services to include:
- Web Design & Development / طراحی و توسعه وب / تصميم وتطوير المواقع
- SEO Services / خدمات سئو / خدمات تحسين محركات البحث
- E-commerce Solutions / راهکارهای تجارت الکترونیک / حلول التجارة الإلكترونية
- Digital Marketing / دیجیتال مارکتینگ / التسويق الرقمي
- Mobile App Development / توسعه اپلیکیشن موبایل / تطوير تطبيقات الموبايل

## Quick Reference: Current Locations

### English (en)
- Muscat, Oman
- Dubai, UAE

### Arabic (ar)
- مسقط، عمان (Muscat, Oman)
- دبي، الإمارات (Dubai, UAE)

### Persian (fa)
- تهران، ایران (Tehran, Iran)
- قزوین، ایران (Qazvin, Iran)

## Testing Your Changes

After adding new locations:
1. Save all translation files
2. Refresh your browser
3. Navigate to the Service Areas page
4. Switch between languages to verify all translations appear correctly
5. Check that images load properly

## Need Help?

If you need assistance:
- Make sure all JSON syntax is correct (commas, brackets, quotes)
- Verify image paths match your actual image files
- Check that all required fields are present (name, country, description, services, image)
