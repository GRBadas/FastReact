import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import Header from "./components/Header"
import Todos from "./components/Todos"


function App() {


  return (
    <ChakraProvider value={defaultSystem}>
      <Header></Header>
      <Todos></Todos>
    </ChakraProvider>
  )
}

export default App
