import { Button, Flex, Stack } from "@chakra-ui/react"
import { Field, Form, Formik } from "formik"
import { InputForm } from "../../../components/Form/InputForm"
import { SectionTitle } from "../../../components/SectionTitle"

import { AvatarField } from "../../../components/AvatarField"

export const CompleteRegister = () => {
  const onSubmit = (values) => {}

  return (
    <Flex
      width="100vw"
      height="100vh"
      direction="column"
      align="center"
      justify="center"
    >
      <Flex
        width="100%"
        maxWidth={600}
        bg="background.50"
        p={[4, 8]}
        borderRadius={8}
        direction="column"
      >
        <Formik onSubmit={onSubmit} initialValues={{}} validateOnBlur={false}>
          {({ values }) => (
            <Form noValidate>
              <AvatarField name="avatar" size="2xl" avatarFieldName={null} />

              <SectionTitle title="Complete seu cadastro" />

              <Stack spacing={8} minWidth={200}>
                <Field
                  title="Nome completo"
                  name="name"
                  required
                  validateFieldIndicator
                  component={InputForm}
                />

                <Button
                  mt="6"
                  size="lg"
                  // isLoading={isLoading}
                  loadingText="Navegando"
                  colorScheme="blue"
                  type="submit"
                >
                  Continuar
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      </Flex>
    </Flex>
  )
}
