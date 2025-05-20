import { motion } from "framer-motion";

const values = [
  {
    icon: (
      <svg width="36" height="36" fill="none" aria-hidden>
        <circle cx="18" cy="18" r="16" stroke="#6366F1" strokeWidth="2" />
        <path d="M12 18h12" stroke="#6366F1" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: "Natural Language Interaction",
    desc: "Manage your wallet through conversations, zero learning curve.",
  },
  {
    icon: (
      <svg width="36" height="36" fill="none" aria-hidden>
        <rect x="6" y="6" width="24" height="24" rx="6" stroke="#6366F1" strokeWidth="2" />
        <path d="M18 12v12" stroke="#6366F1" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: "AI Smart Decisions",
    desc: "AI assistant helps you make smarter crypto decisions.",
  },
  {
    icon: (
      <svg width="36" height="36" fill="none" aria-hidden>
        <circle cx="18" cy="18" r="16" stroke="#6366F1" strokeWidth="2" />
        <path d="M18 12v12" stroke="#6366F1" strokeWidth="2" strokeLinecap="round" />
        <path d="M12 18h12" stroke="#6366F1" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: "Progressive Complexity",
    desc: "From basic to advanced, features expand as you need, suitable for everyone.",
  },
  {
    icon: (
      <svg width="36" height="36" fill="none" aria-hidden>
        <rect x="6" y="6" width="24" height="24" rx="6" stroke="#6366F1" strokeWidth="2" />
        <circle cx="18" cy="18" r="4" stroke="#6366F1" strokeWidth="2" />
      </svg>
    ),
    title: "Multi-Platform Support",
    desc: "Web and desktop support, manage your assets anytime, anywhere.",
  },
];

export default function ValueProps() {
  return (
    <section className="w-full py-10 md:py-16 bg-gray-50 dark:bg-zinc-900">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8"
        >
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              className="flex flex-col items-center text-center gap-3"
            >
              <span>{v.icon}</span>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{v.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-300">{v.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
