
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X, Search } from "lucide-react";
import { SchoolSegment } from '@/types/data';
import ClassFilter from './ClassFilter';

export interface StudentFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  riskFilter: 'all' | 'high' | 'medium' | 'low';
  setRiskFilter: (value: 'all' | 'high' | 'medium' | 'low') => void;
  segmentFilter: 'all' | SchoolSegment;
  setSegmentFilter: (value: 'all' | SchoolSegment) => void;
  hasActiveFilters: boolean;
  classFilter: string | null;
  setClassFilter: (value: string | null) => void;
  clearFilters: () => void;
}

const StudentFilters: React.FC<StudentFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  riskFilter,
  setRiskFilter,
  segmentFilter,
  setSegmentFilter,
  hasActiveFilters,
  classFilter,
  setClassFilter,
  clearFilters
}) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-2xl font-semibold leading-none tracking-tight">Lista de Alunos</h3>
          <p className="text-sm text-muted-foreground">
            Lista de todos os alunos cadastrados no sistema com seus respectivos níveis de risco.
          </p>
        </div>
        
        <ClassFilter 
          classFilter={classFilter} 
          clearClassFilter={clearFilters} 
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
            <SelectContent align="start">
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
            <SelectContent align="start">
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
              onClick={clearFilters}
              className="flex items-center gap-1"
            >
              <X className="h-4 w-4" />
              Limpar filtros
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentFilters;
