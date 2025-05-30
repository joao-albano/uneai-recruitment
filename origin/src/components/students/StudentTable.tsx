
import React from 'react';
import { TableBody } from '@/components/ui/table';
import { StudentData } from '@/types/data';
import StudentTableRow from './student-table/StudentTableRow';
import StudentEmptyState from './student-table/StudentEmptyState';

interface StudentTableProps {
  students: StudentData[];
  handleViewAlerts: (studentId: string) => void;
  handleSchedule: (studentId: string) => void;
  handleAddAsData: (studentId: string) => void;
  classFilter: string | null;
  clearClassFilter: () => void;
  isMobile?: boolean;
}

const StudentTable: React.FC<StudentTableProps> = ({ 
  students, 
  handleViewAlerts, 
  handleSchedule,
  handleAddAsData,
  classFilter,
  clearClassFilter,
  isMobile
}) => {
  return (
    <TableBody>
      {students.length > 0 ? (
        students.map((student) => (
          <StudentTableRow 
            key={student.id}
            student={student}
            handleViewAlerts={handleViewAlerts}
            handleSchedule={handleSchedule}
            handleAddAsData={handleAddAsData}
          />
        ))
      ) : (
        <StudentEmptyState 
          classFilter={classFilter} 
          clearClassFilter={clearClassFilter} 
        />
      )}
    </TableBody>
  );
};

export default StudentTable;
