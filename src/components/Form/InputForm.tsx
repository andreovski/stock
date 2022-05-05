import {
  FormControl,
  FormErrorMessage,
  Icon,
  Input as ChakraInput,
  InputGroup,
  InputProps as ChakraInputProps,
  InputRightElement,
} from "@chakra-ui/react"
import { getIn } from "formik"
import { useMemo } from "react"
import { RiCheckLine } from "react-icons/ri"

interface InputProps extends ChakraInputProps {
  title: string
  required?: boolean
  field?: any
  form?: any
  validateFieldIndicator?: boolean
}

export function InputForm({
  title,
  field,
  form,
  required = false,
  validateFieldIndicator,
  ...props
}: InputProps) {
  const { name, value } = field
  const { errors, touched, submitCount } = form

  const error = getIn(errors, name)
  const wasTouched = getIn(touched, name)

  const titleValidated = useMemo(() => {
    return !required ? title : title.concat(" *")
  }, [title, required])

  const isValid = useMemo(() => {
    if (validateFieldIndicator && !error && value?.length > 3) {
      return true
    }

    return false
  }, [validateFieldIndicator, error, value])

  return (
    <FormControl
      isInvalid={(!!error && !!wasTouched) || (submitCount > 0 && !!error)}
    >
      <InputGroup>
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
        {isValid && (
          <InputRightElement
            pointerEvents="none"
            children={
              <Icon
                as={RiCheckLine}
                color="green"
                mt={2}
                mr={2}
                fontSize="22"
              />
            }
          />
        )}
      </InputGroup>
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  )
}
