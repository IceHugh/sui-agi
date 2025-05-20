import { motion } from "framer-motion";
import HomeButton from "../HomeButton";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="w-full flex flex-col items-center justify-center py-12 md:py-20 bg-white dark:bg-black">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="flex flex-col items-center gap-6 max-w-2xl px-4"
      >
        {/* 极简SVG插画 */}
        <svg width="96" height="96" viewBox="0 0 96 96" fill="none" className="mb-4" aria-hidden>
          <circle cx="48" cy="48" r="44" stroke="#6366F1" strokeWidth="4" />
          <rect x="28" y="36" width="40" height="24" rx="8" stroke="#6366F1" strokeWidth="3" />
          <circle cx="48" cy="48" r="6" fill="#6366F1" />
        </svg>
        <h1 className="text-3xl md:text-5xl font-bold text-center text-gray-900 dark:text-white">
          Make Web3 Simple, Smart, and Accessible for Everyone
        </h1>
        <p className="text-base md:text-lg text-center text-gray-500 dark:text-gray-300">
          Sui Agi: AI-powered Minimalist Crypto Wallet, Your Easy Gateway to Blockchain
        </p>
        <Link href="/agi" prefetch>
          <HomeButton>Start</HomeButton>
        </Link>
      </motion.div>
    </section>
  );
}
