import { HStack, Icon } from "@chakra-ui/react"
import { RiLogoutBoxRLine, RiUserAddLine } from "react-icons/ri"
import { useAuth } from "../../context/AuthContext"

export const HeaderNotification = () => {
  const { signOut } = useAuth()

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
      <Icon as={RiLogoutBoxRLine} fontSize="20" onClick={signOut} />
    </HStack>
  )
}
