import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { CyberShell } from 'components/CyberShell'
import { ClayCard } from 'components/ClayCard'

const Projects = () => {
  return (
    <CyberShell className="py-16" contentClassName="max-w-6xl">
      <h1 className="mb-10 text-center text-5xl font-black tracking-tight text-gray-700 drop-shadow-[0_0_15px_rgba(99,102,241,0.2)] dark:text-white dark:drop-shadow-[0_0_20px_rgba(99,102,241,0.4)] sm:text-6xl">
        Projects
      </h1>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((project) => (
          <motion.div
            key={project}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: project * 0.05 }}
          >
            <Link to={`/projects/${project}`}>
              <ClayCard className="h-full p-0">
                <div className="h-48 rounded-t-3xl border-b border-gray-200 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 dark:border-gray-700/50 dark:from-indigo-500/20 dark:to-purple-500/20" />
                <div className="p-6">
                  <h3 className="mb-2 text-xl font-bold text-gray-600 dark:text-white">
                    Project {project}
                  </h3>
                  <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                    A brief description of the project and the technologies used
                    to build it.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700 dark:border-indigo-500/30 dark:bg-indigo-500/10 dark:text-indigo-300">
                      React
                    </span>
                    <span className="rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700 dark:border-indigo-500/30 dark:bg-indigo-500/10 dark:text-indigo-300">
                      TypeScript
                    </span>
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

export default Projects
