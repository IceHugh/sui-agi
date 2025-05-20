import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function FooterCTA() {
  return (
    <section className="w-full py-12 md:py-16 flex flex-col items-center bg-white dark:bg-black">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
        className="flex flex-col items-center gap-4"
      >
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
          现在就开启你的 Web3 智能钱包之旅
        </h2>
        <Button className="mt-2 px-8 py-3 text-lg" asChild>
          <a href="#">立即体验 Sui Agi</a>
        </Button>
      </motion.div>
    </section>
  );
}
