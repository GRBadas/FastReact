from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

todos = [
  { "id": "1", "item": "Comprar pão"},
  { "id": "2", "item": "Estudar Django"}
]

origins = [
  "http://localhost:5173",
  "localhost:5173"
]

app.add_middleware(
  CORSMiddleware,
  allow_origins=origins,
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"]
)

@app.get("/", tags=["root"])
async def read_root() -> dict:
  return {"message": "Bem vindo ao site"}

@app.get("/todo", tags=["todos"])
async def read_todo() -> dict:
  return {"data": todos}

@app.post("/todo", tags=["todos"])
async def create_todo(todo: dict) -> dict:
  todos.append(todo)
  return {
    "data": { "Todo adicionado "}
  }