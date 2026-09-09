import { useState, useEffect } from 'react'
import useLenis from './hooks/useLenis'
import Navbar from './components/Navbar'
import SplitSlider from './components/SplitSlider'
import Story from './components/Story'
import Indulge from './components/Indulge'
import Loader from './components/Loader'
import MenuNew from './components/MenuNew/MenuNew'
import Reach from './components/Reach/Reach'
import Popup from './components/Popup'

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
      {isLoading && <Loader onComplete={() => {
        setIsLoading(false)
        window.dispatchEvent(new Event('app-loaded'))
      }} />}
      
      <div style={{ opacity: isLoading ? 0 : 1, transition: 'opacity 0.8s ease-in-out' }}>
        <Navbar />
        <main>
          {(() => {
            const basePath = currentHash.split('-')[0]
            if (basePath === '#reach') return <Reach />
            if (basePath === '#indulge') return <Indulge currentHash={currentHash} />
            if (basePath === '#menu') return <MenuNew />
            if (basePath === '#story') return <Story />
            return <SplitSlider />
          })()}
        </main>
        <Popup />
      </div>
    </>
  )
}

export default App
