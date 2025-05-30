
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { RegistryRule } from '@/types/registry';

interface RegistrySelectionDialogProps {
  open: boolean;
  onClose: () => void;
  onSelect: (code: string, description: string) => void;
  rules: RegistryRule[];
  type: 'human' | 'ai';
}

const RegistrySelectionDialog: React.FC<RegistrySelectionDialogProps> = ({
  open,
  onClose,
  onSelect,
  rules,
  type
}) => {
  const [selectedCode, setSelectedCode] = React.useState<string>('');

  const handleConfirm = () => {
    const rule = rules.find(r => r.code === selectedCode);
    if (rule) {
      onSelect(rule.code, rule.description);
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Tabulação do Atendimento</DialogTitle>
          <DialogDescription>
            Selecione o código de tabulação apropriado para este atendimento
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="registry-code" className="text-right">
              Código
            </Label>
            <Select
              value={selectedCode}
              onValueChange={setSelectedCode}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Selecione um código" />
              </SelectTrigger>
              <SelectContent>
                {rules.map(rule => (
                  <SelectItem key={rule.code} value={rule.code}>
                    {rule.code} - {rule.description}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button onClick={handleConfirm} disabled={!selectedCode}>Confirmar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RegistrySelectionDialog;
