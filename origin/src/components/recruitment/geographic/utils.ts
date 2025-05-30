
import { Campus, Course } from './types';
import { DEMO_CAMPUSES, DEMO_COURSES } from './mockData';

export const formatCep = (value: string): string => {
  // Remove non-numeric characters
  const numericValue = value.replace(/\D/g, '');
  
  // Format as xxxxx-xxx
  if (numericValue.length <= 5) {
    return numericValue;
  } else {
    return `${numericValue.slice(0, 5)}-${numericValue.slice(5, 8)}`;
  }
};

export const getModalityLabel = (modalityType: string): string => {
  switch (modalityType) {
    case 'presencial': return 'Presencial';
    case 'semipresencial': return 'Semipresencial';
    case 'ead': return 'EAD';
    default: return modalityType;
  }
};

export const simulateGeoSearch = (cep: string, courseFilter: string, modalityFilter: string) => {
  // Simulating API call to find closest campus and alternatives
  const randomizeCampusDistance = () => {
    return DEMO_CAMPUSES.map(campus => ({
      ...campus, 
      distance: parseFloat((Math.random() * 30).toFixed(1))
    })).sort((a, b) => a.distance - b.distance);
  };

  const sortedCampuses = randomizeCampusDistance();
  const nearestCampus = sortedCampuses[0];
  const alternativeCampuses = sortedCampuses.slice(1);
  
  // Filter courses based on user selection if provided
  let availableCourses = DEMO_COURSES;
  
  if (courseFilter) {
    availableCourses = DEMO_COURSES.filter(c => 
      c.name.toLowerCase().includes(courseFilter.toLowerCase()));
  }

  // Filter by modality if selected
  if (modalityFilter) {
    availableCourses = availableCourses.filter(c => 
      c.modalities.includes(modalityFilter as any) && 
      c.campusIds.includes(nearestCampus.id)
    );
  }

  return {
    nearestCampus,
    alternativeCampuses,
    availableCourses: availableCourses.filter(c => c.campusIds.includes(nearestCampus.id)),
  };
};
