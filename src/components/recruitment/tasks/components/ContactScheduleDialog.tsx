
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { DatePicker } from '@/components/ui/date-picker';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Task } from '@/types/recruitment/tasks';
import { format } from 'date-fns';

interface ContactScheduleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task: Task | null;
  type: 'contact' | 'schedule';
  onConfirm: (data: any) => void;
}

const ContactScheduleDialog: React.FC<ContactScheduleDialogProps> = ({
  open,
  onOpenChange,
  task,
  type,
  onConfirm
}) => {
  const [selectedDate, setSelectedDate] = React.useState<Date>();
  const [selectedTime, setSelectedTime] = React.useState('');
  const [contactMethod, setContactMethod] = React.useState('telefone');

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
  ];

  const handleConfirm = () => {
    if (type === 'schedule' && (!selectedDate || !selectedTime)) {
      return;
    }

    const data = {
      date: selectedDate,
      time: selectedTime,
      contactMethod,
      taskId: task?.id
    };

    onConfirm(data);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {type === 'contact' ? 'Contatar Lead' : 'Agendar Contato'}
          </DialogTitle>
          <DialogDescription>
            {type === 'contact' 
              ? 'Selecione o método de contato para iniciar a comunicação'
              : 'Selecione a data e horário para o agendamento'}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {type === 'contact' && (
            <div className="grid gap-2">
              <label>Método de Contato</label>
              <Select value={contactMethod} onValueChange={setContactMethod}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o método" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="telefone">Telefone</SelectItem>
                  <SelectItem value="whatsapp">WhatsApp</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {type === 'schedule' && (
            <>
              <div className="grid gap-2">
                <label>Data</label>
                <DatePicker
                  date={selectedDate}
                  setDate={setSelectedDate}
                  className="w-full"
                  fromDate={new Date()}
                />
              </div>

              <div className="grid gap-2">
                <label>Horário</label>
                <Select value={selectedTime} onValueChange={setSelectedTime}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o horário" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map(time => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleConfirm}>
            {type === 'contact' ? 'Iniciar Contato' : 'Agendar'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ContactScheduleDialog;
