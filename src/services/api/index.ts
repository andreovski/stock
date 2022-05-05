import axios from "axios"

import { AxiosInstance, AxiosRequestConfig } from "axios"
import { MutateOptions, useMutation, UseMutationResult } from "react-query"

interface IMutateFunction {
  api: AxiosInstance
  method?: string
  url: string
  queryParams?: object
  apiConfig?: AxiosRequestConfig
  body?: Array<object>
}

export const accounts = axios.create({
  baseURL: `https://identitytoolkit.googleapis.com/v1`,
  method: "POST",
  params: {
    key: process.env.REACT_APP_API_KEY,
  },
})

export const secureToken = axios.create({
  baseURL: `https://securetoken.googleapis.com/v1`,
  method: "POST",
  params: {
    key: process.env.REACT_APP_API_KEY,
  },
})

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
  }

  try {
    const { data } = await api(url, { params: queryParams, ...apiConfig })

    return data
  } catch (error) {
    throw error.response.data
  }
}

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
