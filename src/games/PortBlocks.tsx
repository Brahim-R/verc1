import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RotateCcw, Trophy, Target, Heart, Gamepad2 } from 'lucide-react'

const GAME_WIDTH = 693
const GAME_HEIGHT = 520
const PADDLE_WIDTH = 130
const PADDLE_HEIGHT = 18
const PADDLE_Y = GAME_HEIGHT - 50
const BALL_RADIUS = 16
const BALL_SPEED = 7
const SPEED_INCREASE = 1.07
const MAX_BALL_SPEED = 15
const BLOCK_WIDTH = 64
const BLOCK_HEIGHT = 26
const BLOCK_GAP_X = 10
const BLOCK_GAP_Y = 8
const GRID_COLS = 9
const GRID_ROWS = 5
const TOP_MARGIN = 50
const SERVICES_PER_LEVEL = 14

interface PortService {
  port: number
  service: string
  protocol: string
}

interface Block {
  id: string
  x: number
  y: number
  width: number
  height: number
  port: number
  service: string
  groupId: string
  color: string
}

interface Particle {
  id: string
  x: number
  y: number
  vx: number
  vy: number
  color: string
}

interface BallState {
  x: number
  y: number
  vx: number
  vy: number
  launched: boolean
  speed: number
}

const PORT_SERVICES: PortService[] = [
  { port: 20, service: 'FTP Data', protocol: 'TCP' },
  { port: 21, service: 'FTP Control', protocol: 'TCP' },
  { port: 22, service: 'SSH', protocol: 'TCP' },
  { port: 23, service: 'Telnet', protocol: 'TCP' },
  { port: 25, service: 'SMTP', protocol: 'TCP' },
  { port: 53, service: 'DNS', protocol: 'TCP/UDP' },
  { port: 67, service: 'DHCP Server', protocol: 'UDP' },
  { port: 80, service: 'HTTP', protocol: 'TCP' },
  { port: 110, service: 'POP3', protocol: 'TCP' },
  { port: 143, service: 'IMAP', protocol: 'TCP' },
  { port: 161, service: 'SNMP', protocol: 'UDP' },
  { port: 443, service: 'HTTPS', protocol: 'TCP' },
  { port: 445, service: 'SMB', protocol: 'TCP' },
  { port: 587, service: 'SMTP Sub', protocol: 'TCP' },
  { port: 993, service: 'IMAPS', protocol: 'TCP' },
  { port: 995, service: 'POP3S', protocol: 'TCP' },
  { port: 3306, service: 'MySQL', protocol: 'TCP' },
  { port: 3389, service: 'RDP', protocol: 'TCP' },
  { port: 5432, service: 'Postgres', protocol: 'TCP' },
  { port: 8080, service: 'HTTP-Alt', protocol: 'TCP' }
]

const GROUP_COLORS = [
  { bg: 'bg-red-500', hex: '#ef4444' },
  { bg: 'bg-blue-500', hex: '#3b82f6' },
  { bg: 'bg-green-500', hex: '#22c55e' },
  { bg: 'bg-yellow-500', hex: '#eab308' },
  { bg: 'bg-purple-500', hex: '#a855f7' },
  { bg: 'bg-pink-500', hex: '#ec4899' },
  { bg: 'bg-cyan-500', hex: '#06b6d4' },
  { bg: 'bg-orange-500', hex: '#f97316' },
  { bg: 'bg-lime-500', hex: '#84cc16' },
  { bg: 'bg-indigo-500', hex: '#6366f1' }
]

