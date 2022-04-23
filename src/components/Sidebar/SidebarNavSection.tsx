import { Box, Stack, Text } from "@chakra-ui/react"
import { ReactNode } from "react"

interface SidebarNavSectionProps {
  title: string
  children: ReactNode
}

export const SidebarNavSection = ({
  title,
  children,
}: SidebarNavSectionProps) => {
  return (
    <Box>
      <Text fontWeight="bold" color="gray.500" fontSize="small">
        {title}
      </Text>
      <Stack spacing="4" mt="8" align="stretch">
        {children}
      </Stack>
    </Box>
  )
}
