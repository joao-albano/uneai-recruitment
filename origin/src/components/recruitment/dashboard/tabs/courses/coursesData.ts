
// Mock data for courses
export interface CourseData {
  name: string;
  leads: number;
  matriculas: number;
  conversao: number;
  meta: number;
  cumprimento: number;
}

export const coursesData: CourseData[] = [
  { 
    name: 'Ensino Fundamental I', 
    leads: 128, 
    matriculas: 32, 
    conversao: 25.0,
    meta: 40,
    cumprimento: 80.0
  },
  { 
    name: 'Ensino Fundamental II', 
    leads: 95, 
    matriculas: 24, 
    conversao: 25.3,
    meta: 30,
    cumprimento: 80.0
  },
  { 
    name: 'Ensino Médio', 
    leads: 84, 
    matriculas: 18, 
    conversao: 21.4,
    meta: 25,
    cumprimento: 72.0
  },
  { 
    name: 'Educação Infantil', 
    leads: 76, 
    matriculas: 14, 
    conversao: 18.4,
    meta: 20,
    cumprimento: 70.0
  },
  { 
    name: 'Período Integral', 
    leads: 65, 
    matriculas: 12, 
    conversao: 18.5,
    meta: 15,
    cumprimento: 80.0
  },
  { 
    name: 'EJA', 
    leads: 52, 
    matriculas: 8, 
    conversao: 15.4,
    meta: 15,
    cumprimento: 53.3
  },
];

// Prepare data for bar chart
export const prepareChartData = (courses: CourseData[]) => {
  return courses.map(course => ({
    name: course.name.replace('Ensino ', '').replace('Educação ', ''),
    Leads: course.leads,
    Matrículas: course.matriculas
  }));
};
