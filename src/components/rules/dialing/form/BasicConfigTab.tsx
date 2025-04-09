
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { DatePicker } from '@/components/ui/date-picker';

interface BasicConfigTabProps {
  name: string;
  setName: (name: string) => void;
  enabled: boolean;
  setEnabled: (enabled: boolean) => void;
  simultaneousChannels: number;
  setSimultaneousChannels: (channels: number) => void;
  timeBetweenCalls: number;
  setTimeBetweenCalls: (seconds: number) => void;
  maxAttempts: number;
  setMaxAttempts: (attempts: number) => void;
  startDate: Date | undefined;
  setStartDate: (date: Date | undefined) => void;
  startTime: string;
  setStartTime: (time: string) => void;
  endDate: Date | undefined;
  setEndDate: (date: Date | undefined) => void;
  endTime: string;
  setEndTime: (time: string) => void;
}

const BasicConfigTab: React.FC<BasicConfigTabProps> = ({
  name,
  setName,
  enabled,
  setEnabled,
  simultaneousChannels,
  setSimultaneousChannels,
  timeBetweenCalls,
  setTimeBetweenCalls,
  maxAttempts,
  setMaxAttempts,
  startDate,
  setStartDate,
  startTime,
  setStartTime,
  endDate,
  setEndDate,
  endTime,
  setEndTime
}) => {
  return (
    <div className="space-y-4">
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
              <DatePicker 
                date={startDate} 
                setDate={setStartDate}
                placeholder="Selecione a data de início"
              />
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
              <DatePicker 
                date={endDate} 
                setDate={setEndDate}
                fromDate={startDate}
                placeholder="Selecione a data de término"
              />
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
    </div>
  );
};

export default BasicConfigTab;
