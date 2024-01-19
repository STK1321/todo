import React, { useState, useEffect } from 'react'
import { Todos } from './components/Todos'
import { type TodoTitle, type FilterValue, type TodoCompleted, type TodoId } from './types'
import { TODO_FILTERS } from './const'
import { Footer } from './components/Footer'
import { Header } from './components/Header'

const mockTodos: Todo[] = [
  {
    id: '1',
    title: 'Ir al Gym',
    completed: true
  },
  {
    id: '2',
    title: 'Comprar pañales de bebe',
    completed: false
  },
  {
    id: '3',
    title: 'Ahorro 2024',
    completed: false
  }
]

interface Todo {
  id: string
  title: string
  completed: boolean
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const storedTodos = localStorage.getItem('todos')
    return storedTodos !== null && storedTodos !== undefined ? JSON.parse(storedTodos) : mockTodos
  })

  const [filterSelected, setFilterSelected] = useState<FilterValue>(TODO_FILTERS.ALL)

  const handleRemoveAllCompleted = (): void => {
    const newTodos = todos.filter((todo) => !todo.completed)
    setTodos(newTodos)
  }

  const handleRemove = ({ id }: TodoId): void => {
    const newTodos = todos.filter((todo) => todo.id !== id)
    setTodos(newTodos)
  }

  const handleCompleted = ({ id, completed }: { id: TodoId, completed: TodoCompleted }): void => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id.id) {
        return {
          ...todo,
          completed: completed.completed
        }
      }
      return todo
    })

    setTodos(newTodos)
  }

  const handleFilterChange = (filter: FilterValue): void => {
    setFilterSelected(filter)
  }

  const activeCount = todos.filter((todo) => !todo.completed).length
  const completedCount = todos.length - activeCount

  const filteredTodos = todos.filter((todo) => {
    if (filterSelected === TODO_FILTERS.ACTIVE) return !todo.completed
    if (filterSelected === TODO_FILTERS.COMPLETED) return todo.completed
    return todos
  })

  const handleAddTodo = ({ title }: TodoTitle): void => {
    const newTodo: Todo = {
      title,
      id: crypto.randomUUID(),
      completed: false
    }

    const newTodos: Todo[] = [...todos, newTodo]
    setTodos(newTodos)
  }

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos')
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    setTodos(storedTodos !== null && storedTodos !== undefined ? JSON.parse(storedTodos) : mockTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  return (
    <div className='todoapp'>
      <Header onAddTodo={handleAddTodo} />
      <Todos onToggleCompleteTodo={handleCompleted} onRemoveTodo={handleRemove} todos={filteredTodos} />
      <Footer
        activeCount={activeCount}
        completedCount={completedCount}
        filterSelected={filterSelected}
        onClearCompleted={handleRemoveAllCompleted}
        handleFilterChange={handleFilterChange}
      />
    </div>
  )
}

export default App
