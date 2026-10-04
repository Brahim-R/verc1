import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, BookOpen, Clock, Calendar } from 'lucide-react'
import { CyberShell } from 'components/CyberShell'
import { ClayCard } from 'components/ClayCard'
import { ClayButton } from 'components/ClayButton'

const tutorialTitles: Record<string, string> = {
  '1': 'Getting Started with PixiJS',
  '2': 'Terraform Basics',
  '3': 'OSI Model Explained'
}

const TutorialDetail = () => {
  const { tutorialId } = useParams<{ tutorialId: string }>()
  const title = tutorialTitles[tutorialId ?? ''] ?? `Tutorial ${tutorialId}`

  return (
    <CyberShell className="py-16" contentClassName="max-w-4xl">
      <div className="mb-8">
        <Link to="/tutorials">
          <ClayButton className="mb-6 gap-2">
            <ArrowLeft className="size-4" />
            Back to Tutorials
          </ClayButton>
        </Link>
      </div>

      <ClayCard active className="mb-8">
        <div className="flex items-start gap-6">
          <div className="flex size-20 shrink-0 items-center justify-center rounded-3xl border border-indigo-200 bg-indigo-100 text-indigo-700 dark:border-indigo-500/30 dark:bg-indigo-500/15 dark:text-indigo-300">
            <BookOpen className="size-10" />
          </div>
          <div>
            <div className="text-sm font-medium text-indigo-700 dark:text-indigo-300">
              Tutorial #{tutorialId}
            </div>
            <h1 className="text-4xl font-black tracking-tight text-gray-700 drop-shadow-[0_0_10px_rgba(99,102,241,0.12)] dark:text-white dark:drop-shadow-[0_0_15px_rgba(99,102,241,0.35)]">
              {title}
            </h1>
            <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <span className="flex items-center gap-1.5">
                <Clock className="size-4" />
                10 min read
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="size-4" />
                Dec 2025
              </span>
              <span className="rounded-full border border-green-200 bg-green-50 px-2 py-0.5 text-green-700 dark:border-green-500/30 dark:bg-green-500/10 dark:text-green-300">
                Beginner
              </span>
            </div>
          </div>
        </div>
      </ClayCard>

      <div className="space-y-6">
        <ClayCard>
          <h2 className="mb-3 text-2xl font-bold text-gray-600 dark:text-white">
            Introduction
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            This is a skeleton tutorial detail page. Replace this introduction
            with a compelling overview of what the reader will learn, why it
            matters, and what they should know before starting.
          </p>
        </ClayCard>

        <ClayCard>
          <h2 className="mb-3 text-2xl font-bold text-gray-600 dark:text-white">
            Prerequisites
          </h2>
          <ul className="space-y-3 text-gray-600 dark:text-gray-400">
            {[
              'Basic understanding of the topic.',
              'A working development environment.',
              'Curiosity and willingness to experiment.'
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="mt-1.5 size-2 shrink-0 rounded-full bg-indigo-500 dark:bg-indigo-400" />
                {item}
              </li>
            ))}
          </ul>
        </ClayCard>

        <ClayCard>
          <h2 className="mb-3 text-2xl font-bold text-gray-600 dark:text-white">
            Step 1
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Begin by outlining the first major step of the tutorial. Include
            code snippets, screenshots, or diagrams where appropriate. Each step
            should build naturally toward the final goal.
          </p>
        </ClayCard>

        <ClayCard>
          <h2 className="mb-3 text-2xl font-bold text-gray-600 dark:text-white">
            Conclusion
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Summarize what was covered and suggest next steps or related
            tutorials for continued learning.
          </p>
        </ClayCard>
      </div>
    </CyberShell>
  )
}

export default TutorialDetail
