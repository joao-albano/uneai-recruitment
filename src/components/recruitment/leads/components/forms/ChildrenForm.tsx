
import React from 'react';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { LeadFormValues } from '../../types/leadForm';

interface ChildrenFormProps {
  form: UseFormReturn<LeadFormValues>;
}

const ChildrenForm: React.FC<ChildrenFormProps> = ({ form }) => {
  // Add a new child to the form
  const addChild = () => {
    const currentChildren = form.getValues().children;
    form.setValue("children", [
      ...currentChildren,
      { name: "", age: "", grade: "" }
    ]);
  };

  // Remove a child from the form
  const removeChild = (index: number) => {
    const currentChildren = form.getValues().children;
    if (currentChildren.length > 1) {
      form.setValue("children", currentChildren.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="space-y-4">
      {form.watch("children").map((_, index) => (
        <div key={index} className="border rounded-md p-4 relative">
          <div className="absolute right-2 top-2">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => removeChild(index)}
              disabled={form.watch("children").length <= 1}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          
          <h3 className="font-medium mb-3">Filho {index + 1}</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name={`children.${index}.name`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome do filho" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name={`children.${index}.age`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Idade</FormLabel>
                  <FormControl>
                    <Input placeholder="Idade" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name={`children.${index}.grade`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Série Pretendida</FormLabel>
                  <FormControl>
                    <Input placeholder="Série pretendida" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      ))}
      
      <Button
        type="button"
        variant="outline"
        onClick={addChild}
        className="w-full gap-2"
      >
        <Plus className="h-4 w-4" />
        <span>Adicionar Filho</span>
      </Button>
    </div>
  );
};

export default ChildrenForm;
