import * as React from 'react'
import './vars.css'
import styled from 'styled-components'

// todo: possibly use an api for all heroes
// todo: at least move to another file
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

// setting up app state and dispatcher context
const AppStateContext = React.createContext()
const AppDispatchContext = React.createContext()

// reducer pattern for updating state
function appReducer(state, action) {
  switch (action.type) {
    case 'UPDATE_SUPER_HERO': {
      return { ...state, superHeroID: action.id }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

function AppProvider({ children }) {
  // sets default to be iron man
  const [state, dispatch] = React.useReducer(appReducer, {
    superHeroID: 'iron-man',
  })

  // sets provider for dispatch and the state
  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  )
}


// custom hooks for context
function useAppState() {
  const context = React.useContext(AppStateContext)
  if (!context) {
    throw new Error('useAppState must be used within the AppProvider')
  }
  return context
}

function useAppDispatch() {
  const context = React.useContext(AppDispatchContext)
  if (!context) {
    throw new Error('useAppDispatch must be used within the AppProvider')
  }
  return context
}

// styled components taking in global var theme
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

function ThemeToggler() {
  const dispatch = useAppDispatch()

  // should not update each change of pick
  return (
    SUPER_HERO_OPTIONS.map(({ id, headline }) => {
      return (
        <button key={id} onClick={() => dispatch({
          type: 'UPDATE_SUPER_HERO',
          id
        })}>
          Change to {headline} mode
        </button>
      )
    })
  )
}

function SuperHeroDisplayText() {
  const state = useAppState()
  const targetSuperHeroID = state.superHeroID

  React.useEffect(() => {
    document.body.dataset.theme = targetSuperHeroID
  }, [targetSuperHeroID])

  return (
    <>
      {SUPER_HERO_OPTIONS.find(({ id }) => targetSuperHeroID === id).headline}
    </>
  )
}

function SuperHeroDisplayTextContainer() {
  return (
    <ThemeContainer>
      <PrimaryTextContainer>
        <PrimaryText>
          <SuperHeroDisplayText />
        </PrimaryText>
      </PrimaryTextContainer>
    </ThemeContainer>
  )
}

function App() {
  return (
    <AppProvider>
      <div className="App">
        <SuperHeroDisplayTextContainer />
        <ThemeToggler />
      </div>
    </AppProvider>
  );
}

export default App;
