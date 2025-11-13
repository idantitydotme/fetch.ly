export default defineAppConfig({
  title: "Fetchly",
  description: "Your dev team as a service.",
  cdn: "https://cdn.idantity.me",
  logomark: "first-party:logomark-white",
  logotype: "first-party:logotype-white",
  rimelightComponents: {
    callouts: {
      info: {
        icon: "lucide:shield-alert",
        title: "callout_info_title",
        tooltip: "callout_info_tooltip"
      },
      success: {
        icon: "lucide:circle-alert",
        title: "callout_success_title",
        tooltip: "callout_success_tooltip"
      },
      warning: {
        icon: "lucide:triangle-alert",
        title: "callout_warning_title",
        tooltip: "callout_warning_tooltip"
      },
      error: {
        icon: "lucide:octagon-alert",
        title: "callout_error_title",
        tooltip: "callout_error_tooltip"
      },
      commentary: {
        icon: "lucide:message-circle-warning",
        title: "callout_commentary_title",
        tooltip: "callout_commentary_tooltip"
      },
      ideation: {
        icon: "lucide:badge-alert",
        title: "callout_ideation_title",
        tooltip: "callout_ideation_tooltip"
      },
      source: {
        icon: "lucide:book-alert",
        title: "callout_source_title",
        tooltip: "callout_source_tooltip"
      }
    }
  },
  ui: {
    colors: {
      primary: "primary",
      secondary: "secondary",
      info: "info",
      success: "success",
      warning: "warning",
      error: "error",
      commentary: "commentary",
      ideation: "ideation",
      source: "source",
      neutral: "neutrals"
    },
    icons: {
      close: "lucide:x",
      chevronLeft: "lucide:chevron-left",
      chevronRight: "lucide:chevron-right"
    },
    link: {
      variants: {
        active: {
          true: "text-primary-700",
          false: "text-primary-400"
        }
      }
    },
    formField: {
      slots: {
        description: "text-sm",
        help: "text-xs"
      }
    },
    checkbox: {
      slots: {
        description: "text-sm"
      }
    },
    modal: {
      slots: {
        content: "bg-neutral-950"
      },
      variants: {
        fullscreen: {
          false: {
            content: "rounded-none"
          }
        }
      }
    },
    banner: {
      slots: {
        icon: "text-highlighted",
        title: "text-highlighted",
        close: "text-highlighted"
      }
    },
    button: {
      slots: {
        base: "rounded-full font-semibold"
      },
      variants: {
        size: {
          md: {
            base: "px-4 text-md"
          }
        }
      }
    },
    header: {
      slots: {
        root: "bg-primary-900"
      }
    },
    footer: {
      slots: {
        root: "bg-primary-900 py-6"
      }
    },
    page: {
      slots: {
        root: "lg:gap-8"
      }
    },
    pageAside: {
      slots: {
        root: "lg:px-4 lg:pe-0 lg:ps-0 lg:ms-0"
      }
    },
    pageHeader: {
      slots: {
        links: "justify-end"
      }
    },
    navigationMenu: {
      slots: {
        separator: "my-2"
      }
    }
  }
})
