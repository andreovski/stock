import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"
import { auth, firebase } from "../services/firebase"

interface IAuthContext {
  children: ReactNode
}

interface IUser {
  id: string
  name: string
  avatar: string
}

interface IAuthContextData {
  user: object
  isAuthenticated: boolean
  signInWithGoogle: () => Promise<void>
}

const AuthContext = createContext({} as IAuthContextData)

export function AuthProvider({ children }: IAuthContext) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<IUser>()

  useEffect(() => {
    const data = localStorage.getItem("@stock.on/auth")

    if (data) {
      setIsAuthenticated(true)
      setUser(JSON.parse(data))
    }
  }, [])

  const signInWithGoogle = useCallback(async () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    const data = await auth.signInWithPopup(provider)

    if (!data) throw new Error("Failed to login with google, try again!")

    const { displayName, photoURL, uid } = data.user

    if (!displayName || !photoURL) {
      throw new Error(
        "A conta google utilizada está faltando algumas informações necessárias para login na aplicação"
      )
    }

    const userData = {
      id: uid,
      name: displayName,
      avatar: photoURL,
    }

    setIsAuthenticated(true)
    setUser(userData)

    localStorage.setItem("@stock.on/auth", JSON.stringify(userData))
  }, [])

  return (
    <AuthContext.Provider value={{ signInWithGoogle, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
