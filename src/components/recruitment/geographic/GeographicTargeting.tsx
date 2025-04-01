
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  MapPin, 
  Search, 
  Map, 
  ArrowRight, 
  School, 
  Calendar, 
  Building, 
  Check 
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';

interface Campus {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  distance: number; // em km
  availableCourses: string[];
  availableModalities: Array<'presencial' | 'semipresencial' | 'ead'>;
}

interface Course {
  id: string;
  name: string;
  modalities: Array<'presencial' | 'semipresencial' | 'ead'>;
  campusIds: string[];
}

// Demo data for campuses
const DEMO_CAMPUSES: Campus[] = [
  {
    id: '1',
    name: 'Campus Centro',
    address: 'Av. Paulista, 1000',
    city: 'São Paulo',
    state: 'SP',
    distance: 0,
    availableCourses: ['1', '2', '3', '4'],
    availableModalities: ['presencial', 'semipresencial']
  },
  {
    id: '2',
    name: 'Campus Zona Sul',
    address: 'Av. Santo Amaro, 500',
    city: 'São Paulo',
    state: 'SP',
    distance: 5.2,
    availableCourses: ['1', '3', '5'],
    availableModalities: ['presencial', 'semipresencial', 'ead']
  },
  {
    id: '3',
    name: 'Campus Guarulhos',
    address: 'Rua Guarulhos, 100',
    city: 'Guarulhos',
    state: 'SP',
    distance: 22.7,
    availableCourses: ['1', '2', '5'],
    availableModalities: ['presencial', 'ead']
  },
];

// Demo data for courses
const DEMO_COURSES: Course[] = [
  {
    id: '1',
    name: 'Administração',
    modalities: ['presencial', 'semipresencial', 'ead'],
    campusIds: ['1', '2', '3']
  },
  {
    id: '2',
    name: 'Direito',
    modalities: ['presencial', 'semipresencial'],
    campusIds: ['1', '3']
  },
  {
    id: '3',
    name: 'Engenharia Civil',
    modalities: ['presencial'],
    campusIds: ['1', '2']
  },
  {
    id: '4',
    name: 'Psicologia',
    modalities: ['presencial'],
    campusIds: ['1']
  },
  {
    id: '5',
    name: 'Análise e Desenvolvimento de Sistemas',
    modalities: ['presencial', 'ead'],
    campusIds: ['2', '3']
  },
];

const GeographicTargeting: React.FC = () => {
  const [cep, setCep] = useState<string>('');
  const [course, setCourse] = useState<string>('');
  const [modality, setModality] = useState<string>('');
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [searchResults, setSearchResults] = useState<{
    nearestCampus: Campus | null,
    alternativeCampuses: Campus[],
    availableCourses: Course[],
  }>({
    nearestCampus: null,
    alternativeCampuses: [],
    availableCourses: [],
  });

  const formatCep = (value: string) => {
    // Remove non-numeric characters
    const numericValue = value.replace(/\D/g, '');
    
    // Format as xxxxx-xxx
    if (numericValue.length <= 5) {
      return numericValue;
    } else {
      return `${numericValue.slice(0, 5)}-${numericValue.slice(5, 8)}`;
    }
  };

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedCep = formatCep(e.target.value);
    setCep(formattedCep);
  };

  const handleSearch = () => {
    if (cep.length < 8) {
      toast({
        title: "CEP incompleto",
        description: "Por favor, digite um CEP válido",
        variant: "destructive",
      });
      return;
    }

    // Simulating API call to find closest campus and alternatives
    const randomizeCampusDistance = () => {
      return DEMO_CAMPUSES.map(campus => ({
        ...campus, 
        distance: parseFloat((Math.random() * 30).toFixed(1))
      })).sort((a, b) => a.distance - b.distance);
    };

    const sortedCampuses = randomizeCampusDistance();
    const nearestCampus = sortedCampuses[0];
    const alternativeCampuses = sortedCampuses.slice(1);
    
    // Filter courses based on user selection if provided
    let availableCourses = DEMO_COURSES;
    
    if (course) {
      availableCourses = DEMO_COURSES.filter(c => c.name.toLowerCase().includes(course.toLowerCase()));
    }

    // Filter by modality if selected
    if (modality) {
      availableCourses = availableCourses.filter(c => 
        c.modalities.includes(modality as any) && 
        c.campusIds.includes(nearestCampus.id)
      );
    }

    setSearchResults({
      nearestCampus,
      alternativeCampuses,
      availableCourses: availableCourses.filter(c => c.campusIds.includes(nearestCampus.id)),
    });
    
    setSearchPerformed(true);

    toast({
      title: "Busca realizada com sucesso",
      description: `Encontramos ${sortedCampuses.length} campus próximos ao CEP ${cep}`,
    });
  };

  const getModalityLabel = (modalityType: string) => {
    switch (modalityType) {
      case 'presencial': return 'Presencial';
      case 'semipresencial': return 'Semipresencial';
      case 'ead': return 'EAD';
      default: return modalityType;
    }
  };

  return (
    <div className="space-y-6">
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
                  onClick={handleSearch}
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

      {searchPerformed && searchResults.nearestCampus && (
        <Card>
          <CardHeader>
            <CardTitle>Campus Recomendado</CardTitle>
            <CardDescription>
              Unidade mais próxima do CEP informado
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="bg-muted/50 border rounded-lg p-5 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{searchResults.nearestCampus.name}</h3>
                  <p className="text-muted-foreground">
                    {searchResults.nearestCampus.address}, {searchResults.nearestCampus.city} - {searchResults.nearestCampus.state}
                  </p>
                </div>
                <Badge className="bg-blue-500">
                  {searchResults.nearestCampus.distance} km
                </Badge>
              </div>

              <div>
                <h4 className="font-medium text-sm mb-2">Modalidades Disponíveis</h4>
                <div className="flex gap-2 flex-wrap">
                  {searchResults.nearestCampus.availableModalities.map((mod) => (
                    <Badge key={mod} variant="outline" className="border-primary text-primary">
                      {getModalityLabel(mod)}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-sm mb-2">Cursos Disponíveis</h4>
                <div className="grid gap-2 md:grid-cols-2">
                  {searchResults.availableCourses.map((course) => (
                    <div 
                      key={course.id} 
                      className="flex items-center justify-between p-2 border rounded bg-background"
                    >
                      <span>{course.name}</span>
                      <div className="flex gap-1">
                        {course.modalities.filter(m => 
                          searchResults.nearestCampus?.availableModalities.includes(m)
                        ).map((mod) => (
                          <Badge 
                            key={`${course.id}-${mod}`} 
                            variant="outline" 
                            className="text-xs h-5 px-1.5"
                          >
                            {mod.slice(0, 1).toUpperCase()}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-2 justify-end">
                <Button variant="outline">
                  <Map className="h-4 w-4 mr-2" /> Ver no Mapa
                </Button>
                <Button>
                  <Calendar className="h-4 w-4 mr-2" /> Agendar Visita
                </Button>
              </div>
            </div>

            {searchResults.alternativeCampuses.length > 0 && (
              <div className="mt-4">
                <h3 className="text-sm font-semibold mb-2">Outras Unidades Próximas</h3>
                <div className="grid gap-3">
                  {searchResults.alternativeCampuses.map((campus) => (
                    <div 
                      key={campus.id} 
                      className="flex items-center justify-between border rounded-md p-3"
                    >
                      <div>
                        <div className="font-medium">{campus.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {campus.city} - {campus.state} ({campus.distance} km)
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default GeographicTargeting;
