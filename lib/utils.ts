import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const SUPPORTED_LOCALES = ['pt', 'en', 'es', 'fr'] as const;
export type SupportedLocale = typeof SUPPORTED_LOCALES[number];

export function isRTL(locale: string): boolean {
  // Add RTL languages as needed
  const rtlLocales = ['ar', 'he', 'fa'];
  return rtlLocales.includes(locale);
}

export function getInitialLocale(): SupportedLocale {
  // Check localStorage first
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('preferred-locale');
    if (stored && SUPPORTED_LOCALES.includes(stored as SupportedLocale)) {
      return stored as SupportedLocale;
    }
  }

  // Check browser language
  if (typeof navigator !== 'undefined') {
    const browserLang = navigator.language.split('-')[0];
    if (SUPPORTED_LOCALES.includes(browserLang as SupportedLocale)) {
      return browserLang as SupportedLocale;
    }
  }

  // Default to Portuguese
  return 'pt';
}

export function setDocumentDirection(locale: string) {
  if (typeof document !== 'undefined') {
    document.dir = isRTL(locale) ? 'rtl' : 'ltr';
  }
}
