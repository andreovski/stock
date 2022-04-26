import {
  FormControl,
  FormErrorMessage,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
} from "@chakra-ui/react"
import { getIn } from "formik"
import { useMemo } from "react"

interface InputProps extends ChakraInputProps {
  title: string
  required?: boolean
  field?: any
  form?: any
}

export function InputForm({
  title,
  field,
  form,
  required = false,
  ...props
}: InputProps) {
  const { name } = field
  const { errors, touched, submitCount } = form

  const error = getIn(errors, name)
  const wasTouched = getIn(touched, name)

  const titleValidated = useMemo(() => {
    return !required ? title : title.concat(" *")
  }, [title, required])

  return (
    <FormControl
      isInvalid={(!!error && !!wasTouched) || (submitCount > 0 && !!error)}
    >
      <ChakraInput
        id={name}
        name={name}
        placeholder={titleValidated}
        focusBorderColor={"primary"}
        bgColor="background.100"
        variant="filled"
        size="lg"
        {...field}
        {...props}
      />
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  )
}
