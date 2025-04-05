import User from "../models/user.model";
import Message from "../models/message.model";
import { uploadImageToCloudinary } from "../lib/cloudinary";
import { getReceiverSocketId, io } from "../lib/socket";

export class MessageService {
  public async fetchUsersForSidebar(loggedInUserId: string) {
    return await User.find({ _id: { $ne: loggedInUserId } }).select(
      "-password",
    );
  }

  public async fetchMessagesBetweenUsers(myId: string, userToChatId: string) {
    return await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });
  }

  public async createMessage(
    senderId: string,
    receiverId: string,
    text: string,
    image: string,
  ) {
    const imageUrl = image ? await uploadImageToCloudinary(image) : undefined;

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    return newMessage;
  }
}
