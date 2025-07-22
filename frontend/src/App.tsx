import './App.css'
import Home from './component/home'
import Nav from './component/nav'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignIn from './component/signIn'

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/SignIn" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
