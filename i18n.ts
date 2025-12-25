import { getRequestConfig } from 'next-intl/server';

export const locales = ['ar', 'en'] as const;
export const defaultLocale = 'ar' as const;

export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ locale }) => {
    const currentLocale = locale ?? defaultLocale;
    return {
        locale: currentLocale,
        messages: (await import(`./messages/${currentLocale}.json`)).default,
    };
});
