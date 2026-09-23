import { useState, useEffect } from 'react'
import { RotateCcw, Trophy } from 'lucide-react'

// Define the OSI Layers (Top to Bottom as per standard model visualization)
const OSI_LAYERS = [
  { id: 7, name: 'Application', color: 'bg-red-500' },
  { id: 6, name: 'Presentation', color: 'bg-orange-500' },
  { id: 5, name: 'Session', color: 'bg-yellow-500' },
  { id: 4, name: 'Transport', color: 'bg-green-500' },
  { id: 3, name: 'Network', color: 'bg-blue-500' },
  { id: 2, name: 'Data Link', color: 'bg-indigo-500' },
  { id: 1, name: 'Physical', color: 'bg-purple-500' }
]

const GRID_SIZE = 7

interface Block {
  id: string
  layerId: number
  layerName: string
  color: string
}

const OSISorter = () => {
  const [blocks, setBlocks] = useState<Block[]>([])
  const [selectedBlockIndex, setSelectedBlockIndex] = useState<number | null>(
    null
  )
  const [isWon, setIsWon] = useState(false)
  const [moves, setMoves] = useState(0)

  // Initialize game
  const initializeGame = () => {
    const newBlocks: Block[] = []

    // Create 7 blocks for each layer (7x7 = 49 total)
    OSI_LAYERS.forEach((layer) => {
      for (let i = 0; i < GRID_SIZE; i++) {
        newBlocks.push({
          id: `${layer.id}-${i}`,
          layerId: layer.id,
          layerName: layer.name,
          color: layer.color
        })
      }
    })

    // Shuffle blocks
    for (let i = newBlocks.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[newBlocks[i], newBlocks[j]] = [newBlocks[j], newBlocks[i]]
    }

    setBlocks(newBlocks)
    setIsWon(false)
    setMoves(0)
    setSelectedBlockIndex(null)
  }

  useEffect(() => {
    initializeGame()
  }, [])

  // Calculate completed rows for visual feedback
  const getCompletedRows = (currentBlocks: Block[]) => {
    const completed = new Set<number>()
    for (let row = 0; row < GRID_SIZE; row++) {
      const rowBlocks = currentBlocks.slice(
        row * GRID_SIZE,
        (row + 1) * GRID_SIZE
      )
      const expectedLayerId = OSI_LAYERS[row].id
      if (rowBlocks.every((b) => b.layerId === expectedLayerId)) {
        completed.add(row)
      }
    }
    return completed
  }

  const completedRows = getCompletedRows(blocks)

  const handleBlockClick = (index: number) => {
    if (isWon) return

    if (selectedBlockIndex === null) {
      // Select first block
      setSelectedBlockIndex(index)
    } else {
      // Swap blocks
      if (selectedBlockIndex !== index) {
        const newBlocks = [...blocks]
        const temp = newBlocks[selectedBlockIndex]
        newBlocks[selectedBlockIndex] = newBlocks[index]
        newBlocks[index] = temp

        setBlocks(newBlocks)
        setMoves((prev) => prev + 1)
        checkWinCondition(newBlocks)
      }
      setSelectedBlockIndex(null)
    }
  }

  const checkWinCondition = (currentBlocks: Block[]) => {
    // Check if each row corresponds to the correct layer
    const isSorted = currentBlocks.every((block, index) => {
      const rowIndex = Math.floor(index / GRID_SIZE)
      const expectedLayerId = OSI_LAYERS[rowIndex].id
      return block.layerId === expectedLayerId
    })

    if (isSorted) {
      setIsWon(true)
    }
  }

  return (
    <div className="flex flex-col items-center gap-8 font-sans">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="flex items-center gap-4">
          <div className="rounded-lg bg-gray-800 px-4 py-2 font-mono text-xl text-white">
            Moves: {moves}
          </div>
          <button
            onClick={initializeGame}
            className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-white transition-colors hover:bg-indigo-700"
          >
            <RotateCcw className="size-4" />
            Reset
          </button>
        </div>

        <p className="max-w-xl text-gray-400">
          Sort the blocks! Click one block to select it, then click another to
          swap positions. Each row must match the OSI Model layer label on the
          left. Please note that Layer 7 is the top row and Layer 1 is the
          bottom row. Remember... All People Sometimes Need Data Processing!
        </p>
      </div>

      <div className="flex gap-4">
        {/* Game Grid */}
        <div className="grid grid-cols-7 gap-2 rounded-xl bg-gray-800 p-4 shadow-2xl">
          {blocks.map((block, index) => {
            const rowIndex = Math.floor(index / GRID_SIZE)
            const isRowComplete = completedRows.has(rowIndex)

            return (
              <button
                key={`${block.id}-${index}`}
                onClick={() => handleBlockClick(index)} // eslint-disable-line
                className={`
                  flex h-16 w-32 items-center justify-center rounded-md font-bold text-white shadow-sm transition-all duration-300
                  ${block.color}
                  ${
                    selectedBlockIndex === index
                      ? 'z-10 scale-110 ring-4 ring-white'
                      : 'hover:scale-105 hover:opacity-90'
                  }
                  ${
                    isRowComplete
                      ? 'relative z-0 animate-pop overflow-hidden shadow-[0_0_15px_rgba(250,204,21,0.6)] ring-4 ring-yellow-400 brightness-110 saturate-150'
                      : ''
                  }
                  ${isWon ? 'cursor-default' : 'cursor-pointer'}
                `}
              >
                {isRowComplete && (
                  <div className="absolute inset-0 animate-pulse bg-white/30" />
                )}
                <div className="relative z-10 px-1 text-center text-xs leading-tight sm:text-sm md:text-base">
                  {block.layerName}
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {isWon && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-all duration-300">
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-gray-700 bg-gray-900 p-8 text-center text-white shadow-2xl">
            <Trophy className="size-16 animate-bounce text-yellow-500" />
            <h2 className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-3xl font-bold text-transparent">
              Protocol Perfect!
            </h2>
            <p className="text-gray-300">
              You analyzed and sorted the stack in {moves} moves.
            </p>
            <button
              onClick={initializeGame}
              className="mt-4 scale-100 rounded-full bg-white px-8 py-3 text-lg font-bold text-indigo-600 transition-transform hover:scale-105"
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default OSISorter
