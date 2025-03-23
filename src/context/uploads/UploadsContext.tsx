
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UploadRecord } from '@/types/data';

interface UploadsContextType {
  uploadHistory: UploadRecord[];
  addUploadRecord: (record: Omit<UploadRecord, 'id'>) => void;
  clearUploadHistory: () => void;
}

const UploadsContext = createContext<UploadsContextType | undefined>(undefined);

export const UploadsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [uploadHistory, setUploadHistory] = useState<UploadRecord[]>([]);

  const addUploadRecord = (record: Omit<UploadRecord, 'id'>) => {
    const newRecord: UploadRecord = {
      ...record,
      id: `upload-${Date.now()}-${Math.floor(Math.random() * 1000)}`
    };
    setUploadHistory([newRecord, ...uploadHistory]);
  };

  const clearUploadHistory = () => {
    setUploadHistory([]);
  };

  const value = {
    uploadHistory,
    addUploadRecord,
    clearUploadHistory,
  };

  return <UploadsContext.Provider value={value}>{children}</UploadsContext.Provider>;
};

export const useUploads = () => {
  const context = useContext(UploadsContext);
  if (context === undefined) {
    throw new Error('useUploads must be used within a UploadsProvider');
  }
  return context;
};
