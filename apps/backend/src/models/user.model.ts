import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose';

@modelOptions({ schemaOptions: { timestamps: true } })
export class UserClass {
  @prop({ required: true, unique: true })
  public email!: string;
  
  @prop({ required: true })
  public fullName!: string;
  
  @prop({ required: true, minlength: 6 })
  public password!: string;
  
  @prop({ default: "" })
  public profilePic?: string;
}

export const User = getModelForClass(UserClass);
export default User;