import { fileURLToPath } from "node:url"

export default defineNuxtConfig({
  app: {
    head: {
      title: "idantity.me",
      titleTemplate: "%s | idantity.me",
      meta: [
        {
          name: "description",
          content: ""
        },
        {
          name: "author",
          content: "Daniel Marchi"
        },
        {
          name: "creator",
          content: "Daniel Marchi"
        }
      ],
      link: [
        {
          rel: "icon",
          type: "image/svg+xml",
          href: "/favicon.svg"
        }
      ]
    },
    pageTransition: {
      name: "fade",
      mode: "out-in"
    },
    layoutTransition: {
      name: "slide",
      mode: "out-in"
    }
  },
  modules: [
    "rimelight-components",
    "@nuxt/test-utils/module",
    "@nuxt/ui",
    "@nuxtjs/sitemap",
    "@nuxtjs/robots",
    "@nuxtjs/device",
    "@nuxtjs/i18n",
    "@vueuse/nuxt",
    "nuxt-og-image"
  ],
  compatibilityDate: "2025-01-01",
  devtools: { enabled: true },
  devServer: {
    host: "127.0.0.1",
    port: 3000
  },
  alias: {
    "#types": fileURLToPath(new URL("./app/types", import.meta.url))
  },
  nitro: {
    preset: "cloudflare_module",
    cloudflare: {
      deployConfig: true,
      nodeCompat: true,
      wrangler: {
        d1_databases: [
          {
            binding: "DB",
            database_name: "idantity-dot-me",
            database_id: "68403e75-f2fa-4d76-809c-fb3ec1114913"
          }
        ]
      }
    }
    //prerender: {
    //  crawlLinks: true
    //}
    //routeRules: {
    //  "/": { prerender: true },
    //  "/sitemap.xml": { prerender: true },
    //  "/robots.txt": { prerender: true },
    //  "/about": { prerender: true },
    //  "/branding": { prerender: true },
    //  "/documents": { isr: 3600 },
    //  "/blog": { isr: 3600 },
    //  "/projects": { isr: 3600 },
    //  "/internal/**": { ssr: false }
    //}
  },
  site: {
    url: "https://idantity.me",
    name: "idantity.me",
    // Should be changed to true upon release to the public.
    indexable: false
  },
  robots: {
    blockAiBots: false,
    blockNonSeoBots: false,
    disallow: ["/internal"]
  },
  typescript: {
    typeCheck: true
  },
  css: ["~/assets/css/main.css"],
  components: [
    {
      path: "~/components",
      pathPrefix: false,
      prefix: "ID"
    }
  ],
  fonts: {
    defaults: {
      weights: [
        // Thin
        100,
        // ExtraLight
        200,
        // Light
        300,
        // Regular
        400,
        // Medium
        500,
        // SemiBold
        600,
        // Bold
        700,
        // Extra Bold
        800
      ],
      styles: ["normal", "italic"]
    },
    families: [
      {
        name: "JetBrains Mono",
        global: true,
        provider: "local"
      }
    ]
  },
  icon: {
    provider: "server",
    class: "icon",
    size: "24px",
    mode: "svg",
    customCollections: [
      {
        prefix: "first-party",
        dir: "./app/assets/icons/first-party",
        normalizeIconName: false
      },
      {
        prefix: "third-party",
        dir: "./app/assets/icons/third-party",
        normalizeIconName: false
      }
    ]
  },
  image: {
    format: ["webp"],
    provider: "cloudflare",
    cloudflare: {
      baseURL: "https://cdn.idantity.me"
    }
  },
  i18n: {
    strategy: "prefix_except_default",
    defaultLocale: "en",
    locales: [
      //{
      //  code: "ar",
      //  name: "العربية",
      //  file: "ar.json"
      //},
      {
        code: "en",
        name: "English",
        file: "en.json"
      }
      //{
      //  code: "es",
      //  name: "Español",
      //  file: "es.json"
      //},
      //{
      //  code: "fr",
      //  name: "Français",
      //  file: "fr.json"
      //},
      //{
      //  code: "ja",
      //  name: "日本語",
      //  file: "ja.json"
      //},
      //{
      //  code: "ko",
      //  name: "한국어",
      //  file: "ko.json"
      //},
      //{
      //  code: "pt",
      //  name: "Português",
      //  file: "pt.json"
      //}
      //{
      //  code: "ro",
      //  name: "Română",
      //  file: "ro.json"
      //},
      //{
      //  code: "zh_cn",
      //  name: "简体中文",
      //  file: "zh_cn.json"
      //}
    ]
  },
  ui: {
    prefix: "U",
    theme: {
      colors: [
        "neutral",
        "primary",
        "secondary",
        "info",
        "success",
        "warning",
        "error",
        "commentary",
        "ideation",
        "source"
      ]
    }
  },
  future: {
    compatibilityVersion: 5
  },
  experimental: {
    viteEnvironmentApi: true,
    typescriptPlugin: true
  }
})
