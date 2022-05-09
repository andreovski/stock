import { HStack, IconButton } from "@chakra-ui/react"
import styled from "@emotion/styled"
import { RiLogoutBoxRLine, RiUserAddLine } from "react-icons/ri"
import { useAuth } from "../../context/AuthContext"

const IconLogOutStyled = styled(RiLogoutBoxRLine)`
  margin-inline: auto;
`

const IconNotificationStyled = styled(RiUserAddLine)`
  margin-inline: auto;
`

export const HeaderNotification = () => {
  const { signOut } = useAuth()

  return (
    <HStack
      spacing={["2", "4"]}
      mx={["6", "8"]}
      pr={["6", "8"]}
      py="1"
      color="gray.500"
      borderRightWidth={1}
    >
      <IconButton
        aria-label="adicionar usuário"
        borderRadius="lg"
        _hover={{
          bgColor: "gray.200",
        }}
        variant="unstyled"
        icon={<IconNotificationStyled />}
        fontSize="20"
        disabled
        onClick={() => {}}
      />
      <IconButton
        aria-label="sair"
        borderRadius="lg"
        _hover={{
          bgColor: "gray.200",
        }}
        variant="unstyled"
        icon={<IconLogOutStyled />}
        fontSize="20"
        onClick={signOut}
      />
    </HStack>
  )
}
