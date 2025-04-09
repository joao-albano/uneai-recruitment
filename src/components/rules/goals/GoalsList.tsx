
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit, Trash } from 'lucide-react';

interface Goal {
  id: string;
  name: string;
  period: string;
  course?: string;
  campus?: string;
  target: number;
  current: number;
  status: 'active' | 'completed' | 'pending';
}

interface GoalsListProps {
  goals?: Goal[];
  isLoading?: boolean;
}

const GoalsList: React.FC<GoalsListProps> = ({ goals = [], isLoading = false }) => {
  // Mock data for preview purposes
  const demoGoals: Goal[] = [
    {
      id: '1',
      name: 'Meta Global 2025.1',
      period: '2025.1',
      target: 5000,
      current: 2150,
      status: 'active'
    },
    {
      id: '2',
      name: 'Engenharia Civil',
      period: '2025.1',
      course: 'Engenharia Civil',
      target: 350,
      current: 142,
      status: 'active'
    },
    {
      id: '3',
      name: 'Medicina',
      period: '2025.1',
      course: 'Medicina',
      target: 200,
      current: 189,
      status: 'active'
    },
    {
      id: '4',
      name: 'Campus Norte',
      period: '2025.1',
      campus: 'Campus Norte',
      target: 1200,
      current: 560,
      status: 'active'
    }
  ];

  const displayGoals = goals.length > 0 ? goals : demoGoals;

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

  return (
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
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
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
  );
};

export default GoalsList;
