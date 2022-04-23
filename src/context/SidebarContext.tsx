import { useDisclosure, UseDisclosureReturn } from "@chakra-ui/react"
import { createContext, ReactNode, useContext, useEffect } from "react"
import { useLocation } from "react-router-dom"

interface SidebarDrawerProviderProps {
  children: ReactNode
}

type SidebarDrawerContextDataProps = UseDisclosureReturn

const SidebarDrawerContext = createContext({} as SidebarDrawerContextDataProps)

export function SidebarDrawerProvider({
  children,
}: SidebarDrawerProviderProps) {
  const disclosure = useDisclosure()
  const route = useLocation()

  useEffect(() => {
    if (disclosure.isOpen) {
      disclosure.onClose()
    }

    //eslint-disable-next-line
  }, [route])

  return (
    <SidebarDrawerContext.Provider value={disclosure}>
      {children}
    </SidebarDrawerContext.Provider>
  )
}

export const useSidebarDrawer = () => useContext(SidebarDrawerContext)
