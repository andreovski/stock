import React, { useCallback, useMemo } from "react"

import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Flex,
  IconButton,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react"

import { useAuth } from "../../context/AuthContext"

import { HeaderLogo } from "../../components/Header/HeaderLogo"
import { useNavigate } from "react-router-dom"
import { Field, Form, Formik } from "formik"

import { InputForm } from "../../components/Form/InputForm"

import * as Yup from "yup"
import { RiArrowLeftLine } from "react-icons/ri"

export const SignUp: React.FC = () => {
  const navigate = useNavigate()
  const { createAccount } = useAuth()

  const invalidPassword = "A senha não atende as exigências!"

  const validationSchema = useMemo(() => {
    return Yup.object({
      email: Yup.string()
        .email("E-mail não valido.")
        .required("Campo obrigatório."),
      password: Yup.string()
        .required("Campo obrigatório.")
        .matches(
          /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
          invalidPassword
        ),
      confirm_password: Yup.string()
        .required("Campo obrigatório")
        .oneOf([Yup.ref("password"), null], "Senhas não conferem!"),
    })
  }, [])

  const warningPasswordMessage = (error) => {
    return (error?.password || "").includes(invalidPassword)
  }

  const onSubmit = useCallback(
    (values, formik) => {
      createAccount({ email: values.email, password: values.password })
        .then(() => formik.setSubmitting(false))
        .finally(() => navigate("/"))
    },
    [navigate, createAccount]
  )

  return (
    <Flex
      height="100vh"
      width="100vw"
      direction="column"
      align="center"
      justify="center"
    >
      <Flex textAlign="center" mb="8">
        <HeaderLogo size="4xl" />
      </Flex>
      <Flex
        width="100%"
        maxWidth={600}
        bg="background.50"
        p={[4, 8]}
        borderRadius={8}
        direction="column"
      >
        <Formik
          onSubmit={onSubmit}
          initialValues={{}}
          validationSchema={validationSchema}
          validateOnBlur={false}
        >
          {({ isSubmitting, errors }) => {
            return (
              <Form noValidate>
                <Stack spacing={4} minWidth={200}>
                  <Field
                    name="email"
                    type="email"
                    title="E-mail"
                    component={InputForm}
                  />

                  <SimpleGrid minChildWidth={200} spacing={4} width="100%">
                    <Field
                      name="password"
                      type="password"
                      title="Senha"
                      component={InputForm}
                    />
                    <Field
                      name="confirm_password"
                      type="password"
                      title="Confirme sua senha"
                      component={InputForm}
                    />
                  </SimpleGrid>
                </Stack>

                {warningPasswordMessage(errors) && (
                  <Flex mt={4}>
                    <Alert status="warning" borderRadius={6}>
                      <AlertIcon mr="6" />
                      <Box>
                        <AlertTitle mb="2">Sua senha deve conter:</AlertTitle>
                        <AlertDescription>
                          <Text>{`Letras maiusculas e minusculas.`}</Text>
                          <Text>{`Ao menos um número.`}</Text>
                          <Text>{`Ao menos um caracter especial.`}</Text>
                        </AlertDescription>
                      </Box>
                    </Alert>
                  </Flex>
                )}

                <Flex direction="row" align="flex-end" justify="space-between">
                  <IconButton
                    aria-label="voltar"
                    variant="outline"
                    colorScheme="blue"
                    size="lg"
                    icon={<RiArrowLeftLine size={25} />}
                    mr="4"
                    onClick={() => navigate("/signin")}
                  />
                  <Button
                    type="submit"
                    mt="6"
                    colorScheme="blue"
                    size="lg"
                    isLoading={isSubmitting}
                    isDisabled={isSubmitting}
                    isFullWidth
                  >
                    Criar conta
                  </Button>
                </Flex>
              </Form>
            )
          }}
        </Formik>
      </Flex>
    </Flex>
  )
}
