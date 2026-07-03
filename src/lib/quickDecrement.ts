export function parsePositiveGrams(value: unknown, flagName: string) {
  if (typeof value !== 'string' || !value.trim()) {
    return undefined;
  }

  const normalized = value.trim().replace(/\s+/g, '').replace(/(g|G|克)$/u, '');
  const amount = Number.parseFloat(normalized);
  if (!Number.isFinite(amount) || amount <= 0) {
    throw new Error(`${flagName} must be a positive number.`);
  }

  return amount;
}

export function formatCoffeeAmount(amount: number) {
  return `${amount}g`;
}

export function buildQuickDecrementNote(
  beanId: unknown,
  amount: number,
  source = 'quick-decrement',
) {
  return {
    beanId,
    source,
    method: '',
    equipment: '',
    rating: 0,
    notes: '快捷扣除',
    totalTime: 0,
    quickDecrementAmount: amount,
    params: { coffee: formatCoffeeAmount(amount) },
  };
}
