export const MONTH_NAMES = [
  "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
  "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER",
];

export const WEEKDAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

export interface DayCell {
  day: number;
  inMonth: boolean;
  dateStr: string; // YYYY-MM-DD
}

const pad = (n: number) => String(n).padStart(2, "0");

export function toDateStr(year: number, month: number, day: number): string {
  return `${year}-${pad(month + 1)}-${pad(day)}`;
}

/** Returns a flat array of 42 cells (6 weeks) for the given month. */
export function monthMatrix(year: number, month: number): DayCell[] {
  const firstDay = new Date(year, month, 1).getDay(); // 0 = Sunday
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrev = new Date(year, month, 0).getDate();

  const cells: DayCell[] = [];

  // Leading days from previous month
  for (let i = firstDay - 1; i >= 0; i--) {
    const day = daysInPrev - i;
    const d = new Date(year, month - 1, day);
    cells.push({ day, inMonth: false, dateStr: toDateStr(d.getFullYear(), d.getMonth(), day) });
  }

  // Current month
  for (let day = 1; day <= daysInMonth; day++) {
    cells.push({ day, inMonth: true, dateStr: toDateStr(year, month, day) });
  }

  // Trailing days to fill 42 cells
  let nextDay = 1;
  while (cells.length < 42) {
    const d = new Date(year, month + 1, nextDay);
    cells.push({ day: nextDay, inMonth: false, dateStr: toDateStr(d.getFullYear(), d.getMonth(), nextDay) });
    nextDay++;
  }

  return cells;
}

export function formatLongDate(dateStr: string): string {
  const [y, m, d] = dateStr.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][date.getDay()];
  const monthShort = MONTH_NAMES[m - 1].charAt(0) + MONTH_NAMES[m - 1].slice(1).toLowerCase();
  return `${weekday}, ${monthShort} ${d}`;
}
