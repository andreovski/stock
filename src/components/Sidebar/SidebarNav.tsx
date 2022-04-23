import { Stack, Text } from "@chakra-ui/react"
import {
  RiArchiveLine,
  RiContactsLine,
  RiDashboardLine,
  RiToolsLine,
} from "react-icons/ri"

import { SidebarNavSection } from "./SidebarNavSection"
import { SidebarNavLink } from "./SidebarNavLink"

export function SidebarNav() {
  return (
    <Stack spacing="12" align="flex-start">
      <SidebarNavSection title="GERAL">
        <SidebarNavLink link="/dashboard" icon={RiDashboardLine}>
          <Text ml="4" fontWeight="medium">
            Dashboard
          </Text>
        </SidebarNavLink>
      </SidebarNavSection>

      <SidebarNavSection title="CADASTROS">
        <SidebarNavLink link="users" icon={RiContactsLine}>
          <Text ml="4" fontWeight="medium">
            Usuários
          </Text>
        </SidebarNavLink>
        <SidebarNavLink link="stock" icon={RiArchiveLine}>
          <Text ml="4" fontWeight="medium">
            Estoque
          </Text>
        </SidebarNavLink>
      </SidebarNavSection>

      <SidebarNavSection title="FLUXOS">
        <SidebarNavLink link="tools" icon={RiToolsLine}>
          <Text ml="4" fontWeight="medium">
            Ferramentas solicitadas
          </Text>
        </SidebarNavLink>
      </SidebarNavSection>
    </Stack>
  )
}
