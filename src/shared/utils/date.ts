export function relativeDateFormat(inputDate: Date | string): string {
  const now = new Date();
  const date = new Date(inputDate);
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const secondsInMinute = 60;
  const secondsInHour = 3600;
  const secondsInDay = 86400;
  const secondsInWeek = 604800;
  const secondsInMonth = 2629800; // average month
  const secondsInYear = 31557600; // average year

  if (diffInSeconds < 60) return 'a moment ago - ' + date.toLocaleTimeString();

  const hours = Math.floor(diffInSeconds / secondsInHour);
  if (hours < 1) return `${Math.floor(diffInSeconds / secondsInMinute)} minute(s) ago`;
  if (hours === 1) return '1 hour ago -' + date.toLocaleTimeString();

  const days = Math.floor(diffInSeconds / secondsInDay);
  if (days < 7) return `${days} day${days > 1 ? 's' : ''} ago - ${date.toLocaleTimeString()}`;

  const weeks = Math.floor(diffInSeconds / secondsInWeek);
  if (weeks < 5) return `${weeks} week${weeks > 1 ? 's' : ''} ago - ${date.toLocaleTimeString()}`;

  const months = Math.floor(diffInSeconds / secondsInMonth);
  if (months < 13) return `${months} month${months > 1 ? 's' : ''} ago - ${date.toLocaleTimeString()}`;

  const years = Math.floor(diffInSeconds / secondsInYear);
  return `${years} year${years > 1 ? 's' : ''} ago - ${date.toLocaleTimeString()}`;
}
