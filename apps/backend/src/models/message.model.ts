import { prop, getModelForClass, modelOptions, Ref } from '@typegoose/typegoose';
import { UserClass } from './user.model';

@modelOptions({ schemaOptions: { timestamps: true } })
export class MessageClass {
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
export default Message;