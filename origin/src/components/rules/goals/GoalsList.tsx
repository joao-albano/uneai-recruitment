
import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import EditGoalDialog from './EditGoalDialog';
import GoalCard from './GoalCard';
import EmptyGoalState from './EmptyGoalState';
import LoadingGoalState from './LoadingGoalState';
import DeleteGoalDialog from './DeleteGoalDialog';
import { Goal } from './types';

interface GoalsListProps {
  goals?: Goal[];
  isLoading?: boolean;
  category: string;
}

const GoalsList: React.FC<GoalsListProps> = ({ goals = [], isLoading = false, category }) => {
  const { toast } = useToast();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [goalToDelete, setGoalToDelete] = useState<Goal | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [goalToEdit, setGoalToEdit] = useState<Goal | null>(null);
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

  // Update localGoals when external goals are added
  React.useEffect(() => {
    if (goals && goals.length > 0) {
      // Add new goals from props to the localGoals, without duplicates
      const updatedGoals = [...localGoals];
      goals.forEach(goal => {
        if (!updatedGoals.some(g => g.id === goal.id)) {
          updatedGoals.push(goal);
        }
      });
      
      setLocalGoals(updatedGoals);
    }
  }, [goals]);

  const handleEdit = (goal: Goal) => {
    setGoalToEdit(goal);
    setEditDialogOpen(true);
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

  const handleSaveGoal = (updatedGoal: Goal) => {
    setLocalGoals(prev =>
      prev.map(goal => (goal.id === updatedGoal.id ? updatedGoal : goal))
    );
  };

  const displayGoals = localGoals.filter(g => g.category === category);

  if (isLoading) {
    return <LoadingGoalState />;
  }

  if (displayGoals.length === 0) {
    return <EmptyGoalState />;
  }

  return (
    <>
      <div className="space-y-4">
        {displayGoals.map((goal) => (
          <GoalCard 
            key={goal.id} 
            goal={goal} 
            onEdit={handleEdit} 
            onDelete={handleDelete} 
          />
        ))}
      </div>

      <DeleteGoalDialog 
        open={deleteDialogOpen} 
        onOpenChange={setDeleteDialogOpen} 
        goalName={goalToDelete?.name} 
        onConfirm={confirmDelete} 
      />

      <EditGoalDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        goal={goalToEdit}
        onSave={handleSaveGoal}
      />
    </>
  );
};

export default GoalsList;
