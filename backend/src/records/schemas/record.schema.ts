import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MedicalRecordDocument = HydratedDocument<MedicalRecord>;

@Schema({ strict: false })
export class MedicalRecord {
  @Prop({ required: true })
  title: string;

  @Prop()
  type: string;

  @Prop()
  date: string;

  @Prop({ type: Map, of: Object })
  dynamicFields: Record<string, any>;

  @Prop({ type: Buffer })
  file: Buffer;

  @Prop({ type: Buffer })
  thumbnail: Buffer;
}

export const MedicalRecordSchema = SchemaFactory.createForClass(MedicalRecord);
