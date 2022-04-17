import { ChakraProvider } from "@chakra-ui/react"
import { theme } from "./styles/theme"

// import SignIn from "./pages/auth/SignIn"
import Dashboard from "./pages/admin/Dashboard"

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Dashboard />
    </ChakraProvider>
  )
}

export default App
