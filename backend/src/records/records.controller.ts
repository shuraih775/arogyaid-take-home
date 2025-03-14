import { Controller, Get, Post, Param, Res, NotFoundException } from '@nestjs/common';
import { RecordsService } from './records.service';
import { MedicalRecord } from './schemas/record.schema';
import { MedicalRecordResponse } from './dto/medical-record-response.dto';
import { Response } from 'express';

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
