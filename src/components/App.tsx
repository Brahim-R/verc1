import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from 'layouts/MainLayout'
import Home from 'pages/Home'
import Projects from 'pages/Projects'
import MiniGames from 'pages/MiniGames'
import Tutorials from 'pages/Tutorials'
import Sitemap from 'pages/Sitemap'
import ProjectDetail from 'pages/ProjectDetail'
import TutorialDetail from 'pages/TutorialDetail'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="projects" element={<Projects />} />
          <Route path="projects/:projectId" element={<ProjectDetail />} />
          <Route path="minigames" element={<MiniGames />} />
          <Route path="tutorials" element={<Tutorials />} />
          <Route path="tutorials/:tutorialId" element={<TutorialDetail />} />
          <Route path="sitemap" element={<Sitemap />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
