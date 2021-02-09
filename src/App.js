import * as React from 'react'
import './vars.css'
import styled from 'styled-components'

const PrimaryText = styled.div({
  padding: 20,
  color: 'var(--colors-primary, black)',
  backgroundColor: 'var(--colors-background)',
})

function ThemeToggler() {
  const [theme, setTheme] = React.useState('light')
  const nextTheme = theme === 'light' ? 'dark' : 'light'

  React.useEffect(() => {
    document.body.dataset.theme = theme
  }, [theme])

  return (
    <button onClick={() => setTheme(nextTheme)}>
      Change to {nextTheme} mode
    </button>
  )
}

function App() {
  return (
    <div className="App">
      <PrimaryText>
        Iron Man
      </PrimaryText>
      <ThemeToggler />
    </div>
  );
}

export default App;
