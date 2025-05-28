import mongoose, { Document, Schema } from 'mongoose';

export interface IRole extends Document {
  roleName: string;
}

const RoleSchema: Schema = new Schema({
  roleName: {
    type: String,
    required: [true, 'Please add a role name'],
    enum: ['Super Admin', 'System Admin', 'Municipality Admin', 'Manager', 'Contractor', 'User'],
    unique: true
  }
});

export default mongoose.model<IRole>('Role', RoleSchema); 