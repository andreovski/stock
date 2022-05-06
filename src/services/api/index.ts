import axios from "axios"

import { AxiosInstance, AxiosRequestConfig } from "axios"
import {
  MutateOptions,
  QueryOptions,
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "react-query"

interface IMutateFunction {
  api: AxiosInstance
  method?: string
  url: string
  queryParams?: object
  apiConfig?: AxiosRequestConfig
  body?: [{}]
}

export const api = axios.create({
  baseURL: `https://firestore.googleapis.com/v1/projects`,
  params: {
    key: process.env.REACT_APP_API_KEY,
  },
})

export const accounts = axios.create({
  baseURL: `https://identitytoolkit.googleapis.com/v1`,
  params: {
    key: process.env.REACT_APP_API_KEY,
  },
})

export const secureToken = axios.create({
  baseURL: `https://securetoken.googleapis.com/v1`,
  params: {
    key: process.env.REACT_APP_API_KEY,
  },
})

const requestFn = async (options, url, pathParams, queryParams) => {
  const urlPathParams = url.match(/{([^}]+)}/g)

  if (urlPathParams) {
    url = urlPathParams.reduce(
      (acc, param) => acc.replace(param, pathParams[param.replace(/{|}/g, "")]),
      url
    )
  } else {
    queryParams = pathParams
  }

  if (url.charAt(0) === "/") {
    url = url.replace("/", "")
  }

  try {
    const { data } = await api(url, {
      ...options,
    })

    return data
  } catch (error) {
    throw error.response.data
  }
}

const queryFn =
  (options = {}) =>
  (url, pathParams = {}, queryParams = {}) =>
    requestFn(options, url, pathParams, queryParams)

const mutateFn = async ({
  api,
  method = "POST",
  url,
  queryParams,
  apiConfig = {},
  body,
}: IMutateFunction) => {
  apiConfig = { ...apiConfig, method }

  if (Array.isArray(body)) {
    queryParams = { ...queryParams, ...(body[0] || {}) }
    body = undefined
  }

  try {
    const { data } = await api(url, {
      params: queryParams,
      data: body,
      ...apiConfig,
    })

    return data
  } catch (error) {
    throw error.response.data
  }
}

interface IGetDocumentById {
  id: string
  key?: string
}

export const useQueryGetDocumentById = (
  pathParams: IGetDocumentById,
  queryParams?,
  config?,
  options?
): UseQueryResult<any> =>
  useQuery(
    `/v1/projects/${queryParams}`,
    () =>
      queryFn(options)(
        "/stock-on/databases/(default)/documents/users/{id}",
        pathParams,
        queryParams
      ),
    { ...config }
  )

export const useMutationSignInWithCredentials = (
  queryParams,
  config?: MutateOptions<void, void>
): UseMutationResult =>
  useMutation(
    (body?: any) =>
      mutateFn({
        api: accounts,
        url: "accounts:signInWithPassword",
        queryParams: { ...queryParams, returnSecureToken: true },
        body,
      }),
    { ...config }
  )

export const useMutationSignUp = (
  queryParams,
  config?: MutateOptions<void, void>
): UseMutationResult =>
  useMutation(
    (body?: any) =>
      mutateFn({
        api: accounts,
        url: "accounts:signUp",
        queryParams,
        body,
      }),
    { ...config }
  )

export const useMutationAccountControllerValidateRefreshToken = (
  queryParams,
  config?: MutateOptions<void, void>
): UseMutationResult =>
  useMutation(
    (body?: any) =>
      mutateFn({
        api: secureToken,
        url: "token",
        queryParams,
        body,
      }),
    { ...config }
  )
