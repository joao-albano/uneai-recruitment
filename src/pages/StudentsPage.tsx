
import React, { useState, useEffect } from 'react';
import { DataProvider, useData } from '@/context/DataContext';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
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
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { 
  AlertTriangle,
  MoreHorizontal,
  Calendar,
  ArrowUpDown,
  Filter,
  X
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useNavigate, useLocation } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const StudentsContent: React.FC = () => {
  const { students, alerts, generateDemoData } = useData();
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [sortKey, setSortKey] = useState<'name' | 'riskLevel' | 'grade' | 'attendance'>('name');
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
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

  const getRiskColor = (riskLevel?: 'low' | 'medium' | 'high') => {
    switch(riskLevel) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskText = (riskLevel?: 'low' | 'medium' | 'high') => {
    switch(riskLevel) {
      case 'high':
        return 'Alto Risco';
      case 'medium':
        return 'Médio Risco';
      case 'low':
        return 'Baixo Risco';
      default:
        return 'Sem Classificação';
    }
  };

  const toggleSort = (key: 'name' | 'riskLevel' | 'grade' | 'attendance') => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const filteredStudents = classFilter 
    ? students.filter(student => student.class === classFilter)
    : students;

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
            
            {classFilter && (
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="flex items-center gap-1 px-3 py-1">
                  <Filter size={12} />
                  Turma {classFilter}
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-4 w-4 ml-1 text-muted-foreground hover:text-foreground"
                    onClick={clearClassFilter}
                  >
                    <X size={12} />
                  </Button>
                </Badge>
              </div>
            )}
          </div>
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
            <TableBody>
              {sortedStudents.length > 0 ? (
                sortedStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.name}</TableCell>
                    <TableCell>{student.class} • {student.segment}</TableCell>
                    <TableCell>
                      <Badge className={getRiskColor(student.riskLevel)}>
                        {getRiskText(student.riskLevel)}
                      </Badge>
                    </TableCell>
                    <TableCell>{student.grade.toFixed(1)}</TableCell>
                    <TableCell>{student.attendance}%</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem 
                            className="flex items-center gap-2 cursor-pointer"
                            onClick={() => handleViewAlerts(student.id)}
                          >
                            <AlertTriangle className="h-4 w-4" />
                            Ver Alertas
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="flex items-center gap-2 cursor-pointer"
                            onClick={() => handleSchedule(student.id)}
                          >
                            <Calendar className="h-4 w-4" />
                            Agendar Atendimento
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-10">
                    {classFilter ? (
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <p className="text-muted-foreground">Nenhum aluno encontrado na turma {classFilter}</p>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={clearClassFilter}
                          className="mt-2"
                        >
                          Mostrar todos os alunos
                        </Button>
                      </div>
                    ) : (
                      <p className="text-muted-foreground">Nenhum aluno cadastrado</p>
                    )}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

const StudentsPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  return (
    <div className="min-h-screen flex w-full">
      <Sidebar isOpen={sidebarOpen} onClose={toggleSidebar} />
      
      <div className="flex-1 flex flex-col">
        <Header toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 p-6 overflow-auto">
          <StudentsContent />
        </main>
      </div>
    </div>
  );
};

const StudentsPageWithProvider: React.FC = () => {
  return (
    <DataProvider>
      <StudentsPage />
    </DataProvider>
  );
};

export default StudentsPageWithProvider;
