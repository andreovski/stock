import { extendTheme } from "@chakra-ui/react"

export const theme = extendTheme({
  colors: {
    primary: "#3182CE",
    background: {
      50: "#F7FAFC",
      100: "#EDF2F7",
      200: "#E2E8F0",
    },

    font: "#1A202C",
  },

  fonts: {
    heading: "Roboto",
    body: "Roboto",
  },

  styles: {
    global: {
      body: {
        bg: "gray.100",
        color: "gray.800",
      },
    },
  },
})
