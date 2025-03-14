import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MedicalRecord, MedicalRecordDocument } from './schemas/record.schema';
import * as fs from 'fs';
import * as path from 'path';


@Injectable()
export class RecordsService {
  constructor(@InjectModel(MedicalRecord.name) private recordModel: Model<MedicalRecordDocument>) {}

  async findAll(): Promise<MedicalRecord[]> {
    return this.recordModel.find().lean().exec();
  }
  

  async findById(id: string): Promise<MedicalRecord> {
    const record = await this.recordModel.findById(id).exec();
    if (!record) {
      throw new NotFoundException('Record not found');
    }
    return record;
  }

  async createData(): Promise<MedicalRecord[]> {
    const pdfPath = path.join(process.cwd(), 'med_report.pdf');
    const thumbnailPath = path.join(process.cwd(), 'thumbnail.jpg');

    const mriPdfPath = path.join(process.cwd(), 'mri-doc.pdf');
    const mriThumbnailPath = path.join(process.cwd(), 'mri_thumbnail.jpg');

    const pdfBuffer = fs.readFileSync(pdfPath);
    const thumbnailBuffer = fs.readFileSync(thumbnailPath);

    const mriPdfBuffer = fs.readFileSync(mriPdfPath);
    const mriTthumbnailBuffer = fs.readFileSync(mriThumbnailPath);

    const data = [
      {
        title: 'MRI : Brain',
        type: 'Imaging',
        date: 'Dec 5th, 2024',
        dynamicFields: {
          doctor: 'Dr. Surabhi Anand',
          description:
            'The patient presented with occasional headaches and dizziness',
          findings: 'This MRI of the brain reveals no significant abnormalities.',
        },
        file: mriPdfBuffer,
        thumbnail: mriTthumbnailBuffer,
      },
      {
        title: 'Thyroid Profile',
        type: 'Labs',
        date: 'Nov 25th, 2024',
        dynamicFields: {
          results: [
            { label: 'Basophils', value: '10*3/uL' },
            { label: 'BUN/Creatine Blood', value: '29' },
            { label: 'Calcium (Blood)', value: '10.1 mg/dL' },
          ],
        },
        file: pdfBuffer,
        thumbnail: thumbnailBuffer,
      },
      {
        title: 'Prescription',
        type: 'Outpatient',
        date: 'Nov 15th, 2024',
        dynamicFields: {
          doctor: 'Dr. Surabhi Anand',
          problemList: ['Atrial fibrillation', 'Chest pain', 'Partial colectomy'],
        },
        file: pdfBuffer,
        thumbnail: thumbnailBuffer,
      },
    ];

    return this.recordModel.insertMany(data);
  }
  
}
