import { Flex, Icon, IconButton, useBreakpointValue } from "@chakra-ui/react"
import { RiMenuLine } from "react-icons/ri"
import { useSidebarDrawer } from "../../context/SidebarContext"

import { HeaderAvatar } from "./HeaderAvatar"
import { HeaderNotification } from "./HeaderNotification"
import { HeaderLogo } from "./HeaderLogo"

export function Header() {
  const { onOpen } = useSidebarDrawer()

  const isWideVersion = useBreakpointValue({ sm: false, lg: true })

  return (
    <Flex
      as="header"
      width="100%"
      maxWidth={1480}
      height="20"
      mx="auto"
      mt="4"
      px="4"
      align="center"
    >
      {!isWideVersion && (
        <IconButton
          aria-label="Open navigate"
          icon={<Icon as={RiMenuLine} />}
          fontSize="24"
          variant="unstyled"
          onClick={onOpen}
          mr="2"
          mt="2"
        />
      )}

      <HeaderLogo />

      <Flex align="center" ml="auto">
        <HeaderNotification />
        <HeaderAvatar showProfileData={isWideVersion} />
      </Flex>
    </Flex>
  )
}
