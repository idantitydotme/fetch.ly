<script setup lang="ts">
const iconPool: { icon: string; href: string; iconClass?: string }[] = [
  { icon: "logos:typescript-icon", href: "https://www.typescriptlang.org/" },
  { icon: "logos:vue", href: "https://vuejs.org/" },
  { icon: "logos:nuxt-icon", href: "https://nuxt.com/" },
  { icon: "logos:tailwindcss-icon", href: "https://tailwindcss.com/" },
  { icon: "logos:vitejs", href: "https://vite.dev/" },
  { icon: "logos:bun", href: "https://bun.com/" },
  { icon: "vscode-icons:file-type-oxlint", href: "https://oxc.rs/" },
  { icon: "logos:webstorm", href: "https://www.jetbrains.com/webstorm/" },
  { icon: "logos:c-plusplus", href: "https://isocpp.org/" },
  { icon: "logos:rider", href: "https://www.jetbrains.com/rider/" },
  {
    icon: "logos:unrealengine-icon",
    href: "https://www.unrealengine.com/",
    iconClass: "fill-white"
  },
  {
    icon: "simple-icons:perforce",
    href: "https://www.perforce.com/products/helix-core/",
    iconClass: "text-[#3805F2]"
  },
  { icon: "logos:postgresql", href: "https://www.postgresql.org/" },
  { icon: "catppuccin:drizzle-orm", href: "https://orm.drizzle.team/" },
  { icon: "logos:neon-icon", href: "https://neon.com/" },
  { icon: "logos:git-icon", href: "https://git-scm.com/" },
  { icon: "mdi:github", href: "https://github.com/" },
  { icon: "third-party:youtrack", href: "https://www.jetbrains.com/youtrack/" }
]

const features = ref([
  {
    icon: "lucide:file-pen",
    title: "Your design & planning roadmap",
    description:
      "Before we build, we blueprint. Every screen, flow, and feature is mapped to match your e-commerce goals before any code is written."
  },
  {
    icon: "lucide:chart-no-axes-combined",
    title: "Feature development that ships fast",
    description:
      "No more “we'll get to it”. You get weekly mobile test builds and live web links so you can see real progress fast."
  },
  {
    icon: "ri:diamond-line",
    title: "Testing & polishing that catches it all",
    description:
      "We break it before your users do. Every feature goes through rigorous testing and refinement for a high-performing launch."
  },
  {
    icon: "mdi:tools",
    title: "Maintenance that handles the 3AM stuff",
    description:
      "No more “we'll get to it”. You get weekly mobile test builds and live web links so you can see real progress fast."
  }
])

const timelineItems = ref([
  {
    icon: "lucide:file-video-camera",
    title: "Initial consultation and discovery",
    description:
      "Kickstart your journey with our Initial Consultation and Discovery — where your needs meet expert insight. Discover the path to your best solutions, tailored just for you from day one!"
  },
  {
    icon: "lucide:user-pen",
    title: "Collaborative planning and strategy",
    description:
      "Supercharge your success with Collaborative Planning and Strategy — where every voice counts and every step is smarter. Harness the power of teamwork to turn goals into game-changing results!"
  },
  {
    icon: "lucide:drafting-compass",
    title: "Initial consultation and discovery",
    description:
      "Unlock innovation with seamless Design and Development Execution — where bold ideas become reality, fast. Experience the perfect blend of creativity and precision to bring your vision to life, from concept to launch!"
  }
])

const faqItems = ref([
  {
    label: "What do you offer for custom ecommerce development?",
    content:
      "We handle everything: strategy, design, development, QA, Shopify integration, backend architecture, and ongoing support. We dive into due diligence, deliver data-backed planning, and manage the full build."
  },
  {
    label: "Can you build my site from scratch?",
    content:
      "Yes. We design and develop fully custom ecommerce platforms or apps, end-to-end. Everything is tailored to your product, your stack, and your customers."
  },
  {
    label: "Do you work with Shopify?",
    content:
      "Absolutely. We offer Shopify integrations, custom theme development, app connections, and feature enhancements."
  },
  {
    label: "How is pricing structured?",
    content:
      "We offer unique month-to-month rates that include everything you need for your online store, from design to maintenance."
  },
  {
    label: "How do I get started? ",
    content:
      "Just fill out our contact form. We'll schedule a quick consultation, learn about your goals, and show you exactly how our team would build your ecommerce platform."
  }
])

