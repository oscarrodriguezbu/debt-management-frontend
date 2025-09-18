export const currencyFormatter = (value: number) => {
  return value.toLocaleString('ja-JP', {
    style: 'currency',
    currency: 'JPY',
    minimumFractionDigits: 2,
  });
};
