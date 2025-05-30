
import React, { createContext, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { UploadRecord } from '@/types/data';

interface UploadsContextType {
  uploadHistory: UploadRecord[];
  addUploadRecord: (record: Omit<UploadRecord, 'id'>) => void;
  clearUploadHistory: () => void;
}

const UploadsContext = createContext<UploadsContextType | undefined>(undefined);

export const UploadsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [uploadHistory, setUploadHistory] = useState<UploadRecord[]>([]);

  const addUploadRecord = (record: Omit<UploadRecord, 'id'>) => {
    setUploadHistory(prev => [
      ...prev,
      { ...record, id: uuidv4() }
    ]);
  };
  
  const clearUploadHistory = () => {
    setUploadHistory([]);
  };

  return (
    <UploadsContext.Provider value={{
      uploadHistory,
      addUploadRecord,
      clearUploadHistory
    }}>
      {children}
    </UploadsContext.Provider>
  );
};

export const useUploads = () => {
  const context = useContext(UploadsContext);
  if (context === undefined) {
    throw new Error('useUploads must be used within a UploadsProvider');
  }
  return context;
};
