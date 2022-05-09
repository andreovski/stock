import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react"

import { auth, firebase } from "../services/firebase"

import {
  getRefreshToken,
  removeRefreshToken,
  validateRefreshToke,
} from "../providers/auth"

interface ISignInData {
  displayName: string
  email: string
  idToken: string
  localId: string
  registered: boolean
  refreshToken?: string
}

interface IAuthContext {
  children: ReactNode
}

interface IUser {
  id: string
  name: string
  email: string
  avatar?: string
  acess_token?: string
  refresh_token?: string
}

interface IAccountAcessData {
  email: string
  password: string
}

interface IAuthContextData {
  user: object
  isAuthenticated: boolean
  signInWithGoogle: () => Promise<void>
  signInWithCredetials: (data) => void
  signOut: () => void
}

const AuthContext = createContext({} as IAuthContextData)

export function AuthProvider({ children }: IAuthContext) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<any>()

  useLayoutEffect(() => {
    const refreshToken = getRefreshToken()

    if (refreshToken) {
      validateRefreshToke({ refreshToken })
        .then(({ data }) => {
          const userData = {
            acess: {
              id: data.id,
              name: data.name,
              email: data.email,
              access_token: data.access_token,
              refresh_token: data.refresh_token,
            },
          }

          setUser(userData)
        })
        .finally(() => setIsAuthenticated(true))
        .catch((err) => {
          console.log(err)
          setIsAuthenticated(false)
        })
    }
  }, [])

  const signInWithCredetials = useCallback((data) => {
    const userData = {
      acess: {
        id: data.localId,
        name: data.displayName,
        email: data.email,
        access_token: data.idToken,
        refresh_token: data.refreshToken,
      },
    }

    setUser(userData)
    setIsAuthenticated(true)

    localStorage.setItem("@stock.on/auth", JSON.stringify(userData))
    localStorage.setItem("@stock.on/refreshToken", data.refreshToken)
  }, [])

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

  const signOut = useCallback(() => {
    removeRefreshToken()
    setIsAuthenticated(false)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        signInWithGoogle,
        signInWithCredetials,
        isAuthenticated,
        user,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
