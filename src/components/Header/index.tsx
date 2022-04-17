import { Avatar, Box, Flex, HStack, Icon, Input, Text } from "@chakra-ui/react"
import {
  RiNotificationLine,
  RiSearch2Line,
  RiUserAddLine,
} from "react-icons/ri"

export function Header() {
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
      <Text fontSize="3xl" fontWeight="bold" letterSpacing="tight" width="64">
        dashgo
        <Text as="span" ml="1" color="pink.500">
          .
        </Text>
      </Text>

      <Flex
        as="label"
        flex="1"
        py="4"
        px="8"
        ml="6"
        maxWidth={400}
        alignSelf="center"
        color="gray.200"
        position="relative"
        bg="gray.800"
        borderRadius="full"
      >
        <Input
          color="gray.50"
          variant="unstyled"
          px="4"
          mr="4"
          placeholder="Buscar na plataforma"
          _placeholder={{ color: "gray.400" }}
        />
        <Icon as={RiSearch2Line} fontSize="20" />
      </Flex>

      <Flex align="center" ml="auto">
        <HStack
          spacing="8"
          mx="8"
          pr="8"
          py="1"
          color="gray.300"
          borderRightWidth={1}
        >
          <Icon as={RiNotificationLine} fontSize="20" />
          <Icon as={RiUserAddLine} fontSize="20" />
        </HStack>

        <Flex align="center">
          <Box>
            <Text>André Luiz</Text>
            <Text color="gray.300" fontSize="small">
              andre@andre.com
            </Text>
          </Box>
        </Flex>

        <Box ml="4">
          <Avatar
            size="md"
            name="André Luiz"
            src="https://github.com/andreovski.png"
          />
        </Box>
      </Flex>
    </Flex>
  )
}
