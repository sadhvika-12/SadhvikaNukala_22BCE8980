import mongoose, { Document, Schema } from "mongoose";

export interface ITodo extends Document {
  title: string;
  text: string;
  userId: string;
  createdAt: Date;
}

const TodoSchema: Schema = new Schema<ITodo>({
  title: { type: String, required: true },
  text: { type: String, required: true },
  userId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<ITodo>("Todo", TodoSchema);
