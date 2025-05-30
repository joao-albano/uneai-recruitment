
import React from 'react';
import { Student } from '@/types/data';
import BasicInfoFields from './fields/BasicInfoFields';
import SegmentGradeFields from './fields/SegmentGradeFields';
import PerformanceFields from './fields/PerformanceFields';
import ParentInfoFields from './fields/ParentInfoFields';

interface StudentDialogFormProps {
  student: Partial<Student>;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectChange: (field: string, value: string) => void;
  onGradeChange: (value: string) => void;
  onNumberInputChange: (field: string, value: number) => void;
}

const StudentDialogForm: React.FC<StudentDialogFormProps> = ({
  student,
  onInputChange,
  onSelectChange,
  onGradeChange,
  onNumberInputChange
}) => {
  return (
    <div className="grid gap-4 py-4">
      {/* Basic Information Section */}
      <BasicInfoFields 
        student={student} 
        onInputChange={onInputChange} 
      />
      
      {/* Segment and Grade Section */}
      <SegmentGradeFields
        student={student}
        onSelectChange={onSelectChange}
        onGradeChange={onGradeChange}
      />
      
      {/* Performance Metrics Section */}
      <PerformanceFields 
        student={student} 
        onNumberInputChange={onNumberInputChange} 
      />
      
      {/* Parent Information Section */}
      <ParentInfoFields 
        student={student} 
        onInputChange={onInputChange} 
      />
    </div>
  );
};

export default StudentDialogForm;
