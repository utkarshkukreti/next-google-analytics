import { useRouter } from 'next/router';
import * as React from 'react';
import { useEffect } from 'react';

const TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID;

export const Head = () => {
  if (!TRACKING_ID) return null;

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
  );
};

export const pageview = (url: string) => {
  if (!TRACKING_ID) return;

  window.gtag('config', TRACKING_ID, {
    page_path: url,
    page_title: document.title,
  });
};

export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category?: string;
  label?: string;
  value?: string;
}) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

export const useAppInit = () => {
  const router = useRouter();

  useEffect(() => {
    router.events.on('routeChangeComplete', pageview);
    return () => router.events.off('routeChangeComplete', pageview);
  });
};
