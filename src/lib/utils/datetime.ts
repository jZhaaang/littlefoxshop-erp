export const toLocalInputValue = (iso?: string | null) => {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

export const fromLocalInputToISO = (s: string): string | null => {
  if (!s) return null;
  const [date, time] = s.split('T');
  const [y, m, d] = date.split('-').map(Number);
  const [h, min] = (time ?? '').split(':').map(Number);
  const local = new Date(y, (m ?? 1) - 1, d ?? 1, h ?? 0, min ?? 0);
  return Number.isNaN(local.getTime()) ? null : local.toISOString();
};
