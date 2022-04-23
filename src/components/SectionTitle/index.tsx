import { Flex, Icon, Stack, Text, FlexProps } from "@chakra-ui/react"
import { ElementType } from "react"
import { RiFileList2Line } from "react-icons/ri"

interface ISectionTitle extends FlexProps {
  title: string
  icon?: ElementType
}

export function SectionTitle({
  title,
  icon = RiFileList2Line,
  ...props
}: ISectionTitle) {
  return (
    <Flex my="8" {...props}>
      <Stack direction="row" spacing="4" align="center">
        <Icon as={icon} color="gray.500" fontSize="25" />
        <Text color="gray.500" fontSize="lg">
          {title}
        </Text>
      </Stack>
    </Flex>
  )
}
