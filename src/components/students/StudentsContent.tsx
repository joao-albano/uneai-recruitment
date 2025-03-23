
import React, { useState, useEffect } from 'react';
import { useData } from '@/context/DataContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Filter,
  Search,
  X
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import StudentTable from './StudentTable';
import StudentTableHeader from './StudentTableHeader';
import ClassFilter from './ClassFilter';
import { SchoolSegment } from '@/types/data';

const StudentsContent: React.FC = () => {
  const { students, generateDemoData } = useData();
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [sortKey, setSortKey] = useState<'name' | 'riskLevel' | 'grade' | 'attendance'>('name');
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  // Filtros
  const searchParams = new URLSearchParams(location.search);
  const classFilter = searchParams.get('class');
  const [searchTerm, setSearchTerm] = useState('');
  const [riskFilter, setRiskFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all');
  const [segmentFilter, setSegmentFilter] = useState<'all' | SchoolSegment>('all');
  
  // Paginação
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
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

  const toggleSort = (key: 'name' | 'riskLevel' | 'grade' | 'attendance') => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  // Aplicar filtros
  const applyFilters = () => {
    let filtered = [...students];
    
    // Filtrar por classe
    if (classFilter) {
      filtered = filtered.filter(student => student.class === classFilter);
    }
    
    // Filtrar por nível de risco
    if (riskFilter !== 'all') {
      filtered = filtered.filter(student => student.riskLevel === riskFilter);
    }
    
    // Filtrar por segmento
    if (segmentFilter !== 'all') {
      filtered = filtered.filter(student => student.segment === segmentFilter);
    }
    
    // Filtrar por termo de pesquisa (nome ou número de registro)
    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(student => 
        student.name.toLowerCase().includes(search) || 
        student.registrationNumber.toLowerCase().includes(search)
      );
    }
    
    return filtered;
  };

  const filteredStudents = applyFilters();

  // Ordenar alunos
  const sortedStudents = [...filteredStudents].sort((a, b) => {
    let comparison = 0;
    
    if (sortKey === 'name') {
      comparison = a.name.localeCompare(b.name);
    } else if (sortKey === 'riskLevel') {
      const riskValues = { high: 3, medium: 2, low: 1, undefined: 0 };
      const aValue = riskValues[a.riskLevel || 'undefined'];
      const bValue = riskValues[b.riskLevel || 'undefined'];
      comparison = aValue - bValue;
    } else if (sortKey === 'grade') {
      comparison = a.grade - b.grade;
    } else if (sortKey === 'attendance') {
      comparison = a.attendance - b.attendance;
    }
    
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  // Paginar alunos
  const paginatedStudents = sortedStudents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  const totalPages = Math.ceil(sortedStudents.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleViewAlerts = (studentId: string) => {
    const studentAlert = alerts.find(alert => alert.studentId === studentId);
    
    if (studentAlert) {
      navigate(`/alerts?id=${studentAlert.id}`);
    } else {
      navigate('/alerts');
    }
  };

  const handleSchedule = (studentId: string) => {
    navigate('/schedule', { state: { studentId } });
  };

  const clearClassFilter = () => {
    navigate('/students');
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setRiskFilter('all');
    setSegmentFilter('all');
    if (classFilter) {
      navigate('/students');
    }
  };

  const hasActiveFilters = searchTerm || riskFilter !== 'all' || segmentFilter !== 'all' || classFilter;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Alunos</h2>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>Lista de Alunos</CardTitle>
              <CardDescription>
                Lista de todos os alunos cadastrados no sistema com seus respectivos níveis de risco.
              </CardDescription>
            </div>
            
            <ClassFilter 
              classFilter={classFilter} 
              clearClassFilter={clearClassFilter} 
            />
          </div>
          
          {/* Filtros */}
          <div className="mt-4 grid gap-4 md:grid-cols-4">
            <div>
              <Input
                placeholder="Pesquisar por nome ou RA..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
                prefix={<Search className="h-4 w-4 text-muted-foreground" />}
              />
            </div>
            
            <div>
              <Select
                value={riskFilter}
                onValueChange={(value) => setRiskFilter(value as 'all' | 'high' | 'medium' | 'low')}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Nível de risco" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os níveis</SelectItem>
                  <SelectItem value="high">Alto risco</SelectItem>
                  <SelectItem value="medium">Médio risco</SelectItem>
                  <SelectItem value="low">Baixo risco</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Select
                value={segmentFilter}
                onValueChange={(value) => setSegmentFilter(value as 'all' | SchoolSegment)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Segmento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os segmentos</SelectItem>
                  <SelectItem value="ENSINO MÉDIO">Ensino Médio</SelectItem>
                  <SelectItem value="ENSINO FUNDAMENTAL I">Ensino Fundamental I</SelectItem>
                  <SelectItem value="ENSINO FUNDAMENTAL II">Ensino Fundamental II</SelectItem>
                  <SelectItem value="EDUCAÇÃO INFANTIL">Educação Infantil</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {hasActiveFilters && (
              <div className="flex justify-end">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={clearAllFilters}
                  className="flex items-center gap-1"
                >
                  <X className="h-4 w-4" />
                  Limpar filtros
                </Button>
              </div>
            )}
          </div>
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
          {sortedStudents.length > 0 && (
            <div className="mt-4">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                  
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    // Lógica para mostrar as páginas corretas quando há muitas páginas
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    
                    return (
                      <PaginationItem key={pageNum}>
                        <PaginationLink
                          isActive={currentPage === pageNum}
                          onClick={() => handlePageChange(pageNum)}
                        >
                          {pageNum}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}
                  
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentsContent;
