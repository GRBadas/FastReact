import React, { useEffect, useState, createContext, useContext } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Input,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
  Stack,
  Text,
  DialogActionTrigger,
} from "@chakra-ui/react";

interface Todo {
  id: string,
  item: string
  }

  const TodosContext = createContext({
    todos: [], fetchTodos: ()=>{}
  })

const Todos = () => {
  const[todos, setTodos] = useState([])

  const fetchTodos = async () => {
    const response = await fetch("http://localhost:8000/todo")
    const todos = await response.json()
    setTodos(todos.data)
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  function AddTodo() {
    const [item, setItem] = React.useState("")
    const {todos, fetchTodos} = React.useContext(TodosContext)

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
      setItem(event?.target.value)
    }

    const handleSubmit = () => {
      event?.preventDefault()
      const newTodo = {
        "id": todos.length +1,
        "item": item
      }

      fetch("http://localhost:8000/todo", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(newTodo)
      }).then(fetchTodos)
    }

    return (
      <form onSubmit={handleSubmit}>
        <input
         type="text"
         placeholder="Add a todo item"
         aria-label="Add a todo item"
         onChange={handleInput}
        />
      </form>
    )

  }


  return (
    <TodosContext.Provider value={{todos, fetchTodos}}>
    <Container maxW="container.xl" pt="100px">
      <AddTodo/>
      <Stack gap={5}>
        {todos.map((todo: Todo) => (
          <b key={todo.id}>{todo.item}</b>
        ))}
      </Stack>
    </Container>
  </TodosContext.Provider>
  )
}

export default Todos