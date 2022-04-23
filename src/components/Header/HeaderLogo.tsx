import { Text, Box } from "@chakra-ui/react"

export function HeaderLogo() {
  return (
    <Box mx="2" minWidth={100}>
      <Text
        fontSize={["2xl", "3xl"]}
        fontWeight="bold"
        letterSpacing="tight"
        width="64"
      >
        Store
        <Text as="span" ml="1" color="primary">
          .
        </Text>
      </Text>
    </Box>
  )
}
