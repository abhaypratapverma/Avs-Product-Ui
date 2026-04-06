import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export function formatDate(date: string | Date): string {
  return dayjs(date).format('DD MMM YYYY');
}

export function formatDateTime(date: string | Date): string {
  return dayjs(date).format('DD MMM YYYY, hh:mm A');
}

export function formatRelativeTime(date: string | Date): string {
  return dayjs(date).fromNow();
}

export function formatTime(date: string | Date): string {
  return dayjs(date).format('hh:mm A');
}
