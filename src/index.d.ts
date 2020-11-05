/// <reference types="react" />
export declare const Head: () => JSX.Element | null;
export declare const pageview: (url: string) => void;
export declare const event: ({ action, category, label, value, }: {
    action: string;
    category?: string | undefined;
    label?: string | undefined;
    value?: string | undefined;
}) => void;
export declare const useAppInit: () => void;
