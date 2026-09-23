import { useState } from 'react'
import TerraformMatcher from 'games/TerraformMatcher'
import OSISorter from 'games/OSISorter'
import { Server, Layers } from 'lucide-react'

type GameType = 'terraform' | 'osi'

const MiniGames = () => {
  const [selectedGame, setSelectedGame] = useState<GameType>('terraform')

  return (
    <div className="flex h-[calc(100vh-7rem)] flex-col items-center px-4">
      <div className="mb-6 flex w-full max-w-4xl flex-col items-center justify-between gap-4 sm:flex-row">
        <div>
          <h1 className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-3xl font-bold text-transparent">
            {selectedGame === 'terraform'
              ? 'Infra-Structure Matcher'
              : 'OSI Sorter'}
          </h1>
          <div className="text-sm text-gray-500">
            {selectedGame === 'terraform'
              ? 'Match the Terraform resource to its description!'
              : 'Sort the jumbled blocks into their correct OSI Model layers!'}
          </div>
        </div>

        <div className="flex rounded-lg bg-gray-100 p-1 dark:bg-gray-800">
          <button
            onClick={() => setSelectedGame('terraform')}
            className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-all ${
              selectedGame === 'terraform'
                ? 'bg-white text-indigo-600 shadow-sm dark:bg-gray-700 dark:text-indigo-400'
                : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
          >
            <Server className="size-4" />
            Terraform
          </button>
          <button
            onClick={() => setSelectedGame('osi')}
            className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-all ${
              selectedGame === 'osi'
                ? 'bg-white text-indigo-600 shadow-sm dark:bg-gray-700 dark:text-indigo-400'
                : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
          >
            <Layers className="size-4" />
            OSI Model
          </button>
        </div>
      </div>

      <div className="flex w-full grow flex-col items-center overflow-auto p-4">
        <div className="min-h-0 flex-1" />
        <div className="shrink-0">
          {selectedGame === 'terraform' ? <TerraformMatcher /> : <OSISorter />}
        </div>
        <div className="min-h-0 flex-1" />
      </div>
    </div>
  )
}

export default MiniGames
