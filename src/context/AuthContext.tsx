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

import { deleted } from "../services/api/apiFirebase"
import { accounts } from "../services/api/api"

import { useMutation } from "react-query"

import { removeRefreshToken, validateRefreshToke } from "../providers/auth"

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
  useMutationSignInWithCredentials?: any
  createAccount: ({ email, password }: IAccountAcessData) => Promise<void>
  setDataBase: any
  signOut: () => void
}

const AuthContext = createContext({} as IAuthContextData)

export function AuthProvider({ children }: IAuthContext) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userAcess, setUserAcess] = useState()
  const [user, setUser] = useState<any>()

  console.log(user)

  useLayoutEffect(() => {
    validateRefreshToke()
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
  }, [])

  const setDataBase = async () => {
    // await post("users", { email: "andre@andre.com", password: "123Senha4!" })
    await deleted("users", "MqvK7S5xm7DvVVeMsc2g")
  }

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

  const useMutationSignInWithCredentials = (queryParams, config) =>
    useMutation(
      async () => {
        return await accounts.post<ISignInData>("accounts:signInWithPassword", {
          queryParams,
          returnSecureToken: true,
        })
      },
      { ...config }
    )

  // const signInWithCredentials = async (email, password) => {
  //   const { data } = await accounts.post<ISignInData>(
  //     "accounts:signInWithPassword",
  //     {
  //       email,
  //       password,
  //       returnSecureToken: true,
  //     }
  //   )

  //   if (!data) throw new Error("Falha ao logar, tente novamente!")

  //   const { displayName, localId, refreshToken } = data

  //   const userData = {
  //     id: localId,
  //     name: displayName,
  //     // avatar: photoURL,
  //     email,
  //     refesh_token: refreshToken,
  //   }

  //   setUser(userData)
  //   setIsAuthenticated(true)

  //   localStorage.setItem("@stock.on/auth", JSON.stringify(userData))
  //   localStorage.setItem("@stock.on/refreshToken", refreshToken)
  // }

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
        isAuthenticated,
        user,
        createAccount,
        useMutationSignInWithCredentials,
        setDataBase,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
