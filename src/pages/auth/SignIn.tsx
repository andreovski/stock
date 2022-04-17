import React from "react"

import { Button, Flex, Stack } from "@chakra-ui/react"

import { Input } from "../../components/Form/Input"

const SignIn: React.FC = () => {
  return (
    <Flex width="100vw" height="100vh" align="center" justify="center">
      <Flex
        as="form"
        width="100%"
        maxW={360}
        bg="gray.800"
        p={8}
        borderRadius={8}
        direction="column"
      >
        <Stack spacing={4}>
          <Input name="email" type="email" label="E-mail" />
          <Input name="password" type="password" label="Senha" />
        </Stack>

        <Button type="submit" mt="6" colorScheme="pink" size="lg">
          Entrar
        </Button>
      </Flex>
    </Flex>
  )
}

export default SignIn
