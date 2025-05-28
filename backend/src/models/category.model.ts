import mongoose, { Document, Schema } from 'mongoose';

export interface ICategory extends Document {
  name: string;
}

const CategorySchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'Please add a category name'],
    trim: true,
    unique: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  }
});

export default mongoose.model<ICategory>('Category', CategorySchema); 