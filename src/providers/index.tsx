import { ChakraProvider } from "@chakra-ui/react"
import { theme } from "../styles/theme"

import { QueryClient, QueryClientProvider } from "react-query"

import { AuthProvider } from "../context/AuthContext"

const Providers = ({ children }) => {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <AuthProvider>{children}</AuthProvider>
      </ChakraProvider>
    </QueryClientProvider>
  )
}

export default Providers
