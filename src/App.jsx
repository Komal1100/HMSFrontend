import { useState } from 'react'
import LoginPage from './pages/Auth/login'
import AppRoutes from './Routes/AppRoutes'

function App() {
  const [count, setCount] = useState(0)

  return (
    <AppRoutes/>
  )
}

export default App
