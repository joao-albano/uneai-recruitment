
import { useState, useMemo } from 'react';
import { StudentData, SchoolSegment } from '@/types/data';

interface UseStudentFiltersProps {
  students: StudentData[];
  classFilter: string | null;
}

const useStudentFilters = ({ students, classFilter }: UseStudentFiltersProps) => {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [sortKey, setSortKey] = useState<'name' | 'riskLevel' | 'grade' | 'attendance'>('name');
  const [searchTerm, setSearchTerm] = useState('');
  const [riskFilter, setRiskFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all');
  const [segmentFilter, setSegmentFilter] = useState<'all' | SchoolSegment>('all');
  
  // Paginação
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const toggleSort = (key: 'name' | 'riskLevel' | 'grade' | 'attendance') => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const hasActiveFilters = Boolean(searchTerm || riskFilter !== 'all' || segmentFilter !== 'all' || classFilter);

  const clearAllFilters = () => {
    setSearchTerm('');
    setRiskFilter('all');
    setSegmentFilter('all');
    return Boolean(classFilter); // Return if class filter is active
  };

  // Aplicar filtros
  const filteredStudents = useMemo(() => {
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
  }, [students, classFilter, riskFilter, segmentFilter, searchTerm]);

  // Ordenar alunos
  const sortedStudents = useMemo(() => {
    return [...filteredStudents].sort((a, b) => {
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
  }, [filteredStudents, sortKey, sortOrder]);

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

  return {
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
    sortedStudents,
    totalPages,
    handlePageChange,
    clearAllFilters,
  };
};

export default useStudentFilters;
