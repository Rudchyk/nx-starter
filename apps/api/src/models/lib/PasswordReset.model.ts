import { Document, Schema, model, Model } from 'mongoose';
import { PasswordReset } from '@interfaces';

export type PasswordResetSchemaInterface = PasswordReset & Document;

type PasswordResetModelInterface = Model<PasswordResetSchemaInterface>;

const PasswordResetSchema = new Schema<PasswordResetSchemaInterface, PasswordResetModelInterface>({
  email: String,
  code: String,
  createdAt: Date,
});

PasswordResetSchema.pre('save', function () {
  this.createdAt = new Date();
});

export const PasswordResetModel = model<PasswordResetSchemaInterface, PasswordResetModelInterface>('PasswordReset', PasswordResetSchema);

export default PasswordResetModel;
