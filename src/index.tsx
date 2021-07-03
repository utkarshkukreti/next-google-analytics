import { NextWebVitalsMetric } from 'next/app'
import { useRouter } from 'next/router'
import * as React from 'react'
import { useEffect } from 'react'

const TRACKING_ID = process.env['NEXT_PUBLIC_GA_TRACKING_ID']

export const Head = () => {
  if (!TRACKING_ID) {
    return <script dangerouslySetInnerHTML={{ __html: `function gtag(){}` }} />
  }

  return (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${TRACKING_ID}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `\
window.dataLayer=window.dataLayer||[];\
function gtag(){dataLayer.push(arguments);}\
gtag('js',new Date());\
gtag('config','${TRACKING_ID}');`,
        }}
      />
    </>
  )
}

export const pageview = (url: string) => {
  if (!TRACKING_ID) return

  setTimeout(() => {
    window.gtag('config', TRACKING_ID, {
      page_path: url,
      page_title: document.title,
    })
  }, 0)
}

export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string
  category?: string
  label?: string
  value?: string
}) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  })
}

export const useAppInit = () => {
  const router = useRouter()

  useEffect(() => {
    router.events.on('routeChangeComplete', pageview)
    return () => router.events.off('routeChangeComplete', pageview)
  }, [])
}

export const reportWebVitals = ({
  id,
  name,
  label,
  value,
}: NextWebVitalsMetric) => {
  window.gtag('event', name, {
    event_category:
      label === 'web-vital' ? 'Web Vitals' : 'Next.js Custom Metric',
    value: Math.round(name === 'CLS' ? value * 1000 : value),
    event_label: id,
    non_interaction: true,
  })
}
