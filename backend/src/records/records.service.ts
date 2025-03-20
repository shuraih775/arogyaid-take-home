import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MedicalRecord, MedicalRecordDocument } from './schemas/record.schema';
import * as fs from 'fs';
import * as path from 'path';
import * as Tesseract from 'tesseract.js';
const pdfParse = require('pdf-parse');
import * as mammoth from 'mammoth';
import { PDFDocument,rgb } from 'pdf-lib';
import * as sharp from 'sharp';

const nodeHtmlToImage = require('node-html-to-image').default;


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

  async processFile(file: Express.Multer.File, body: any): Promise<MedicalRecord> {
    let extractedText = '';
    let thumbnail: Buffer | null = null;


    if (file.mimetype === 'application/pdf') {
      extractedText = await this.extractTextFromPDF(file.path);
      thumbnail = await this.generateThumbnailFromPDF(file.path);
    

    } else if (
      file.mimetype === 'application/msword' ||
      file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) {
      extractedText = await this.extractTextFromDocx(file.path);
      thumbnail = await this.generateThumbnailFromDocx(file.path);
    } else if (
      file.mimetype.startsWith("image/")
    ){
      extractedText = await this.extractTextFromImage(file.path);
      thumbnail = await fs.readFileSync(file.path);
    }


    const newRecord = new this.recordModel({
      title: body.title || file.originalname,
      type: body.type || 'Report',
      date: new Date().toISOString(),
      fileType:file.mimetype,
      dynamicFields: {
        extractedText: extractedText.substring(0, 1000),
      },
      file: fs.readFileSync(file.path),
      thumbnail: thumbnail,
    });

    await newRecord.save();
    return newRecord;
  }

  private async generateThumbnailFromPDF(filePath: string): Promise<Buffer | null> {
    try {
      const { pdf } = await import("pdf-to-img");
      const document = await pdf(filePath, { scale: 3 });

      const pageBuffer = await document.getPage(1);
      return pageBuffer ?? null

    } catch (error) {
      console.error('Error extracting thumbnail from PDF:', error);
      return null;
    }
  }

  private async generateThumbnailFromDocx(filePath: string): Promise<Buffer | null> {
    try {
      const { value: extractedText } = await mammoth.extractRawText({ path: filePath });
      const previewText = extractedText.split('\n').slice(0, 5).join('\n'); 
  
      const imageBuffer = await nodeHtmlToImage({
        html: `<div style="width: 200px; height: 200px; display: flex; align-items: center; justify-content: center; 
               background: #f0f0f0; font-size: 14px; text-align: center; padding: 10px;"> 
                 ${previewText} 
               </div>`,
        type: 'jpeg',
        quality: 80,
      });
  
      return imageBuffer as Buffer;
    } catch (error) {
      console.error('Error extracting thumbnail from DOCX:', error);
      return null;
    }
  }
  
  private async extractTextFromImage(filePath: string): Promise<string> {
    const { data } = await Tesseract.recognize(filePath, 'eng'); // English Language
    return data.text;
  }
  
  private async extractTextFromPDF(filePath: string): Promise<string> {
    const data = await pdfParse(fs.readFileSync(filePath));
    return data.text;
  }

  private async extractTextFromDocx(filePath: string): Promise<string> {
    const data = await mammoth.extractRawText({ path: filePath });
    return data.value;
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
