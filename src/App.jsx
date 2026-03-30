import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Start from './pages/Start'
import Intro from './pages/Intro'
import Play from './pages/Play'
import Ending from './pages/Ending'
import Ranking from './pages/Ranking'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/intro" element={<Intro />} />
        <Route path="/play/:stageId" element={<Play />} />
        <Route path="/ending" element={<Ending />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
