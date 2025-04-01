
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  MapPin, 
  Calendar, 
  School, 
  Phone, 
  Mail, 
  ExternalLink,
  MessageSquare,
  Clock
} from 'lucide-react';

interface Campus {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  distance: number;
}

interface Course {
  id: string;
  name: string;
  modality: string;
  shift: string;
  startDate: string;
}

interface EnhancedLeadCardProps {
  lead: {
    id: string;
    name: string;
    email: string;
    phone: string;
    postalCode: string;
    createdAt: string;
    status: string;
    lastContact?: string;
    preferredChannel?: string;
  };
  recommendedCampus: Campus;
  availableCourses: Course[];
  onScheduleVisit: (leadId: string, campusId: string) => void;
  onViewAlternatives: (postalCode: string) => void;
  onContact: (leadId: string, channel: string) => void;
}

const EnhancedLeadCard: React.FC<EnhancedLeadCardProps> = ({
  lead,
  recommendedCampus,
  availableCourses,
  onScheduleVisit,
  onViewAlternatives,
  onContact
}) => {
  const getStatusBadgeColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'novo': return 'bg-blue-500 text-white';
      case 'contatado': return 'bg-purple-500 text-white';
      case 'interessado': return 'bg-green-500 text-white';
      case 'agendado': return 'bg-amber-500 text-white';
      case 'matriculado': return 'bg-emerald-500 text-white';
      case 'desistente': return 'bg-red-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-2 flex flex-row justify-between items-start">
        <div>
          <h3 className="font-semibold">{lead.name}</h3>
          <p className="text-sm text-muted-foreground">{lead.postalCode}</p>
        </div>
        <Badge className={getStatusBadgeColor(lead.status)}>
          {lead.status}
        </Badge>
      </CardHeader>

      <CardContent className="space-y-4 pb-0">
        <div className="space-y-1 text-sm">
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span>{lead.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span>{lead.phone}</span>
          </div>
          {lead.lastContact && (
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>Último contato: {lead.lastContact}</span>
            </div>
          )}
        </div>

        {/* Campus Recomendado */}
        <div className="border p-3 rounded-md bg-muted/30 space-y-2">
          <div className="flex justify-between items-center">
            <h4 className="font-medium text-sm">Unidade Recomendada</h4>
            <Badge variant="outline" className="text-xs">
              {recommendedCampus.distance} km
            </Badge>
          </div>
          
          <div className="space-y-0.5">
            <div className="font-medium text-sm">{recommendedCampus.name}</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3" />
              <span>
                {recommendedCampus.address}, {recommendedCampus.city}-{recommendedCampus.state}
              </span>
            </div>
          </div>
        </div>

        {/* Cursos Disponíveis */}
        <div>
          <h4 className="font-medium text-sm mb-1">Cursos Disponíveis</h4>
          <div className="space-y-1 max-h-36 overflow-y-auto pr-1">
            {availableCourses.map((course) => (
              <div 
                key={course.id} 
                className="flex items-center justify-between border rounded p-2 text-sm"
              >
                <div>
                  <div className="font-medium">{course.name}</div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <span>{course.modality}</span>
                    <span className="mx-1">•</span>
                    <span>{course.shift}</span>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs">
                  {course.startDate}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between pt-4 flex-col space-y-2">
        <div className="flex gap-2 w-full">
          <Button 
            variant="outline"
            className="w-1/2"
            onClick={() => onViewAlternatives(lead.postalCode)}
          >
            <School className="h-4 w-4 mr-1" /> Outras Unidades
          </Button>
          <Button 
            className="w-1/2"
            onClick={() => onScheduleVisit(lead.id, recommendedCampus.id)}
          >
            <Calendar className="h-4 w-4 mr-1" /> Agendar Visita
          </Button>
        </div>

        <div className="flex gap-2 w-full">
          <Button 
            variant="secondary"
            className="w-1/2"
            onClick={() => onContact(lead.id, 'whatsapp')}
          >
            <MessageSquare className="h-4 w-4 mr-1" /> Contatar
          </Button>
          <Button 
            variant="outline"
            className="w-1/2"
            onClick={() => window.location.href = `/recruitment/leads/${lead.id}`}
          >
            <ExternalLink className="h-4 w-4 mr-1" /> Ver Detalhes
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default EnhancedLeadCard;
