import { HStack, Icon } from "@chakra-ui/react"
import { RiLogoutBoxRLine, RiUserAddLine } from "react-icons/ri"

export const HeaderNotification = () => {
  return (
    <HStack
      spacing={["6", "8"]}
      mx={["6", "8"]}
      pr={["6", "8"]}
      py="1"
      color="gray.500"
      borderRightWidth={1}
    >
      <Icon as={RiUserAddLine} fontSize="20" />
      <Icon as={RiLogoutBoxRLine} fontSize="20" />
    </HStack>
  )
}
