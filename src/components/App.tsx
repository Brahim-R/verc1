import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from 'layouts/MainLayout'
import Home from 'pages/Home'
import Projects from 'pages/Projects'
import MiniGames from 'pages/MiniGames'
import Tutorials from 'pages/Tutorials'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="projects" element={<Projects />} />
          <Route path="minigames" element={<MiniGames />} />
          <Route path="tutorials" element={<Tutorials />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
