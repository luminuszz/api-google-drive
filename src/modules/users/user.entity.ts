import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

type UserDocument = Document & User;

@Schema({
  collection: 'users',
})
class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop({ required: true })
  age: number;
}

const UserSchema = SchemaFactory.createForClass(User);

export { UserDocument, UserSchema, User };
