import {
  FormLabel,
  FormControl,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
} from "@chakra-ui/react"
import React from "react"

interface InputProps extends ChakraInputProps {
  name: string
  label?: string
}

export function Input({ name, label, ...props }: InputProps) {
  return (
    <FormControl>
      {!!label && <FormLabel htmlFor={name}>E-mail</FormLabel>}
      <ChakraInput
        name={name}
        focusBorderColor="pink.500"
        bgColor="gray.900"
        variant="filled"
        id="email"
        _hover={{ bgColor: "gray.900" }}
        size="lg"
        {...props}
      />
    </FormControl>
  )
}
