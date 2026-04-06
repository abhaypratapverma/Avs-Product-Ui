export interface User {
  id: number;
  name: string;
  phone: string;
  email?: string;
  avatarUrl?: string;
  isProfileComplete: boolean;
  createdAt: string;
}

export interface UserProfile {
  name: string;
  email?: string;
  avatarUrl?: string;
}
