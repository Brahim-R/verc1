import { render, screen } from '@testing-library/react'

import App from './App'

describe('<App />', () => {
  it('should render the App', () => {
    const { container } = render(<App />)

    expect(
      screen.getByRole('heading', {
        name: /Welcome to the jungle big boy/i,
        level: 1
      })
    ).toBeInTheDocument()

    expect(
      screen.getByText(
        /Building interactive experiences and digital playgrounds/i
      )
    ).toBeInTheDocument()

    expect(
      screen.getByRole('link', {
        name: /Projects/i
      })
    ).toBeInTheDocument()

    expect(container.firstChild).toBeInTheDocument()
  })
})
