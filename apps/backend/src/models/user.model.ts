import {
  prop,
  getModelForClass,
  modelOptions,
  pre,
  DocumentType,
} from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import bcrypt from "bcryptjs";

@pre<UserClass>("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
})
@modelOptions({ schemaOptions: { timestamps: true } })
export class UserClass extends TimeStamps {
  @prop({ required: true, unique: true })
  public email!: string;

  @prop({ required: true })
  public fullName!: string;

  @prop({ required: true, minlength: 6 })
  public password!: string;

  @prop({ default: "" })
  public profilePic?: string;

  public async isPasswordCorrect(
    this: DocumentType<UserClass>,
    password: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }
}

export const User = getModelForClass(UserClass);
export type UserDocument = DocumentType<UserClass>;

export default User;
