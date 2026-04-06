/**
 * Format a number as Indian Rupee currency string.
 * e.g. 1234.5 → "₹1,234.50"
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Short format: "₹120"
 */
export function formatCurrencyShort(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}
