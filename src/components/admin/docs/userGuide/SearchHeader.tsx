
import React from 'react';
import { Book } from 'lucide-react';

const SearchHeader: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-primary/20 to-primary/5 p-6 rounded-lg mb-8">
      <div className="flex items-center gap-3 mb-4">
        <Book className="h-6 w-6 text-primary" />
        <h1 className="text-3xl font-bold">Guia do Usuário - Sistema de Captação</h1>
      </div>
      <p className="text-muted-foreground text-lg">
        Explore nosso guia completo para aproveitar ao máximo todas as funcionalidades do Sistema de Captação de Alunos.
      </p>
    </div>
  );
};

export default SearchHeader;
