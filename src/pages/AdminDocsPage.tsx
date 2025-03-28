
import React from 'react';
import { DataProvider } from "@/context/DataContext";
import AdminDocsContent from '@/components/admin/docs/AdminDocsContent';

const AdminDocsPage: React.FC = () => {
  return (
    <DataProvider>
      <AdminDocsContent />
    </DataProvider>
  );
};

export default AdminDocsPage;
