import { useEffect, useRef, useState } from 'react'

const TerraformMatcher = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [gameStats, setGameStats] = useState({ matches: 0, moves: 0 })

  useEffect(() => {
    if (!containerRef.current) return
    const PIXI = (window as any).PIXI
    if (!PIXI) return

    // Constants
    const CARD_WIDTH = 120
    const CARD_HEIGHT = 160
    const GAP = 20
    const COLS = 4

    // Setup App
    const app = new PIXI.Application({
      width: COLS * (CARD_WIDTH + GAP) + GAP,
      height: 3 * (CARD_HEIGHT + GAP) + GAP,
      backgroundAlpha: 0,
      antialias: true
    })
    containerRef.current.appendChild(app.view)

    // Game State
    let cards: any[] = []
    let flippedCards: any[] = []
    let locked = false
    let matches = 0
    let moves = 0

    // Data
    const concepts = [
      { id: 'ec2', text: 'aws_instance', match: 'Virtual Server' },
      { id: 's3', text: 'aws_s3_bucket', match: 'File Storage' },
      { id: 'vpc', text: 'aws_vpc', match: 'Private Network' },
      { id: 'init', text: 'terraform init', match: 'Prepare Directory' },
      { id: 'plan', text: 'terraform plan', match: 'Preview Changes' },
      { id: 'apply', text: 'terraform apply', match: 'Execute Changes' }
    ]

    const createCard = (data: any, x: number, y: number) => {
      const container = new PIXI.Container()
      container.x = x
      container.y = y

      // Graphics
      const cardBack = new PIXI.Graphics()
      cardBack.lineStyle(2, 0xffffff, 0.2)
      cardBack.beginFill(0x1f2937)
      cardBack.drawRoundedRect(0, 0, CARD_WIDTH, CARD_HEIGHT, 12)
      cardBack.endFill()

      // Back Pattern
      cardBack.beginFill(0x374151)
      cardBack.drawCircle(CARD_WIDTH / 2, CARD_HEIGHT / 2, 20)
      cardBack.endFill()

      const cardFront = new PIXI.Graphics()
      cardFront.lineStyle(2, 0xffffff, 0.2)
      cardFront.beginFill(0x6366f1) // Indigo
      cardFront.drawRoundedRect(0, 0, CARD_WIDTH, CARD_HEIGHT, 12)
      cardFront.endFill()
      cardFront.visible = false

      // Text
      const style = new PIXI.TextStyle({
        fontFamily: ['Inter', 'Arial', 'sans-serif'],
        fontSize: 16,
        fontWeight: 'bold',
        fill: '#ffffff',
        wordWrap: true,
        wordWrapWidth: CARD_WIDTH - 20,
        align: 'center'
      })
      const text = new PIXI.Text(data.content, style)
      text.anchor.set(0.5)
      text.x = CARD_WIDTH / 2
      text.y = CARD_HEIGHT / 2
      text.visible = false

      container.addChild(cardBack)
      container.addChild(cardFront)
      container.addChild(text)

      container.eventMode = 'static'
      container.cursor = 'pointer'

      // Interactive Properties
      container.isFlipped = false
      container.isMatched = false
      container.cardData = data

      // Flip Function
      container.flip = () => {
        if (container.isMatched || container.isFlipped) return
        container.isFlipped = true
        cardBack.visible = false
        cardFront.visible = true
        text.visible = true
        cardFront.tint = 0x6366f1 // Reset tint
      }

      container.unflip = () => {
        if (container.isMatched) return
        container.isFlipped = false
        cardBack.visible = true
        cardFront.visible = false
        text.visible = false
      }

      container.setMatched = () => {
        container.isMatched = true
        cardFront.tint = 0x10b981 // Green
      }

      return container
    }

    const initGame = () => {
      // Prepare deck
      const deck: any[] = []
      concepts.forEach(c => {
        deck.push({ id: Math.random(), pairId: c.id, content: c.text })
        deck.push({ id: Math.random(), pairId: c.id, content: c.match })
      })
      deck.sort(() => Math.random() - 0.5)

      // Instantiate cards
      deck.forEach((data, i) => {
        const col = i % COLS
        const row = Math.floor(i / COLS)
        const card = createCard(data, GAP + col * (CARD_WIDTH + GAP), GAP + row * (CARD_HEIGHT + GAP))

        card.on('pointerdown', () => onCardClick(card))

        app.stage.addChild(card)
        cards.push(card)
      })
    }

    const onCardClick = (card: any) => {
      if (locked || card.isFlipped || card.isMatched) return

      card.flip()
      flippedCards.push(card)

      if (flippedCards.length === 2) {
        locked = true
        moves++
        setGameStats(prev => ({ ...prev, moves: prev.moves + 1 }))
        checkForMatch()
      }
    }

    const checkForMatch = () => {
      const [c1, c2] = flippedCards

      if (c1.cardData.pairId === c2.cardData.pairId) {
        // Match
        c1.setMatched()
        c2.setMatched()
        matches++
        setGameStats(prev => ({ ...prev, matches: prev.matches + 1 }))
        flippedCards = []
        locked = false
        spawnParticles(c1.x + CARD_WIDTH/2, c1.y + CARD_HEIGHT/2)
        spawnParticles(c2.x + CARD_WIDTH/2, c2.y + CARD_HEIGHT/2)

        if (matches === concepts.length) {
            showWinText()
        }
      } else {
        // No match
        setTimeout(() => {
          c1.unflip()
          c2.unflip()
          flippedCards = []
          locked = false
        }, 1000)
      }
    }

    const spawnParticles = (x: number, y: number) => {
        for (let i = 0; i < 20; i++) {
            const circle = new PIXI.Graphics()
            circle.beginFill([0x10b981, 0x6366f1, 0xf59e0b][Math.floor(Math.random() * 3)])
            circle.drawCircle(0, 0, 4)
            circle.endFill()
            circle.x = x
            circle.y = y
            app.stage.addChild(circle)

            const vx = (Math.random() - 0.5) * 10
            const vy = (Math.random() - 1) * 10

            let life = 60
            const animate = () => {
                life--
                if (life <= 0) {
                    app.ticker.remove(animate)
                    circle.destroy()
                    return
                }
                circle.x += vx
                circle.y += vy + (60 - life) * 0.1 // gravity
                circle.alpha = life / 60
            }
            app.ticker.add(animate)
        }
    }

    const showWinText = () => {
        const style = new PIXI.TextStyle({
            fontFamily: 'Inter',
            fontSize: 48,
            fontWeight: '900',
            fill: ['#4ade80', '#3b82f6'],
            dropShadow: true,
            dropShadowColor: '#000000',
            dropShadowBlur: 4,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 6
        })
        const text = new PIXI.Text('Level Complete!', style)
        text.anchor.set(0.5)
        text.x = app.screen.width / 2
        text.y = app.screen.height / 2
        app.stage.addChild(text)
    }

    initGame()

    return () => {
      app.destroy(true, { children: true })
    }
  }, [])

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 flex w-full max-w-2xl justify-between text-white">
        <div className="text-xl font-bold">
          Matches: {gameStats.matches} / 6
        </div>
        <div className="text-xl font-bold">Moves: {gameStats.moves}</div>
        <button
          onClick={() => window.location.reload()} // Simple reset
          className="rounded bg-indigo-600 px-4 py-2 transition hover:bg-indigo-700"
        >
          Reset
        </button>
      </div>

      <div ref={containerRef} className="overflow-hidden rounded-2xl border-4 border-indigo-500/30 shadow-2xl" />
    </div>
  )
}

export default TerraformMatcher
