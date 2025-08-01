import "./bootstrap";
import "../css/app.css";
// import { Ziggy } from './ziggy.js';
// globalThis.Ziggy = Ziggy;
import { createInertiaApp } from "@inertiajs/react";
import { createRoot } from "react-dom/client";
import Layout from "@/Layouts/Layout";

createInertiaApp({
    title: (title) =>
        title ? `${title} - Assesment Web` : "Assesment Web",
    resolve: (name) => {
        const pages = import.meta.glob("./Pages/**/*.jsx", { eager: true });
        let page = pages[`./Pages/${name}.jsx`];
        page.default.layout =
            page.default.layout || ((page) => <Layout children={page} />);
        return page;
    },
    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />);
    },
    progress: {
  color: "#38bdf8",    // misal biru (#38bdf8 = tailwind sky-400)
  showSpinner: false,  // no spinner!
}

});
