import { Avatar, Box, Flex, Text } from "@chakra-ui/react"

interface HeaderAvatarProps {
  showProfileData: boolean
}

export const HeaderAvatar = ({ showProfileData }: HeaderAvatarProps) => {
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>André Luiz</Text>
          <Text color="gray.400" fontSize="small">
            andre@andre.com
          </Text>
        </Box>
      )}

      <Box ml="4">
        <Avatar
          size="md"
          name="André Luiz"
          src="https://github.com/andreovski.png"
        />
      </Box>
    </Flex>
  )
}
