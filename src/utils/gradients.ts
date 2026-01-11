type GradientTheme =
  | 'blue'
  | 'purple'
  | 'green'
  | 'green_venom'
  | 'red'
  | 'orange'

const themes: Record<GradientTheme, { name: string; colors: string[] }> = {
  blue: {
    name: 'Midnight Blue',
    colors: [
      'rgba(2, 6, 23, 1)', // Base: slate-950
      'rgba(30, 58, 138, 0.15)', // Faint Blue
      'rgba(23, 37, 84, 0.1)' // Fainter Blue
    ]
  },
  purple: {
    name: 'Deep Nebula',
    colors: [
      'rgba(2, 6, 23, 1)',
      'rgba(88, 28, 135, 0.15)', // Faint Purple
      'rgba(76, 29, 149, 0.1)'
    ]
  },
  green: {
    name: 'Abyssal Forest',
    colors: [
      'rgba(2, 6, 23, 1)',
      'rgba(6, 78, 59, 0.15)', // Faint Green
      'rgba(20, 83, 45, 0.1)'
    ]
  },
  green_venom: {
    name: 'Venomous Shadow',
    colors: [
      'rgba(2, 6, 23, 1)',
      'rgba(20, 83, 45, 0.15)', // Faint Emerald/Green
      'rgba(63, 98, 18, 0.1)' // Faint Lime/Olive
    ]
  },
  red: {
    name: 'Crimson Void',
    colors: [
      'rgba(2, 6, 23, 1)',
      'rgba(127, 29, 29, 0.15)', // Faint Red
      'rgba(153, 27, 27, 0.1)'
    ]
  },
  orange: {
    name: 'Volcanic Ember',
    colors: [
      'rgba(2, 6, 23, 1)',
      'rgba(124, 45, 18, 0.15)', // Faint Orange
      'rgba(154, 52, 18, 0.1)'
    ]
  }
}

const corners = [
  '0% 0%', // Top Left
  '100% 0%', // Top Right
  '0% 100%', // Bottom Left
  '100% 100%' // Bottom Right
]

export const getRandomGradient = () => {
  const themeKeys = Object.keys(themes) as GradientTheme[]
  const randomThemeKey = themeKeys[Math.floor(Math.random() * themeKeys.length)]
  const theme = themes[randomThemeKey]

  // Base background is the darkest color
  const baseColor = theme.colors[0]

  // Pick 2-3 unique corners
  // Fisher-Yates shuffle for corners
  const shuffledCorners = [...corners].sort(() => 0.5 - Math.random())
  const selectedCorners = shuffledCorners.slice(
    0,
    2 + Math.floor(Math.random() * 2)
  ) // Pick 2 or 3

  // Generate gradients for selected corners
  const radialGradients = selectedCorners.map((corner, index) => {
    // Alternate slightly between the two accent colors
    const color = theme.colors[1 + (index % 2)]
    // Gradients should be large enough to see but fade out before the center
    // 40-50% size ensures they touch the edges of the center void but don't fill it
    return `radial-gradient(circle at ${corner}, ${color} 0%, transparent 50%)`
  })

  return {
    name: theme.name,
    className: 'bg-black', // Ensure fallback is black
    style: {
      backgroundColor: baseColor,
      backgroundImage: radialGradients.join(', '),
      backgroundBlendMode: 'screen'
    }
  }
}
