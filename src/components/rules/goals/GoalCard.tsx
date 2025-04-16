
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
  category: 'general' | 'course' | 'campus';
}

interface GoalCardProps {
  goal: Goal;
  onEdit: (goal: Goal) => void;
  onDelete: (goal: Goal) => void;
}

const GoalCard: React.FC<GoalCardProps> = ({ goal, onEdit, onDelete }) => {
  return (
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
              onClick={() => onEdit(goal)}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-destructive"
              onClick={() => onDelete(goal)}
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
  );
};

export default GoalCard;
