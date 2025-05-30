
import React, { useState } from 'react';
import { DialingRule, RedialInterval, DialingFailureType, RuleSegmentation } from '@/types/voicecall';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BasicConfigTab from './form/BasicConfigTab';
import RedialIntervalsTab from './form/RedialIntervalsTab';
import SegmentationTab from './form/SegmentationTab';
import FormActions from './form/FormActions';

interface DialingRuleFormProps {
  initialData?: Partial<DialingRule>;
  onSubmit: (data: Omit<DialingRule, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
  defaultRedialIntervals: RedialInterval[];
  isSubmitting?: boolean;
}

const DialingRuleForm: React.FC<DialingRuleFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  defaultRedialIntervals,
  isSubmitting = false
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

  const [segmentation, setSegmentation] = useState<RuleSegmentation>(
    initialData?.segmentation || { courseIds: [], funnelIds: [], funnelStageIds: [] }
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
      redialIntervals,
      segmentation
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

  const updateSegmentation = (
    field: keyof RuleSegmentation, 
    value: string[] | undefined
  ) => {
    setSegmentation(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const isEditing = Boolean(initialData?.id);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="basic">Configuração Básica</TabsTrigger>
          <TabsTrigger value="redial">Intervalos de Rediscagem</TabsTrigger>
          <TabsTrigger value="segmentation">Segmentação</TabsTrigger>
        </TabsList>
        
        <TabsContent value="basic">
          <BasicConfigTab 
            name={name}
            setName={setName}
            enabled={enabled}
            setEnabled={setEnabled}
            simultaneousChannels={simultaneousChannels}
            setSimultaneousChannels={setSimultaneousChannels}
            timeBetweenCalls={timeBetweenCalls}
            setTimeBetweenCalls={setTimeBetweenCalls}
            maxAttempts={maxAttempts}
            setMaxAttempts={setMaxAttempts}
            startDate={startDate}
            setStartDate={setStartDate}
            startTime={startTime}
            setStartTime={setStartTime}
            endDate={endDate}
            setEndDate={setEndDate}
            endTime={endTime}
            setEndTime={setEndTime}
          />
        </TabsContent>
        
        <TabsContent value="redial">
          <RedialIntervalsTab 
            redialIntervals={redialIntervals}
            updateRedialInterval={updateRedialInterval}
          />
        </TabsContent>

        <TabsContent value="segmentation">
          <SegmentationTab 
            segmentation={segmentation}
            updateSegmentation={updateSegmentation}
          />
        </TabsContent>
      </Tabs>
      
      <FormActions 
        onCancel={onCancel}
        isSubmitting={isSubmitting}
        isEditing={isEditing}
      />
    </form>
  );
};

export default DialingRuleForm;
