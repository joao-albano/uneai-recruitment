
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface SearchHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const SearchHeader: React.FC<SearchHeaderProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="bg-gradient-to-r from-primary/20 to-primary/5 p-6 rounded-lg mb-8">
      <h1 className="text-3xl font-bold mb-2">Guia do Usuário - Sistema de Captação</h1>
      <p className="text-muted-foreground text-lg">
        Explore nosso guia completo para aproveitar ao máximo todas as funcionalidades do Sistema de Captação de Alunos.
      </p>
      
      <div className="mt-4 relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input 
          type="search" 
          placeholder="Buscar por funcionalidade ou palavra-chave..." 
          className="pl-10 w-full md:w-2/3 lg:w-1/2" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchHeader;
