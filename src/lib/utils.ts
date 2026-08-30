import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim();
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length).trim() + '…';
}

export function formatPhone(phone: string): string {
  return phone.replace(/\s/g, '').replace(/^\+91/, '+91 ');
}

export const COMPANY_INFO = {
  name: 'FAB Paper Tube',
  tagline: 'Small Size. Big Precision.',
  established: '2013',
  phone1: '+91 82380 74700',
  phone2: '+91 98796 45030',
  email: 'fabpapertube111@gmail.com',
  address: 'Shed No. 14, Star Gold Industrial Park, Opp. Ghardaghar Kothiya Bus Stand, Indore Highway, Kuha, Ahmedabad, Gujarat - 382433',
  whatsapp: '918238074700',
} as const;
