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
          name={name}
          color="font"
          bgColor="background.200"
          _focus={{
            backgroundColor: "background.50",
            transition: 0.8,
          }}
          variant="outline"
          id={name}
          size={size}
          {...props}
        />
        {IconRight && (
          <InputLeftElement pointerEvents="none" children={<IconRight />} />
        )}
      </InputGroup>
    </Stack>
  )
}
