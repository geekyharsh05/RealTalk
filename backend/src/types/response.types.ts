export interface UserResponse {
  _id: string;
  email: string;
  fullName: string;
  profileImage?: string;
  createdAt: Date | undefined;
  updatedAt: Date | undefined;
}

export interface AuthResponse {
  token: string;
  user: UserResponse;
}

export interface UpdateInput {
  profilePic: string;
}

export interface UpdateResponse {
  userId: string;
  profilePic: string;
}
