
import { Mail, MessageSquare, Phone } from "lucide-react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ConversationHistory } from "../../types/history";

interface HistoryTabsProps {
  whatsappCount: number;
  emailCount: number;
  voiceCount: number;
}

export const HistoryTabs = ({ whatsappCount, emailCount, voiceCount }: HistoryTabsProps) => {
  return (
    <TabsList className="mx-4 mt-2 grid w-auto grid-cols-3">
      <TabsTrigger value="whatsapp">
        <MessageSquare className="h-4 w-4 mr-2" />
        WhatsApp ({whatsappCount})
      </TabsTrigger>
      <TabsTrigger value="email">
        <Mail className="h-4 w-4 mr-2" />
        Email ({emailCount})
      </TabsTrigger>
      <TabsTrigger value="voz">
        <Phone className="h-4 w-4 mr-2" />
        Voz ({voiceCount})
      </TabsTrigger>
    </TabsList>
  );
};
