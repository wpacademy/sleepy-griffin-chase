import React, { useState } from 'react';
import TodoItem from './TodoItem';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from 'lucide-react';
import { showSuccess, showError } from '@/utils/toast';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoText, setNewTodoText] = useState<string>('');

  const addTodo = () => {
    if (newTodoText.trim() === '') {
      showError("Todo text cannot be empty!");
      return;
    }
    const newTodo: Todo = {
      id: Date.now().toString(),
      text: newTodoText.trim(),
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setNewTodoText('');
    showSuccess("Todo added successfully!");
  };

  const toggleComplete = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
    showSuccess("Todo status updated!");
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
    showSuccess("Todo deleted successfully!");
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="text-center text-2xl">My Todo List</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2 mb-4">
          <Input
            type="text"
            placeholder="Add a new todo..."
            value={newTodoText}
            onChange={(e) => setNewTodoText(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                addTodo();
              }
            }}
          />
          <Button onClick={addTodo}>
            <Plus className="h-4 w-4 mr-2" /> Add
          </Button>
        </div>
        {todos.length === 0 ? (
          <p className="text-center text-gray-500">No todos yet! Add one above.</p>
        ) : (
          <div className="border rounded-md divide-y">
            {todos.map(todo => (
              <TodoItem
                key={todo.id}
                id={todo.id}
                text={todo.text}
                completed={todo.completed}
                onToggleComplete={toggleComplete}
                onDelete={deleteTodo}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TodoList;