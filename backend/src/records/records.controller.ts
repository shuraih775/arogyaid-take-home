import { Controller, Get, Post, Param, Res, NotFoundException, UploadedFile, UseInterceptors, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { RecordsService } from './records.service';
import { MedicalRecord } from './schemas/record.schema';
import { MedicalRecordResponse } from './dto/medical-record-response.dto';
import { Response } from 'express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Express } from 'express'; 

@Controller('records')
export class RecordsController {
  constructor(private readonly recordsService: RecordsService) {}

  @Get()
async getAllRecords(): Promise<MedicalRecordResponse[]> {
  const records = await this.recordsService.findAll();

  return records.map((record) => ({
    ...record,
    thumbnail: record.thumbnail
      ? `data:image/jpeg;base64,${record.thumbnail.toString('base64')}`
      : null,
  }));
}


  @Post('createData')
  async createData() {
    return this.recordsService.createData();
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        callback(null, file.fieldname + '-' + uniqueSuffix + extname(file.originalname));
      }
    }),
  }))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Body() body) {
    if (!file) {
      throw new NotFoundException('No file uploaded');
    }

    return this.recordsService.processFile(file, body);
  }

  @Get(':id/download')
  async downloadFile(@Param('id') id: string, @Res() res: Response) {
    const record = await this.recordsService.findById(id);

    if (!record || !record.file) {
      throw new NotFoundException('File not found');
    }

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${record.title.replace(/\s+/g, '_')}.pdf"`,
    });

    return res.send(record.file);
  }

  @Get(':id')
async findOne(@Param('id') id: string): Promise<MedicalRecord | null> {
  return this.recordsService.findById(id);
}


}