function shuffle<T>(array: T[]): T[] {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

function cellKey(row: number, col: number) {
  return `${row},${col}`
}

function placeGroup(
  grid: boolean[][],
  groupSize: number
): { row: number; col: number }[] | null {
  const rows = grid.length
  const cols = grid[0].length
  const maxGroupSize = 4
  if (groupSize > maxGroupSize) groupSize = maxGroupSize

  for (let attempt = 0; attempt < 100; attempt++) {
    const emptyCells: { row: number; col: number }[] = []
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (!grid[r][c]) emptyCells.push({ row: r, col: c })
      }
    }

    if (emptyCells.length < groupSize) return null

    const start = emptyCells[Math.floor(Math.random() * emptyCells.length)]
    const group = [start]
    const used = new Set<string>([cellKey(start.row, start.col)])

    while (group.length < groupSize) {
      const candidates: { row: number; col: number }[] = []
      for (const cell of group) {
        const neighbors = [
          { row: cell.row + 1, col: cell.col },
          { row: cell.row - 1, col: cell.col },
          { row: cell.row, col: cell.col + 1 },
          { row: cell.row, col: cell.col - 1 }
        ]
        for (const n of neighbors) {
          if (
            n.row >= 0 &&
            n.row < rows &&
            n.col >= 0 &&
            n.col < cols &&
            !grid[n.row][n.col] &&
            !used.has(cellKey(n.row, n.col))
          ) {
            const bounds = getGroupBounds(group, n)
            if (
              bounds.maxRow - bounds.minRow <= 1 &&
              bounds.maxCol - bounds.minCol <= 1
            ) {
              candidates.push(n)
            }
          }
        }
      }

      if (candidates.length === 0) break
      const next = candidates[Math.floor(Math.random() * candidates.length)]
      group.push(next)
      used.add(cellKey(next.row, next.col))
    }

    if (group.length === groupSize) {
      for (const cell of group) {
        grid[cell.row][cell.col] = true
      }
      return group
    }
  }

  return null
}

function getGroupBounds(
  group: { row: number; col: number }[],
  extra?: { row: number; col: number }
) {
  const rows = group.map((cell) => cell.row)
  const cols = group.map((cell) => cell.col)
  if (extra) {
    rows.push(extra.row)
    cols.push(extra.col)
  }
  return {
    minRow: Math.min(...rows),
    maxRow: Math.max(...rows),
    minCol: Math.min(...cols),
    maxCol: Math.max(...cols)
  }
}

function generateBlockLayout(services: PortService[]): Block[] {
  const grid: boolean[][] = Array.from({ length: GRID_ROWS }, () =>
    Array(GRID_COLS).fill(false)
  )

  const totalWidth = GRID_COLS * BLOCK_WIDTH + (GRID_COLS - 1) * BLOCK_GAP_X
  const startX = (GAME_WIDTH - totalWidth) / 2

  const blocks: Block[] = []
  services.forEach((service, serviceIndex) => {
    const groupSize = Math.floor(Math.random() * 3) + 2
    const groupCells = placeGroup(grid, groupSize)
    if (!groupCells) return

    const color = GROUP_COLORS[serviceIndex % GROUP_COLORS.length]
    const groupId = `group-${service.port}`

    groupCells.forEach((cell) => {
      blocks.push({
        id: `${service.port}-${cell.row}-${cell.col}`,
        x: startX + cell.col * (BLOCK_WIDTH + BLOCK_GAP_X),
        y: TOP_MARGIN + cell.row * (BLOCK_HEIGHT + BLOCK_GAP_Y),
        width: BLOCK_WIDTH,
        height: BLOCK_HEIGHT,
        port: service.port,
        service: service.service,
        groupId,
        color: color.bg
      })
    })
  })

  return blocks
}

function getGridStartX() {
  const totalWidth = GRID_COLS * BLOCK_WIDTH + (GRID_COLS - 1) * BLOCK_GAP_X
  return (GAME_WIDTH - totalWidth) / 2
}

