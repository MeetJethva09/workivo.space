import { model, Schema, Types } from 'mongoose';
import bcrypt from 'bcrypt';

export interface User {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'employee';
  departmentId?: Types.ObjectId;
  managerId?: Types.ObjectId;
}

const userSchema = new Schema<User>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      enum: ['admin', 'manager', 'employee'],
      default: 'employee',
      required: true,
    },
  },
  { timestamps: true },
);

userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const UserModel = model<User>('User', userSchema);

export default UserModel;
