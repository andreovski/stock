import {
  Input as ChakraInput,
  InputGroup,
  InputLeftElement,
  InputProps as ChakraInputProps,
  Stack,
} from "@chakra-ui/react"

interface InputProps extends ChakraInputProps {
  iconLeft?: React.FC
  iconRight?: React.FC
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
          <InputLeftElement pointerEvents="none" children={<IconLeft />} />
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
          <InputLeftElement pointerEvents="none" children={<IconRight />} />
        )}
      </InputGroup>
    </Stack>
  )
}
