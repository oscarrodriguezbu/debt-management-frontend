export const truncateText = (text: string, maxLength: number = 15): string => {
  if (!text) return '---';
  if (maxLength < 15) return text;
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
};
