import { format } from 'date-fns';

export const formatDate = (date: string | undefined) => {
  if (date !== undefined) {
    return format(new Date(date), 'MMM d, yyyy');
  }
  return '';
};
