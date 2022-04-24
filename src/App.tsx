import { ChakraProvider } from "@chakra-ui/react"
import { theme } from "./styles/theme"

import Routes from "./routes"
import { AuthProvider } from "./context/AuthContext"

function App() {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ChakraProvider>
  )
}

export default App
