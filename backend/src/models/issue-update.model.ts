import mongoose, { Document, Schema } from 'mongoose';

export interface IIssueUpdate extends Document {
  issueId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  newStatus: string;
  comment?: string;
  createdAt: Date;
  updatedAt: Date;
}

const IssueUpdateSchema: Schema = new Schema({
  issueId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Issue',
    required: [true, 'Please add an issue ID']
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please add a user ID']
  },
  newStatus: {
    type: String,
    enum: ['Pending', 'Assigned', 'In Progress', 'Completed', 'Rejected'],
    required: [true, 'Please add a new status']
  },
  comment: {
    type: String,
    trim: true,
    maxlength: [500, 'Comment cannot be more than 500 characters']
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

export default mongoose.model<IIssueUpdate>('IssueUpdate', IssueUpdateSchema); 