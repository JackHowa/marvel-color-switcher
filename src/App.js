import * as React from 'react'
import './vars.css'
import styled from 'styled-components'

const ThemeContainer = styled.div({
  padding: 20,
  backgroundColor: 'var(--colors-secondary)',
  // for light/dark mode of the color of text
  color: '#fff'
})

const PrimaryTextContainer = styled.div({
  backgroundColor: 'var(--colors-primary)',
})

const PrimaryText = styled.h1({
  fontSize: "10vw",
  textAlign: 'center',
})

const SUPER_HERO_OPTIONS = [
  {
    id: 'iron-man',
    headline: 'Iron Man'
  },
  {
    id: 'captain-america',
    headline: 'Captain America'
  }
]

function ThemeToggler({ setSuperHeroID }) {
  // should not update each change of pick
  return (
    SUPER_HERO_OPTIONS.map(({ id, headline }) => {
      return (
        <button key={id} onClick={() => setSuperHeroID(id)}>
          Change to {headline} mode
        </button>
      )
    })
  )
}

function SuperHeroDisplayText({ targetSuperHeroID }) {
  React.useEffect(() => {
    document.body.dataset.theme = targetSuperHeroID
  }, [targetSuperHeroID])

  // todo: primary text still re-renders if the super hero id changes
  return (
    <ThemeContainer>
      <PrimaryTextContainer>
        <PrimaryText>
          {SUPER_HERO_OPTIONS.find(({ id }) => targetSuperHeroID === id).headline}
        </PrimaryText>
      </PrimaryTextContainer>
    </ThemeContainer>
  )
}

function App() {
  const [targetSuperHeroID, setSuperHeroID] = React.useState('iron-man')

  return (
    <div className="App">
      <SuperHeroDisplayText targetSuperHeroID={targetSuperHeroID} />
      <ThemeToggler setSuperHeroID={setSuperHeroID} />
    </div>
  );
}

export default App;
