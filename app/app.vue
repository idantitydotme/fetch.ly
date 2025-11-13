<script setup lang="ts">
import * as locales from "@nuxt/ui/locale"

const { locale } = useI18n()

const lang = computed(() => locales[locale.value].code)
const dir = computed(() => locales[locale.value].dir)

const colorMode = useColorMode()

const color = computed(() => {
  return colorMode.value === "dark" ? "#020618" : "white"
})

useHead({
  meta: [
    {
      charset: "utf-8"
    },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1"
    },
    {
      key: "theme-color",
      name: "theme-color",
      content: color
    }
  ],
  link: [
    {
      rel: "icon",
      href: "/favicon.svg"
    }
  ],
  htmlAttrs: {
    lang,
    dir
  }
})

useSeoMeta({
  titleTemplate: "%s - Fetchly",
  ogImage: "https://cdn.idantity.me/images/logos/logomark-white.webp",
  twitterImage: "https://cdn.idantity.me/images/logos/logomark-white.webp",
  twitterCard: "summary_large_image"
})
</script>

<template>
  <UApp :locale="locales[locale]" :tooltip="{ delayDuration: 0 }">
    <NuxtRouteAnnouncer />
    <NuxtLoadingIndicator color="#69e5fb" />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <ClientOnly>
      <RCScrollToTop />
    </ClientOnly>
  </UApp>
</template>

<style scoped>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
