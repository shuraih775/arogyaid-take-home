export class MedicalRecordResponse {
    title: string;
    type: string;
    date: string;
    dynamicFields: Record<string, any>;
    thumbnail: string | null; // Base64 for frontend
    file: Buffer; // Keep the original file
  }
  