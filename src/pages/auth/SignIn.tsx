import React from "react"

import { Button, Flex, Stack } from "@chakra-ui/react"

import { useAuth } from "../../context/AuthContext"

import { Input } from "../../components/Form/Input"
import { FcGoogle } from "react-icons/fc"
import { HeaderLogo } from "../../components/Header/HeaderLogo"
import { useNavigate } from "react-router-dom"

export const SignIn: React.FC = () => {
  const { signInWithGoogle } = useAuth()

  const navigate = useNavigate()

  const handleLoginWithGoogle = () => {
    signInWithGoogle().then(() => navigate("/dashboard"))
  }

  return (
    <Flex
      width="100vw"
      height="100vh"
      direction="column"
      align="center"
      justify="center"
    >
      <Flex textAlign="center" mb="8">
        <HeaderLogo size="4xl" />
      </Flex>
      <Flex
        as="form"
        width="100%"
        maxW={360}
        bg="background.50"
        p={8}
        borderRadius={8}
        direction="column"
      >
        <Flex align="center" mb="6">
          <Button
            colorScheme="blue"
            variant="outline"
            isFullWidth
            onClick={handleLoginWithGoogle}
            leftIcon={<FcGoogle fontSize="20" />}
          >
            Login com Google
          </Button>
        </Flex>
        <Stack spacing={4}>
          <Input name="email" type="email" title="E-mail" />
          <Input name="password" type="password" title="Senha" />
        </Stack>

        <Button type="submit" mt="6" colorScheme="blue" size="lg">
          Entrar
        </Button>
      </Flex>
    </Flex>
  )
}
