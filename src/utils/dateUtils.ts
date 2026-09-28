export function getBirthdayStatus(birthdayDate: string): {
  isBirthday: boolean;
  isPast: boolean;
  isFuture: boolean;
  daysUntil: number;
  hoursUntil: number;
  minutesUntil: number;
  secondsUntil: number;
} {
  const now = new Date();
  const birthday = new Date(birthdayDate + 'T00:00:00');

  // Check if today is the birthday
  const isBirthday =
    now.getDate() === birthday.getDate() &&
    now.getMonth() === birthday.getMonth() &&
    now.getFullYear() === birthday.getFullYear();

  const diff = birthday.getTime() - now.getTime();
  const isPast = diff < 0 && !isBirthday;
  const isFuture = diff > 0;

  const totalSeconds = Math.max(0, Math.floor(diff / 1000));
  const daysUntil = Math.floor(totalSeconds / 86400);
  const hoursUntil = Math.floor((totalSeconds % 86400) / 3600);
  const minutesUntil = Math.floor((totalSeconds % 3600) / 60);
  const secondsUntil = totalSeconds % 60;

  return { isBirthday, isPast, isFuture, daysUntil, hoursUntil, minutesUntil, secondsUntil };
}
