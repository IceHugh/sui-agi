'use client';
import { useTranslation } from 'react-i18next';
// This page only renders when the app is built statically (output: 'export')
export default function RootPage() {
	const { t } = useTranslation();

	return <div>{t('hello')}</div>;
}
