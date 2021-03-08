import * as React from 'react'
import './vars.css'
import styled from 'styled-components'
import ThemeToggler from './ThemeToggle'
import { SUPER_HERO_OPTIONS } from './constants'


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

export function useAppDispatch() {
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
  color: '#fff',
  height: "70vh",
  display: "flex"
})

const PrimaryTextContainer = styled.div({
  alignSelf: 'center',
  backgroundColor: 'var(--colors-primary)',
  width: '100%'
})

const PrimaryText = styled.h1({
  fontSize: "10vmax",
  textAlign: 'center',
})


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
