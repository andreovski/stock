import { Button } from "@chakra-ui/react"

interface PaginationItemProps {
  isCurrent?: boolean
  number: number
}

export const PaginationItem = ({
  isCurrent = false,
  number,
}: PaginationItemProps) => {
  if (isCurrent) {
    return (
      <Button
        size="sm"
        fontSize="xs"
        width="4"
        variant="outline"
        colorScheme="blue"
        disabled
        _disabled={{
          cursor: "default",
        }}
      >
        {number}
      </Button>
    )
  }

  return (
    <Button
      size="sm"
      fontSize="xs"
      width="4"
      bg="gray.200"
      _hover={{
        bg: "primary",
      }}
    >
      {number}
    </Button>
  )
}
