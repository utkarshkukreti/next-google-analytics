import { useRouter } from 'next/router';
import * as React from 'react';
import { useEffect } from 'react';
const TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID;
export const Head = () => {
    if (!TRACKING_ID)
        return null;
    return (React.createElement(React.Fragment, null,
        React.createElement("script", { async: true, src: `https://www.googletagmanager.com/gtag/js?id=${TRACKING_ID}` }),
        React.createElement("script", { dangerouslySetInnerHTML: {
                __html: `\
window.dataLayer=window.dataLayer||[];\
function gtag(){dataLayer.push(arguments);}\
gtag('js',new Date());\
gtag('config','${TRACKING_ID}');`,
            } })));
};
export const pageview = (url) => {
    if (!TRACKING_ID)
        return;
    window.gtag('config', TRACKING_ID, {
        page_path: url,
        page_title: document.title,
    });
};
export const event = ({ action, category, label, value, }) => {
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
