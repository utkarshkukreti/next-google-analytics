export const Head = () => {
  return (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_TRACKING_ID}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `\
window.dataLayer=window.dataLayer||[];\
function gtag(){dataLayer.push(arguments);}\
gtag('js',new Date());\
gtag('config','${process.env.NEXT_PUBLIC_GA_TRACKING_ID}');`,
        }}
      />
    </>
  );
};

export const pageview = (url: string) => {
  window.gtag('config', process.env.NEXT_PUBLIC_GA_TRACKING_ID!, {
    page_path: url,
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
