import { Suspense, useMemo } from "react"
import { useAuth } from "./context/AuthContext"
import AppRoutes from "./routes/AppRoutes"
import AuthRoutes from "./routes/AuthRoutes"

import { SpinnerFull } from "./components/SpinnerFull"

function App() {
  const { isAuthenticated } = useAuth()

  const Component = useMemo(() => {
    if (isAuthenticated) {
      return AppRoutes
    }

    return AuthRoutes
  }, [isAuthenticated])

  return (
    <Suspense fallback={<SpinnerFull size="lg" />}>
      <Component />
    </Suspense>
  )
}

export default App
