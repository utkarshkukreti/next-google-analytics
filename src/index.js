"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportWebVitals = exports.useAppInit = exports.event = exports.pageview = exports.Head = void 0;
const router_1 = require("next/router");
const React = __importStar(require("react"));
const react_1 = require("react");
const MEASUREMENT_ID = process.env['NEXT_PUBLIC_GA_MEASUREMENT_ID'] ||
    // for compatability with old name
    process.env['NEXT_PUBLIC_GA_TRACKING_ID'];
const Head = () => {
    if (!MEASUREMENT_ID) {
        return React.createElement("script", { dangerouslySetInnerHTML: { __html: `function gtag(){}` } });
    }
    return (React.createElement(React.Fragment, null,
        React.createElement("script", { async: true, src: `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}` }),
        React.createElement("script", { dangerouslySetInnerHTML: {
                __html: `\
window.dataLayer=window.dataLayer||[];\
function gtag(){dataLayer.push(arguments);}\
gtag('js',new Date());\
gtag('config','${MEASUREMENT_ID}');`,
            } })));
};
exports.Head = Head;
const pageview = (url) => {
    if (!MEASUREMENT_ID)
        return;
    setTimeout(() => {
        window.gtag('config', MEASUREMENT_ID, {
            page_path: url,
            page_title: document.title,
        });
    }, 0);
};
exports.pageview = pageview;
const event = ({ action, category, label, value, }) => {
    window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
    });
};
exports.event = event;
const useAppInit = () => {
    const router = (0, router_1.useRouter)();
    (0, react_1.useEffect)(() => {
        router.events.on('routeChangeComplete', exports.pageview);
        return () => router.events.off('routeChangeComplete', exports.pageview);
    }, []);
};
exports.useAppInit = useAppInit;
const reportWebVitals = ({ id, name, label, value, }) => {
    window.gtag('event', name, {
        event_category: label === 'web-vital' ? 'Web Vitals' : 'Next.js Custom Metric',
        value: Math.round(name === 'CLS' ? value * 1000 : value),
        event_label: id,
        non_interaction: true,
    });
};
exports.reportWebVitals = reportWebVitals;
