
import { saveAs } from 'file-saver';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { format } from 'date-fns';
import { ptBR, enUS } from 'date-fns/locale';

// Extend the jsPDF type to include autotable
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

interface InvoiceData {
  id: string;
  date: Date;
  amount: string;
  status: string;
  description?: string;
}

export const generateInvoicePDF = (
  invoice: InvoiceData,
  companyName: string = 'EduPredictAI',
  language: string = 'en-US'
): Blob => {
  const isPtBR = language === 'pt-BR';
  const dateLocale = isPtBR ? ptBR : enUS;
  
  // Create a new PDF document
  const doc = new jsPDF();
  
  // Add company logo/name
  doc.setFontSize(20);
  doc.text(companyName, 105, 20, { align: 'center' });
  
  // Add invoice title
  doc.setFontSize(16);
  doc.text(isPtBR ? 'FATURA' : 'INVOICE', 105, 30, { align: 'center' });
  
  // Add invoice details
  doc.setFontSize(12);
  doc.text(`${isPtBR ? 'Fatura Nº:' : 'Invoice No:'} ${invoice.id}`, 20, 50);
  doc.text(
    `${isPtBR ? 'Data:' : 'Date:'} ${format(invoice.date, isPtBR ? 'dd/MM/yyyy' : 'MM/dd/yyyy', { locale: dateLocale })}`, 
    20, 
    60
  );
  doc.text(`${isPtBR ? 'Status:' : 'Status:'} ${isPtBR ? (invoice.status === 'paid' ? 'Pago' : invoice.status) : invoice.status}`, 20, 70);
  
  // Add invoice items
  doc.autoTable({
    startY: 80,
    head: [
      [
        isPtBR ? 'Descrição' : 'Description', 
        isPtBR ? 'Valor' : 'Amount'
      ]
    ],
    body: [
      [
        invoice.description || (isPtBR ? 'Assinatura do serviço' : 'Service subscription'),
        invoice.amount
      ]
    ],
    foot: [
      [
        isPtBR ? 'Total' : 'Total',
        invoice.amount
      ]
    ],
    headStyles: { fillColor: [66, 66, 66] },
    footStyles: { fillColor: [239, 239, 239], textColor: [0, 0, 0], fontStyle: 'bold' }
  });
  
  // Add footer text
  const footerText = isPtBR 
    ? 'Obrigado por escolher nossos serviços!' 
    : 'Thank you for choosing our services!';
  
  doc.setFontSize(10);
  doc.text(footerText, 105, 160, { align: 'center' });
  
  // Generate a blob from the PDF
  const pdfBlob = doc.output('blob');
  
  return pdfBlob;
};

export const downloadInvoice = (invoice: InvoiceData, language: string = 'en-US') => {
  const isPtBR = language === 'pt-BR';
  const fileName = `${isPtBR ? 'fatura' : 'invoice'}-${invoice.id}.pdf`;
  
  // Generate the PDF blob
  const pdfBlob = generateInvoicePDF(invoice, 'EduPredictAI', language);
  
  // Use file-saver to download the file
  saveAs(pdfBlob, fileName);
};
