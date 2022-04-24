import { Navigate, Route, Routes } from "react-router-dom"
import { SidebarDrawerProvider } from "../context/SidebarContext"

import { SignIn } from "../pages/auth/SignIn"

export default function AuthRoutes() {
  return (
    <SidebarDrawerProvider>
      <Routes>
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/*" element={<Navigate to="/signIn" />} />
      </Routes>
    </SidebarDrawerProvider>
  )
}
