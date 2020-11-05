"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAppInit = exports.event = exports.pageview = exports.Head = void 0;
var router_1 = require("next/router");
var react_1 = require("react");
var TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID;
exports.Head = function () {
    if (!TRACKING_ID)
        return;
    return (<>
      <script async src={"https://www.googletagmanager.com/gtag/js?id=" + TRACKING_ID}/>
      <script dangerouslySetInnerHTML={{
        __html: "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','" + TRACKING_ID + "');",
    }}/>
    </>);
};
exports.pageview = function (url) {
    if (!TRACKING_ID)
        return;
    window.gtag('config', TRACKING_ID, {
        page_path: url,
        page_title: document.title,
    });
};
exports.event = function (_a) {
    var action = _a.action, category = _a.category, label = _a.label, value = _a.value;
    window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
    });
};
exports.useAppInit = function () {
    var router = router_1.useRouter();
    react_1.useEffect(function () {
        router.events.on('routeChangeComplete', exports.pageview);
        return function () { return router.events.off('routeChangeComplete', exports.pageview); };
    });
};
