
import React from 'react';
import CoursesDataGrid from './courses/CoursesDataGrid';
import CoursesTable from './courses/CoursesTable';
import { coursesData } from './courses/coursesData';

const CoursesTabContent: React.FC = () => {
  return (
    <div className="space-y-6">
      <CoursesDataGrid coursesData={coursesData} />
      <CoursesTable coursesData={coursesData} />
    </div>
  );
};

export default CoursesTabContent;
