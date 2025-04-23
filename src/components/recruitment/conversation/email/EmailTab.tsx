
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Send } from 'lucide-react';
import { toast } from "sonner";

const EmailTab: React.FC = () => {
  const [subject, setSubject] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [isSending, setIsSending] = React.useState(false);

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    
    // Simulate sending email
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success("Email enviado com sucesso!");
    setSubject('');
    setMessage('');
    setIsSending(false);
  };

  return (
    <TabsContent value="email" className="flex-1 p-4">
      <div className="flex flex-col h-full space-y-4">
        <div className="flex items-center space-x-2 pb-4 border-b">
          <Mail className="h-5 w-5 text-muted-foreground" />
          <h3 className="text-lg font-medium">Interface de Email</h3>
        </div>

        <form onSubmit={handleSendEmail} className="space-y-4 flex-1">
          <div className="space-y-4">
            <div>
              <label htmlFor="to" className="text-sm font-medium">
                Para
              </label>
              <Input
                id="to"
                type="email"
                placeholder="email.do.lead@exemplo.com"
                value="lead.exemplo@email.com"
                disabled
                className="mt-1"
              />
            </div>
            
            <div>
              <label htmlFor="subject" className="text-sm font-medium">
                Assunto
              </label>
              <Input
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Digite o assunto do email"
                className="mt-1"
              />
            </div>

            <div>
              <label htmlFor="message" className="text-sm font-medium">
                Mensagem
              </label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Digite sua mensagem..."
                className="mt-1 min-h-[200px]"
              />
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button 
              type="submit" 
              disabled={!subject || !message || isSending}
              className="w-full sm:w-auto"
            >
              <Send className="mr-2 h-4 w-4" />
              {isSending ? 'Enviando...' : 'Enviar Email'}
            </Button>
          </div>
        </form>

        <div className="border-t pt-4">
          <h4 className="text-sm font-medium mb-2">Templates Rápidos</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setSubject('Agendamento de Visita - Processo Seletivo');
                setMessage('Olá!\n\nGostaria de agendar uma visita para conversarmos sobre o processo seletivo e conhecer nossa instituição.\n\nQual seria o melhor horário para você?\n\nAguardo seu retorno.');
              }}
            >
              Agendar Visita
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setSubject('Informações sobre Bolsas de Estudo');
                setMessage('Olá!\n\nVi seu interesse em nossos cursos e gostaria de compartilhar informações sobre nossas bolsas de estudo e condições especiais.\n\nPodemos agendar uma conversa?\n\nAguardo seu contato.');
              }}
            >
              Informações de Bolsas
            </Button>
          </div>
        </div>
      </div>
    </TabsContent>
  );
};

export default EmailTab;