function buildAccessibleQueue(
  blocks: Block[],
  services: PortService[]
): PortService[] {
  const startX = getGridStartX()
  const grid: (number | null)[][] = Array.from({ length: GRID_ROWS }, () =>
    Array(GRID_COLS).fill(null)
  )

  blocks.forEach((block) => {
    const col = Math.round((block.x - startX) / (BLOCK_WIDTH + BLOCK_GAP_X))
    const row = Math.round(
      (block.y - TOP_MARGIN) / (BLOCK_HEIGHT + BLOCK_GAP_Y)
    )
    if (row >= 0 && row < GRID_ROWS && col >= 0 && col < GRID_COLS) {
      grid[row][col] = block.port
    }
  })

  const remaining = new Set<number>(services.map((s) => s.port))
  const queue: PortService[] = []

  while (remaining.size > 0) {
    const accessible = new Set<number>()
    const visited: boolean[][] = Array.from({ length: GRID_ROWS }, () =>
      Array(GRID_COLS).fill(false)
    )
    const cells: { row: number; col: number }[] = []

    for (let c = 0; c < GRID_COLS; c++) {
      if (grid[GRID_ROWS - 1][c] === null) {
        cells.push({ row: GRID_ROWS - 1, col: c })
        visited[GRID_ROWS - 1][c] = true
      } else {
        accessible.add(grid[GRID_ROWS - 1][c]!)
      }
    }

    for (let i = 0; i < cells.length; i++) {
      const cell = cells[i]
      const neighbors = [
        { row: cell.row - 1, col: cell.col },
        { row: cell.row, col: cell.col - 1 },
        { row: cell.row, col: cell.col + 1 }
      ]
      for (const n of neighbors) {
        if (
          n.row < 0 ||
          n.row >= GRID_ROWS ||
          n.col < 0 ||
          n.col >= GRID_COLS ||
          visited[n.row][n.col]
        ) {
          continue
        }
        if (grid[n.row][n.col] !== null) {
          accessible.add(grid[n.row][n.col]!)
        } else {
          visited[n.row][n.col] = true
          cells.push(n)
        }
      }
    }

    const accessibleServices = services.filter(
      (s) => remaining.has(s.port) && accessible.has(s.port)
    )

    if (accessibleServices.length === 0) {
      const remainingServices = services.filter((s) => remaining.has(s.port))
      queue.push(...shuffle(remainingServices))
      break
    }

    const chosen = accessibleServices
      .map((service) => {
        let maxRow = -1
        for (let r = 0; r < GRID_ROWS; r++) {
          for (let c = 0; c < GRID_COLS; c++) {
            if (grid[r][c] === service.port) {
              maxRow = Math.max(maxRow, r)
            }
          }
        }
        return { service, maxRow }
      })
      .sort((a, b) => b.maxRow - a.maxRow)[0].service
    queue.push(chosen)
    remaining.delete(chosen.port)

    for (let r = 0; r < GRID_ROWS; r++) {
      for (let c = 0; c < GRID_COLS; c++) {
        if (grid[r][c] === chosen.port) {
          grid[r][c] = null
        }
      }
    }
  }

  return queue
}

function generateLevel(excludePort?: number) {
  let pool = shuffle([...PORT_SERVICES])
  if (excludePort) {
    pool = pool.filter((p) => p.port !== excludePort)
  }
  const candidateServices = pool.slice(0, SERVICES_PER_LEVEL)
  const blocks = generateBlockLayout(candidateServices)
  const placedPorts = new Set(blocks.map((b) => b.port))
  const services = candidateServices.filter((s) => placedPorts.has(s.port))
  const sortedServices = buildAccessibleQueue(blocks, services)

  return { services: sortedServices, blocks }
}

