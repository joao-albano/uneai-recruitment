
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useScheduleOperations } from '@/hooks/schedule/useScheduleOperations';
import { ProductType } from '@/context/product/types';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { mockLeadsData } from '@/components/recruitment/leads/data/mockLeadsData';
import { Schedule } from '@/types/schedule';
import { format } from 'date-fns';

interface ScheduleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  availableStudents: any[];
  productContext?: ProductType;
  preselectedStudentId?: string;
  scheduleToEdit?: Schedule | null;
  isEditMode?: boolean;
}

const ScheduleDialog: React.FC<ScheduleDialogProps> = ({ 
  open, 
  onOpenChange,
  availableStudents,
  productContext,
  preselectedStudentId,
  scheduleToEdit,
  isEditMode = false
}) => {
  const [selectedStudent, setSelectedStudent] = useState('');
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  const [notes, setNotes] = useState('');
  const [agentName, setAgentName] = useState('');
  const [educationType, setEducationType] = useState<'basic' | 'higher'>('basic');
  
  // Additional fields for different education types
  const [parentName, setParentName] = useState('');
  const [parentPhone, setParentPhone] = useState('');
  const [studentPhone, setStudentPhone] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [course, setCourse] = useState('');
  
  const { handleScheduleSubmit, updateSchedule } = useScheduleOperations();

  // Log dialog open state for debugging
  useEffect(() => {
    console.log("ScheduleDialog open state:", open);
  }, [open]);

  // Populate form with schedule data when editing
  useEffect(() => {
    if (open && isEditMode && scheduleToEdit) {
      const scheduleDate = new Date(scheduleToEdit.date);
      
      setSelectedStudent(scheduleToEdit.studentId);
      setScheduleDate(format(scheduleDate, 'yyyy-MM-dd'));
      setScheduleTime(format(scheduleDate, 'HH:mm'));
      setNotes(scheduleToEdit.notes || '');
      setAgentName(scheduleToEdit.agentName || '');
      
      if (scheduleToEdit.educationType) {
        setEducationType(scheduleToEdit.educationType);
      }
      
      // Set education type specific fields
      setParentName(scheduleToEdit.parentName || '');
      setParentPhone(scheduleToEdit.parentPhone || '');
      setStudentPhone(scheduleToEdit.studentPhone || '');
      setStudentEmail(scheduleToEdit.studentEmail || '');
      setCourse(scheduleToEdit.course || '');
      
      console.log('Editing schedule:', scheduleToEdit);
    } else if (open && !isEditMode) {
      // Set current date and time for new schedules
      const now = new Date();
      const dateString = now.toISOString().split('T')[0];
      const timeString = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      
      setScheduleDate(dateString);
      setScheduleTime(timeString);
      
      // Use preselected student ID if provided
      if (preselectedStudentId) {
        setSelectedStudent(preselectedStudentId);
        console.log(`Preselecting student: ${preselectedStudentId}`);
      } else {
        setSelectedStudent('');
      }
      
      // Reset other fields
      setNotes('');
      setAgentName('');
      setParentName('');
      setParentPhone('');
      setStudentPhone('');
      setStudentEmail('');
      setCourse('');
      setEducationType('basic');
    }
  }, [open, isEditMode, scheduleToEdit, preselectedStudentId]);
  
  // Log available students for debugging
  useEffect(() => {
    if (productContext === 'recruitment' && open) {
      console.log("Mock leads data for recruitment:", mockLeadsData);
    }
  }, [productContext, open]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting schedule form");
    
    const formData = new FormData();
    formData.append('studentId', selectedStudent);
    formData.append('date', scheduleDate);
    formData.append('time', scheduleTime);
    formData.append('notes', notes);
    formData.append('agentName', agentName);
    
    if (productContext) {
      formData.append('productContext', productContext);
    }
    
    // Add education type specific fields
    formData.append('educationType', educationType);
    
    if (educationType === 'basic') {
      formData.append('parentName', parentName);
      formData.append('parentPhone', parentPhone);
    } else {
      formData.append('studentPhone', studentPhone);
      formData.append('studentEmail', studentEmail);
      formData.append('course', course);
    }
    
    let success = false;
    
    if (isEditMode && scheduleToEdit) {
      // If editing, include the ID
      formData.append('id', scheduleToEdit.id);
      formData.append('status', scheduleToEdit.status);
      
      // Use the update method instead
      success = updateSchedule(formData);
    } else {
      // If creating new, use the standard method
      success = handleScheduleSubmit(formData);
    }
    
    console.log("Form submission result:", success);
    
    if (success) {
      // Reset form and close dialog
      onOpenChange(false);
    }
  };
  
  // Create a merged list of available students and mock leads for recruitment context
  const mergedStudents = productContext === 'recruitment' 
    ? [...availableStudents, ...mockLeadsData.map(lead => ({
        id: `lead-${lead.id}`,
        name: lead.name
      }))]
    : availableStudents;
  
  // Filter students based on product context if specified
  const filteredStudents = productContext 
    ? mergedStudents.filter(student => 
        (productContext === 'recruitment' && 
         (String(student.id).startsWith('lead-') || (typeof student.id === 'number' && `lead-${student.id}`.startsWith('lead-')))) ||
        (productContext === 'retention' && !String(student.id).startsWith('lead-')))
    : mergedStudents;

  // Special handler to prevent dialog close on React Dialog unmount
  const handleOpenChangeWrapper = (isOpen: boolean) => {
    console.log("Dialog open change requested:", isOpen);
    onOpenChange(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChangeWrapper}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {isEditMode 
              ? 'Editar Agendamento' 
              : productContext === 'recruitment' 
                ? 'Agendar Atendimento de Lead' 
                : productContext === 'retention'
                  ? 'Agendar Atendimento de Aluno'
                  : 'Agendar Atendimento'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="student">
              {productContext === 'recruitment' ? 'Lead' : 'Aluno'}
            </Label>
            <Select 
              value={selectedStudent} 
              onValueChange={setSelectedStudent}
              required
              disabled={isEditMode} // Disable student selection when editing
            >
              <SelectTrigger>
                <SelectValue placeholder={
                  productContext === 'recruitment' 
                    ? 'Selecione um lead' 
                    : 'Selecione um aluno'
                } />
              </SelectTrigger>
              <SelectContent>
                {filteredStudents.map((student) => (
                  <SelectItem key={student.id} value={String(student.id)}>
                    {student.name || `${productContext === 'recruitment' ? 'Lead' : 'Aluno'} ${student.id}`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {productContext === 'recruitment' && (
            <div className="space-y-2">
              <Label>Tipo de Instituição</Label>
              <RadioGroup 
                value={educationType} 
                onValueChange={(value: 'basic' | 'higher') => setEducationType(value)}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="basic" id="basic" />
                  <Label htmlFor="basic">Educação Básica</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="higher" id="higher" />
                  <Label htmlFor="higher">Ensino Superior (IES)</Label>
                </div>
              </RadioGroup>
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Data</Label>
              <Input 
                id="date" 
                type="date" 
                value={scheduleDate} 
                onChange={(e) => setScheduleDate(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Hora</Label>
              <Input 
                id="time" 
                type="time" 
                value={scheduleTime} 
                onChange={(e) => setScheduleTime(e.target.value)}
                required
              />
            </div>
          </div>
          
          {/* Display fields based on education type */}
          {productContext === 'recruitment' && educationType === 'basic' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="parentName">Nome do Responsável</Label>
                <Input 
                  id="parentName" 
                  type="text" 
                  placeholder="Nome completo do responsável"
                  value={parentName} 
                  onChange={(e) => setParentName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="parentPhone">Telefone do Responsável</Label>
                <Input 
                  id="parentPhone" 
                  type="tel" 
                  placeholder="(00) 00000-0000"
                  value={parentPhone} 
                  onChange={(e) => setParentPhone(e.target.value)}
                  required
                />
              </div>
            </div>
          )}
          
          {productContext === 'recruitment' && educationType === 'higher' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="studentPhone">Telefone do Aluno</Label>
                <Input 
                  id="studentPhone" 
                  type="tel" 
                  placeholder="(00) 00000-0000"
                  value={studentPhone} 
                  onChange={(e) => setStudentPhone(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="studentEmail">Email do Aluno</Label>
                <Input 
                  id="studentEmail" 
                  type="email" 
                  placeholder="email@exemplo.com"
                  value={studentEmail} 
                  onChange={(e) => setStudentEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="course">Curso de Interesse</Label>
                <Input 
                  id="course" 
                  type="text" 
                  placeholder="Ex: Administração, Direito, etc."
                  value={course} 
                  onChange={(e) => setCourse(e.target.value)}
                  required
                />
              </div>
            </div>
          )}
          
          {/* Only show "Responsável" field for basic education */}
          {(productContext !== 'recruitment' || educationType === 'basic') && (
            <div className="space-y-2">
              <Label htmlFor="agent">Responsável</Label>
              <Input 
                id="agent" 
                type="text" 
                placeholder="Nome do responsável"
                value={agentName} 
                onChange={(e) => setAgentName(e.target.value)}
              />
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="notes">Observações</Label>
            <Textarea 
              id="notes" 
              placeholder="Detalhes do atendimento"
              value={notes} 
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">
              {isEditMode ? 'Salvar Alterações' : 'Agendar'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleDialog;
