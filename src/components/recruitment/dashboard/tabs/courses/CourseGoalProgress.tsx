
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BookOpen, CheckCircle2, AlertCircle } from 'lucide-react';

interface CourseGoalProgressProps {
  coursesData: {
    name: string;
    leads: number;
    matriculas: number;
    conversao: number;
    meta: number;
    cumprimento: number;
  }[];
}

const CourseGoalProgress: React.FC<CourseGoalProgressProps> = ({ coursesData }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cumprimento de Metas</CardTitle>
        <CardDescription>
          Progresso em relação às metas por curso
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {coursesData.map((course, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{course.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>{course.matriculas} de {course.meta}</span>
                  {course.cumprimento >= 75 ? (
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-amber-600" />
                  )}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Progress 
                  value={course.cumprimento} 
                  className={`h-2 flex-1 ${
                    course.cumprimento >= 85 ? "bg-green-600" : 
                    course.cumprimento >= 70 ? "bg-amber-600" : 
                    "bg-red-600"
                  }`}
                />
                <span className="text-sm font-medium w-12 text-right">
                  {course.cumprimento}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseGoalProgress;
