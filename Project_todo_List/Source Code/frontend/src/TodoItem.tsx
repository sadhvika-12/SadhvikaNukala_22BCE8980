import React from "react";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

// Define the types for props
interface TodoItemProps {
  todo: {
    _id: string; // Changed from 'id: number' to '_id: string'
    title: string;
    text: string;
  };
  onDelete: (id: string) => void; // Changed from 'number' to 'string'
  onEdit: (id: string) => void; // Changed from 'number' to 'string'
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onDelete, onEdit }) => {
  return (
    <div className="flex justify-between items-center p-4 bg-black/30 border z-10 backdrop-filter backdrop-blur-sm shadow-lg rounded-lg mx-7 text-white">
      <div className="flex flex-col">
        <span className="font-semibold text-lg">{todo.title}</span>
        <span className="text-sm">{todo.text}</span>
      </div>
      <div className="flex flex-row gap-5">
        <button onClick={() => onEdit(todo._id)}>
          <FaEdit className="text-blue-600 px-1 py-1 rounded w-7 h-7" />
        </button>
        <button onClick={() => onDelete(todo._id)}>
          <RiDeleteBin6Line className="text-red-600 px-1 py-1 rounded w-7 h-7" />
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