useHead({
  title: "Home"
})

useSeoMeta({
  title: "Home",
  ogTitle: "Home",
  description: "Your dev team as a service.",
  ogDescription: "Your dev team as a service."
})
</script>

<template>
  <UPage>
    <div
      class="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      <video
        class="absolute inset-0 z-0 min-h-full min-w-full object-cover"
        autoplay
        loop
        muted
        playsinline
      >
        <source
          key="footer-background-video"
          src="/videos/footer-background.mp4"
          type="video/mp4"
        />
      </video>
      <div class="absolute inset-0 z-10 bg-black/60" />
      <div
        class="relative z-20 flex w-full max-w-6xl flex-col items-center justify-center gap-16 p-4 text-center lg:p-8"
      >
        <div class="flex flex-col gap-md">
          <h1 class="text-4xl font-bold text-white lg:text-hero">
            Your dev team as a service.™
          </h1>
          <span class="text-xl text-muted"
            >Tap into an existing dev team and scale services as your business
            needs.</span
          >
        </div>
        <div class="flex flex-col items-center gap-sm">
          <UBadge color="primary" variant="soft">SERVICES</UBadge>
          <p class="text-muted">
            Development, Project Management, QA, Design, DevOps, and more.
          </p>
          <div class="flex flex-col items-center gap-sm">
            <UInput
              variant="soft"
              type="email"
              placeholder="Enter your email"
              class="sm:w-80"
            />
            <UButton
              variant="solid"
              color="primary"
              label="Scale with Fetchly"
            />
          </div>
        </div>
      </div>
    </div>
    <UContainer class="bg-primary-100 py-16">
      <div class="flex flex-col gap-xl lg:grid lg:grid-cols-2">
        <div class="flex flex-col gap-md">
          <h2 class="text-4xl font-bold text-black lg:text-hero">
            We help build eCommerce brands
          </h2>
          <span class="text-md font-semibold text-black lg:text-lg">
            WE BUILD AND MANAGE THE TECHNICAL SIDE, SO YOU CAN FOCUS ON RUNNING
            YOUR BRAND.
          </span>
          <p class="text-black">
            We strategize, design, build, test, launch, and manage custom online
            stores, all at a low, month-to-month price. From UX to backend,
            every site and app we build is meticulously optimized to drive
            revenue.
          </p>
          <div class="flex flex-row gap-sm">
            <UButton label="Talk to us" to="/intake" />
            <UButton
              variant="link"
              label="Learn more"
              trailing-icon="lucide:chevron-right"
              to="/intake"
              class="text-black"
            />
          </div>
        </div>
        <div class="flex flex-col justify-between gap-md">
          <img
            src="https://cdn.prod.website-files.com/67ffae2d1339b7cb15a88bb6/68484fa7c89b39d4cc57435c_casper.com_.avif"
            width="352"
            height="647"
            alt="Illustration"
            class="w-full rounded-lg"
          />
        </div>
      </div>
    </UContainer>
    <UContainer class="bg-white py-16">
      <div class="flex flex-col gap-xl">
        <div class="flex flex-col gap-xl lg:grid lg:grid-cols-2">
          <div class="flex flex-col gap-md">
            <span class="font-semibold text-black"
              >THE <em>BEST</em> WEB DEVELOPMENT COMPANY</span
            >
            <h2 class="text-4xl font-semibold text-black lg:text-hero">
              Trusted by brands that don't want to build another team.
            </h2>
          </div>
          <div class="flex flex-col justify-between gap-md">
            <p class="text-lg text-black lg:text-xl">
              For years, many clients have relied on Fetchly as their only
              outside dev team. Why? Fetchly gives you more than just code. You
              get a full-stack team, a tightly managed process, and a smarter
              way to build and scale your store.
            </p>
            <span class="text-lg font-bold text-black lg:text-xl"
              >70+ applications launched. 7+ years strong.</span
            >
          </div>
        </div>
        <div class="flex flex-col gap-xl lg:flex-row">
          <UPageFeature
            v-for="feature in features"
            orientation="vertical"
            :icon="feature.icon"
            :title="feature.title"
            :description="feature.description"
            :ui="{
              leadingIcon:
                'lg:size-16 size-12 rounded-2xl bg-primary-500 fill-black p-sm lg:p-md text-black transition-all duration-300 hover:rounded-full',
              title: 'text-2xl font-semibold text-black',
              description: 'text-lg text-black'
            }"
          />
        </div>
        <UMarquee :overlay="false" class="z-100 py-16">
          <ULink to="/" v-for="i in 12">
            <UIcon
              name="lucide:globe"
              class="size-16 shrink-0 text-dimmed hover:text-primary-500"
            />
          </ULink>
        </UMarquee>
      </div>
    </UContainer>
    <UContainer class="bg-white py-16">
      <div class="flex flex-col gap-xl lg:grid lg:grid-cols-2">
        <div class="flex flex-col gap-md">
          <span class="font-semibold text-black">COLLABORATION</span>
          <h2 class="text-4xl font-semibold text-black lg:text-hero">
            Our seamless collaboration process
          </h2>
          <div class="flex flex-row gap-md pt-4">
            <UButton label="View our process" />
          </div>
          <RCPlaceholder class="h-full w-full" />
        </div>
        <div class="flex flex-col justify-between gap-md">
          <UTimeline
            :items="timelineItems"
            :ui="{
              item: 'gap-xl',
              separator: 'bg-primary-500',
              indicator:
                'lg:size-16 size-12 rounded-2xl bg-primary-500 fill-black p-sm lg:p-md text-black transition-all duration-300 hover:rounded-full',
              title: 'text-black text-lg font-semibold',
              description: 'text-black text-md'
            }"
          />
        </div>
      </div>
    </UContainer>
    <UContainer class="py-16">
      <div
        class="flex flex-col gap-xl rounded-[48px] bg-black p-16 lg:grid lg:grid-cols-2 lg:flex-row"
      >
        <div class="order-last flex flex-col gap-lg lg:order-first">
          <h2 class="text-3xl font-semibold text-white lg:text-6xl">
            The only toolkit
            <span class="text-primary-500">you'll ever need</span>
          </h2>
          <p class="max-w-4/5">
            Cross-functional eCommerce team that can help you rapidly scale your
            DTC Brand.
          </p>
          <div class="flex flex-col gap-md lg:flex-row">
            <UButton color="neutral" variant="solid" label="View our model" />
            <UButton
              color="neutral"
              variant="link"
              label="View our model"
              trailingIcon="lucide:chevron-right"
            />
          </div>
        </div>
        <NuxtImg
          src="https://placehold.co/600x400"
          class="order-first h-full w-full lg:order-last"
        />
      </div>
    </UContainer>
    <UContainer class="py-16">
      <div class="flex flex-col gap-lg lg:grid lg:grid-cols-2">
        <div class="flex flex-col gap-md">
          <span class="font-semibold text-black">FAQ</span>
          <h2 class="text-4xl font-semibold text-black lg:text-hero">
            See if we have what you need.
          </h2>
          <p class="text-black">
            Have questions? We’ve got answers. If you don’t see yours, reach out
            below.
          </p>
          <div class="flex flex-row gap-md pt-4">
            <UButton label="Contact" to="/intake" />
          </div>
        </div>
        <UAccordion
          :items="faqItems"
          type="multiple"
          trailingIcon="lucide:plus"
          :ui="{
            root: 'gap-md flex flex-col',
            item: 'p-md bg-primary-100 rounded-xl border-none gap-lg',
            body: 'text-black',
            trigger: 'p-0 gap-md',
            label: 'text-black text-md font-semibold',
            trailingIcon: 'text-black'
          }"
        />
      </div>
    </UContainer>
  </UPage>
</template>
