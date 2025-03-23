
import React from 'react';
import { TableRow, TableCell } from '@/components/ui/table';
import { StudentData } from '@/types/data';
import StudentRiskBadge from './StudentRiskBadge';
import StudentActionMenu from './StudentActionMenu';

interface StudentTableRowProps {
  student: StudentData;
  handleViewAlerts: (studentId: string) => void;
  handleSchedule: (studentId: string) => void;
  handleAddAsData: (studentId: string) => void;
}

const StudentTableRow: React.FC<StudentTableRowProps> = ({ 
  student, 
  handleViewAlerts, 
  handleSchedule,
  handleAddAsData 
}) => {
  return (
    <TableRow>
      <TableCell className="font-medium">{student.name}</TableCell>
      <TableCell>{student.class} • {student.segment}</TableCell>
      <TableCell>
        <StudentRiskBadge riskLevel={student.riskLevel} />
      </TableCell>
      <TableCell>{student.grade.toFixed(1)}</TableCell>
      <TableCell>{student.attendance}%</TableCell>
      <TableCell className="text-right">
        <StudentActionMenu 
          studentId={student.id}
          handleViewAlerts={handleViewAlerts}
          handleSchedule={handleSchedule}
          handleAddAsData={handleAddAsData}
        />
      </TableCell>
    </TableRow>
  );
};

export default StudentTableRow;
