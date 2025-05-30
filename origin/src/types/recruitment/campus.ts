
export type Course = {
  id: string;
  name: string;
  modalities: Array<'presencial' | 'semipresencial' | 'ead'>;
};

export type Campus = {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  courses: Course[];
  createdAt: Date;
  updatedAt: Date;
};

export type CampusFormValues = Omit<Campus, 'id' | 'createdAt' | 'updatedAt'>;
