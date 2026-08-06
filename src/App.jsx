import { useState, useEffect } from 'react'
import useLenis from './hooks/useLenis'
import Navbar from './components/Navbar'
import SplitSlider from './components/SplitSlider'
import MenuPage from './components/MenuPage'
import Loader from './components/Loader'

function App() {
  useLenis()
  const [currentHash, setCurrentHash] = useState(window.location.hash)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const onHashChange = () => setCurrentHash(window.location.hash)
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  return (
    <>
      {isLoading && <Loader onComplete={() => setIsLoading(false)} />}
      
      <div style={{ opacity: isLoading ? 0 : 1, transition: 'opacity 0.8s ease-in-out' }}>
        <Navbar />
        <main>
          {currentHash === '#menu' ? <MenuPage /> : <SplitSlider />}
        </main>
      </div>
    </>
  )
}

export default App
