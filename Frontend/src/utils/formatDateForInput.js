export const formatDateForInput = (dateString) =>
  dateString ? String(dateString).slice(0, 10) : '';
