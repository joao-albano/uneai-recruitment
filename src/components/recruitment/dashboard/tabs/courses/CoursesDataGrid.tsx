
import React from 'react';
import CourseBarChart from './CourseBarChart';
import CourseGoalProgress from './CourseGoalProgress';
import { CourseData, prepareChartData } from './coursesData';

interface CoursesDataGridProps {
  coursesData: CourseData[];
}

const CoursesDataGrid: React.FC<CoursesDataGridProps> = ({ coursesData }) => {
  const chartData = prepareChartData(coursesData);
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <CourseBarChart chartData={chartData} />
      <CourseGoalProgress coursesData={coursesData} />
    </div>
  );
};

export default CoursesDataGrid;
