import { useState } from 'react'
import TerraformMatcher from 'games/TerraformMatcher'
import OSISorter from 'games/OSISorter'
import PortBlocks from 'games/PortBlocks'
import { Server, Layers, Target } from 'lucide-react'
import { CyberShell } from 'components/CyberShell'
import { ClayButton } from 'components/ClayButton'
import { ClayCard } from 'components/ClayCard'

type GameType = 'terraform' | 'osi' | 'portblocks'

const MiniGames = () => {
  const [selectedGame, setSelectedGame] = useState<GameType>('terraform')

  const gameTitle =
    selectedGame === 'terraform'
      ? 'Infra-Structure Matcher'
      : selectedGame === 'osi'
        ? 'OSI Sorter'
        : 'Port Blocks'

  const gameSubtitle =
    selectedGame === 'terraform'
      ? 'Match the Terraform resource to its description!'
      : selectedGame === 'osi'
        ? 'Sort blocks into the correct OSI layers!'
        : 'Bounce the ball into the matching port group!'

  return (
    <CyberShell className="py-8" contentClassName="max-w-6xl">
      <div className="mb-8 flex w-full flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="min-w-0 text-center sm:text-left">
          <h1 className="whitespace-nowrap text-3xl font-black tracking-tight text-gray-700 drop-shadow-[0_0_10px_rgba(99,102,241,0.15)] dark:text-white dark:drop-shadow-[0_0_15px_rgba(99,102,241,0.4)] sm:text-4xl">
            {gameTitle}
          </h1>
          <p className="whitespace-nowrap text-sm text-gray-600 dark:text-gray-400 sm:text-base">
            {gameSubtitle}
          </p>
        </div>

        <div className="flex shrink-0 flex-wrap justify-center gap-3">
          <ClayButton
            active={selectedGame === 'terraform'}
            onClick={() => setSelectedGame('terraform')}
          >
            <Server className="size-4" />
            Terraform
          </ClayButton>
          <ClayButton
            active={selectedGame === 'osi'}
            onClick={() => setSelectedGame('osi')}
          >
            <Layers className="size-4" />
            OSI Model
          </ClayButton>
          <ClayButton
            active={selectedGame === 'portblocks'}
            onClick={() => setSelectedGame('portblocks')}
          >
            <Target className="size-4" />
            Port Blocks
          </ClayButton>
        </div>
      </div>

      <ClayCard active className="p-4 sm:p-6">
        <div className="flex min-h-[calc(100vh-18rem)] flex-col items-center justify-center overflow-auto">
          {selectedGame === 'terraform' ? (
            <TerraformMatcher />
          ) : selectedGame === 'osi' ? (
            <OSISorter />
          ) : (
            <PortBlocks />
          )}
        </div>
      </ClayCard>
    </CyberShell>
  )
}

export default MiniGames
