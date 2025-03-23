
import React, { useState, useEffect } from 'react';
import { useData } from '@/context/DataContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import StudentTable from './StudentTable';
import StudentFilters from './StudentFilters';
import StudentPagination from './StudentPagination';
import useStudentFilters from '@/hooks/useStudentFilters';
import { useNavigate } from 'react-router-dom';
import { TableHeader, TableRow, TableHead } from '@/components/ui/table';
import { ArrowUpDown } from 'lucide-react';

const StudentsContent: React.FC = () => {
  const { students, generateDemoData } = useData();
  const [classFilter, setClassFilter] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Ensure we have some data to display
  useEffect(() => {
    if (students.length === 0) {
      generateDemoData();
    }
  }, [students.length, generateDemoData]);

  // Set up our filters
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
    sortOrder,
    toggleSort,
    paginatedStudents,
    totalPages,
    handlePageChange,
    clearAllFilters,
  } = useStudentFilters({
    students,
    classFilter,
  });

  const handleViewAlerts = (studentId: string) => {
    toast({
      title: "Alertas",
      description: `Visualizando alertas para o estudante ID: ${studentId}`,
    });
  };

  const handleSchedule = (studentId: string) => {
    toast({
      title: "Agendar Atendimento",
      description: `Agendando atendimento para o estudante ID: ${studentId}`,
    });
  };

  const handleAddAsData = (studentId: string) => {
    // Find the student in the data
    const student = students.find(s => s.id === studentId);
    if (student) {
      toast({
        title: "Adicionado como Dados",
        description: `${student.name} foi adicionado como dados completos ao sistema`,
      });
      
      // Navigate to student detail in the model page
      navigate(`/model/student/${studentId}`);
    }
  };

  const clearClassFilter = () => {
    setClassFilter(null);
    const shouldResetOtherFilters = clearAllFilters();
    
    if (shouldResetOtherFilters) {
      toast({
        title: "Filtros resetados",
        description: "Todos os filtros foram limpos.",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Alunos</h2>
          <p className="text-muted-foreground">
            Visualize e gerencie os alunos da sua instituição
          </p>
        </div>
      </div>

      <StudentFilters 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        riskFilter={riskFilter}
        setRiskFilter={setRiskFilter}
        segmentFilter={segmentFilter}
        setSegmentFilter={setSegmentFilter}
        hasActiveFilters={hasActiveFilters}
        classFilter={classFilter}
        setClassFilter={setClassFilter}
        clearFilters={clearClassFilter}
      />

      <Card>
        <CardHeader>
          <CardTitle>Lista de Alunos</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="cursor-pointer" onClick={() => toggleSort('name')}>
                  <div className="flex items-center gap-1">
                    Nome <ArrowUpDown size={16} />
                  </div>
                </TableHead>
                <TableHead>Turma / Segmento</TableHead>
                <TableHead className="cursor-pointer" onClick={() => toggleSort('riskLevel')}>
                  <div className="flex items-center gap-1">
                    Nível de Risco <ArrowUpDown size={16} />
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => toggleSort('grade')}>
                  <div className="flex items-center gap-1">
                    Nota Média <ArrowUpDown size={16} />
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => toggleSort('attendance')}>
                  <div className="flex items-center gap-1">
                    Frequência <ArrowUpDown size={16} />
                  </div>
                </TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <StudentTable 
              students={paginatedStudents}
              handleViewAlerts={handleViewAlerts}
              handleSchedule={handleSchedule}
              handleAddAsData={handleAddAsData}
              classFilter={classFilter}
              clearClassFilter={clearClassFilter}
            />
          </Table>
          
          {totalPages > 1 && (
            <div className="mt-4">
              <StudentPagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentsContent;
