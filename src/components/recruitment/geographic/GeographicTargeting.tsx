
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { SearchResults } from './types';
import { simulateGeoSearch } from './utils';
import SearchForm from './SearchForm';
import CampusCard from './CampusCard';

const GeographicTargeting: React.FC = () => {
  const [cep, setCep] = useState<string>('');
  const [course, setCourse] = useState<string>('');
  const [modality, setModality] = useState<string>('');
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResults>({
    nearestCampus: null,
    alternativeCampuses: [],
    availableCourses: [],
  });

  const handleSearch = () => {
    if (cep.length < 8) {
      toast({
        title: "CEP incompleto",
        description: "Por favor, digite um CEP válido",
        variant: "destructive",
      });
      return;
    }

    const results = simulateGeoSearch(cep, course, modality);
    setSearchResults(results);
    setSearchPerformed(true);

    toast({
      title: "Busca realizada com sucesso",
      description: `Encontramos ${results.alternativeCampuses.length + 1} campus próximos ao CEP ${cep}`,
    });
  };

  return (
    <div className="space-y-6">
      <SearchForm
        cep={cep}
        setCep={setCep}
        course={course}
        setCourse={setCourse}
        modality={modality}
        setModality={setModality}
        onSearch={handleSearch}
      />

      {searchPerformed && searchResults.nearestCampus && (
        <Card>
          <CardHeader>
            <CardTitle>Campus Recomendado</CardTitle>
            <CardDescription>
              Unidade mais próxima do CEP informado
            </CardDescription>
          </CardHeader>

          <CardContent>
            <CampusCard
              nearestCampus={searchResults.nearestCampus}
              availableCourses={searchResults.availableCourses}
              alternativeCampuses={searchResults.alternativeCampuses}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default GeographicTargeting;
