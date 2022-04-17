import { Box, Flex, SimpleGrid, Text } from "@chakra-ui/react"

import { Header } from "../../../components/Header"
import { Sidebar } from "../../../components/Sidebar"

import Charts from "react-apexcharts"
import { theme } from "../../../styles/theme"

const series = [{ name: "series1", data: [3, 120, 10, 28, 51, 109] }]
const options = {
  chart: {
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
    foreColor: theme.colors.gray[500],
  },
  grid: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    enabled: false,
  },
  xaxis: {
    axisBorder: {
      color: theme.colors.gray[600],
    },
    axisTicks: {
      color: theme.colors.gray[600],
    },
    categories: ["21/11", "22/11", "23/11", "24/11", "25/11", "26/11"],
  },
  fill: {
    opacity: 0.3,
    type: "gradient",
    gradient: {
      shade: "dark",
      opacityFrom: 0.7,
      opacityTo: 0.3,
    },
  },
}

function Dashboard() {
  return (
    <Flex direction="column" height="100vh">
      <Header />

      <Flex width="100%" my="6" maxWidth={1488} mx="auto" px="6">
        <Sidebar />

        <SimpleGrid
          flex="1"
          gap="4"
          minChildWidth="320px"
          alignItems="flex-start"
        >
          <Box p="8" bg="gray.800" borderRadius={8} pb="4">
            <Text fontSize="lg" mb="4">
              Inscritos da semana
            </Text>
            <Charts
              options={options}
              series={series}
              type="area"
              height={160}
            />
          </Box>
          <Box p="8" bg="gray.800" borderRadius={8} pb="4">
            <Text fontSize="lg" mb="4">
              Taxa de abertura
            </Text>
            <Charts
              options={options}
              series={series}
              type="area"
              height={160}
            />
          </Box>
        </SimpleGrid>
      </Flex>
    </Flex>
  )
}

export default Dashboard
