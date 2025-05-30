
export interface Campus {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  distance: number; // em km
  availableCourses: string[];
  availableModalities: Array<'presencial' | 'semipresencial' | 'ead'>;
}

export interface Course {
  id: string;
  name: string;
  modalities: Array<'presencial' | 'semipresencial' | 'ead'>;
  campusIds: string[];
}

export interface SearchResults {
  nearestCampus: Campus | null;
  alternativeCampuses: Campus[];
  availableCourses: Course[];
}
