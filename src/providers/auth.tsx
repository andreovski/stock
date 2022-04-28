import { secureToken } from "../services/api/api"

export const getRefreshToken = () => {
  return localStorage.getItem("@stock.on/refreshToken")
}

export const removeRefreshToken = () => {
  localStorage.removeItem("@stock.on/refreshToken")
  localStorage.removeItem("@stock.on/auth")
}

export const validateRefreshToke = () => {
  const refreshToken = getRefreshToken()

  return secureToken.post("", {
    refresh_token: refreshToken,
    grant_type: "refresh_token",
  })
}
