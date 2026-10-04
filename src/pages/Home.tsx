import { motion } from 'framer-motion'
import { CyberShell } from 'components/CyberShell'
import { ClayCard } from 'components/ClayCard'

const Home = () => {
  return (
    <CyberShell className="py-16" contentClassName="max-w-4xl">
      {/* Hero Section */}
      <section className="mb-16 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 text-5xl font-extrabold tracking-tight text-gray-700 drop-shadow-[0_0_15px_rgba(99,102,241,0.25)] dark:text-white dark:drop-shadow-[0_0_25px_rgba(99,102,241,0.45)] md:text-7xl"
        >
          Welcome to the jungle big boy
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mx-auto max-w-2xl text-xl text-gray-600 dark:text-gray-300"
        >
          Building interactive experiences and digital playgrounds. Welcome to
          my portfolio and creative lab.
        </motion.p>
      </section>

      {/* Featured Section (Blog Style) */}
      <section>
        <h2 className="mb-8 border-l-4 border-indigo-500 pl-4 text-3xl font-bold text-gray-700 drop-shadow-[0_0_8px_rgba(99,102,241,0.15)] dark:text-white dark:drop-shadow-[0_0_10px_rgba(99,102,241,0.3)]">
          Latest Updates
        </h2>
        <div className="grid gap-8">
          {[1, 2, 3].map((item) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <ClayCard>
                <div className="flex flex-col gap-6 md:flex-row">
                  <div className="h-32 w-full shrink-0 rounded-2xl border border-gray-200 bg-gray-200 dark:border-gray-700/50 dark:bg-gray-700/50 md:w-48" />
                  <div>
                    <div className="mb-2 inline-flex rounded-full border border-indigo-200 bg-indigo-50 px-3 py-0.5 text-sm font-medium text-indigo-700 dark:border-indigo-500/30 dark:bg-indigo-500/10 dark:text-indigo-300">
                      Update • Dec {20 + item}, 2025
                    </div>
                    <h3 className="mb-2 text-xl font-bold text-gray-600 dark:text-white">
                      Building the PixiJS Game Engine
                    </h3>
                    <p className="line-clamp-2 text-gray-600 dark:text-gray-400">
                      Exploration into the world of WebGL and 2D rendering using
                      PixiJS. Here is how I structured the game loop and managed
                      assets...
                    </p>
                  </div>
                </div>
              </ClayCard>
            </motion.div>
          ))}
        </div>
      </section>
    </CyberShell>
  )
}

export default Home
