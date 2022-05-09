import {
  Icon,
  Input as ChakraInput,
  InputGroup,
  InputLeftElement,
  InputProps as ChakraInputProps,
  InputRightElement,
  Stack,
} from "@chakra-ui/react"
import { ElementType } from "react"

interface InputProps extends ChakraInputProps {
  iconLeft?: ElementType
  iconRight?: ElementType
}

export function Input({
  name,
  title,
  iconLeft: IconLeft,
  iconRight: IconRight,
  size = "lg",
  ...props
}: InputProps) {
  return (
    <Stack spacing={4}>
      <InputGroup>
        {IconLeft && (
          <InputLeftElement
            pointerEvents="none"
            children={<Icon as={IconRight} mt={2} mr={2} fontSize="22" />}
          />
        )}
        <ChakraInput
          id={name}
          name={name}
          placeholder={title}
          focusBorderColor={"primary"}
          bgColor="background.100"
          variant="filled"
          size="lg"
          {...props}
        />
        {IconRight && (
          <InputRightElement
            pointerEvents="none"
            children={<Icon as={IconRight} mt={2} mr={2} fontSize="22" />}
          />
        )}
      </InputGroup>
    </Stack>
  )
}
