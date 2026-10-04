import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, FolderOpen, ExternalLink, Github } from 'lucide-react'
import { CyberShell } from 'components/CyberShell'
import { ClayCard } from 'components/ClayCard'
import { ClayButton } from 'components/ClayButton'

const ProjectDetail = () => {
  const { projectId } = useParams<{ projectId: string }>()

  return (
    <CyberShell className="py-16" contentClassName="max-w-4xl">
      <div className="mb-8">
        <Link to="/projects">
          <ClayButton className="mb-6 gap-2">
            <ArrowLeft className="size-4" />
            Back to Projects
          </ClayButton>
        </Link>
      </div>

      <ClayCard active className="mb-8">
        <div className="flex items-start gap-6">
          <div className="flex size-20 shrink-0 items-center justify-center rounded-3xl border border-indigo-200 bg-indigo-100 text-indigo-700 dark:border-indigo-500/30 dark:bg-indigo-500/15 dark:text-indigo-300">
            <FolderOpen className="size-10" />
          </div>
          <div>
            <div className="text-sm font-medium text-indigo-700 dark:text-indigo-300">
              Project #{projectId}
            </div>
            <h1 className="text-4xl font-black tracking-tight text-gray-700 drop-shadow-[0_0_10px_rgba(99,102,241,0.12)] dark:text-white dark:drop-shadow-[0_0_15px_rgba(99,102,241,0.35)]">
              Project {projectId}
            </h1>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
              A brief description of the project and the technologies used to
              build it.
            </p>
          </div>
        </div>
      </ClayCard>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          <ClayCard>
            <h2 className="mb-4 text-2xl font-bold text-gray-600 dark:text-white">
              Overview
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              This is a skeleton project detail page. Here you would describe
              the problem the project solves, the architecture decisions, and
              the outcome. Replace this text with real content once the project
              is ready to showcase.
            </p>
          </ClayCard>

          <ClayCard>
            <h2 className="mb-4 text-2xl font-bold text-gray-600 dark:text-white">
              Key Features
            </h2>
            <ul className="space-y-3 text-gray-600 dark:text-gray-400">
              {[
                'Feature one placeholder with a short explanation.',
                'Feature two placeholder with a short explanation.',
                'Feature three placeholder with a short explanation.'
              ].map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="mt-1.5 size-2 shrink-0 rounded-full bg-indigo-500 dark:bg-indigo-400" />
                  {feature}
                </li>
              ))}
            </ul>
          </ClayCard>
        </div>

        <div className="space-y-8">
          <ClayCard>
            <h2 className="mb-4 text-xl font-bold text-gray-600 dark:text-white">
              Tech Stack
            </h2>
            <div className="flex flex-wrap gap-2">
              {['React', 'TypeScript', 'Tailwind CSS', 'Vite'].map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700 dark:border-indigo-500/30 dark:bg-indigo-500/10 dark:text-indigo-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </ClayCard>

          <ClayCard>
            <h2 className="mb-4 text-xl font-bold text-gray-600 dark:text-white">
              Links
            </h2>
            <div className="space-y-3">
              <button
                type="button"
                className="flex w-full items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:border-indigo-300 hover:bg-white hover:text-gray-700 dark:border-gray-700/50 dark:bg-gray-800/60 dark:text-gray-300 dark:hover:border-indigo-500/40 dark:hover:text-white"
              >
                <ExternalLink className="size-4" />
                Live Demo
              </button>
              <button
                type="button"
                className="flex w-full items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:border-indigo-300 hover:bg-white hover:text-gray-700 dark:border-gray-700/50 dark:bg-gray-800/60 dark:text-gray-300 dark:hover:border-indigo-500/40 dark:hover:text-white"
              >
                <Github className="size-4" />
                Source Code
              </button>
            </div>
          </ClayCard>
        </div>
      </div>
    </CyberShell>
  )
}

export default ProjectDetail
