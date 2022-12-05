import react from 'react'

import './App.css'
import useGrid from './hooks/useGrid'
import {
  Grid,
  Menu
} from './components'

function App() {

  return (
    <div className="App">
      <Menu/>
      <Grid />
    </div>
  )
}

export default App
