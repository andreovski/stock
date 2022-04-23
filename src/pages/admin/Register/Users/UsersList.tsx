import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Icon,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
} from "@chakra-ui/react"
import { RiAddLine, RiPencilLine } from "react-icons/ri"

import { Pagination } from "../../../../components/Pagination"
import { useNavigate } from "react-router-dom"
import { memo, Suspense } from "react"

export const UsersList = memo(() => {
  return (
    <Suspense fallback={<Spinner color="primary" alignSelf="center" />}>
      <UsersListComp />
    </Suspense>
  )
})

const UsersListComp = () => {
  const navigate = useNavigate()

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  })

  const handleCreateUser = () => {
    navigate("/users/create")
  }

  return (
    <Box flex={1} borderRadius={8} bg="background.50" p="8">
      <Flex mb="8" mx={22} justify="space-between" align="center">
        <Heading size="lg" fontWeight="normal">
          Usuários
        </Heading>

        <Button
          as="a"
          size="sm"
          fontSize="sm"
          colorScheme="blue"
          leftIcon={<Icon as={RiAddLine} fontSize="20" />}
          onClick={handleCreateUser}
        >
          Novo
        </Button>
      </Flex>

      <Table colorScheme="blackAlpha">
        <Thead>
          {!isWideVersion ? (
            <Tr>
              <Th color="gray.500">Nome / Centro de custo</Th>
            </Tr>
          ) : (
            <Tr>
              <Th px="6" width="8" />
              <Th color="gray.500">Nome / Centro de custo</Th>
              <Th color="gray.500">CPD</Th>
              <Th width={8} />
            </Tr>
          )}
        </Thead>

        <Tbody>
          <Tr>
            {isWideVersion && (
              <Td px="6">
                <Checkbox colorScheme="blue" />
              </Td>
            )}

            <Td>
              <Box>
                <Text fontWeight="bold">André Luiz</Text>
                <Text fontSize="sm" color="gray.600">
                  Elétrica
                </Text>
              </Box>
            </Td>

            {isWideVersion && (
              <Td>
                <Text>123456789</Text>
              </Td>
            )}

            <Td textAlign="end">
              <Button as="a" size="sm" fontSize="sm" colorScheme="blue">
                <Icon as={RiPencilLine} fontSize="20" />
              </Button>
            </Td>
          </Tr>
        </Tbody>
      </Table>

      <Pagination />
    </Box>
  )
}
