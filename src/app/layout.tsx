'use client';
import type { ReactNode } from 'react';
import '@/assets/styles/index.css';
import { Providers } from '@/components/providers/Providers';
import MainLayout from '@/layouts/MainLayout';

type Props = {
	children: ReactNode;
};

export default function LocaleLayout({ children }: Props) {
	return (
		<html className='h-full' lang='en' suppressHydrationWarning>
			<head>
				<title>Sui Agi</title>
				<link
					href='https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap'
					rel='stylesheet'
				/>
				<link rel='icon' href='/logo.jpg' />
			</head>
			<body className='h-full' suppressHydrationWarning>
				<Providers>
					<MainLayout>{children}</MainLayout>
				</Providers>
			</body>
		</html>
	);
}
