
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit, Trash, AlertTriangle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface Goal {
  id: string;
  name: string;
  period: string;
  course?: string;
  campus?: string;
  target: number;
  current: number;
  status: 'active' | 'completed' | 'pending';
  category: 'general' | 'course' | 'campus';
}

interface GoalsListProps {
  goals?: Goal[];
  isLoading?: boolean;
  category: string;
}

const GoalsList: React.FC<GoalsListProps> = ({ goals = [], isLoading = false, category }) => {
  const { toast } = useToast();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [goalToDelete, setGoalToDelete] = useState<Goal | null>(null);
  const [localGoals, setLocalGoals] = useState<Goal[]>([
    {
      id: '1',
      name: 'Meta Global 2025.1',
      period: '2025.1',
      target: 5000,
      current: 2150,
      status: 'active',
      category: 'general'
    },
    {
      id: '2',
      name: 'Engenharia Civil',
      period: '2025.1',
      course: 'Engenharia Civil',
      target: 350,
      current: 142,
      status: 'active',
      category: 'course'
    },
    {
      id: '3',
      name: 'Medicina',
      period: '2025.1',
      course: 'Medicina',
      target: 200,
      current: 189,
      status: 'active',
      category: 'course'
    },
    {
      id: '4',
      name: 'Campus Norte',
      period: '2025.1',
      campus: 'Campus Norte',
      target: 1200,
      current: 560,
      status: 'active',
      category: 'campus'
    },
    {
      id: '5',
      name: 'Campus Sul',
      period: '2025.1',
      campus: 'Campus Sul',
      target: 800,
      current: 320,
      status: 'active',
      category: 'campus'
    },
    {
      id: '6',
      name: 'Meta Global 2024.2',
      period: '2024.2',
      target: 4500,
      current: 4200,
      status: 'completed',
      category: 'general'
    }
  ]);

  const handleEdit = (goal: Goal) => {
    toast({
      title: "Edição em desenvolvimento",
      description: `A edição da meta "${goal.name}" estará disponível em breve.`,
      duration: 3000,
    });
  };

  const handleDelete = (goal: Goal) => {
    setGoalToDelete(goal);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (goalToDelete) {
      setLocalGoals(prev => prev.filter(g => g.id !== goalToDelete.id));
      toast({
        title: "Meta removida",
        description: `A meta "${goalToDelete.name}" foi removida com sucesso.`,
        duration: 3000,
      });
      setDeleteDialogOpen(false);
      setGoalToDelete(null);
    }
  };

  const displayGoals = goals.length > 0 
    ? goals.filter(g => g.category === category) 
    : localGoals.filter(g => g.category === category);

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardContent className="py-6">
          <div className="flex items-center justify-center h-40">
            <p className="text-muted-foreground">Carregando metas...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (displayGoals.length === 0) {
    return (
      <Card className="w-full">
        <CardContent className="py-6">
          <div className="flex flex-col items-center justify-center h-40 text-center">
            <AlertTriangle className="h-10 w-10 text-muted-foreground mb-4" />
            <p className="text-muted-foreground mb-2">Nenhuma meta encontrada nesta categoria</p>
            <p className="text-xs text-muted-foreground">
              Utilize o botão "Nova Meta" para adicionar sua primeira meta.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <div className="space-y-4">
        {displayGoals.map((goal) => (
          <Card key={goal.id} className="w-full">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg font-medium">{goal.name}</CardTitle>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs">
                      Período: {goal.period}
                    </Badge>
                    {goal.course && (
                      <Badge variant="outline" className="text-xs">
                        Curso: {goal.course}
                      </Badge>
                    )}
                    {goal.campus && (
                      <Badge variant="outline" className="text-xs">
                        Unidade: {goal.campus}
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8"
                    onClick={() => handleEdit(goal)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-destructive"
                    onClick={() => handleDelete(goal)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mt-2">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Progresso: {Math.round((goal.current / goal.target) * 100)}%</span>
                  <span className="text-sm text-muted-foreground">
                    {goal.current} / {goal.target}
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2.5">
                  <div 
                    className="bg-primary h-2.5 rounded-full" 
                    style={{ width: `${Math.min(Math.round((goal.current / goal.target) * 100), 100)}%` }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir a meta "{goalToDelete?.name}"? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default GoalsList;
