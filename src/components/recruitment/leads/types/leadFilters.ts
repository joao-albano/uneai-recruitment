
export interface LeadFilterOptions {
  channel: string;
  course: string;
  stage: string;
  status: string;
  startDate?: Date;
  endDate?: Date;
}

export const defaultFilters: LeadFilterOptions = {
  channel: '',
  course: '',
  stage: '',
  status: '',
  startDate: undefined,
  endDate: undefined
};
