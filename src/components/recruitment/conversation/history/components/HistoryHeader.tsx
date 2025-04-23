
import { History } from "lucide-react";

interface HistoryHeaderProps {
  leadName: string;
}

export const HistoryHeader = ({ leadName }: HistoryHeaderProps) => {
  return (
    <div className="flex items-center gap-2 py-3 px-4 border-b">
      <History className="h-5 w-5" />
      <h2 className="text-lg font-medium">Histórico de Atendimentos - {leadName}</h2>
    </div>
  );
};
