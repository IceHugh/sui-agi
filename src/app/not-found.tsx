'use client';

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function NotFound() {
	return (
		<div className='min-h-[100dvh] w-full flex flex-col items-center justify-center bg-background px-4 py-8'>
			<motion.div
				className='text-center'
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
			>
				<motion.h1
					className='text-[8rem] sm:text-[10rem] md:text-[12rem] font-bold text-primary/20 leading-none select-none'
					animate={{
						scale: [1, 1.02, 1],
						rotate: [0, -1, 1, 0],
					}}
					transition={{
						duration: 4,
						repeat: Number.POSITIVE_INFINITY,
						ease: 'easeInOut',
					}}
				>
					404
				</motion.h1>

				<motion.p
					className='mt-4 text-lg sm:text-xl text-muted-foreground max-w-[280px] sm:max-w-none mx-auto'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.2 }}
				>
					页面似乎已经迷失在数字宇宙中...
				</motion.p>

				<motion.div
					className='mt-6 sm:mt-8'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.4 }}
				>
					<Link href='/'>
						<Button
							variant='outline'
							size='lg'
							className='px-6 py-2 hover:scale-105 transition-transform text-base sm:text-lg active:scale-95 touch-none'
						>
							返回首页
						</Button>
					</Link>
				</motion.div>
			</motion.div>
		</div>
	);
}
