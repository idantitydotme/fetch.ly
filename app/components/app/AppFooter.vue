<script setup lang="ts">
import type { FooterColumn } from "@nuxt/ui"

const columns: FooterColumn[] = [
  {
    label: "Resources",
    children: [
      {
        label: "Branding",
        to: "/branding/"
      }
    ]
  },
  {
    label: "Documents",
    children: [
      {
        label: "Privacy Policy",
        to: "/documents/privacy-policy/"
      },
      {
        label: "Terms of Service",
        to: "/documents/terms-of-service/"
      },
      {
        label: "Cookie Policy",
        to: "/documents/cookie-policy/"
      }
    ]
  }
]
</script>

<template>
  <div class="relative h-full w-full overflow-hidden">
    <video
      class="absolute inset-0 z-0 min-h-full min-w-full object-cover"
      autoplay
      loop
      muted
      playsinline
    >
      <source
        key="/videos/footer-background.mp4"
        src="/videos/footer-background.mp4"
        type="video/mp4"
      />
    </video>
    <div class="absolute inset-0 z-10 bg-black/60" />
    <RCFooter class="relative z-20">
      <template #left>
        <div
          class="flex max-w-5/7 flex-col items-center justify-between gap-xl lg:items-start"
        >
          <UIcon name="first-party:logomark-white" class="h-12 w-auto" />
          <h2 class="text-6xl font-normal">
            Ready to build something amazing?
          </h2>
        </div>
        <div class="flex flex-col items-center gap-md lg:items-start">
          <span class="text-sm text-highlighted">PAGES</span>
          <div class="flex flex-col gap-sm lg:flex-row">
            <UButton label="Services" to="/services" />
            <UButton label="Our Model" to="/our-model" />
            <UButton label="Case Studies" to="/case-studies" />
            <UButton label="About Us" to="/about-us" />
          </div>
        </div>
      </template>
      <template #right class="order-last">
        <div class="flex flex-col gap-sm lg:items-end">
          <UButton
            color="neutral"
            label="Get in Touch"
            class="bg-white text-black"
          />
        </div>
        <div class="flex flex-col items-center gap-md lg:items-end">
          <span class="text-sm text-highlighted">LOCATIONS</span>
          <div class="flex flex-col items-center gap-sm lg:items-end">
            <span class="text-sm text-highlighted">Austin, Texas</span>
            <span class="text-sm text-highlighted">Denver, Colorado</span>
          </div>
        </div>
      </template>
    </RCFooter>
  </div>
  <div class="bg-white py-4">
    <UContainer
      class="flex flex-col items-center justify-between gap-lg lg:flex-row"
    >
      <span class="order-last flex-1 text-sm text-black lg:order-first">
        © {{ new Date().getFullYear() }} Fetchly Labs. All rights reserved.
      </span>
      <div class="flex flex-col gap-md lg:flex-row">
        <ULink to="/documents/terms-of-service" class="text-black underline"
          >Privacy Policy</ULink
        >
        <ULink to="/documents/terms-of-service" class="text-black underline"
          >Terms of Service</ULink
        >
        <ULink to="/documents/terms-of-service" class="text-black underline"
          >Cookie Policy</ULink
        >
      </div>
      <div
        class="order-first flex flex-1 flex-row justify-end gap-xs lg:order-last lg:items-end"
      >
        <UButton
          size="xl"
          variant="ghost"
          icon="logos:x"
          to="https://x.com/Fetchly_"
          class="text-black"
        />
        <UButton
          size="xl"
          variant="ghost"
          icon="mdi:linkedin"
          to="https://www.linkedin.com/company/fetchly-labs"
          class="text-black"
        />
      </div>
    </UContainer>
  </div>
</template>

<style scoped></style>
