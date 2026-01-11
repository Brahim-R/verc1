import { motion } from 'framer-motion'

const Home = () => {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="px-4 py-20 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-5xl font-extrabold tracking-tight text-transparent md:text-7xl"
        >
          Creative Developer
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
      <section className="mx-auto max-w-4xl">
        <h2 className="mb-8 border-l-4 border-indigo-500 px-4 text-3xl font-bold">
          Latest Updates
        </h2>
        <div className="grid gap-8 px-4">
          {[1, 2, 3].map((item) => (
            <motion.article
              key={item}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
            >
              <div className="flex flex-col gap-6 md:flex-row">
                <div className="h-32 w-full shrink-0 rounded-lg bg-gray-200 md:w-48 dark:bg-gray-700"></div>
                <div>
                  <div className="mb-2 text-sm font-medium text-indigo-500">
                    Update • Dec {20 + item}, 2025
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                    Building the PixiJS Game Engine
                  </h3>
                  <p className="line-clamp-2 text-gray-600 dark:text-gray-400">
                    Exploration into the world of WebGL and 2D rendering using
                    PixiJS. Here is how I structured the game loop and managed
                    assets...
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home
