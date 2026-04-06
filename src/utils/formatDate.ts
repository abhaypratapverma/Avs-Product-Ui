// src/utils/formatDate.ts
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export function formatDate(date: string): string {
  return dayjs(date).format('DD MMM YYYY');
}

export function formatDateTime(date: string): string {
  return dayjs(date).format('DD MMM YYYY, hh:mm A');
}

export function formatRelative(date: string): string {
  return dayjs(date).fromNow();
}

export function formatTime(date: string): string {
  return dayjs(date).format('hh:mm A');
}
