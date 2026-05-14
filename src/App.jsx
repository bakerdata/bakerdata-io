import { Routes, Route } from 'react-router-dom'
import { useSiteData } from './hooks/useSiteData'
import Cursor      from './components/Cursor'
import NavBar      from './components/NavBar'
import HomePage    from './pages/HomePage'
import ContactPage from './pages/ContactPage'

export default function App() {
  const { data } = useSiteData()

  return (
    <>
      <Cursor />
      <NavBar nav={data?.nav} />
      <Routes>
        <Route path="/"        element={<HomePage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </>
  )
}
