
import React, { useEffect } from 'react';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, Users, Info } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { LeadFormValues } from '../../../types/leadForm';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardHeader, CardContent, CardTitle, CardFooter } from '@/components/ui/card';

interface ChildrenInfoCardProps {
  form: UseFormReturn<LeadFormValues>;
  requiresChildrenInfo: boolean;
}

const ChildrenInfoCard: React.FC<ChildrenInfoCardProps> = ({ form, requiresChildrenInfo }) => {
  const children = form.watch('children');

  // Add a new child to the form
  const addChild = () => {
    const currentChildren = form.getValues().children || [];
    form.setValue("children", [
      ...currentChildren,
      { name: "", age: "", grade: "" }
    ]);
  };

  // Remove a child from the form
  const removeChild = (index: number) => {
    const currentChildren = form.getValues().children || [];
    if (currentChildren.length > 1 || !requiresChildrenInfo) {
      form.setValue("children", currentChildren.filter((_, i) => i !== index));
    }
  };

  // Ensure at least one child for courses requiring children
  useEffect(() => {
    if (requiresChildrenInfo && (!children || children.length === 0)) {
      addChild();
    }
  }, [requiresChildrenInfo, children]);

  if (!requiresChildrenInfo) {
    return (
      <Card>
        <CardHeader className="p-3 md:p-4">
          <CardTitle className="text-sm md:text-base flex items-center gap-2">
            <Users className="h-3 w-3 md:h-4 md:w-4 text-primary" />
            Informações de Filhos
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3 md:p-4 pt-0">
          <Alert className="bg-blue-50 border-blue-200">
            <Info className="h-3 w-3 md:h-4 md:w-4 text-blue-500" />
            <AlertTitle className="text-xs md:text-sm">Informação</AlertTitle>
            <AlertDescription className="text-xs md:text-sm">
              O curso selecionado não requer informações de filhos.
              As informações de filhos são necessárias apenas para cursos de educação básica.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="p-3 md:p-4">
        <CardTitle className="text-sm md:text-base flex items-center gap-2">
          <Users className="h-3 w-3 md:h-4 md:w-4 text-primary" />
          Informações de Filhos
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3 md:p-4 pt-0 space-y-3 md:space-y-4">
        {(children || []).map((_, index) => (
          <div key={index} className="border rounded-md p-2 md:p-3 relative bg-gray-50">
            <div className="absolute right-1 top-1">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeChild(index)}
                disabled={children.length <= 1 && requiresChildrenInfo}
                className="h-6 w-6"
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
            
            <h3 className="font-medium mb-2 text-xs md:text-sm">Filho {index + 1}</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-3">
              <FormField
                control={form.control}
                name={`children.${index}.name`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome do filho" {...field} className="text-xs h-8" />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name={`children.${index}.age`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Idade</FormLabel>
                    <FormControl>
                      <Input placeholder="Idade" {...field} className="text-xs h-8" />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name={`children.${index}.grade`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Série</FormLabel>
                    <FormControl>
                      <Input placeholder="Série pretendida" {...field} className="text-xs h-8" />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter className="p-3 md:p-4 pt-0">
        <Button
          type="button"
          variant="outline"
          onClick={addChild}
          className="w-full gap-1 text-xs md:text-sm h-8 md:h-10"
        >
          <Plus className="h-3 w-3" />
          <span>Adicionar Filho</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ChildrenInfoCard;
