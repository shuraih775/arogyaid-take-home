import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RecordsService } from './records.service';
import { RecordsController } from './records.controller';
import { MedicalRecord, MedicalRecordSchema } from './schemas/record.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: MedicalRecord.name, schema: MedicalRecordSchema }])],
  controllers: [RecordsController],
  providers: [RecordsService],
})
export class RecordsModule {}
