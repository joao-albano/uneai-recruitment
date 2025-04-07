
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileUp, Download, Check, AlertCircle } from 'lucide-react';
import { useCampus } from './hooks/useCampus';
import { toast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Papa from 'papaparse';

const CampusImport: React.FC<{ onImportSuccess: () => void }> = ({ onImportSuccess }) => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [previewData, setPreviewData] = useState<any[]>([]);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  
  const { importCampuses } = useCampus();
  
  const downloadTemplate = () => {
    const csvContent = 'nome,endereco,cidade,estado,cep,telefone\nCampus Centro,Av. Central 123,São Paulo,SP,01310-000,(11) 3333-4444\nCampus Norte,Rua Norte 456,São Paulo,SP,02345-000,(11) 4444-5555';
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', 'modelo_unidades.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    
    setFile(selectedFile);
    setErrorMessages([]);
    
    // Parse CSV para preview
    Papa.parse(selectedFile, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.errors.length > 0) {
          setErrorMessages(results.errors.map(err => `Erro: ${err.message} na linha ${err.row}`));
          return;
        }
        
        // Validar colunas
        const requiredColumns = ['nome', 'endereco', 'cidade', 'estado', 'cep', 'telefone'];
        const headers = Object.keys(results.data[0]);
        const missingColumns = requiredColumns.filter(col => !headers.includes(col));
        
        if (missingColumns.length > 0) {
          setErrorMessages([`Colunas obrigatórias ausentes: ${missingColumns.join(', ')}`]);
          return;
        }
        
        setPreviewData(results.data.slice(0, 5)); // Mostrar apenas 5 primeiras linhas
      }
    });
  };
  
  const handleImport = async () => {
    if (!file) return;
    
    setIsUploading(true);
    
    try {
      await importCampuses(file);
      toast({
        title: "Importação concluída",
        description: "Unidades importadas com sucesso!"
      });
      onImportSuccess();
    } catch (error) {
      toast({
        title: "Erro na importação",
        description: "Houve um erro ao importar as unidades. Verifique o formato do arquivo.",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Importar Unidades</CardTitle>
          <CardDescription>
            Importe unidades em lote através de um arquivo CSV ou Excel
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Button onClick={downloadTemplate} variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Baixar Modelo
              </Button>
              
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => document.getElementById('file-upload')?.click()}
                  variant="outline"
                >
                  Selecionar Arquivo
                </Button>
                
                <Button 
                  onClick={handleImport} 
                  disabled={!file || isUploading || errorMessages.length > 0}
                  className="gap-2"
                >
                  {isUploading ? (
                    <>Importando...</>
                  ) : (
                    <>
                      <FileUp className="h-4 w-4" />
                      Importar
                    </>
                  )}
                </Button>
              </div>
            </div>
            
            <input
              id="file-upload"
              type="file"
              accept=".csv,.xlsx,.xls"
              onChange={handleFileChange}
              className="hidden"
            />
            
            {file && (
              <div className="p-4 border rounded-md bg-muted/30">
                <div className="flex items-center gap-2 mb-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="font-medium">{file.name}</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {file.type} - {(file.size / 1024).toFixed(2)} KB
                </p>
              </div>
            )}
            
            {errorMessages.length > 0 && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Erro no arquivo</AlertTitle>
                <AlertDescription>
                  <ul className="list-disc pl-4 mt-2">
                    {errorMessages.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </AlertDescription>
              </Alert>
            )}
            
            {previewData.length > 0 && (
              <div className="mt-6">
                <h3 className="text-md font-medium mb-2">Pré-visualização:</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 border">
                    <thead className="bg-muted">
                      <tr>
                        {Object.keys(previewData[0]).map((header) => (
                          <th key={header} className="px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {previewData.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          {Object.values(row).map((cell: any, cellIndex) => (
                            <td key={cellIndex} className="px-4 py-2 text-sm">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Mostrando {previewData.length} de {file ? "?" : "0"} registros.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CampusImport;
