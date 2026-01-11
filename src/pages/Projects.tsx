import { motion } from 'framer-motion'

const Projects = () => {
  return (
    <div className="px-4">
      <h1 className="mb-8 text-4xl font-bold">Projects</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((project) => (
          <motion.div
            key={project}
            whileHover={{ y: -5 }}
            className="group overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800"
          >
            <div className="h-48 bg-gray-200 transition-colors group-hover:bg-indigo-50 dark:bg-gray-700 dark:group-hover:bg-gray-700/50"></div>
            <div className="p-6">
              <h3 className="mb-2 text-lg font-bold">Project {project}</h3>
              <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                A brief description of the project and the technologies used to
                build it.
              </p>
              <div className="flex gap-2">
                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium dark:bg-gray-700">
                  React
                </span>
                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium dark:bg-gray-700">
                  TypeScript
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default Projects
