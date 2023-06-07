export const normalizeDate = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getUTCDate();
  return new Date(Date.UTC(year, month, day, 0, 0, 0));
};
