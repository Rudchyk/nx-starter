export interface PasswordReset {
  email: string;
  code: string;
  createdAt: Date;
}

export interface PasswordResetItem extends PasswordReset {
  id: string;
}
