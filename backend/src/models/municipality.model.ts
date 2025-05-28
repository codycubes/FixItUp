import mongoose, { Document, Schema } from 'mongoose';

export interface IMunicipality extends Document {
  name: string;
  location: string;
  corporationId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const MunicipalitySchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'Please add a municipality name'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  location: {
    type: String,
    required: [true, 'Please add a location'],
    trim: true
  },
  corporationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Corporation',
    required: [true, 'Please add a corporation ID']
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

export default mongoose.model<IMunicipality>('Municipality', MunicipalitySchema); 