import { ThemeVars } from '@mysten/dapp-kit';

// Light theme copied from dapp-kit
export const lightTheme: ThemeVars = {
	blurs: {
		modalOverlay: 'blur(0)',
	},
	backgroundColors: {
		primaryButton: '#F6F7F9',
		primaryButtonHover: '#F0F2F5',
		outlineButtonHover: '#F4F4F5',
		modalOverlay: 'rgba(24 36 53 / 20%)',
		modalPrimary: 'white',
		modalSecondary: '#F7F8F8',
		iconButton: 'transparent',
		iconButtonHover: '#F0F1F2',
		dropdownMenu: '#FFFFFF',
		dropdownMenuSeparator: '#F3F6F8',
		walletItemSelected: 'white',
		walletItemHover: '#3C424226',
	},
	borderColors: {
		outlineButton: '#E4E4E7',
	},
	colors: {
		primaryButton: '#373737',
		outlineButton: '#373737',
		iconButton: '#000000',
		body: '#182435',
		bodyMuted: '#767A81',
		bodyDanger: '#FF794B',
	},
	radii: {
		small: '6px',
		medium: '8px',
		large: '12px',
		xlarge: '16px',
	},
	shadows: {
		primaryButton: '0px 2px 8px rgba(0, 0, 0, 0.1)',
		walletItemSelected: '0px 2px 6px rgba(0, 0, 0, 0.05)',
	},
	fontWeights: {
		normal: '400',
		medium: '500',
		bold: '600',
	},
	fontSizes: {
		small: '14px',
		medium: '16px',
		large: '18px',
		xlarge: '20px',
	},
	typography: {
		fontFamily:
			'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
		fontStyle: 'normal',
		lineHeight: '1.3',
		letterSpacing: '1',
	},
};

export const darkTheme: ThemeVars = {
	...lightTheme,
	blurs: {
		modalOverlay: 'blur(0)',
	},
	backgroundColors: {
		primaryButton: '#3A3B40',
		primaryButtonHover: '#4A4B50',
		outlineButtonHover: 'rgba(255, 255, 255, 0.08)',
		modalOverlay: 'rgba(0, 0, 0, 0.5)',
		modalPrimary: '#1A1B1E',
		modalSecondary: '#232428',
		iconButton: 'transparent',
		iconButtonHover: 'rgba(255, 255, 255, 0.1)',
		dropdownMenu: '#232428',
		dropdownMenuSeparator: '#3A3B40',
		walletItemSelected: '#3A3B40',
		walletItemHover: 'rgba(255, 255, 255, 0.08)',
	},
	borderColors: {
		outlineButton: '#5A5B60',
	},
	colors: {
		primaryButton: '#FFFFFF',
		outlineButton: '#E0E0E0',
		iconButton: '#E0E0E0',
		body: '#F0F0F0',
		bodyMuted: '#A0A0A0',
		bodyDanger: '#FF794B',
	},
	shadows: {
		primaryButton: '0px 2px 8px rgba(0, 0, 0, 0.3)',
		walletItemSelected: '0px 2px 6px rgba(0, 0, 0, 0.2)',
	},
};
