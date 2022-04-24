import { Text, Box } from "@chakra-ui/react"

interface IHeaderLogo {
  size?: string
}

export function HeaderLogo({ size = "3xl" }: IHeaderLogo) {
  return (
    <Box mx="2" minWidth={100}>
      <Text
        fontSize={["2xl", size]}
        fontWeight="bold"
        letterSpacing="tight"
        width="64"
      >
        Stock
        <Text as="span" ml="1" color="primary">
          .
        </Text>
        on
      </Text>
    </Box>
  )
}
