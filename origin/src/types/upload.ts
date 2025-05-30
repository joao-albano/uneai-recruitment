
export type UploadRecord = {
  id: string;
  filename: string;
  uploadDate: Date;
  recordCount: number;
  status: 'success' | 'error';
  errorCount?: number;
};

export type UploadHistoryContextType = {
  uploadHistory: UploadRecord[];
  addUploadRecord: (record: Omit<UploadRecord, 'id'>) => void;
  clearHistory: () => void;
};
