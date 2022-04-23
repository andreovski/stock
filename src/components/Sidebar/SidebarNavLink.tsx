import { Icon, Link, Text, LinkProps } from "@chakra-ui/react"
import { ElementType, memo, ReactNode, useEffect, useState } from "react"
import { Link as RouterLink, useLocation } from "react-router-dom"

interface SidebarNavLinkProps extends LinkProps {
  icon: ElementType
  link: string
  children: ReactNode
}

export const SidebarNavLink = memo(
  ({ icon, children, link, ...props }: SidebarNavLinkProps) => {
    const [active, setActive] = useState(false)
    const { pathname } = useLocation()

    useEffect(() => {
      if (pathname.includes(link)) {
        setActive(true)
      } else {
        setActive(false)
      }
    }, [pathname, link])

    return (
      <Link
        as={RouterLink}
        to={link}
        display="flex"
        alignItems="center"
        color={active && "primary"}
        {...props}
      >
        <Icon as={icon} fontSize="20" />
        <Text ml="2" fontWeight="medium">
          {children}
        </Text>
      </Link>
    )
  }
)
