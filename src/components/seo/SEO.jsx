import { Helmet } from 'react-helmet-async'

export function SEO({ title, description, children }) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="theme-color" content="#0F4D3F" />
      {children}
    </Helmet>
  )
}

