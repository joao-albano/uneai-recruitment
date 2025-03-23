
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
import StudentTable from './StudentTable';
import StudentTableHeader from './StudentTableHeader';
import ClassFilter from './ClassFilter';

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
            
            <ClassFilter 
              classFilter={classFilter} 
              clearClassFilter={clearClassFilter} 
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <StudentTableHeader 
              toggleSort={toggleSort}

              sortKey={sortKey}
            />
            <StudentTable 
              students={sortedStudents}
              handleViewAlerts={handleViewAlerts}
              handleSchedule={handleSchedule}
              classFilter={classFilter}
              clearClassFilter={clearClassFilter}
            />
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentsContent;
