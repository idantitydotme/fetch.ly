<script setup lang="ts">
import { z } from "zod"
import { authClient } from "~~/lib/auth-client"
import type { FormSubmitEvent } from "@nuxt/ui"
import type { StepperItem } from "@nuxt/ui"

const toast = useToast()
const { t } = useI18n()

const step1Schema = z.object({
  username: z
    .string()
    .min(2, "Username must be between 2 and 24 characters long.")
    .max(24, "Username must be between 2 and 24 characters long.")
    .transform((val) => val.trim())
    .refine((val) => !/\s/.test(val), {
      message: "Username cannot contain spaces."
    })
    .refine((val) => /^[a-zA-Z0-9._]+$/.test(val), {
      message:
        "Username can only contain letters, numbers, periods (.), and underscores (_)."
    }),
  firstName: z
    .string()
    .min(2, "First name must be between 2 and 24 characters long.")
    .max(24, "First name must be between 2 and 24 characters long."),
  lastName: z
    .string()
    .min(2, "Last name must be between 2 and 24 characters long.")
    .max(24, "Last name must be between 2 and 24 characters long."),
  email: z.string().email("Invalid email address.")
})

const step2Schema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be between 8 and 24 characters long.")
      .max(24, "Password must be between 8 and 24 characters long."),
    passwordConfirmation: z.string()
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.passwordConfirmation) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["passwordConfirmation"],
        message: "Passwords do not match."
      })
    }
    if (
      (state.username ?? "").length > 0 &&
      data.password.toLowerCase().includes((state.username ?? "").toLowerCase())
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["password"],
        message: "Password should not contain the username."
      })
    }
  })

const step3Schema = z.object({
  terms: z.boolean().refine((val) => val, {
    message: "You must agree to the terms of service."
  }),
  newsletter: z.boolean().optional()
})

const schema = z.intersection(
  step1Schema,
  z.intersection(step2Schema, step3Schema)
)

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  username: "",
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  passwordConfirmation: "",
  terms: false,
  newsletter: false
})

const stepper = useTemplateRef<StepperItem>("stepper")
const currentStep = ref(0)

const step1Form = useTemplateRef<any>("step1Form")
const step2Form = useTemplateRef<any>("step2Form")
const step3Form = useTemplateRef<any>("step3Form")

const showPassword = ref(false)
const showPasswordConfirmation = ref(false)

function checkStrength(str: string) {
  const requirements = [
    {
      regex: /.{8,}/,
      text: "At least 8 characters"
    },
    {
      regex: /\d/,
      text: "At least 1 number"
    },
    {
      regex: /[a-z]/,
      text: "At least 1 lowercase letter"
    },
    {
      regex: /[A-Z]/,
      text: "At least 1 uppercase letter"
    },
    {
      regex: /[^\w\s]/,
      text: "At least 1 special character (e.g., !@#$%^&*)"
    }
  ]

  return requirements.map((req) => ({
    met: req.regex.test(str),
    text: req.text
  }))
}

const strength = computed(() => {
  const pwd = state.password ?? ""
  return checkStrength(pwd)
})
const score = computed(() => strength.value.filter((req) => req.met).length)

const color = computed(() => {
  if (score.value === 0) return "neutral"
  if (score.value <= 1) return "error"
  if (score.value <= 2) return "warning"
  if (score.value === 3) return "warning"
  return "success"
})

const stepperItems: StepperItem[] = [
  {
    slot: "identity" as const,
    title: "Identity",
    icon: "lucide:user-circle"
  },
  {
    slot: "security" as const,
    title: "Security",
    icon: "lucide:lock"
  },
  {
    slot: "preferences" as const,
    title: "Preferences",
    icon: "lucide:check-circle"
  }
]

