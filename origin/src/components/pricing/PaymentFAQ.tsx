
import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const PaymentFAQ: React.FC = () => {
  const { language } = useTheme();
  const isPtBR = language === 'pt-BR';
  
  const faqs = [
    {
      question: isPtBR ? 'Como funciona a cobrança?' : 'How does billing work?',
      answer: isPtBR 
        ? 'A cobrança é feita de forma recorrente, de acordo com o período selecionado (mensal ou anual). Você pode cancelar a qualquer momento.'
        : 'Billing is recurring, according to the selected period (monthly or yearly). You can cancel at any time.',
    },
    {
      question: isPtBR ? 'Posso mudar de plano?' : 'Can I change plans?',
      answer: isPtBR 
        ? 'Sim, você pode fazer upgrade ou downgrade do seu plano a qualquer momento. As mudanças serão refletidas no próximo ciclo de cobrança, com ajustes proporcionais se necessário.'
        : 'Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in the next billing cycle, with prorated adjustments if necessary.',
    },
    {
      question: isPtBR ? 'Quais formas de pagamento são aceitas?' : 'What payment methods are accepted?',
      answer: isPtBR 
        ? 'Aceitamos cartões de crédito (Visa, Mastercard, American Express) e transferências bancárias para planos anuais.'
        : 'We accept credit cards (Visa, Mastercard, American Express) and bank transfers for yearly plans.',
    },
    {
      question: isPtBR ? 'É possível obter uma fatura para minha instituição?' : 'Can I get an invoice for my institution?',
      answer: isPtBR 
        ? 'Sim, todas as cobranças vêm com faturas detalhadas que podem ser usadas para fins contábeis institucionais. Elas são enviadas automaticamente para o email cadastrado.'
        : 'Yes, all charges come with detailed invoices that can be used for institutional accounting purposes. They are automatically sent to the registered email.',
    },
    {
      question: isPtBR ? 'Existe período de teste?' : 'Is there a trial period?',
      answer: isPtBR 
        ? 'Oferecemos um período de teste de 14 dias para todos os planos. Durante este período, você tem acesso a todas as funcionalidades do plano escolhido sem compromisso.'
        : 'We offer a 14-day trial period for all plans. During this period, you have access to all features of the chosen plan without commitment.',
    },
    {
      question: isPtBR ? 'Como posso cancelar minha assinatura?' : 'How can I cancel my subscription?',
      answer: isPtBR 
        ? 'Você pode cancelar sua assinatura a qualquer momento através da página de configurações do seu perfil. O acesso continuará disponível até o final do período pago.'
        : 'You can cancel your subscription at any time through your profile settings page. Access will remain available until the end of the paid period.',
    },
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {isPtBR ? 'Perguntas Frequentes' : 'Frequently Asked Questions'}
      </h2>
      
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent>
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default PaymentFAQ;
