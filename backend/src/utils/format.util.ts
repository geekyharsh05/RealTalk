import { UserDocument } from "../models/user.model";

export const formatUserResponse = (user: UserDocument) => {
  return {
    _id: user._id.toString(),
    fullName: user.fullName,
    email: user.email,
    profilePic: user.profilePic || null,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};
