<script setup lang="ts">
import { authClient } from "~~/lib/auth-client"
import type { NavigationMenuItem, DropdownMenuItem } from "@nuxt/ui"

const { data: session } = await authClient.useSession(useFetch)
const route = useRoute()
const toast = useToast()
const { t } = useI18n()

const leftDrawerOpen = ref(false)
const rightDrawerOpen = ref(false)

type menuItem = NavigationMenuItem & DropdownMenuItem

const items = computed<NavigationMenuItem[]>(() => [
  {
    label: "Services",
    to: "/services",
    active: route.path.startsWith("/services")
  },
  {
    label: "Our Model",
    to: "/our-model",
    active: route.path.startsWith("/our-model")
  },
  {
    label: "Case Studies",
    to: "/case-studies",
    active: route.path.startsWith("/case-studies")
  },
  {
    label: "About Us",
    to: "/about",
    active: route.path.startsWith("/about")
  }
])

const accountMenuItems = computed<menuItem[][]>(() => {
  return [
    [
      {
        label: "Profile",
        icon: "lucide:user"
      },
      {
        label: "Billing",
        icon: "lucide:credit-card"
      }
    ],
    [
      {
        label: "Team",
        icon: "lucide:users"
      },
      {
        label: "Invite users",
        icon: "lucide:user-plus",
        children: [
          [
            {
              label: "Email",
              icon: "lucide:mail"
            },
            {
              label: "Message",
              icon: "lucide:message-square"
            }
          ],
          [
            {
              label: "More",
              icon: "lucide:circle-plus"
            }
          ]
        ]
      },
      {
        label: "New team",
        icon: "lucide:plus",
        kbds: ["meta", "n"]
      }
    ],
    [
      {
        label: "Support",
        icon: "lucide:headset",
        to: "/docs/components/dropdown-menu"
      }
    ],
    [
      {
        label: "Settings",
        icon: "lucide:cog",
        kbds: [","]
      },
      {
        label: t("auth_sign-out"),
        icon: "lucide:log-out",
        onClick: async () => {
          try {
            const { error } = await authClient.signOut()

            if (error) {
              console.error("[Sign Out API Error]:", error)
              toast.add({
                color: "error",
                title: "Sign Out Failed",
                description:
                  "The server rejected the sign-out request. Please try again."
              })
              return
            }

            toast.add({
              color: "success",
              title: "Sign Out Successful",
              description: "You have been signed out. See you next time!"
            })
            await navigateTo("/")
          } catch (error) {
            console.error("Sign Out Error:", error)
            toast.add({
              color: "error",
              title: "Network Error",
              description:
                "A connection issue occurred while signing out, please try again."
            })
          }
        }
      }
    ]
  ]
})

defineShortcuts(extractShortcuts(accountMenuItems.value))
</script>

<template>
  <div class="fixed top-0 left-0 z-50 w-full">
    <UContainer class="px-4 py-4 sm:px-8">
      <RCHeader
        class="border-0.5 rounded-full border border-neutral-200 bg-white"
      >
        <template #left>
          <UIcon
            name="first-party:logomark-white"
            class="h-6 w-auto fill-black text-black"
          />
        </template>
        <template #center>
          <UNavigationMenu
            :items="items"
            variant="pill"
            :ui="{
              viewportWrapper:
                'top-0 flex fixed w-screen mt-[var(--ui-header-height)]',
              viewport: 'rounded-none',
              link: 'text-black'
            }"
          />
        </template>
        <template #right>
          <div class="flex flex-row gap-sm">
            <UButton
              variant="solid"
              label="Schedule a Call"
              icon="lucide:phone"
              to="/intake"
            />
          </div>
        </template>
        <template #collapsed-left>
          <div class="flex justify-start">
            <UDrawer
              v-model:open="leftDrawerOpen"
              direction="left"
              :handle="false"
              :ui="{
                header: 'flex items-center justify-between',
                content: 'w-full max-w-2/3 rounded-none bg-white'
              }"
            >
              <UButton
                color="neutral"
                variant="ghost"
                icon="lucide:menu"
                @click="leftDrawerOpen = true"
                class="text-black hover:text-white"
              />
              <template #header>
                <UIcon
                  name="first-party:logomark-white"
                  class="h-6 w-auto fill-black text-black"
                />
                <UButton
                  color="neutral"
                  variant="ghost"
                  icon="lucide:x"
                  @click="leftDrawerOpen = false"
                  class="text-black hover:text-white"
                />
              </template>
              <template #body>
                <div class="flex size-full flex-col items-start gap-md">
                  <UNavigationMenu
                    :items="items"
                    variant="link"
                    orientation="vertical"
                    :ui="{
                      link: 'text-black hover:text-primary text-lg'
                    }"
                  />
                </div>
              </template>
            </UDrawer>
          </div>
        </template>
        <template #collapsed-center>
          <RCLogo variant="mark" class="h-12" />
        </template>
        <template #collapsed-right>
          <div class="flex justify-end">
            <UDrawer
              v-model:open="rightDrawerOpen"
              direction="right"
              :handle="false"
              :ui="{
                header: 'flex items-center justify-between',
                content: 'w-full max-w-2/3 rounded-none bg-white'
              }"
            >
              <UButton
                color="neutral"
                variant="ghost"
                icon="lucide:user"
                @click="rightDrawerOpen = true"
                class="text-black hover:text-white"
              />
              <template #header>
                <UButton
                  color="neutral"
                  variant="ghost"
                  icon="lucide:x"
                  @click="rightDrawerOpen = false"
                  class="text-black hover:text-white"
                />
              </template>
              <template #body>
                <div class="flex flex-col gap-md">
                  <UButton
                    variant="solid"
                    label="Schedule a Call"
                    icon="lucide:phone"
                    to="/intake"
                    block
                  />
                </div>
              </template>
            </UDrawer>
          </div>
        </template>
      </RCHeader>
    </UContainer>
  </div>
</template>

<style scoped></style>
