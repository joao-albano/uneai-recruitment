import React, { useState } from 'react';
import { Course } from '@/types/recruitment/campus';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlusCircle, X, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { v4 as uuidv4 } from 'uuid';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CourseManagerProps {
  courses: Course[];
  onChange: (courses: Course[]) => void;
}

const CourseManager: React.FC<CourseManagerProps> = ({ courses, onChange }) => {
  const [newCourseName, setNewCourseName] = useState('');
  const [selectedModalities, setSelectedModalities] = useState<Array<'presencial' | 'semipresencial' | 'ead'>>(['presencial']);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddCourse = () => {
    if (newCourseName.trim() === '') return;
    
    const newCourse: Course = {
      id: uuidv4(),
      name: newCourseName.trim(),
      modalities: [...selectedModalities],
    };
    
    onChange([...courses, newCourse]);
    setNewCourseName('');
    setSelectedModalities(['presencial']);
    setIsAdding(false);
  };

  const handleRemoveCourse = (courseId: string) => {
    onChange(courses.filter(course => course.id !== courseId));
  };

  const handleToggleModality = (courseId: string, modality: 'presencial' | 'semipresencial' | 'ead') => {
    onChange(
      courses.map(course => {
        if (course.id === courseId) {
          // If the modality is already selected, remove it, otherwise add it
          const modalities = course.modalities.includes(modality)
            ? course.modalities.filter(m => m !== modality)
            : [...course.modalities, modality];
          
          // Ensure at least one modality is selected
          return {
            ...course,
            modalities: modalities.length > 0 ? modalities : ['presencial']
          };
        }
        return course;
      })
    );
  };

  const handleModalityChange = (modality: 'presencial' | 'semipresencial' | 'ead') => {
    setSelectedModalities(prev => {
      // If already selected, remove it
      if (prev.includes(modality)) {
        const filtered = prev.filter(m => m !== modality);
        // Ensure at least one modality is selected
        return filtered.length > 0 ? filtered : ['presencial'];
      }
      // Otherwise, add it
      return [...prev, modality];
    });
  };

  return (
    <div className="space-y-4">
      {courses.length === 0 && !isAdding ? (
        <div className="text-center p-4 bg-muted rounded-md">
          <p className="text-muted-foreground">Nenhum curso cadastrado. Adicione cursos para esta unidade.</p>
        </div>
      ) : (
        <div className="grid gap-2">
          {courses.map((course) => (
            <div key={course.id} className="flex items-center justify-between p-2 border rounded-md">
              <div className="flex-1">
                <div className="font-medium">{course.name}</div>
                <div className="flex gap-1 mt-1">
                  <Badge 
                    variant={course.modalities.includes('presencial') ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => handleToggleModality(course.id, 'presencial')}
                  >
                    Presencial
                  </Badge>
                  <Badge 
                    variant={course.modalities.includes('semipresencial') ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => handleToggleModality(course.id, 'semipresencial')}
                  >
                    Semipresencial
                  </Badge>
                  <Badge 
                    variant={course.modalities.includes('ead') ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => handleToggleModality(course.id, 'ead')}
                  >
                    EAD
                  </Badge>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleRemoveCourse(course.id)}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {isAdding ? (
        <div className="border p-3 rounded-md">
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium">Nome do Curso</label>
              <Input
                placeholder="Ex: Administração"
                value={newCourseName}
                onChange={(e) => setNewCourseName(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium block mb-1">Modalidades</label>
              <div className="flex gap-2">
                <Badge 
                  variant={selectedModalities.includes('presencial') ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => handleModalityChange('presencial')}
                >
                  Presencial
                </Badge>
                <Badge 
                  variant={selectedModalities.includes('semipresencial') ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => handleModalityChange('semipresencial')}
                >
                  Semipresencial
                </Badge>
                <Badge 
                  variant={selectedModalities.includes('ead') ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => handleModalityChange('ead')}
                >
                  EAD
                </Badge>
              </div>
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" size="sm" onClick={() => setIsAdding(false)}>
                Cancelar
              </Button>
              <Button size="sm" onClick={handleAddCourse} disabled={!newCourseName.trim()}>
                Adicionar
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full" 
          onClick={() => setIsAdding(true)}
        >
          <PlusCircle className="h-4 w-4 mr-2" /> Adicionar Curso
        </Button>
      )}
    </div>
  );
};

export default CourseManager;
