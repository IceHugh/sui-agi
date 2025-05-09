'use client';
import clsx from 'clsx';
import type { ReactNode } from 'react';
import '@/assets/styles/globals.css';
import { Providers } from '@/components/providers/Providers';
import MainLayout from '@/layouts/MainLayout';
type Props = {
	children: ReactNode;
};

export default function LocaleLayout({ children }: Props) {
	// const locale = await getLocale();
	// console.log("locale", locale);
	// const messages = await getMessages({locale: 'en'});
	// console.log("messages", messages);
	return (
		<html lang='en' suppressHydrationWarning>
			<head>
				<title>next-intl example</title>
			</head>
			<body
				className={clsx('flex min-h-[100vh] flex-col bg-slate-100')}
				suppressHydrationWarning
			>
				<Providers>
					<MainLayout>{children}</MainLayout>
				</Providers>
			</body>
		</html>
	);
}