function circleRectCollision(
  cx: number,
  cy: number,
  radius: number,
  rx: number,
  ry: number,
  rw: number,
  rh: number
): {
  hit: boolean
  side: 'left' | 'right' | 'top' | 'bottom' | 'corner'
  distance: number
} {
  const closestX = Math.max(rx, Math.min(cx, rx + rw))
  const closestY = Math.max(ry, Math.min(cy, ry + rh))
  const dx = cx - closestX
  const dy = cy - closestY
  const distanceSquared = dx * dx + dy * dy
  const distance = Math.sqrt(distanceSquared)

  if (distanceSquared > radius * radius) {
    return { hit: false, side: 'corner', distance }
  }

  if (dx === 0 && dy === 0) {
    return { hit: true, side: 'corner', distance }
  }

  if (Math.abs(dx) > Math.abs(dy)) {
    return { hit: true, side: dx > 0 ? 'right' : 'left', distance }
  }
  return { hit: true, side: dy > 0 ? 'bottom' : 'top', distance }
}

function resolveBlockCollision(
  ball: BallState,
  block: Block,
  side: 'left' | 'right' | 'top' | 'bottom' | 'corner'
) {
  if (side === 'left') {
    ball.x = block.x - BALL_RADIUS - 0.5
    ball.vx = -Math.abs(ball.vx)
  } else if (side === 'right') {
    ball.x = block.x + block.width + BALL_RADIUS + 0.5
    ball.vx = Math.abs(ball.vx)
  } else if (side === 'top') {
    ball.y = block.y - BALL_RADIUS - 0.5
    ball.vy = -Math.abs(ball.vy)
  } else if (side === 'bottom') {
    ball.y = block.y + block.height + BALL_RADIUS + 0.5
    ball.vy = Math.abs(ball.vy)
  } else {
    const dx = ball.x - (block.x + block.width / 2)
    const dy = ball.y - (block.y + block.height / 2)
    const dist = Math.sqrt(dx * dx + dy * dy)
    if (dist > 0) {
      ball.x = block.x + block.width / 2 + (dx / dist) * (BALL_RADIUS + 1)
      ball.y = block.y + block.height / 2 + (dy / dist) * (BALL_RADIUS + 1)
    }
    ball.vx *= -1
    ball.vy *= -1
  }
}

