import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  Home,
  FolderOpen,
  Gamepad2,
  BookOpen,
  Map,
  Server,
  Layers,
  Target,
  Cpu,
  Sparkles,
  ChevronDown
} from 'lucide-react'
import { CyberShell } from 'components/CyberShell'
import { ClayCard } from 'components/ClayCard'

interface SiteNode {
  name: string
  path: string
  icon: React.ElementType
  description: string
  children?: SiteNode[]
}

const siteTree: SiteNode[] = [
  {
    name: 'Home',
    path: '/',
    icon: Home,
    description: 'Landing hub with latest updates and featured content'
  },
  {
    name: 'Projects',
    path: '/projects',
    icon: FolderOpen,
    description: 'Collection of development projects and experiments',
    children: [
      {
        name: 'Project 1',
        path: '/projects/1',
        icon: FolderOpen,
        description: 'First project skeleton with tech overview'
      },
      {
        name: 'Project 2',
        path: '/projects/2',
        icon: FolderOpen,
        description: 'Second project skeleton with tech overview'
      },
      {
        name: 'Project 3',
        path: '/projects/3',
        icon: FolderOpen,
        description: 'Third project skeleton with tech overview'
      }
    ]
  },
  {
    name: 'Mini Games',
    path: '/minigames',
    icon: Gamepad2,
    description: 'Interactive learning games for tech concepts',
    children: [
      {
        name: 'Infra-Structure Matcher',
        path: '/minigames',
        icon: Server,
        description: 'Match Terraform resources to descriptions'
      },
      {
        name: 'OSI Sorter',
        path: '/minigames',
        icon: Layers,
        description: 'Sort blocks into correct OSI model layers'
      },
      {
        name: 'Port Blocks',
        path: '/minigames',
        icon: Target,
        description: 'Block-breaker port memorization game'
      }
    ]
  },
  {
    name: 'Tutorials',
    path: '/tutorials',
    icon: BookOpen,
    description: 'Guides, walkthroughs, and technical deep-dives',
    children: [
      {
        name: 'Getting Started with PixiJS',
        path: '/tutorials/1',
        icon: BookOpen,
        description: 'Rendering engine basics and first sprite'
      },
      {
        name: 'Terraform Basics',
        path: '/tutorials/2',
        icon: BookOpen,
        description: 'Infrastructure as code fundamentals'
      },
      {
        name: 'OSI Model Explained',
        path: '/tutorials/3',
        icon: BookOpen,
        description: 'Seven layers of networking demystified'
      }
    ]
  },
  {
    name: 'Site Map',
    path: '/sitemap',
    icon: Map,
    description: 'Neural navigation tree of the entire site'
  }
]

function NodeIcon({
  icon: Icon,
  isActive
}: {
  icon: React.ElementType
  isActive: boolean
}) {
  return (
    <div
      className={`
        flex size-14 shrink-0 items-center justify-center rounded-2xl border transition-colors
        ${
          isActive
            ? 'border-indigo-400 bg-indigo-100 text-indigo-700 dark:border-indigo-500/30 dark:bg-indigo-500/15 dark:text-indigo-300'
            : 'border-gray-200 bg-gray-100 text-gray-500 group-hover:border-indigo-300 group-hover:bg-indigo-50 group-hover:text-indigo-700 dark:border-gray-600/30 dark:bg-gray-700/50 dark:text-gray-400 dark:group-hover:border-indigo-500/30 dark:group-hover:bg-indigo-500/10 dark:group-hover:text-indigo-300'
        }
      `}
    >
      <Icon className="size-7" />
    </div>
  )
}

function NodeHeader({
  node,
  isActive,
  isExpanded
}: {
  node: SiteNode
  isActive: boolean
  isExpanded: boolean
}) {
  const Icon = node.icon
  const hasChildren = Boolean(node.children && node.children.length > 0)

  return (
    <div className="flex w-full items-start gap-4">
      <NodeIcon icon={Icon} isActive={isActive} />
      <div className="min-w-0 grow">
        <div className="flex items-center gap-2">
          <h3 className="text-xl font-bold tracking-tight text-gray-600 dark:text-white">
            {node.name}
          </h3>
          {hasChildren && (
            <ChevronDown
              className={`size-5 shrink-0 text-gray-500 transition-transform duration-300 dark:text-gray-400 ${
                isExpanded ? 'rotate-180' : ''
              }`}
            />
          )}
        </div>
        <p className="mt-1 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
          {node.description}
        </p>
      </div>
    </div>
  )
}

