export class MedicalRecordResponse {
  title: string;
  type: string;
  date: string;
  fileType: string;
  dynamicFields: Record<string, any>;
  thumbnail: string | null;
  file: Buffer; 
}
  