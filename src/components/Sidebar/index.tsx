import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useBreakpointValue,
} from "@chakra-ui/react"
import { useSidebarDrawer } from "../../context/SidebarContext"

import { SidebarNav } from "./SidebarNav"

export function Sidebar() {
  const { isOpen, onClose } = useSidebarDrawer()
  const isDrawerSidebar = useBreakpointValue({ base: true, lg: false })

  if (isDrawerSidebar) {
    return (
      <Drawer isOpen={isOpen} placement="left" onClose={onClose} >
        <DrawerOverlay>
          <DrawerContent backgroundColor="background.100" p="4">
            <DrawerCloseButton mt="6" mr="4" />
            <DrawerHeader>Navegação</DrawerHeader>

            <DrawerBody>
              <SidebarNav />
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    )
  }

  return (
    <Box as="aside" width="64" mr="8">
      <SidebarNav />
    </Box>
  )
}
