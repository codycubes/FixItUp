import mongoose, { Document, Schema } from 'mongoose';

export interface IIssueImage extends Document {
  issueId: mongoose.Types.ObjectId;
  imageUrl: string;
  createdAt: Date;
}

const IssueImageSchema: Schema = new Schema({
  issueId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Issue',
    required: [true, 'Please add an issue ID']
  },
  imageUrl: {
    type: String,
    required: [true, 'Please add an image URL']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model<IIssueImage>('IssueImage', IssueImageSchema); 