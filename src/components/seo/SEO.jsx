import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'

const SITE_URL = 'https://qeyafa.com'
const SITE_NAME = 'Qeyafa'
const SITE_NAME_AR = 'قيافة'
const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`

export function SEO({
  titleKey,
  descriptionKey,
  title: titleOverride,
  description: descOverride,
  path = '',
  image = DEFAULT_IMAGE,
  type = 'website',
  jsonLd,
  children
}) {
  const { t, i18n } = useTranslation()
  const isArabic = i18n.language === 'ar'
  const siteName = isArabic ? SITE_NAME_AR : SITE_NAME

  const title = titleOverride || (titleKey ? t(titleKey) : '')
  const description = descOverride || (descriptionKey ? t(descriptionKey) : '')

  const fullTitle = title ? `${title} | ${siteName}` : `${siteName} - ${isArabic ? 'تقنية الخياطة المخصصة بالذكاء الاصطناعي' : 'AI-Powered Custom Tailoring'}`
  const canonicalUrl = `${SITE_URL}${path}`

  return (
    <Helmet>
      {/* Basic */}
      <html lang={isArabic ? 'ar' : 'en'} dir={isArabic ? 'rtl' : 'ltr'} />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      <meta name="theme-color" content="#0F4D3F" />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content={isArabic ? 'ar_SA' : 'en_US'} />
      <meta property="og:locale:alternate" content={isArabic ? 'en_US' : 'ar_SA'} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* JSON-LD Structured Data */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}

      {children}
    </Helmet>
  )
}
