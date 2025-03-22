
import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Check, ChevronLeft, ChevronRight, Clock, Edit, MoreVertical, Plus, Trash, Users, X } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { useData } from '@/context/DataContext';
import { useLocation } from 'react-router-dom';

const ScheduleView: React.FC = () => {
  const { students, schedules, addSchedule, updateScheduleStatus, generateDemoData } = useData();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showAddDialog, setShowAddDialog] = useState(false);
  const { toast } = useToast();
  const location = useLocation();
  const formRef = useRef<HTMLFormElement>(null);
  
  // Filter students who already have active appointments
  const studentsWithoutSchedules = students.filter(student => {
    // Check if student already has an active (scheduled) appointment
    return !schedules.some(
      schedule => 
        schedule.studentId === student.id && 
        schedule.status === 'scheduled'
    );
  });
  
  useEffect(() => {
    if (students.length === 0) {
      console.log("Generating demo data for scheduling");
      generateDemoData();
    }
    
    if (location.state?.studentId) {
      setShowAddDialog(true);
    }
  }, [students.length, generateDemoData, location.state]);
  
  const formattedMonthYear = selectedDate.toLocaleDateString('pt-BR', {
    month: 'long',
    year: 'numeric',
  });
  
  const daysInMonth = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth() + 1,
    0
  ).getDate();
  
  const firstDayOfMonth = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    1
  ).getDay();
  
  const previousMonth = () => {
    setSelectedDate(
      new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1)
    );
  };
  
  const nextMonth = () => {
    setSelectedDate(
      new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1)
    );
  };
  
  const handleScheduleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const studentId = formData.get('studentId') as string;
    const date = formData.get('date') as string;
    const time = formData.get('time') as string;
    const notes = formData.get('notes') as string;
    
    if (!studentId || !date || !time) {
      toast({
        title: 'Campos obrigatórios',
        description: 'Por favor, preencha todos os campos obrigatórios.',
        variant: 'destructive'
      });
      return;
    }
    
    const student = students.find(s => s.id === studentId);
    if (!student) return;
    
    const [year, month, day] = date.split('-').map(Number);
    const [hours, minutes] = time.split(':').map(Number);
    const scheduleDate = new Date(year, month - 1, day, hours, minutes);
    
    const newSchedule = {
      id: `schedule-${Date.now()}`,
      studentId,
      studentName: student.name,
      date: scheduleDate,
      agentName: 'Coord. Mariana',
      status: 'scheduled' as const,
      notes,
    };
    
    addSchedule(newSchedule);
    
    toast({
      title: 'Atendimento agendado',
      description: `Agendado para ${scheduleDate.toLocaleDateString()} às ${scheduleDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`
    });
    
    if (formRef.current) {
      formRef.current.reset();
    }
    
    setShowAddDialog(false);
  };
  
  const markCompleted = (id: string) => {
    updateScheduleStatus(id, 'completed');
    toast({
      title: 'Atendimento concluído',
      description: 'O atendimento foi marcado como concluído com sucesso.'
    });
  };
  
  const cancelSchedule = (id: string) => {
    updateScheduleStatus(id, 'canceled');
    toast({
      title: 'Atendimento cancelado',
      description: 'O atendimento foi cancelado com sucesso.'
    });
  };
  
  const currentMonthSchedules = schedules.filter(schedule => 
    schedule.date.getMonth() === selectedDate.getMonth() &&
    schedule.date.getFullYear() === selectedDate.getFullYear()
  );
  
  const today = new Date();
  const todaySchedules = schedules.filter(schedule => 
    schedule.date.getDate() === today.getDate() &&
    schedule.date.getMonth() === today.getMonth() &&
    schedule.date.getFullYear() === today.getFullYear() &&
    schedule.status === 'scheduled'
  ).sort((a, b) => a.date.getTime() - b.date.getTime());
  
  const upcomingSchedules = schedules.filter(schedule => 
    schedule.date > today &&
    schedule.status === 'scheduled'
  ).sort((a, b) => a.date.getTime() - b.date.getTime()).slice(0, 5);
  
  const hasSchedulesOnDay = (day: number) => {
    return currentMonthSchedules.some(schedule => 
      schedule.date.getDate() === day
    );
  };
  
  const getScheduleCountForDay = (day: number) => {
    return currentMonthSchedules.filter(schedule => 
      schedule.date.getDate() === day
    ).length;
  };
  
  const getScheduleStatusForDay = (day: number) => {
    const daySchedules = currentMonthSchedules.filter(schedule => 
      schedule.date.getDate() === day
    );
    
    if (daySchedules.some(s => s.status === 'scheduled')) {
      return 'scheduled';
    } else if (daySchedules.some(s => s.status === 'completed')) {
      return 'completed';
    } else if (daySchedules.some(s => s.status === 'canceled')) {
      return 'canceled';
    }
    
    return null;
  };
  
  // Get pre-selected student, but only if they don't already have a scheduled appointment
  const preSelectedStudentId = location.state?.studentId || '';
  const canSelectPreSelectedStudent = !schedules.some(
    schedule => 
      schedule.studentId === preSelectedStudentId && 
      schedule.status === 'scheduled'
  );
  
  const finalPreSelectedStudentId = canSelectPreSelectedStudent ? preSelectedStudentId : '';
  
  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Agenda</h1>
        <p className="text-muted-foreground mt-1">
          Gerencie atendimentos e acompanhamentos
        </p>
      </div>
      
      <div className="grid gap-8 md:grid-cols-5">
        <div className="md:col-span-3 space-y-4">
          <Card className="shadow-md">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  <CardTitle className="text-xl font-bold capitalize">
                    {formattedMonthYear}
                  </CardTitle>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="outline" size="icon" onClick={previousMonth}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={nextMonth}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-1">
                {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
                  <div key={day} className="text-center text-sm font-medium p-2">
                    {day}
                  </div>
                ))}
                
                {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                  <div key={`empty-${i}`} className="p-2 text-center text-muted-foreground" />
                ))}
                
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const isToday = 
                    day === today.getDate() && 
                    selectedDate.getMonth() === today.getMonth() && 
                    selectedDate.getFullYear() === today.getFullYear();
                  
                  const hasSchedules = hasSchedulesOnDay(day);
                  const scheduleCount = getScheduleCountForDay(day);
                  const scheduleStatus = getScheduleStatusForDay(day);
                  
                  let dayClasses = `
                    relative p-2 text-center transition-colors hover:bg-muted/50 rounded-lg
                    ${isToday ? 'font-bold' : ''}
                  `;
                  
                  let badgeClasses = "text-[10px] h-4 min-w-4 flex items-center justify-center";
                  
                  if (hasSchedules) {
                    if (isToday) {
                      dayClasses += ' bg-primary/15 hover:bg-primary/20';
                    } else {
                      dayClasses += ' bg-primary/5 hover:bg-primary/10';
                    }
                    
                    if (scheduleStatus === 'scheduled') {
                      badgeClasses += ' bg-blue-100 text-blue-700 border border-blue-300';
                    } else if (scheduleStatus === 'completed') {
                      badgeClasses += ' bg-green-100 text-green-700 border border-green-300';
                    } else if (scheduleStatus === 'canceled') {
                      badgeClasses += ' bg-red-100 text-red-700 border border-red-300';
                    }
                  } else if (isToday) {
                    dayClasses += ' bg-muted/30';
                  }
                  
                  return (
                    <div 
                      key={`day-${day}`} 
                      className={dayClasses}
                    >
                      <span className={`${isToday ? 'text-primary' : ''}`}>{day}</span>
                      
                      {hasSchedules && (
                        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
                          <Badge variant="outline" className={badgeClasses}>
                            {scheduleCount}
                          </Badge>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
            <CardFooter className="justify-between">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-muted/50" />
                  <span className="text-xs text-muted-foreground">Hoje</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-blue-100 border border-blue-300" />
                  <span className="text-xs text-muted-foreground">Agendado</span>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={() => setShowAddDialog(true)}>
                <Plus className="mr-1 h-3.5 w-3.5" />
                Novo atendimento
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Atendimentos de hoje</CardTitle>
              <CardDescription>
                {todaySchedules.length === 0 
                  ? 'Não há atendimentos agendados para hoje.'
                  : `${todaySchedules.length} atendimento(s) hoje.`
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              {todaySchedules.length > 0 ? (
                <div className="space-y-3">
                  {todaySchedules.map(schedule => (
                    <Card key={schedule.id} className="overflow-hidden">
                      <div className="flex">
                        <div className="w-2 bg-primary" />
                        <div className="flex-1 p-4">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium">{schedule.studentName}</h3>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-muted-foreground">
                                {schedule.date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                              </span>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Ações</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem onClick={() => markCompleted(schedule.id)}>
                                    <Check className="mr-2 h-4 w-4" />
                                    Marcar como concluído
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => cancelSchedule(schedule.id)}>
                                    <X className="mr-2 h-4 w-4" />
                                    Cancelar atendimento
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                          {schedule.notes && (
                            <p className="mt-1 text-sm text-muted-foreground">{schedule.notes}</p>
                          )}
                          <div className="mt-2 flex items-center gap-2">
                            <Badge variant="outline" className="text-xs bg-muted/50">
                              {schedule.agentName}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-40 text-center">
                  <Calendar className="h-10 w-10 text-muted-foreground/40 mb-2" />
                  <p className="text-muted-foreground">Não há atendimentos agendados para hoje</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-4"
                    onClick={() => setShowAddDialog(true)}
                  >
                    <Plus className="mr-1 h-3.5 w-3.5" />
                    Agendar atendimento
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-2 space-y-4">
          <Card className="shadow-md">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold">Próximos atendimentos</CardTitle>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8"
                  onClick={() => setShowAddDialog(true)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {upcomingSchedules.length > 0 ? (
                <ScrollArea className="h-96 pr-4">
                  <div className="space-y-4">
                    {upcomingSchedules.map(schedule => (
                      <div 
                        key={schedule.id}
                        className="flex gap-3 p-3 rounded-lg border transition-colors hover:bg-muted/20"
                      >
                        <div className="flex-shrink-0 rounded-full bg-primary/10 p-2 h-10 w-10 flex items-center justify-center">
                          <Users className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">{schedule.studentName}</h4>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-6 w-6">
                                  <MoreVertical className="h-3 w-3" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Editar
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => cancelSchedule(schedule.id)}>
                                  <Trash className="mr-2 h-4 w-4" />
                                  Cancelar
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                          <div className="flex items-center gap-1 mt-1">
                            <Calendar className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">
                              {schedule.date.toLocaleDateString()}
                            </span>
                            <Clock className="h-3 w-3 text-muted-foreground ml-2" />
                            <span className="text-xs text-muted-foreground">
                              {schedule.date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </span>
                          </div>
                          {schedule.notes && (
                            <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                              {schedule.notes}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              ) : (
                <div className="flex flex-col items-center justify-center h-40 text-center">
                  <Calendar className="h-10 w-10 text-muted-foreground/40 mb-2" />
                  <p className="text-muted-foreground">Nenhum atendimento agendado</p>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card className="bg-muted/30">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Estatísticas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm">Atendimentos agendados</span>
                  <span className="font-medium">
                    {schedules.filter(s => s.status === 'scheduled').length}
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full"
                    style={{ width: '60%' }}
                  />
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm">Atendimentos concluídos</span>
                  <span className="font-medium">
                    {schedules.filter(s => s.status === 'completed').length}
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                  <div 
                    className="h-full bg-green-500 rounded-full"
                    style={{ width: '30%' }}
                  />
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm">Atendimentos cancelados</span>
                  <span className="font-medium">
                    {schedules.filter(s => s.status === 'canceled').length}
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                  <div 
                    className="h-full bg-red-500 rounded-full"
                    style={{ width: '10%' }}
                  />
                </div>
              </div>
              
              <Separator className="my-2" />
              
              <div className="mt-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Total de atendimentos</span>
                  <span className="font-medium">{schedules.length}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Agendar atendimento</DialogTitle>
            <DialogDescription>
              Agende um atendimento para um aluno em risco
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleScheduleSubmit} ref={formRef}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="studentId">Aluno</Label>
                <Select name="studentId" defaultValue={finalPreSelectedStudentId} required>
                  <SelectTrigger id="studentId" className="w-full bg-background">
                    <SelectValue placeholder="Selecione um aluno" />
                  </SelectTrigger>
                  <SelectContent position="popper" className="w-full max-h-[200px] overflow-auto z-[100] bg-background">
                    {studentsWithoutSchedules.length > 0 ? (
                      studentsWithoutSchedules
                        .filter(student => student.riskLevel !== 'low')
                        .sort((a, b) => {
                          if (a.riskLevel === 'high' && b.riskLevel !== 'high') return -1;
                          if (a.riskLevel !== 'high' && b.riskLevel === 'high') return 1;
                          return a.name.localeCompare(b.name);
                        })
                        .map(student => (
                          <SelectItem key={student.id} value={student.id} className="flex items-center justify-between">
                            <span>{student.name}</span>
                            {student.riskLevel === 'high' && (
                              <Badge className="ml-2 bg-red-500 text-[10px]">
                                Alto risco
                              </Badge>
                            )}
                          </SelectItem>
                        ))
                    ) : (
                      <SelectItem value="loading" disabled>Carregando alunos...</SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="grid gap-2">
                  <Label htmlFor="date">Data</Label>
                  <Input
                    type="date"
                    name="date"
                    id="date"
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="time">Horário</Label>
                  <Input type="time" name="time" id="time" required />
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="notes">Anotações</Label>
                <Textarea
                  name="notes"
                  id="notes"
                  placeholder="Detalhes sobre o atendimento..."
                  className="min-h-[80px]"
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowAddDialog(false)}>
                Cancelar
              </Button>
              <Button type="submit">Agendar</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ScheduleView;
