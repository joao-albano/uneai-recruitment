import React, { useState, useEffect } from 'react';
import { useData } from '@/context/DataContext';
import { Card, CardContent } from '@/components/ui/card';
import { Table } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import StudentTable from './StudentTable';
import StudentFilters from './StudentFilters';
import StudentPagination from './StudentPagination';
import useStudentFilters from '@/hooks/useStudentFilters';
import { useNavigate, useLocation } from 'react-router-dom';
import { TableHeader, TableRow, TableHead } from '@/components/ui/table';
import { ArrowUpDown } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const StudentsContent: React.FC = () => {
  const { students, generateDemoData } = useData();
  const [classFilter, setClassFilter] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAdmin } = useAuth();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const classParam = searchParams.get('class');
    if (classParam) {
      setClassFilter(classParam);
    }
  }, [location.search]);

  useEffect(() => {
    if (students.length === 0) {
      generateDemoData();
    }
  }, [students.length, generateDemoData]);

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
    const student = students.find(s => s.id === studentId);
    
    if (student) {
      toast({
        title: "Alertas",
        description: `Visualizando alertas para ${student.name}`,
      });
      
      navigate(`/alerts?studentId=${studentId}`);
    }
  };

  const handleSchedule = (studentId: string) => {
    const student = students.find(s => s.id === studentId);
    
    if (student) {
      toast({
        title: "Agendar Atendimento",
        description: `Agendando atendimento para ${student.name}`,
      });
      
      navigate(`/schedule?studentId=${studentId}`);
    }
  };

  const handleAddAsData = (studentId: string) => {
    const student = students.find(s => s.id === studentId);
    if (student) {
      toast({
        title: "Adicionado como Dados",
        description: `${student.name} foi adicionado como dados completos ao sistema`,
      });
      
      navigate(`/model/student/${studentId}`);
    }
  };

  const clearClassFilter = () => {
    setClassFilter(null);
    
    const searchParams = new URLSearchParams(location.search);
    searchParams.delete('class');
    navigate({
      pathname: location.pathname,
      search: searchParams.toString()
    }, { replace: true });
    
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
        <CardContent className="pt-6">
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
          
          <div className="mt-4 flex justify-center">
            <StudentPagination 
              currentPage={currentPage}
              totalPages={Math.max(1, totalPages)}
              onPageChange={handlePageChange}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentsContent;
