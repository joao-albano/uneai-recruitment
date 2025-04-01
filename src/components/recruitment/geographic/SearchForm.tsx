
import React from 'react';
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, MapPin } from 'lucide-react';
import { formatCep } from './utils';

interface SearchFormProps {
  cep: string;
  setCep: (cep: string) => void;
  course: string;
  setCourse: (course: string) => void;
  modality: string;
  setModality: (modality: string) => void;
  onSearch: () => void;
}

const SearchForm: React.FC<SearchFormProps> = ({
  cep,
  setCep,
  course,
  setCourse,
  modality,
  setModality,
  onSearch
}) => {
  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedCep = formatCep(e.target.value);
    setCep(formattedCep);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" /> Direcionamento Geográfico
            </CardTitle>
            <CardDescription>
              Recomendação automática de campus baseada na localização do lead
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <label htmlFor="cep" className="text-sm font-medium">CEP do Lead</label>
            <div className="flex">
              <Input 
                id="cep" 
                placeholder="00000-000"
                value={cep}
                onChange={handleCepChange}
                maxLength={9}
                className="rounded-r-none"
              />
              <Button 
                className="rounded-l-none" 
                onClick={onSearch}
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="course" className="text-sm font-medium">Curso de Interesse</label>
            <Input 
              id="course" 
              placeholder="Ex: Administração"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="modality" className="text-sm font-medium">Modalidade</label>
            <select 
              id="modality"
              className="w-full h-10 px-3 rounded-md border border-input bg-background"
              value={modality}
              onChange={(e) => setModality(e.target.value)}
            >
              <option value="">Todas Modalidades</option>
              <option value="presencial">Presencial</option>
              <option value="semipresencial">Semipresencial</option>
              <option value="ead">EAD</option>
            </select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SearchForm;
