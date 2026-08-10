import { defineConfig } from "vite";
import { resolve } from "node:path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        home: resolve(import.meta.dirname, "index.html"),
        about: resolve(import.meta.dirname, "about.html"),
        services: resolve(import.meta.dirname, "services.html"),
        process: resolve(import.meta.dirname, "how-it-works.html"),
        work: resolve(import.meta.dirname, "our-work.html"),
        counselOCaseStudy: resolve(import.meta.dirname, "work/counselo.html"),
        contact: resolve(import.meta.dirname, "contact.html"),
        terms: resolve(import.meta.dirname, "terms.html"),
        privacy: resolve(import.meta.dirname, "privacy.html"),
        notFound: resolve(import.meta.dirname, "404.html"),
      },
    },
  },
});
