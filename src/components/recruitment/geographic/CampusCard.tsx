
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Map, Calendar, ArrowRight } from 'lucide-react';
import { Campus, Course } from './types';
import { getModalityLabel } from './utils';

interface CampusCardProps {
  nearestCampus: Campus;
  availableCourses: Course[];
  alternativeCampuses: Campus[];
}

const CampusCard: React.FC<CampusCardProps> = ({ 
  nearestCampus, 
  availableCourses, 
  alternativeCampuses 
}) => {
  return (
    <div>
      <div className="bg-muted/50 border rounded-lg p-5 space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold">{nearestCampus.name}</h3>
            <p className="text-muted-foreground">
              {nearestCampus.address}, {nearestCampus.city} - {nearestCampus.state}
            </p>
          </div>
          <Badge className="bg-blue-500">
            {nearestCampus.distance} km
          </Badge>
        </div>

        <div>
          <h4 className="font-medium text-sm mb-2">Modalidades Disponíveis</h4>
          <div className="flex gap-2 flex-wrap">
            {nearestCampus.availableModalities.map((mod) => (
              <Badge key={mod} variant="outline" className="border-primary text-primary">
                {getModalityLabel(mod)}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-medium text-sm mb-2">Cursos Disponíveis</h4>
          <div className="grid gap-2 md:grid-cols-2">
            {availableCourses.map((course) => (
              <div 
                key={course.id} 
                className="flex items-center justify-between p-2 border rounded bg-background"
              >
                <span>{course.name}</span>
                <div className="flex gap-1">
                  {course.modalities.filter(m => 
                    nearestCampus?.availableModalities.includes(m)
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

      {alternativeCampuses.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-semibold mb-2">Outras Unidades Próximas</h3>
          <div className="grid gap-3">
            {alternativeCampuses.map((campus) => (
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
    </div>
  );
};

export default CampusCard;
