import React, { useState } from 'react'
import AnimatedBackground from './component/AnimatedBackground_1'
import Homepage from './page/Homepage.jsx'
import Loader from './component/Loader.jsx'

const App = () => {
  const [loading, setLoading] = useState(true)

  return (
    <div>
      <AnimatedBackground />
      {loading && <Loader onFinish={() => setLoading(false)} />}
      <Homepage />
    </div>
  )
}

export default App
