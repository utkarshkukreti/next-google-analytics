# next-google-analytics

> Add Google Analytics to your Next.js App in 60 seconds.

## Usage

Set environment variable `NEXT_PUBLIC_GA_MEASUREMENT_ID` to your Google Analytics tracking id.

```
yarn add next-google-analytics
```

### pages/\_app.tsx:

```diff
+ import * as GoogleAnalytics from 'next-google-analytics';

  const App = (...) => {
+   GoogleAnalytics.useAppInit();
    ...
  };

+ export { reportWebVitals } from 'next-google-analytics';
```

### pages/\_document.tsx

```diff
+ import * as GoogleAnalytics from 'next-google-analytics';

  <Html lang="en">
    <Head>
+     <GoogleAnalytics.Head />
      ...
    </Head>
    ...
  </Html>
```
