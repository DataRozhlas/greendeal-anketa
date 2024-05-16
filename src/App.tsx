import { useState, useEffect } from 'react'
import './App.css'

import strany from "./assets/data/strany.json"

type View = {
  otazka: number,
  strany: number[]
}

type Odpoved = string[]

function App() {
  const [otazky, setOtazky] = useState(0)
  const [odpovedi, setOdpovedi] = useState<Odpoved[]>([])
  const [kandidati, setKandidati] = useState(0)
  const [view, setView] = useState<View>({ otazka: 0, strany: [] })
  const [selected, setSelected] = useState<Odpoved[]>([])

  //load data, the set initial view
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
      setView({ otazka: 1, strany: Array.from({ length: 30 }, (_, i) => i) });
    });
  }, [])

  //prepare data for the view
  useEffect(() => {
    // filter odpovedi for the otazka and all the strany in current view
    const odpovediToShow = odpovedi.filter((odpoved) => {
      return parseInt(odpoved[3]) === view.otazka && view.strany.includes(parseInt(odpoved[2]));
    });

    setSelected(odpovediToShow);
  }, [view])

  return (
    <div className="flex flex-wrap justify-center">
      <div className="w-60 h-80 bg-zinc-200">
      </div>
    </div>
  )
}

export default App