const PortBlocks = () => {
  const initialLevelRef = useRef(generateLevel())
  const [target, setTarget] = useState<PortService>(
    initialLevelRef.current.services[0]
  )
  const [score, setScore] = useState(0)
  const [level, setLevel] = useState(1)
  const [lives, setLives] = useState(3)
  const [isLevelComplete, setIsLevelComplete] = useState(false)
  const [isGameOver, setIsGameOver] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [ballLaunched, setBallLaunched] = useState(false)
  const [hasLaunchedEver, setHasLaunchedEver] = useState(false)
  const [shake, setShake] = useState(false)
  const [wrongHitGroup, setWrongHitGroup] = useState<string | null>(null)
  const [particles, setParticles] = useState<Particle[]>([])
  const [scale, setScale] = useState(1)

  const blocksRef = useRef<Block[]>(initialLevelRef.current.blocks)
  const blocksVersionRef = useRef(0)
  const [, setBlocksVersion] = useState(0)
  const targetQueueRef = useRef<PortService[]>(initialLevelRef.current.services)
  const containerRef = useRef<HTMLDivElement>(null)
  const boardRef = useRef<HTMLDivElement>(null)
  const ballRef = useRef<HTMLDivElement>(null)
  const paddleRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number>(0)

  const gameStateRef = useRef({
    ball: {
      x: GAME_WIDTH / 2,
      y: PADDLE_Y - BALL_RADIUS,
      vx: 0,
      vy: 0,
      launched: false,
      speed: BALL_SPEED
    } as BallState,
    paddle: { x: (GAME_WIDTH - PADDLE_WIDTH) / 2 }
  })

  const triggerShake = useCallback(() => {
    setShake(true)
    setTimeout(() => setShake(false), 300)
  }, [])

  const triggerWrongHit = useCallback((groupId: string) => {
    setWrongHitGroup(groupId)
    setTimeout(() => setWrongHitGroup(null), 300)
  }, [])

  const spawnParticles = useCallback(
    (x: number, y: number, colorClass: string) => {
      const hex =
        GROUP_COLORS.find((c) => c.bg === colorClass)?.hex ?? '#ffffff'
      const newParticles: Particle[] = Array.from({ length: 6 }, (_, i) => {
        const angle = (i / 6) * Math.PI * 2
        return {
          id: `${Date.now()}-${i}`,
          x,
          y,
          vx: Math.cos(angle) * 40,
          vy: Math.sin(angle) * 40,
          color: hex
        }
      })
      setParticles((prev) => [...prev, ...newParticles])
      setTimeout(() => {
        setParticles((prev) =>
          prev.filter((p) => !newParticles.find((np) => np.id === p.id))
        )
      }, 500)
    },
    []
  )

  const resetBall = useCallback(() => {
    gameStateRef.current.ball = {
      ...gameStateRef.current.ball,
      x: gameStateRef.current.paddle.x + PADDLE_WIDTH / 2,
      y: PADDLE_Y - BALL_RADIUS,
      vx: 0,
      vy: 0,
      launched: false
    }
    setBallLaunched(false)
  }, [])

  const launchBall = useCallback(() => {
    if (
      gameStateRef.current.ball.launched ||
      isLevelComplete ||
      isGameOver ||
      isPaused
    ) {
      return
    }
    const angle = (Math.random() - 0.5) * (Math.PI / 2)
    const speed = gameStateRef.current.ball.speed
    gameStateRef.current.ball.vx = Math.sin(angle) * speed
    gameStateRef.current.ball.vy = -Math.cos(angle) * speed
    gameStateRef.current.ball.launched = true
    setBallLaunched(true)
    setHasLaunchedEver(true)
  }, [isLevelComplete, isGameOver, isPaused])

  const initializeGame = useCallback(() => {
    const { services, blocks: newBlocks } = generateLevel()
    targetQueueRef.current = services
    setTarget(services[0])
    blocksRef.current = newBlocks
    blocksVersionRef.current += 1
    setBlocksVersion(blocksVersionRef.current)
    setScore(0)
    setLevel(1)
    setLives(3)
    setIsLevelComplete(false)
    setIsGameOver(false)
    setIsPaused(false)
    setBallLaunched(false)
    setHasLaunchedEver(false)
    setParticles([])
    gameStateRef.current.paddle.x = (GAME_WIDTH - PADDLE_WIDTH) / 2
    gameStateRef.current.ball = {
      x: GAME_WIDTH / 2,
      y: PADDLE_Y - BALL_RADIUS,
      vx: 0,
      vy: 0,
      launched: false,
      speed: BALL_SPEED
    }
  }, [])

  const nextLevel = useCallback(() => {
    const { services, blocks: newBlocks } = generateLevel(target.port)
    targetQueueRef.current = services
    setTarget(services[0])
    blocksRef.current = newBlocks
    blocksVersionRef.current += 1
    setBlocksVersion(blocksVersionRef.current)
    setIsLevelComplete(false)
    setIsPaused(false)
    setBallLaunched(false)
    setLives(3)
    setParticles([])
    setLevel((prev) => prev + 1)
    gameStateRef.current.ball = {
      x: GAME_WIDTH / 2,
      y: PADDLE_Y - BALL_RADIUS,
      vx: 0,
      vy: 0,
      launched: false,
      speed: BALL_SPEED
    }
    gameStateRef.current.paddle.x = (GAME_WIDTH - PADDLE_WIDTH) / 2
  }, [target])

  const updateGame = useCallback(() => {
    if (isLevelComplete || isGameOver || isPaused) return

    const { ball, paddle } = gameStateRef.current
    const blocks = blocksRef.current

    if (ball.launched) {
      ball.x += ball.vx
      ball.y += ball.vy

      if (ball.x - BALL_RADIUS < 0) {
        ball.x = BALL_RADIUS
        ball.vx *= -1
      }
      if (ball.x + BALL_RADIUS > GAME_WIDTH) {
        ball.x = GAME_WIDTH - BALL_RADIUS
        ball.vx *= -1
      }
      if (ball.y - BALL_RADIUS < 0) {
        ball.y = BALL_RADIUS
        ball.vy *= -1
      }

      if (ball.y + BALL_RADIUS > GAME_HEIGHT) {
        if (lives > 1) {
          setLives((prev) => prev - 1)
          resetBall()
        } else {
          setLives(0)
          setIsGameOver(true)
          setBallLaunched(false)
          ball.launched = false
        }
        return
      }

      const paddleHit = circleRectCollision(
        ball.x,
        ball.y,
        BALL_RADIUS,
        paddle.x,
        PADDLE_Y,
        PADDLE_WIDTH,
        PADDLE_HEIGHT
      )
      if (paddleHit.hit && ball.vy > 0) {
        const hitOffset =
          (ball.x - (paddle.x + PADDLE_WIDTH / 2)) / (PADDLE_WIDTH / 2)
        const angle = hitOffset * (Math.PI / 3)
        ball.x = Math.max(
          BALL_RADIUS,
          Math.min(GAME_WIDTH - BALL_RADIUS, ball.x)
        )
        ball.y = PADDLE_Y - BALL_RADIUS - 0.5
        ball.vx = Math.sin(angle) * ball.speed
        ball.vy = -Math.cos(angle) * ball.speed
      }

      const collisions = []
      for (let i = 0; i < blocks.length; i++) {
        const block = blocks[i]
        const blockHit = circleRectCollision(
          ball.x,
          ball.y,
          BALL_RADIUS,
          block.x,
          block.y,
          block.width,
          block.height
        )
        if (blockHit.hit) {
          collisions.push({ block, index: i, hit: blockHit })
        }
      }

      if (collisions.length > 0) {
        collisions.sort((a, b) => a.hit.distance - b.hit.distance)
        const { block, index, hit } = collisions[0]

        resolveBlockCollision(ball, block, hit.side)

        if (block.port === target.port) {
          blocks.splice(index, 1)
          blocksVersionRef.current += 1
          setBlocksVersion(blocksVersionRef.current)
          setScore((prev) => prev + 10)
          triggerShake()
          spawnParticles(
            block.x + block.width / 2,
            block.y + block.height / 2,
            block.color
          )

          const remaining = blocks.filter((b) => b.port === target.port).length
          if (remaining === 0) {
            const nextQueue = targetQueueRef.current.filter(
              (s) => s.port !== target.port
            )
            targetQueueRef.current = nextQueue

            if (nextQueue.length > 0) {
              const nextTarget = nextQueue[0]
              setTarget(nextTarget)
              ball.speed = Math.min(ball.speed * SPEED_INCREASE, MAX_BALL_SPEED)
              ball.launched = false
              resetBall()
            } else {
              setIsLevelComplete(true)
              ball.launched = false
            }
          }
        } else {
          triggerWrongHit(block.groupId)
        }
      }
    } else {
      ball.x = paddle.x + PADDLE_WIDTH / 2
      ball.y = PADDLE_Y - BALL_RADIUS
    }

    if (ballRef.current) {
      ballRef.current.style.transform = `translate(${ball.x - BALL_RADIUS}px, ${
        ball.y - BALL_RADIUS
      }px)`
    }
    if (paddleRef.current) {
      paddleRef.current.style.transform = `translate(${paddle.x}px, ${PADDLE_Y}px)`
    }
  }, [
    isLevelComplete,
    isGameOver,
    isPaused,
    lives,
    target,
    resetBall,
    spawnParticles,
    triggerShake,
    triggerWrongHit
  ])

  const updateGameRef = useRef(updateGame)
  updateGameRef.current = updateGame
  const initializeGameRef = useRef(initializeGame)
  initializeGameRef.current = initializeGame

  useEffect(() => {
    initializeGameRef.current()

    const loop = () => {
      updateGameRef.current()
      animationRef.current = requestAnimationFrame(loop)
    }
    animationRef.current = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(animationRef.current)
    }
  }, [])

  const nextLevelRef = useRef(nextLevel)
  nextLevelRef.current = nextLevel

  useEffect(() => {
    if (!isLevelComplete) return
    const timeout = window.setTimeout(() => {
      nextLevelRef.current()
    }, 2500)
    return () => window.clearTimeout(timeout)
  }, [isLevelComplete])

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth
        setScale(Math.min(1, width / GAME_WIDTH))
      }
    }
    updateScale()
    window.addEventListener('resize', updateScale)
    return () => window.removeEventListener('resize', updateScale)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        if (isGameOver) {
          initializeGame()
        } else {
          setIsPaused((prev) => !prev)
        }
        return
      }
      if (isPaused || isGameOver || isLevelComplete) return
      if (e.code === 'Space') {
        e.preventDefault()
        launchBall()
      }
      if (e.code === 'ArrowLeft') {
        gameStateRef.current.paddle.x = Math.max(
          0,
          gameStateRef.current.paddle.x - 30
        )
      }
      if (e.code === 'ArrowRight') {
        gameStateRef.current.paddle.x = Math.min(
          GAME_WIDTH - PADDLE_WIDTH,
          gameStateRef.current.paddle.x + 30
        )
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [launchBall, isPaused, isGameOver, isLevelComplete, initializeGame])

  const handlePointerMove = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (!boardRef.current) return
      const rect = boardRef.current.getBoundingClientRect()
      const scaleX = GAME_WIDTH / rect.width
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
      const x = (clientX - rect.left) * scaleX
      gameStateRef.current.paddle.x = Math.max(
        0,
        Math.min(GAME_WIDTH - PADDLE_WIDTH, x - PADDLE_WIDTH / 2)
      )
    },
    []
  )

  const handleClick = useCallback(() => {
    launchBall()
  }, [launchBall])

  const { ball, paddle } = gameStateRef.current

  return (
    <div className="flex w-full max-w-3xl flex-col items-center gap-4 font-sans">
      <div className="flex w-full items-center justify-between rounded-lg bg-gray-800 px-4 py-3 text-white shadow-lg">
        <div className="flex items-center gap-3">
          <Target className="size-5 text-indigo-400" />
          <div>
            <div className="text-[10px] uppercase tracking-wider text-gray-400">
              Target Port
            </div>
            <div className="text-2xl font-bold leading-none">
              {target.port}{' '}
              <span className="text-sm font-normal text-gray-400">
                ({target.protocol})
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-center">
            <div className="text-[10px] uppercase tracking-wider text-gray-400">
              Score
            </div>
            <div className="text-xl font-bold leading-none">{score}</div>
          </div>
          <div className="text-center">
            <div className="text-[10px] uppercase tracking-wider text-gray-400">
              Level
            </div>
            <div className="text-xl font-bold leading-none">{level}</div>
          </div>
          <div className="flex items-center gap-0.5">
            {Array.from({ length: lives }).map((_, i) => (
              <Heart key={i} className="size-4 fill-red-500 text-red-500" />
            ))}
          </div>
        </div>

        <button
          onClick={initializeGame}
          className="flex items-center gap-1 rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
        >
          <RotateCcw className="size-4" />
          Reset
        </button>
      </div>

      <motion.div
        ref={containerRef}
        className="w-full"
        style={{ height: GAME_HEIGHT * scale }}
        animate={shake ? { x: [0, -4, 4, -4, 4, 0] } : { x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div
          ref={boardRef}
          className="relative cursor-none rounded-xl bg-gray-800 shadow-2xl"
          style={{
            width: GAME_WIDTH,
            height: GAME_HEIGHT,
            transform: `scale(${scale})`,
            transformOrigin: 'top left'
          }}
          onMouseMove={handlePointerMove}
          onTouchMove={handlePointerMove}
          onClick={handleClick}
        >
          {blocksRef.current.map((block) => (
            <div
              key={block.id}
              className={`absolute flex items-center justify-center rounded text-[9px] font-bold text-white shadow-sm transition-all duration-150 ${
                wrongHitGroup === block.groupId
                  ? 'animate-pulse ring-4 ring-red-500 brightness-125'
                  : block.color
              }`}
              style={{
                width: block.width,
                height: block.height,
                transform: `translate(${block.x}px, ${block.y}px)`
              }}
            >
              {block.service}
            </div>
          ))}

          <div
            ref={paddleRef}
            className="absolute left-0 top-0 rounded-md bg-indigo-500 shadow-lg"
            style={{
              width: PADDLE_WIDTH,
              height: PADDLE_HEIGHT,
              transform: `translate(${paddle.x}px, ${PADDLE_Y}px)`
            }}
          />

          <div
            ref={ballRef}
            className="absolute left-0 top-0 flex items-center justify-center rounded-full border-2 border-white bg-white font-bold text-gray-900 shadow-lg"
            style={{
              width: BALL_RADIUS * 2,
              height: BALL_RADIUS * 2,
              transform: `translate(${ball.x - BALL_RADIUS}px, ${
                ball.y - BALL_RADIUS
              }px)`
            }}
          >
            <span className="text-[10px]">{target.port}</span>
          </div>

          <AnimatePresence>
            {particles.map((particle) => (
              <motion.div
                key={particle.id}
                initial={{ x: particle.x, y: particle.y, opacity: 1, scale: 1 }}
                animate={{
                  x: particle.x + particle.vx,
                  y: particle.y + particle.vy,
                  opacity: 0,
                  scale: 0
                }}
                transition={{ duration: 0.5 }}
                className="absolute size-2 rounded-full"
                style={{ backgroundColor: particle.color }}
              />
            ))}
          </AnimatePresence>

          {!hasLaunchedEver &&
            !ballLaunched &&
            !isLevelComplete &&
            !isGameOver &&
            !isPaused && (
              <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center rounded-xl bg-black/30">
                <div className="rounded-lg bg-black/60 px-4 py-2 text-center text-sm text-white backdrop-blur-sm">
                  Click or press Space to launch
                </div>
              </div>
            )}

          {isPaused && (
            <div
              className="absolute inset-0 z-10 flex cursor-pointer items-center justify-center rounded-xl bg-black/50 backdrop-blur-sm"
              onClick={(e) => {
                e.stopPropagation()
                setIsPaused(false)
              }}
            >
              <div className="text-center text-white">
                <div className="text-3xl font-bold">Paused</div>
                <div className="mt-2 text-sm text-gray-300">
                  Click or press ESC to resume
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {isLevelComplete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-all duration-300">
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-gray-700 bg-gray-900 p-8 text-center text-white shadow-2xl">
            <Trophy className="size-16 animate-bounce text-yellow-500" />
            <h2 className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-3xl font-bold text-transparent">
              Port Pro!
            </h2>
            <p className="text-gray-300">
              Congrats on passing level {level} — you are a port pro!
            </p>
            <p className="text-sm text-gray-400">
              Lives refreshed. Next level starting soon...
            </p>
            <button
              onClick={nextLevel}
              className="mt-4 scale-100 rounded-full bg-white px-8 py-3 text-lg font-bold text-indigo-600 transition-transform hover:scale-105"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {isGameOver && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-all duration-300"
          onClick={initializeGame}
        >
          <div
            className="flex flex-col items-center gap-4 rounded-2xl border border-gray-700 bg-gray-900 p-8 text-center text-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Gamepad2 className="size-16 text-gray-500" />
            <h2 className="text-3xl font-bold text-white">Game Over</h2>
            <p className="text-gray-300">
              Final score: {score} • Reached level {level}
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

export default PortBlocks
