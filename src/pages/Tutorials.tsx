import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { CyberShell } from 'components/CyberShell'
import { ClayCard } from 'components/ClayCard'

const tutorials = [
  {
    id: 1,
    title: 'Getting Started with PixiJS',
    description:
      'Learn the basics of the PixiJS rendering engine, from setting up the stage to creating your first sprite.',
    readTime: '10 min read',
    level: 'Beginner'
  },
  {
    id: 2,
    title: 'Terraform Basics',
    description:
      'Understand infrastructure as code fundamentals and how to provision cloud resources with Terraform.',
    readTime: '12 min read',
    level: 'Beginner'
  },
  {
    id: 3,
    title: 'OSI Model Explained',
    description:
      'Walk through the seven layers of networking and learn how data travels from application to wire.',
    readTime: '8 min read',
    level: 'Beginner'
  }
]

const Tutorials = () => {
  return (
    <CyberShell className="py-16" contentClassName="max-w-4xl">
      <h1 className="mb-10 text-center text-5xl font-black tracking-tight text-gray-700 drop-shadow-[0_0_15px_rgba(99,102,241,0.2)] dark:text-white dark:drop-shadow-[0_0_20px_rgba(99,102,241,0.4)] sm:text-6xl">
        Guides & Tutorials
      </h1>

      <div className="space-y-6">
        {tutorials.map((tutorial, index) => (
          <motion.div
            key={tutorial.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <Link to={`/tutorials/${tutorial.id}`}>
              <ClayCard>
                <div className="flex cursor-pointer flex-col gap-6 md:flex-row">
                  <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl border border-indigo-200 bg-indigo-50 text-2xl font-bold text-indigo-700 dark:border-indigo-500/30 dark:bg-indigo-500/15 dark:text-indigo-300">
                    {tutorial.id}
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl font-bold text-gray-600 dark:text-white">
                      {tutorial.title}
                    </h3>
                    <p className="mb-4 text-gray-600 dark:text-gray-400">
                      {tutorial.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                      <span className="rounded-full border border-gray-200 bg-gray-100 px-3 py-1 dark:border-gray-600/50 dark:bg-gray-800/80">
                        {tutorial.readTime}
                      </span>
                      <span className="rounded-full border border-green-200 bg-green-50 px-3 py-1 text-green-700 dark:border-green-500/30 dark:bg-green-500/10 dark:text-green-300">
                        {tutorial.level}
                      </span>
                    </div>
                  </div>
                </div>
              </ClayCard>
            </Link>
          </motion.div>
        ))}
      </div>
    </CyberShell>
  )
}

export default Tutorials
