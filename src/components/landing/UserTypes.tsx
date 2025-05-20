import { motion } from "framer-motion";

const users = [
  {
    icon: (
      <svg width="32" height="32" fill="none" aria-hidden>
        <circle cx="16" cy="12" r="6" stroke="#6366F1" strokeWidth="2" />
        <rect x="6" y="20" width="20" height="8" rx="4" stroke="#6366F1" strokeWidth="2" />
      </svg>
    ),
    label: "Crypto Beginners",
  },
  {
    icon: (
      <svg width="32" height="32" fill="none" aria-hidden>
        <rect x="6" y="6" width="20" height="20" rx="6" stroke="#6366F1" strokeWidth="2" />
        <path d="M16 12v8" stroke="#6366F1" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    label: "Web2 Users",
  },
  {
    icon: (
      <svg width="32" height="32" fill="none" aria-hidden>
        <circle cx="16" cy="16" r="12" stroke="#6366F1" strokeWidth="2" />
        <circle cx="16" cy="16" r="4" stroke="#6366F1" strokeWidth="2" />
      </svg>
    ),
    label: "Crypto Enthusiasts",
  },
  {
    icon: (
      <svg width="32" height="32" fill="none" aria-hidden>
        <rect x="8" y="8" width="16" height="16" rx="4" stroke="#6366F1" strokeWidth="2" />
        <path d="M16 12v8" stroke="#6366F1" strokeWidth="2" strokeLinecap="round" />
        <path d="M12 16h8" stroke="#6366F1" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    label: "Developers",
  },
];

export default function UserTypes() {
  return (
    <section className="w-full py-10 md:py-16 bg-white dark:bg-black">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">Target Users</h2>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-6"
        >
          {users.map((u) => (
            <motion.div
              key={u.label}
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0 },
              }}
              className="flex flex-col items-center gap-2"
            >
              <span>{u.icon}</span>
              <span className="text-base font-medium text-gray-700 dark:text-gray-200">{u.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
