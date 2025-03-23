
import React, { useEffect } from 'react';
import { useData } from '@/context/DataContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Table } from '@/components/ui/table';
import useStudentFilters from '@/hooks/useStudentFilters';
import StudentTable from './StudentTable';
import StudentTableHeader from './StudentTableHeader';
import StudentFilters from './StudentFilters';
import StudentPagination from './StudentPagination';

const StudentsContent: React.FC = () => {
  const { students, alerts, generateDemoData } = useData();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  // Get class filter from URL
  const searchParams = new URLSearchParams(location.search);
  const classFilter = searchParams.get('class');
  
  useEffect(() => {
    if (students.length === 0) {
      console.log("Gerando dados de demonstração para estudantes");
      generateDemoData();
    }
  }, [students.length, generateDemoData]);
  
  useEffect(() => {
    if (classFilter) {
      toast({
        title: `Turma ${classFilter}`,
        description: `Visualizando alunos da turma ${classFilter}`,
      });
    }
  }, [classFilter, toast]);

  const {
    searchTerm,
    setSearchTerm,
    riskFilter,
    setRiskFilter,
    segmentFilter,
    setSegmentFilter,
    hasActiveFilters,
    currentPage,
    sortKey,
    toggleSort,
    paginatedStudents,
    totalPages,
    handlePageChange,
    clearAllFilters,
  } = useStudentFilters({ students, classFilter });

  const clearClassFilter = () => {
    navigate('/students');
  };

  const handleViewAlerts = (studentId: string) => {
    const studentAlert = alerts?.find(alert => alert.studentId === studentId);
    
    if (studentAlert) {
      navigate(`/alerts?id=${studentAlert.id}`);
    } else {
      navigate('/alerts');
    }
  };

  const handleSchedule = (studentId: string) => {
    navigate('/schedule', { state: { studentId } });
  };

  // This function is called when clearAllFilters button is clicked
  const handleClearAllFilters = () => {
    const hasClassFilter = clearAllFilters();
    if (hasClassFilter) {
      navigate('/students');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Alunos</h2>
      </div>
      
      <Card>
        <CardHeader className="pb-0">
          <StudentFilters 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            riskFilter={riskFilter}
            setRiskFilter={setRiskFilter}
            segmentFilter={segmentFilter}
            setSegmentFilter={setSegmentFilter}
            classFilter={classFilter}
            clearClassFilter={clearClassFilter}
            clearAllFilters={handleClearAllFilters}
            hasActiveFilters={hasActiveFilters}
          />
        </CardHeader>
        <CardContent>
          <Table>
            <StudentTableHeader 
              toggleSort={toggleSort}
              sortKey={sortKey}
            />
            <StudentTable 
              students={paginatedStudents}
              handleViewAlerts={handleViewAlerts}
              handleSchedule={handleSchedule}
              classFilter={classFilter}
              clearClassFilter={clearClassFilter}
            />
          </Table>
          
          {/* Paginação */}
          {paginatedStudents.length > 0 && (
            <StudentPagination 
              currentPage={currentPage}
              totalPages={totalPages}
              handlePageChange={handlePageChange}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentsContent;
