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
  avatar?: string
  email: string
}

interface IAccountAcessData {
  email: string
  password: string
}

interface IAuthContextData {
  user: object
  isAuthenticated: boolean
  signInWithGoogle: () => Promise<void>
  signInWithCredentials: (email, password) => Promise<void>
  createAccount: ({ email, password }: IAccountAcessData) => Promise<void>
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

  const createAccount = useCallback(
    async ({ email, password }: IAccountAcessData) => {
      const data = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)

      const { displayName, uid } = data.user

      const userData = {
        id: uid,
        name: displayName,
        email,
      }

      setUser(userData)
      setIsAuthenticated(true)

      localStorage.setItem("@stock.on/auth", JSON.stringify(userData))
    },
    []
  )

  const signInWithCredentials = async (email, password) => {
    const data = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)

    if (!data) throw new Error("Falha ao logar, tente novamente!")

    const { displayName, photoURL, uid } = data.user

    const userData = {
      id: uid,
      name: displayName,
      avatar: photoURL,
      email,
    }

    setUser(userData)
    setIsAuthenticated(true)

    localStorage.setItem("@stock.on/auth", JSON.stringify(userData))
  }

  const signInWithGoogle = useCallback(async () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    const data = await auth.signInWithPopup(provider)

    if (!data) throw new Error("Failed to login with google, try again!")

    const { displayName, photoURL, uid, email } = data.user

    if (!displayName || !photoURL) {
      throw new Error(
        "A conta google utilizada está faltando algumas informações necessárias para login na aplicação"
      )
    }

    const userData = {
      id: uid,
      name: displayName,
      avatar: photoURL,
      email,
    }

    setIsAuthenticated(true)
    setUser(userData)

    localStorage.setItem("@stock.on/auth", JSON.stringify(userData))
  }, [])

  return (
    <AuthContext.Provider
      value={{
        signInWithGoogle,
        isAuthenticated,
        user,
        createAccount,
        signInWithCredentials,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
