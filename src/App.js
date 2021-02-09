import * as React from 'react'
import './vars.css'
import styled from 'styled-components'

const PrimaryText = styled.div({
  padding: 20,
  color: 'var(--colors-primary)',
  backgroundColor: 'var(--colors-background)',
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
    <PrimaryText>
      {SUPER_HERO_OPTIONS.find(({ id }) => targetSuperHeroID === id).headline}
    </PrimaryText>
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