function ClayNode({
  node,
  isActive,
  isExpanded,
  onToggle
}: {
  node: SiteNode
  isActive: boolean
  isExpanded: boolean
  onToggle: () => void
}) {
  const hasChildren = Boolean(node.children && node.children.length > 0)

  const childrenSection = hasChildren && isExpanded && (
    <div className="relative mt-6 space-y-3 border-t border-gray-200 pt-5 dark:border-gray-700/50">
      {node.children?.map((child) => (
        <ClayChild key={child.name} node={child} />
      ))}
    </div>
  )

  if (hasChildren) {
    return (
      <ClayCard active={isActive}>
        <button
          type="button"
          onClick={onToggle}
          className="flex w-full items-start gap-4 text-left"
        >
          <NodeHeader node={node} isActive={isActive} isExpanded={isExpanded} />
        </button>
        {childrenSection}
      </ClayCard>
    )
  }

  return (
    <Link to={node.path}>
      <ClayCard active={isActive}>
        <div className="flex w-full items-start gap-4">
          <NodeHeader node={node} isActive={isActive} isExpanded={isExpanded} />
        </div>
        {childrenSection}
      </ClayCard>
    </Link>
  )
}

function ClayChild({ node }: { node: SiteNode }) {
  const Icon = node.icon
  return (
    <Link to={node.path}>
      <div className="group flex items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 p-3 shadow-[0_4px_0_0_rgba(229,231,235,1)] transition-all hover:-translate-y-0.5 hover:border-indigo-300 hover:bg-white hover:shadow-[0_6px_0_0_rgba(229,231,235,1)] dark:border-gray-700/40 dark:bg-gray-800/40 dark:shadow-[0_4px_0_0_rgba(31,41,55,0.7)] dark:hover:border-indigo-500/30 dark:hover:bg-gray-700/50 dark:hover:shadow-[0_6px_0_0_rgba(31,41,55,0.7)]">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-gray-200 text-gray-500 group-hover:text-indigo-700 dark:bg-gray-700/60 dark:text-gray-400 dark:group-hover:text-indigo-300">
          <Icon className="size-4" />
        </div>
        <div className="min-w-0">
          <div className="text-sm font-semibold text-gray-700 group-hover:text-gray-700 dark:text-gray-200 dark:group-hover:text-white">
            {node.name}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-500">
            {node.description}
          </div>
        </div>
      </div>
    </Link>
  )
}

const Sitemap = () => {
  const location = useLocation()
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set())

  const toggleNode = (name: string) => {
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(name)) {
        next.delete(name)
      } else {
        next.add(name)
      }
      return next
    })
  }

  return (
    <CyberShell className="py-16">
      <div className="mb-16 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-sm font-medium text-indigo-700 shadow-[0_0_15px_rgba(99,102,241,0.1)] dark:border-indigo-500/30 dark:bg-indigo-500/10 dark:text-indigo-300 dark:shadow-[0_0_20px_rgba(99,102,241,0.15)]">
          <Cpu className="size-4" />
          <span>Neural Navigation</span>
        </div>
        <h1 className="text-5xl font-black tracking-tight text-gray-700 drop-shadow-[0_0_12px_rgba(99,102,241,0.15)] dark:text-white dark:drop-shadow-[0_0_20px_rgba(99,102,241,0.4)] sm:text-6xl">
          Site Map
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-gray-600 dark:text-gray-400">
          A claymorphic topology of every route in the portfolio network.
        </p>
      </div>

      <div className="relative">
        <div className="mx-auto mb-10 flex max-w-sm justify-center">
          <ClayCard active className="w-full">
            <div className="flex items-center gap-4">
              <div className="flex size-14 items-center justify-center rounded-2xl border border-indigo-300 bg-indigo-100 text-indigo-700 dark:border-indigo-400/30 dark:bg-indigo-500/20 dark:text-indigo-200">
                <Sparkles className="size-7" />
              </div>
              <div>
                <div className="text-sm font-medium text-indigo-700 dark:text-indigo-300">
                  Root Node
                </div>
                <div className="text-2xl font-bold text-gray-600 dark:text-white">
                  Portfolio Hub
                </div>
              </div>
            </div>
          </ClayCard>
        </div>

        <div className="relative grid items-start gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {siteTree.map((node) => (
            <ClayNode
              key={node.path + node.name}
              node={node}
              isActive={location.pathname === node.path}
              isExpanded={expanded.has(node.name)}
              onToggle={() => toggleNode(node.name)}
            />
          ))}
        </div>
      </div>

      <div className="mt-16 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-500">
          All nodes lead back to the hub. Select a card to warp.
        </p>
      </div>
    </CyberShell>
  )
}

export default Sitemap
