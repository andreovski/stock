import { Flex } from "@chakra-ui/react"
import React, { ReactNode } from "react"

import { Header } from "../Header"
import { Sidebar } from "../Sidebar"

interface IAdminLayout {
  children: ReactNode
}

export function AdminLayout({ children }: IAdminLayout) {
  return (
    <Flex direction="column" height="100vh">
      <Header />

      <Flex width="100%" my="6" maxWidth={1488} mx="auto" px="6">
        <Sidebar />
        {children}
      </Flex>
    </Flex>
  )
}
