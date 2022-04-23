import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  useToast,
  VStack,
} from "@chakra-ui/react"
import * as Yup from "yup"
import { Field, Form, Formik } from "formik"
import { useNavigate } from "react-router-dom"
import { InputForm } from "../../../../components/Form/InputForm"
import { SectionTitle } from "../../../../components/SectionTitle"
import { useCallback, useMemo } from "react"

export function UsersCreate() {
  const navigate = useNavigate()
  const toast = useToast()

  const validationSchema = useMemo(() => {
    return Yup.object({
      name: Yup.string()
        .max(30, "O limite de caracteres deve ser menor ou igual a 30.")
        .required("Campo obrigatório"),
      workplace: Yup.string()
        .max(20, "O limite de caracteres deve ser menor ou igual a 20.")
        .required("Campo obrigatório"),
      cpd: Yup.number().required("Campo obrigatório"),
    })
  }, [])

  const onSubmit = useCallback(
    (values, formik) => {
      console.log(values)

      setTimeout(() => {
        formik.setSubmitting(false)
        formik.resetForm({})
        toast({
          title: "Usuário regristrado com sucesso.",
          status: "success",
          duration: 9000,
          isClosable: true,
        })

        navigate("/users")
      }, 1000)

      setTimeout(() => {}, 2500)
    },
    [toast, navigate]
  )

  return (
    <Box flex={1} borderRadius={8} bg="background.50" p="8">
      <Heading size="lg" fontWeight="normal" color="font">
        Novo usuário
      </Heading>

      <Divider my="6" borderColor="gray.400" />

      <SectionTitle title="Dados Básicos" />

      <Formik
        onSubmit={onSubmit}
        initialValues={{}}
        validationSchema={validationSchema}
        validateOnBlur={false}
      >
        {({ isSubmitting }) => (
          <Form>
            <VStack spacing="8">
              <SimpleGrid minChildWidth="240px" spacing="8" width="100%">
                <Field
                  name="name"
                  type="text"
                  title="Nome completo"
                  component={InputForm}
                  required
                />
              </SimpleGrid>

              <SimpleGrid minChildWidth="240px" spacing="8" width="100%">
                <Field
                  name="workplace"
                  type="text"
                  title="Centro de custo"
                  component={InputForm}
                  required
                />
                <Field
                  name="cpd"
                  type="number"
                  title="CPD"
                  component={InputForm}
                  required
                />
              </SimpleGrid>
            </VStack>

            <Flex mt="8" align="center" justify="flex-end">
              <HStack spacing="8">
                <Button
                  variant="unstyled"
                  disabled={isSubmitting}
                  onClick={() => navigate("/users")}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  colorScheme="blue"
                  loadingText="Salvando"
                  isLoading={isSubmitting}
                  disabled={isSubmitting}
                >
                  Salvar
                </Button>
              </HStack>
            </Flex>
          </Form>
        )}
      </Formik>
    </Box>
  )
}
