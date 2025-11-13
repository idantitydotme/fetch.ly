<script setup lang="ts">
import { z } from "zod"
import { authClient } from "~~/lib/auth-client"
import type { FormSubmitEvent } from "@nuxt/ui"

const toast = useToast()

const schema = z.object({
  email: z.email("Invalid email address."),
  password: z.string().min(8, "Password must be at least 8 characters long."),
  rememberMe: z.boolean()
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  email: "",
  password: "",
  rememberMe: true
})

const showPassword = ref(false)
const isLoading = ref(false)

async function onSubmit(event: FormSubmitEvent<Schema>) {
  isLoading.value = true

  try {
    const { data, error } = await authClient.signIn.email({
      email: event.data.email,
      password: event.data.password,
      rememberMe: event.data.rememberMe
    })

    if (!data) {
      if (error) {
        console.error("[Sign In Error]:", error)

        toast.add({
          color: "error",
          title: "Authentication Failed",
          description:
            "Invalid email or password. Please check your details and try again."
        })

        return
      }
    }

    toast.add({
      color: "success",
      title: "Sign In successful.",
      description: `Welcome back ${data.user.name}!`
    })

    await navigateTo("/")
  } catch (error) {
    toast.add({
      color: "error",
      title: "Connection Error",
      description: "A network error occurred. Please try again later."
    })
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <UPage>
    <UPageBody>
      <UContainer class="flex min-h-screen items-center justify-center">
        <UCard
          variant="soft"
          class="w-full max-w-md"
          :ui="{ body: 'flex flex-col gap-lg' }"
        >
          <div class="flex flex-col items-center">
            <UIcon name="lucide:user" class="h-12 w-12" />
            <h1>Sign In</h1>
            <span class="text-sm"
              >Don't have an account?
              <ULink to="/auth/sign-up">Sign up</ULink>.</span
            >
          </div>
          <UForm
            :schema="schema"
            :state="state"
            @submit="onSubmit"
            class="flex flex-col gap-md"
          >
            <UFormField
              label="Email"
              name="email"
              description="Enter your email address."
              required
            >
              <UInput
                v-model="state.email"
                type="email"
                placeholder="johndoe@mail.com"
                class="w-full"
              >
                <template v-if="state.email?.length" #trailing>
                  <UButton
                    color="neutral"
                    variant="link"
                    size="sm"
                    icon="lucide:circle-x"
                    aria-label="Clear input"
                    @click="state.email = ''"
                  />
                </template>
              </UInput>
            </UFormField>
            <UFormField
              label="Password"
              name="password"
              description="Enter your password."
              required
            >
              <div class="flex flex-col gap-sm">
                <UInput
                  v-model="state.password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="••••••••••••••••"
                  class="w-full"
                >
                  <template #trailing>
                    <UButton
                      color="neutral"
                      variant="link"
                      size="sm"
                      :icon="showPassword ? 'lucide:eye-off' : 'lucide:eye'"
                      :aria-label="
                        showPassword ? 'Hide password' : 'Show password'
                      "
                      :aria-pressed="showPassword"
                      aria-controls="password"
                      @click="showPassword = !showPassword"
                    />
                  </template>
                </UInput>
              </div>
            </UFormField>
            <UCheckbox
              v-model="state.rememberMe"
              name="rememberMe"
              label="Remember Me"
            />
            <UButton
              color="primary"
              variant="solid"
              type="submit"
              label="Sign In"
              block
              :loading="isLoading"
              :disabled="isLoading"
            />
          </UForm>
          <span class="text-center text-sm"
            >By signing in, you agree to our
            <ULink
              to="/documents/terms-of-service"
              class="font-medium text-primary"
              >Terms of Service</ULink
            >.</span
          >
        </UCard>
      </UContainer>
    </UPageBody>
  </UPage>
</template>
