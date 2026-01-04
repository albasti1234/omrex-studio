import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';

const locales = ['ar', 'en'];

async function getMessages(locale: string) {
    try {
        return (await import(`@/messages/${locale}.json`)).default;
    } catch {
        notFound();
    }
}

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    if (!locales.includes(locale)) {
        notFound();
    }

    const messages = await getMessages(locale);
    const direction = locale === 'ar' ? 'rtl' : 'ltr';

    return (
        <div dir={direction} lang={locale} className="min-h-screen bg-white text-gray-900">
            <NextIntlClientProvider locale={locale} messages={messages}>
                {children}
            </NextIntlClientProvider>
        </div>
    );
}
