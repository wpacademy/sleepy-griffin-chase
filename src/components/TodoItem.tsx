import React from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TodoItemProps {
  id: string;
  text: string;
  completed: boolean;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ id, text, completed, onToggleComplete, onDelete }) => {
  return (
    <div className="flex items-center justify-between p-3 border-b last:border-b-0">
      <div className="flex items-center space-x-3">
        <Checkbox
          id={`todo-${id}`}
          checked={completed}
          onCheckedChange={() => onToggleComplete(id)}
        />
        <label
          htmlFor={`todo-${id}`}
          className={cn(
            "text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
            completed ? "line-through text-gray-500" : ""
          )}
        >
          {text}
        </label>
      </div>
      <Button variant="ghost" size="icon" onClick={() => onDelete(id)}>
        <Trash2 className="h-4 w-4 text-red-500" />
      </Button>
    </div>
  );
};

export default TodoItem;