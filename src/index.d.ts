/// <reference types="react" />
import { NextWebVitalsMetric } from 'next/app';
export declare const Head: () => JSX.Element;
export declare const pageview: (url: string) => void;
export declare const event: ({ action, category, label, value, }: {
    action: string;
    category?: string | undefined;
    label?: string | undefined;
    value?: string | undefined;
}) => void;
export declare const useAppInit: () => void;
export declare const reportWebVitals: ({ id, name, label, value, }: NextWebVitalsMetric) => void;
