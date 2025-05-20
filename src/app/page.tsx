'use client';
import Features from '@/components/landing/Features';
import Hero from '@/components/landing/Hero';
import UserTypes from '@/components/landing/UserTypes';
import ValueProps from '@/components/landing/ValueProps';

export default function Home() {
	return (
		<div className='relative h-full overflow-y-auto hide-scrollbar'>
			{/* 科幻背景层 */}
			<div className='absolute inset-0 z-10 pointer-events-none' aria-hidden>
				{/* 渐变+模糊光斑 */}
				<div className='absolute left-1/2 top-0 w-full h-full -translate-x-1/2 bg-gradient-to-br from-indigo-500/40 via-purple-400/30 to-blue-400/20 blur-2xl opacity-70' />
				{/* 星点SVG */}
				<svg
					className='absolute inset-0 w-full h-full'
					width='100%'
					height='100%'
				>
					<circle cx='20%' cy='30%' r='1.5' fill='#fff' fillOpacity='0.7' />
					<circle cx='60%' cy='10%' r='1' fill='#fff' fillOpacity='0.5' />
					<circle cx='80%' cy='50%' r='1.2' fill='#fff' fillOpacity='0.6' />
					<circle cx='40%' cy='80%' r='1' fill='#fff' fillOpacity='0.4' />
					<circle cx='70%' cy='70%' r='1.3' fill='#fff' fillOpacity='0.5' />
				</svg>
			</div>
			{/* 内容区 */}
			<Hero />
			<ValueProps />
			<UserTypes />
			<Features />
		</div>
	);
}
