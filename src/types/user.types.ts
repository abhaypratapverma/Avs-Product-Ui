// src/types/user.types.ts

export interface User {
  id: number;
  name: string;
  phone: string;
  email?: string;
  avatarUrl?: string;
  isProfileComplete: boolean;
  createdAt: string;
}
