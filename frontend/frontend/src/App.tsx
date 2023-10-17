import { useState } from 'react'
import './App.css'
import Signup from './pages/signup'
import Login from './pages/login'
import { Link, Outlet } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
      </div>

      <div>
        <Outlet />
      </div>
    </>
  )
}

export default App
