
import React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';

// Lista de fatores pré-definidos organizados por categorias
export const predefinedFactors = {
  'Funil': [
    { id: 'etapa_funil', name: 'Etapa do Funil', description: 'Prioriza com base na etapa atual do funil' },
    { id: 'tempo_etapa', name: 'Tempo na Etapa', description: 'Tempo de permanência na etapa atual' },
    { id: 'subetapa', name: 'Sub-etapa', description: 'Sub-etapa atual no funil' },
    { id: 'prox_etapa', name: 'Próxima Etapa', description: 'Probabilidade de avançar para próxima etapa' },
  ],
  'Interação': [
    { id: 'dias_sem_contato', name: 'Dias sem Contato', description: 'Dias desde o último contato' },
    { id: 'num_interacoes', name: 'Número de Interações', description: 'Quantidade total de interações' },
    { id: 'resp_mensagens', name: 'Taxa de Resposta', description: 'Frequência com que o lead responde' },
    { id: 'tempo_resposta', name: 'Tempo de Resposta', description: 'Tempo médio de resposta do lead' },
  ],
  'Lead': [
    { id: 'curso', name: 'Curso', description: 'Curso de interesse do lead' },
    { id: 'regiao', name: 'Região', description: 'Localização geográfica do lead' },
    { id: 'origem', name: 'Origem', description: 'Canal de origem do lead' },
    { id: 'campanha', name: 'Campanha', description: 'Campanha associada ao lead' },
  ],
  'Tempo': [
    { id: 'prazo_matricula', name: 'Prazo de Matrícula', description: 'Proximidade do prazo de matrícula' },
    { id: 'data_criacao', name: 'Data de Criação', description: 'Tempo desde a criação do lead' },
    { id: 'sla', name: 'SLA', description: 'Proximidade de violar o SLA de contato' },
  ]
};

// Flatten para pesquisa
export const allFactors = Object.values(predefinedFactors).flat();

// Função para obter o nome do fator
export const getFactorName = (factorId: string): string => {
  // Ensure factorId is a valid string
  if (!factorId) return 'Fator Desconhecido';
  
  const factor = allFactors.find(f => f.id === factorId);
  return factor ? factor.name : factorId;
};

interface PriorizationFactorSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export const PriorizationFactorSelector: React.FC<PriorizationFactorSelectorProps> = ({ value, onChange }) => {
  const [open, setOpen] = React.useState(false);
  const selectedFactor = allFactors.find(factor => factor.id === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
          type="button"
          onClick={(e) => {
            e.preventDefault(); // Prevent form submission
            setOpen(!open);
          }}
        >
          {selectedFactor ? selectedFactor.name : "Selecionar fator..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0" side="bottom" align="start">
        <Command>
          <CommandInput placeholder="Buscar fator..." className="h-9" />
          <CommandEmpty>Nenhum fator encontrado.</CommandEmpty>
          <div className="max-h-[300px] overflow-auto">
            {Object.entries(predefinedFactors).map(([category, factors]) => (
              <CommandGroup key={category} heading={category}>
                {factors.map((factor) => (
                  <CommandItem
                    key={factor.id}
                    value={factor.id}
                    onSelect={(currentValue) => {
                      onChange(currentValue);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === factor.id ? "opacity-100" : "opacity-0"
                      )}
                    />
                    <div className="flex flex-col">
                      <span>{factor.name}</span>
                      <span className="text-xs text-muted-foreground">{factor.description}</span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </div>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
