"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
var router_1 = require("next/router");
var React = __importStar(require("react"));
var react_1 = require("react");
var TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID;
var Head = function () {
    if (!TRACKING_ID) {
        return React.createElement("script", { dangerouslySetInnerHTML: { __html: "function gtag(){}" } });
    }
    return (React.createElement(React.Fragment, null,
        React.createElement("script", { async: true, src: "https://www.googletagmanager.com/gtag/js?id=" + TRACKING_ID }),
        React.createElement("script", { dangerouslySetInnerHTML: {
                __html: "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','" + TRACKING_ID + "');",
            } })));
};
exports.Head = Head;
var pageview = function (url) {
    if (!TRACKING_ID)
        return;
    setTimeout(function () {
        window.gtag('config', TRACKING_ID, {
            page_path: url,
            page_title: document.title,
        });
    }, 0);
};
exports.pageview = pageview;
var event = function (_a) {
    var action = _a.action, category = _a.category, label = _a.label, value = _a.value;
    window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
    });
};
exports.event = event;
var useAppInit = function () {
    var router = router_1.useRouter();
    react_1.useEffect(function () {
        router.events.on('routeChangeComplete', exports.pageview);
        return function () { return router.events.off('routeChangeComplete', exports.pageview); };
    }, []);
};
exports.useAppInit = useAppInit;
var reportWebVitals = function (_a) {
    var id = _a.id, name = _a.name, label = _a.label, value = _a.value;
    window.gtag('event', name, {
        event_category: label === 'web-vital' ? 'Web Vitals' : 'Next.js Custom Metric',
        value: Math.round(name === 'CLS' ? value * 1000 : value),
        event_label: id,
        non_interaction: true,
    });
};
exports.reportWebVitals = reportWebVitals;
