import { useState, useEffect } from 'react'
import './App.css'

import strany from "./assets/data/strany.json"

import { CircleUser } from 'lucide-react';
import { Badge } from "@/components/ui/badge"


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

    odpovediToShow.sort((a, b) => parseInt(a[2]) - parseInt(b[2]))

    setSelected(odpovediToShow);
  }, [view])

  //get party name
  const getPartyName = (record: string[], format: string, strany: any[]) => {
    return strany.find((strana: { ESTRANA: string }) => parseInt(strana.ESTRANA) === parseInt(record[2]))[format]
  }

  return (
    <div className="flex flex-wrap justify-center max-w-[1070px] mx-auto">
      {selected.length > 0 && selected.map(respondent => {
        return (
          <div key={crypto.randomUUID()} className="w-1/2 sm:w-1/3 lg:w-1/4 p-2">
            <div className="bg-white shadow-md rounded px-4 pt-2 pb-4 mb-4">
              <div className="flex justify-between items-start">
                <h2 className="font-bold">{getPartyName(respondent, "ZKRATKAE30", strany)}</h2>
                <Badge variant={respondent[4] === "ANO" ? "default" : respondent[4] === "NE" ? "destructive" : "outline"}>{respondent[4]}</Badge>
              </div>
              <div className="flex gap-2 items-center my-2">
                <CircleUser size={48} color='rgb(161 161 170)' />
                <p className="text-zinc-600 text-sm">{respondent[0]}</p>
              </div>
              <div>
                <p className="text-sm">{respondent[5]}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>

  )
}

export default App
