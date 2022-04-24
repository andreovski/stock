import { Navigate, Route, Routes } from "react-router-dom"
import { SidebarDrawerProvider } from "../context/SidebarContext"

import { AdminLayout } from "../components/AdminLayout"

import Dashboard from "../pages/admin/Dashboard"
import { UsersList } from "../pages/admin/Register/Users/UsersList"
import { UsersCreate } from "../pages/admin/Register/Users/UsersCreate"
import { StockList } from "../pages/admin/Register/Stock/StockList"
import { StockCreate } from "../pages/admin/Register/Stock/StockCreate"

export default function AppRoutes() {
  return (
    <SidebarDrawerProvider>
      <AdminLayout>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<UsersList />} />
          <Route path="/users/create" element={<UsersCreate />} />
          <Route path="/stock" element={<StockList />} />
          <Route path="/stock/create" element={<StockCreate />} />
          <Route path="/*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </AdminLayout>
    </SidebarDrawerProvider>
  )
}
