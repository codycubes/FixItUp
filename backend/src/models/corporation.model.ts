import mongoose, { Document, Schema } from 'mongoose';

export interface ICorporation extends Document {
  name: string;
  location: string;
  createdAt: Date;
  updatedAt: Date;
}

const CorporationSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'Please add a corporation name'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  location: {
    type: String,
    required: [true, 'Please add a location'],
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

export default mongoose.model<ICorporation>('Corporation', CorporationSchema); 