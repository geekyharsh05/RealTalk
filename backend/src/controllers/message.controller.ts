import { Request, RequestHandler, Response } from "express";
import { MessageService } from "../services/message.service";
import { asyncHandler } from "../utils/asyncHandler.util";

export class MessageController {
  private messageService: MessageService;

  constructor() {
    this.messageService = new MessageService();
  }

  public getUsersForSidebar: RequestHandler = asyncHandler(
    async (req: Request) => {
      const result = await this.messageService.fetchUsersForSidebar(
        req.user._id,
      );
      return {
        message: "Users filtered successfully",
        result,
      };
    },
  );

  public getMessages: RequestHandler = asyncHandler(async (req: Request) => {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;
    const result = await this.messageService.fetchMessagesBetweenUsers(
      userToChatId,
      myId,
    );
    return {
      message: "Message retrieved successfully",
      result,
    };
  });

  public sendMessage: RequestHandler = asyncHandler(async (req: Request) => {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    const result = await this.messageService.createMessage(
      senderId,
      receiverId,
      text,
      image,
    );
    return {
      message: "Message sended successfully",
      result,
    };
  });
}
