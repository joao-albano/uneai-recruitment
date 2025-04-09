
import React, { useState } from 'react';
import { format } from 'date-fns';
import { DialingRule, RedialInterval, DialingFailureType } from '@/types/voicecall';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DialingRuleFormProps {
  initialData?: Partial<DialingRule>;
  onSubmit: (data: Omit<DialingRule, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
  defaultRedialIntervals: RedialInterval[];
}

const failureTypeLabels: Record<DialingFailureType, string> = {
  'voicemail': 'Caixa Postal',
  'no-answer': 'Não Atende',
  'busy': 'Ocupado',
  'failure': 'Falha',
  'error': 'Erro',
  'invalid-number': 'Número Inválido'
};

const DialingRuleForm: React.FC<DialingRuleFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  defaultRedialIntervals
}) => {
  const [name, setName] = useState(initialData?.name || '');
  const [enabled, setEnabled] = useState(initialData?.enabled ?? true);
  const [simultaneousChannels, setSimultaneousChannels] = useState(initialData?.simultaneousChannels || 5);
  const [startDate, setStartDate] = useState<Date | undefined>(initialData?.startDate || new Date());
  const [startTime, setStartTime] = useState(initialData?.startTime || '08:00');
  const [endDate, setEndDate] = useState<Date | undefined>(initialData?.endDate || undefined);
  const [endTime, setEndTime] = useState(initialData?.endTime || '18:00');
  const [maxAttempts, setMaxAttempts] = useState(initialData?.maxAttemptsPerLead || 3);
  const [timeBetweenCalls, setTimeBetweenCalls] = useState(initialData?.timeBetweenCalls || 10);

  const [redialIntervals, setRedialIntervals] = useState<RedialInterval[]>(
    initialData?.redialIntervals || [...defaultRedialIntervals]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!startDate) {
      alert('Por favor, selecione uma data de início.');
      return;
    }
    
    const formData: Omit<DialingRule, 'id' | 'createdAt' | 'updatedAt'> = {
      name,
      enabled,
      simultaneousChannels,
      startDate,
      startTime,
      endDate: endDate || null,
      endTime,
      maxAttemptsPerLead: maxAttempts,
      timeBetweenCalls,
      redialIntervals
    };
    
    onSubmit(formData);
  };

  const updateRedialInterval = (failureType: DialingFailureType, field: 'intervalMinutes' | 'maxAttempts', value: number) => {
    setRedialIntervals(prev => 
      prev.map(interval => 
        interval.failureType === failureType 
          ? { ...interval, [field]: value } 
          : interval
      )
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid grid-cols-2 mb-6">
          <TabsTrigger value="basic">Configuração Básica</TabsTrigger>
          <TabsTrigger value="redial">Intervalos de Rediscagem</TabsTrigger>
        </TabsList>
        
        <TabsContent value="basic" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome da Regra</Label>
              <Input 
                id="name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="Ex: Horário Comercial"
                required
              />
            </div>
            
            <div className="flex items-center space-x-4 pt-6">
              <Switch 
                id="enabled" 
                checked={enabled}
                onCheckedChange={setEnabled}
              />
              <Label htmlFor="enabled">Regra Ativa</Label>
            </div>
          </div>
          
          <Separator className="my-4" />
          
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="simultaneousChannels">Canais Simultâneos</Label>
                  <div className="flex items-center mt-2">
                    <Input 
                      id="simultaneousChannels" 
                      type="number" 
                      min={1}
                      value={simultaneousChannels} 
                      onChange={(e) => setSimultaneousChannels(Number(e.target.value))}
                      className="w-24"
                    />
                    <span className="ml-3 text-sm text-muted-foreground">
                      chamadas simultâneas
                    </span>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="timeBetweenCalls">Tempo Entre Chamadas</Label>
                  <div className="flex items-center mt-2">
                    <Input 
                      id="timeBetweenCalls" 
                      type="number" 
                      min={1}
                      value={timeBetweenCalls} 
                      onChange={(e) => setTimeBetweenCalls(Number(e.target.value))}
                      className="w-24"
                    />
                    <span className="ml-3 text-sm text-muted-foreground">
                      segundos entre chamadas
                    </span>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="maxAttempts">Máximo de Tentativas por Lead</Label>
                  <div className="flex items-center mt-2">
                    <Input 
                      id="maxAttempts" 
                      type="number" 
                      min={1}
                      value={maxAttempts} 
                      onChange={(e) => setMaxAttempts(Number(e.target.value))}
                      className="w-24"
                    />
                    <span className="ml-3 text-sm text-muted-foreground">
                      tentativas antes de abandonar
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Separator className="my-4" />
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">Período de Discagem</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Data de Início</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !startDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {startDate ? format(startDate, "PPP") : "Selecione uma data"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={setStartDate}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="startTime">Horário de Início</Label>
                  <Input 
                    id="startTime" 
                    type="time" 
                    value={startTime} 
                    onChange={(e) => setStartTime(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Data de Término (opcional)</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !endDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {endDate ? format(endDate, "PPP") : "Selecione uma data"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={endDate}
                        onSelect={setEndDate}
                        disabled={(date) => startDate ? date < startDate : false}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="endTime">Horário de Término</Label>
                  <Input 
                    id="endTime" 
                    type="time" 
                    value={endTime} 
                    onChange={(e) => setEndTime(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="redial" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">Intervalos de Rediscagem por Tipo de Falha</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Configure os intervalos de tempo entre as tentativas para cada tipo de falha de chamada.
              </p>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-1/3">Tipo de Falha</TableHead>
                    <TableHead className="w-1/3">Intervalo (minutos)</TableHead>
                    <TableHead className="w-1/3">Máximo de Tentativas</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {redialIntervals.map((interval) => (
                    <TableRow key={interval.failureType}>
                      <TableCell>{failureTypeLabels[interval.failureType]}</TableCell>
                      <TableCell>
                        <Input 
                          type="number" 
                          min={0}
                          value={interval.intervalMinutes} 
                          onChange={(e) => updateRedialInterval(
                            interval.failureType, 
                            'intervalMinutes', 
                            Number(e.target.value)
                          )}
                          className="w-24"
                        />
                      </TableCell>
                      <TableCell>
                        <Input 
                          type="number" 
                          min={0}
                          value={interval.maxAttempts} 
                          onChange={(e) => updateRedialInterval(
                            interval.failureType, 
                            'maxAttempts', 
                            Number(e.target.value)
                          )}
                          className="w-24"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-end space-x-4 mt-6">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">
          {initialData?.id ? 'Atualizar Regra' : 'Criar Regra'}
        </Button>
      </div>
    </form>
  );
};

export default DialingRuleForm;
