import { Request, Response } from "express";
import Todo from "../models/todoModel";

interface AuthRequest extends Request {
  userId?: string;
}

export const getTodos = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const todos = await Todo.find({ userId: req.userId }).sort({
      createdAt: -1,
    });
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const createTodo = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  const { title, text } = req.body;
  try {
    const todo = new Todo({
      title,
      text,
      userId: req.userId,
    });
    await todo.save();
    res.status(201).json(todo);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateTodo = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { title, text } = req.body;
  try {
    const todo = await Todo.findOneAndUpdate(
      { _id: id, userId: req.userId },
      { title, text },
      { new: true }
    );
    if (!todo) {
      res.status(404).json({ message: "Todo not found" });
      return;
    }
    res.status(200).json(todo);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteTodo = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const todo = await Todo.findOneAndDelete({ _id: id, userId: req.userId });
    if (!todo) {
      res.status(404).json({ message: "Todo not found" });
      return;
    }
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
