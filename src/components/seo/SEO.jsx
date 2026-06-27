import { Helmet } from 'react-helmet-async'

const SITE_URL = 'https://qeyafa.com'
const SITE_NAME = 'Qeyafa'
const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`

export function SEO({
  title,
  description,
  path = '',
  image = DEFAULT_IMAGE,
  type = 'website',
  jsonLd,
  children
}) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} - AI-Powered Custom Tailoring`
  const canonicalUrl = `${SITE_URL}${path}`

  return (
    <Helmet>
      {/* Basic */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      <meta name="theme-color" content="#0F4D3F" />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:locale:alternate" content="ar_SA" />

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