async function nextStep() {
  let isValid = false
  let currentForm

  switch (currentStep.value) {
    case 0:
      currentForm = step1Form.value
      break
    case 1:
      currentForm = step2Form.value
      break
    case 2:
      currentForm = step3Form.value
      break
    default:
      return
  }

  if (currentForm) {
    isValid = await currentForm.validate()
  }

  if (isValid) {
    stepper.value?.next()
    currentStep.value++
  } else {
    //TODO is this necessary?
    // Validation failed, scroll to the first error
    const firstError = document.querySelector(".ring-red-500")
    firstError?.scrollIntoView({ behavior: "smooth", block: "center" })
    toast.add({
      color: "error",
      title: "Validation Error",
      description: "Please correct the errors before proceeding."
    })
  }
}

function prevStep() {
  stepper.value?.prev()
  currentStep.value--
}

async function onSubmit(event: FormSubmitEvent<Schema>) {
  try {
    await authClient.signUp.email({
      name: event.data.username,
      firstName: event.data.firstName,
      lastName: event.data.lastName,
      email: event.data.email,
      password: event.data.password
    })
    toast.add({
      color: "success",
      title: "Account creation successful.",
      description: "Welcome to idantity.me!"
    })
    await navigateTo("/")
  } catch (error) {
    console.error("Signup error:", error)
    toast.add({
      color: "error",
      title: "Failed to sign up.",
      description: "Please check your details and try again."
    })
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
            <h1>Sign Up</h1>
            <span class="text-sm"
              >Already have an account?
              <ULink to="/auth/sign-in">Sign In</ULink>.</span
            >
          </div>
          <UStepper
            ref="stepper"
            :items="stepperItems"
            class="w-full"
            size="sm"
            :model-value="currentStep"
            linear
            disabled
          >
            <template #identity>
              <UForm
                ref="step1Form"
                :schema="step1Schema"
                :state="state"
                class="flex flex-col gap-md"
                @submit.prevent
              >
                <div class="flex flex-col gap-md">
                  <UFormField
                    label="Email"
                    name="email"
                    description="Enter an email address."
                    help="This will be used for signing in."
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
                    label="Username"
                    name="username"
                    description="Enter a username."
                    required
                  >
                    <UInput
                      v-model="state.username"
                      placeholder="Johndoe123"
                      class="w-full"
                    >
                      <template v-if="state.username?.length" #trailing>
                        <UButton
                          color="neutral"
                          variant="link"
                          size="sm"
                          icon="lucide:circle-x"
                          aria-label="Clear input"
                          @click="state.username = ''"
                        />
                      </template>
                    </UInput>
                  </UFormField>
                  <div class="flex flex-row gap-sm">
                    <UFormField
                      label="First Name"
                      name="firstName"
                      description="Enter your first name."
                      required
                      class="w-1/2"
                    >
                      <UInput v-model="state.firstName" placeholder="John">
                        <template v-if="state.firstName?.length" #trailing>
                          <UButton
                            color="neutral"
                            variant="link"
                            size="sm"
                            icon="lucide:circle-x"
                            aria-label="Clear input"
                            @click="state.firstName = ''"
                          />
                        </template>
                      </UInput>
                    </UFormField>
                    <UFormField
                      label="Last Name"
                      name="lastName"
                      description="Enter your last name."
                      required
                      class="w-1/2"
                    >
                      <UInput v-model="state.lastName" placeholder="Doe">
                        <template v-if="state.lastName?.length" #trailing>
                          <UButton
                            color="neutral"
                            variant="link"
                            size="sm"
                            icon="lucide:circle-x"
                            aria-label="Clear input"
                            @click="state.lastName = ''"
                          />
                        </template>
                      </UInput>
                    </UFormField>
                  </div>
                  <div class="flex justify-between gap-md">
                    <div />
                    <UButton
                      trailing-icon="lucide:arrow-right"
                      @click="nextStep"
                      label="Next"
                    />
                  </div>
                </div>
              </UForm>
            </template>
            <template #security>
              <UForm
                ref="step2Form"
                :schema="step2Schema"
                :state="state"
                class="flex flex-col gap-md"
                @submit.prevent
              >
                <div class="flex flex-col gap-md">
                  <UFormField
                    label="Password"
                    name="password"
                    description="Enter a password."
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
                            :icon="
                              showPassword ? 'lucide:eye-off' : 'lucide:eye'
                            "
                            :aria-label="
                              showPassword ? 'Hide password' : 'Show password'
                            "
                            :aria-pressed="showPassword"
                            aria-controls="password"
                            @click="showPassword = !showPassword"
                          />
                        </template>
                      </UInput>
                      <UProgress
                        :color="color"
                        :model-value="score"
                        :max="4"
                        size="sm"
                      />
                      <p id="password-strength" class="text-xs">
                        The password must contain:
                      </p>
                      <ul class="space-y-1" aria-label="Password requirements">
                        <li
                          v-for="(req, index) in strength"
                          :key="index"
                          class="flex items-center gap-xs"
                          :class="req.met ? 'text-success' : 'text-muted'"
                        >
                          <UIcon
                            :name="
                              req.met
                                ? 'lucide:circle-check'
                                : 'lucide:circle-x'
                            "
                            class="size-4 shrink-0"
                          />

                          <span class="text-xs font-light">
                            {{ req.text }}
                            <span class="sr-only">
                              {{
                                req.met
                                  ? " - Requirement met"
                                  : " - Requirement not met"
                              }}
                            </span>
                          </span>
                        </li>
                      </ul>
                    </div>
                  </UFormField>
                  <UFormField
                    label="Password Confirmation"
                    name="passwordConfirmation"
                    description="Please repeat your password."
                    required
                  >
                    <UInput
                      v-model="state.passwordConfirmation"
                      :type="showPasswordConfirmation ? 'text' : 'password'"
                      placeholder="••••••••••••••••"
                      class="w-full"
                    >
                      <template #trailing>
                        <UButton
                          color="neutral"
                          variant="link"
                          size="sm"
                          :icon="
                            showPasswordConfirmation
                              ? 'lucide:eye-off'
                              : 'lucide:eye'
                          "
                          :aria-label="
                            showPasswordConfirmation
                              ? 'Hide password'
                              : 'Show password'
                          "
                          :aria-pressed="showPasswordConfirmation"
                          aria-controls="passwordConfirmation"
                          @click="
                            showPasswordConfirmation = !showPasswordConfirmation
                          "
                        />
                      </template>
                    </UInput>
                  </UFormField>
                  <div class="flex justify-between gap-md">
                    <UButton
                      variant="outline"
                      leading-icon="lucide:arrow-left"
                      :label="t('navigation_previous')"
                      :class="{ invisible: currentStep === 0 }"
                      @click="prevStep"
                    />
                    <UButton
                      trailing-icon="lucide:arrow-right"
                      @click="nextStep"
                      label="Next"
                    />
                  </div>
                </div>
              </UForm>
            </template>
            <template #preferences>
              <UForm
                ref="step3Form"
                :schema="schema"
                :state="state"
                @submit="onSubmit($event as FormSubmitEvent<Schema>)"
                class="flex flex-col gap-md"
              >
                <div class="flex flex-col gap-md">
                  <UFormField name="terms">
                    <UCheckbox v-model="state.terms" required>
                      <template #label>
                        I have read and agree to the
                        <ULink
                          to="/documents/terms-of-service"
                          class="font-medium text-primary"
                          >Terms of Service</ULink
                        >.
                      </template>
                    </UCheckbox>
                  </UFormField>
                  <UCheckbox
                    v-model="state.newsletter"
                    name="newsletter"
                    label="Subscribe to our Newsletter."
                    description="Unsubscribe at any time."
                  />
                  <div class="flex justify-between gap-md">
                    <UButton
                      variant="outline"
                      leading-icon="lucide:arrow-left"
                      :label="t('navigation_previous')"
                      :class="{ invisible: currentStep === 0 }"
                      @click="prevStep"
                    />
                    <UButton
                      type="submit"
                      label="Sign Up"
                      color="primary"
                      trailing-icon="lucide:check"
                    />
                  </div>
                </div>
              </UForm>
            </template>
          </UStepper>
          <span class="text-center text-sm"
            >All these details may be changed later in your account
            settings.</span
          >
        </UCard>
      </UContainer>
    </UPageBody>
  </UPage>
</template>

<style scoped></style>
