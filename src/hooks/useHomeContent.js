import { useEffect, useState } from 'react'
import { sanityClient, isSanityConfigured } from '@/sanityClient'

const query = /* groq */ `{
  "partners": *[_type == "partner"]{
    name,
    nameLocalized,
    "logoUrl": logo.asset->url,
    websiteUrl
  } | order(_createdAt asc),
  "promoSlides": *[_type == "promoSlide" && isActive == true]{
    title,
    subtitle,
    "imageUrl": mediaImage.asset->url,
    videoUrl,
    ctaLink
  } | order(_createdAt asc),
  "journeySteps": *[_type == "journeyStep"]{
    stepNumber,
    title,
    description
  } | order(stepNumber asc)
}`

export function useHomeContent(locale = 'en') {
  const [data, setData] = useState({ partners: [], promoSlides: [], journeySteps: [] })
  const [isLoading, setIsLoading] = useState(isSanityConfigured)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!isSanityConfigured || !sanityClient) {
      setIsLoading(false)
      return
    }

    let isMounted = true
    sanityClient
      .fetch(query)
      .then(result => {
        if (!isMounted) return
        const localizedPartners = result.partners.map(item => ({
          ...item,
          displayName: item.nameLocalized?.[locale] || item.name
        }))
        const localizedSlides = result.promoSlides.map(item => ({
          ...item,
          title: item.title?.[locale] || item.title?.en,
          subtitle: item.subtitle?.[locale] || item.subtitle?.en
        }))
        const localizedSteps = result.journeySteps.map(item => ({
          ...item,
          title: item.title?.[locale] || item.title?.en,
          description: item.description?.[locale] || item.description?.en
        }))
        setData({
          partners: localizedPartners,
          promoSlides: localizedSlides,
          journeySteps: localizedSteps
        })
        setIsLoading(false)
      })
      .catch(err => {
        if (!isMounted) return
        setError(err)
        setIsLoading(false)
      })
    return () => {
      isMounted = false
    }
  }, [locale])

  return { ...data, isLoading, error }
}
