import { NextWebVitalsMetric } from 'next/app';
import * as React from 'react';
export declare const Head: () => React.JSX.Element;
export declare const pageview: (url: string) => void;
export declare const event: ({ action, category, label, value, }: {
    action: string;
    category?: string;
    label?: string;
    value?: string;
}) => void;
export declare const useAppInit: () => void;
export declare const reportWebVitals: ({ id, name, label, value, }: NextWebVitalsMetric) => void;
