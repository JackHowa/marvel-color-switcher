import * as React from 'react'
import './vars.css'
import styled from 'styled-components'

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

const AppStateContext = React.createContext()
const AppDispatchContext = React.createContext()

function appReducer(state, action) {
  // console.log(state, action)
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
  const [state, dispatch] = React.useReducer(appReducer, {
    superHeroID: 'iron-man',
  })
  // console.log(state, 'initial state')
  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  )
}


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

let ThemeContainer = styled.div({
  padding: 20,
  backgroundColor: 'var(--colors-secondary)',
  // for light/dark mode of the color of text
  color: '#fff'
})

ThemeContainer = React.memo(ThemeContainer)

const PrimaryTextContainer = styled.div({
  backgroundColor: 'var(--colors-primary)',
})

const PrimaryText = styled.h1({
  fontSize: "10vw",
  textAlign: 'center',
})

function ThemeToggler() {
  const dispatch = useAppDispatch()

  // console.log(dispatch)


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
  // console.log(state, 'all state')
  const targetSuperHeroID = state.superHeroID
  // console.log(targetSuperHeroID)

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
  return (
    <AppProvider>
      <div className="App">
        <SuperHeroDisplayText />
        <ThemeToggler />
      </div>
    </AppProvider>

  );
}

export default App;
