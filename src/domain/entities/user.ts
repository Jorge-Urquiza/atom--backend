export interface User {
  id?: string;
  email: string;
  createdAt: Date;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
}