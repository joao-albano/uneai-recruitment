
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage 
} from '@/components/ui/form';
import { CampaignFormValues } from '../hooks/useCampaignForm';

interface TargetingTabProps {
  form: UseFormReturn<CampaignFormValues>;
  selectedCourses: string[];
  toggleCourse: (course: string) => void;
}

const TargetingTab: React.FC<TargetingTabProps> = ({ 
  form, 
  selectedCourses, 
  toggleCourse 
}) => {
  // Opções de cursos para seleção
  const availableCourses = [
    'Administração', 'Direito', 'Engenharia Civil', 'Medicina', 'Pedagogia', 
    'Ciência da Computação', 'Psicologia', 'Enfermagem', 'Arquitetura'
  ];

  return (
    <>
      <FormField
        control={form.control}
        name="audience"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Público-alvo</FormLabel>
            <FormControl>
              <Input {...field} value={field.value || ""} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="location"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Localização</FormLabel>
            <FormControl>
              <Input {...field} value={field.value || ""} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <div>
        <h3 className="text-sm font-medium mb-2">Cursos</h3>
        <div className="flex flex-wrap gap-2 mb-2">
          {availableCourses.map(course => (
            <Badge 
              key={course}
              variant={selectedCourses.includes(course) ? "default" : "outline"} 
              className="cursor-pointer"
              onClick={() => toggleCourse(course)}
            >
              {course}
            </Badge>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          Clique nos cursos para selecionar ou remover
        </p>
      </div>
    </>
  );
};

export default TargetingTab;
