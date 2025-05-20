import { motion } from "framer-motion";

const features = [
  {
    stage: "Phase 1: Core Features",
    icon: (
      <svg width="32" height="32" fill="none" aria-hidden>
        <rect x="6" y="10" width="20" height="12" rx="6" stroke="#6366F1" strokeWidth="2" />
        <circle cx="16" cy="16" r="4" stroke="#6366F1" strokeWidth="2" />
      </svg>
    ),
    desc: "Conversational UI, external wallet connection, account management, balance inquiry, transfer, NFT browsing, staking.",
  },
  {
    stage: "Phase 2: Enhanced Features",
    icon: (
      <svg width="32" height="32" fill="none" aria-hidden>
        <circle cx="16" cy="16" r="12" stroke="#6366F1" strokeWidth="2" />
        <path d="M16 10v12" stroke="#6366F1" strokeWidth="2" strokeLinecap="round" />
        <path d="M10 16h12" stroke="#6366F1" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    desc: "Built-in wallet, zkLogin, AI investment advice, market analysis, notification system, enhanced subscriptions, limited NFTs.",
  },
  {
    stage: "Phase 3: Ecosystem",
    icon: (
      <svg width="32" height="32" fill="none" aria-hidden>
        <rect x="8" y="8" width="16" height="16" rx="4" stroke="#6366F1" strokeWidth="2" />
        <circle cx="16" cy="16" r="4" stroke="#6366F1" strokeWidth="2" />
        <path d="M16 12v8" stroke="#6366F1" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    desc: "MCP integration, NFT access control, DAO governance, developer platform, profit sharing, desktop application.",
  },
];

export default function Features() {
  return (
    <section id="features" className="w-full py-10 md:py-16 bg-gray-50 dark:bg-zinc-900">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">Key Features</h2>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.18 } },
          }}
          className="flex flex-col gap-8"
        >
          {features.map((f) => (
            <motion.div
              key={f.stage}
              variants={{
                hidden: { opacity: 0, y: 32 },
                visible: { opacity: 1, y: 0 },
              }}
              className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8"
            >
              <span>{f.icon}</span>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{f.stage}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
