import { useState, useEffect } from 'react'
import './App.css'

import strany from "./assets/data/strany.json"

console.log(strany)

function App() {
  const [otazky, setOtazky] = useState(0)
  const [odpovedi, setOdpovedi] = useState(0)
  const [kandidati, setKandidati] = useState(0)
  const [view, setView] = useState({})
  const [selected, setSelected] = useState([])

  useEffect(() => {
    Promise.all([
      fetch('https://worker-muddy-disk-d6e4.jan-cibulka-ee5.workers.dev/?sheet=otazky')
        .then((response) => response.json())
        .then((data) => setOtazky(data.values)),

      fetch('https://worker-muddy-disk-d6e4.jan-cibulka-ee5.workers.dev/?sheet=odpovedi')
        .then((response) => response.json())
        .then((data) => setOdpovedi(data.values)),

      fetch('https://worker-muddy-disk-d6e4.jan-cibulka-ee5.workers.dev/?sheet=kandidati')
        .then((response) => response.json())
        .then((data) => setKandidati(data.values))
    ]).then(() => {
      setView({ otazka: 0, strany: Array.from({ length: 30 }, (_, i) => i) });
    });
  }, [])

  useEffect(() => {

  }, [view])

  return (
    <>
      <h1 className="text-xl font-bold">Čus bus</h1>
    </>
  )
}

export default App
