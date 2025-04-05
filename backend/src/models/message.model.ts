import {
  prop,
  getModelForClass,
  modelOptions,
  type Ref,
  DocumentType,
} from "@typegoose/typegoose";
import { UserClass } from "./user.model";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

@modelOptions({ schemaOptions: { timestamps: true } })
export class MessageClass extends TimeStamps {
  @prop({ required: true, ref: () => UserClass })
  public senderId!: Ref<UserClass>;

  @prop({ required: true, ref: () => UserClass })
  public receiverId!: Ref<UserClass>;

  @prop()
  public text?: string;

  @prop()
  public image?: string;
}

export const Message = getModelForClass(MessageClass);
export type MessageDocument = DocumentType<MessageClass>;

export default Message;
