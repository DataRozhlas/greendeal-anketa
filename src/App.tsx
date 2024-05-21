import { useState, useEffect } from 'react';
import './App.css';

import strany from "./assets/data/strany.json";

import { CircleUser } from 'lucide-react';
import { Badge } from "@/components/ui/badge";


import { SelectQ } from "@/components/SelectQ";
import { SelectS } from "@/components/SelectS";
import { RespondentBox } from "@/components/RespondentBox";


import { usePostMessageWithHeight } from "./hooks/usePostHeightMessage";


type View = {
  otazka: number,
  strany: number[]
}

type Odpoved = string[]




function App({ q }: { q: string }) {
  const [otazky, setOtazky] = useState<string[]>([]) // Change the type of otazky to string[]
  const [odpovedi, setOdpovedi] = useState<Odpoved[]>([])
  const [kandidati, setKandidati] = useState<string[]>([]) // Change the type of kandidati to string[]
  const [view, setView] = useState<View>({ otazka: parseInt(q), strany: [] })
  const [selected, setSelected] = useState<Odpoved[]>([])

  const { containerRef, postHeightMessage } = usePostMessageWithHeight(`gd-anketa-${q}`);

  useEffect(() => {
    postHeightMessage();
  }, [view, postHeightMessage]);


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
      setView({ otazka: parseInt(q), strany: Array.from({ length: 30 }, (_, i) => i) });
    });
  }, [])

  //prepare data for the view
  useEffect(() => {
    // filter odpovedi for the otazka and all the strany in current view
    const odpovediToShow = odpovedi.filter((odpoved) => {
      if (view.otazka === 0) {
        return view.strany.includes(parseInt(odpoved[2]))
      }
      return parseInt(odpoved[3]) === view.otazka && view.strany.includes(parseInt(odpoved[2]));
    });

    odpovediToShow.sort((a, b) => parseInt(a[2]) - parseInt(b[2]))

    setSelected(odpovediToShow);
  }, [view])

  //get party name
  const getPartyName = (record: string[], format: string, strany: any[]) => {
    return strany.find((strana: { ESTRANA: string }) => parseInt(strana.ESTRANA) === parseInt(record[2]))[format]
  }

  const getPic = (record: string[], kandidati: string[]) => {
    return kandidati[Number(record[2])][3]

  }
  //getCleanOtazky - remove the first row
  const getCleanOtazky = (otazky: string[]) => {
    return otazky.slice(1);
  }

  if (otazky.length === 0 || kandidati.length === 0) {
    return <div>Strpení...</div>
  }

  if (view.otazka === 0) {
    return (

      <div ref={containerRef} className="max-w-[1070px] mx-auto">
        <div className="my-6 mx-2 flex flex-wrap sm:flex-nowrap justify-evenly gap-4">
          <SelectQ otazky={otazky} setView={setView} view={view} />
          <SelectS strany={strany} setView={setView} view={view} />
        </div>
        {selected.length === 0 && <div className="text-center my-4">Tento subjekt na otázky Českého rozhlasu neodpověděl</div>}
        {selected.length > 0 && getCleanOtazky(otazky).map((otazka, index) => {
          const currentQuestionAnswers = selected.filter((odpoved) => parseInt(odpoved[3]) === index + 1);
          const percentage = index === 10 ? Math.round((currentQuestionAnswers.filter((odpoved) => odpoved[4] === "NE").length / currentQuestionAnswers.length) * 100) : Math.round((currentQuestionAnswers.filter((odpoved) => odpoved[4] === "ANO").length / currentQuestionAnswers.length) * 100);
          return (
            <div key={index} className="my-4 mx-2">
              <h1 className="text-2xl sm:text-4xl font-bold text-center mt-4">{`${index + 1}. ${otazka[1]}`}</h1>
              <div className="text-center my-2">
                <Badge variant="success">{`Shoda se Zelenou dohodou pro Evropu: ${percentage} %`}</Badge>
              </div>
              <div className="flex flex-wrap justify-evenly">
                {currentQuestionAnswers.map((respondent) => {
                  return <RespondentBox key={crypto.randomUUID()} respondent={respondent} strany={strany} kandidati={kandidati} reversed={index === 10} />
                })}
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  return (

    <div ref={containerRef} className="max-w-[1070px] mx-auto">
      <div className="my-6 mx-2 flex flex-wrap sm:flex-nowrap justify-evenly gap-4">
        <SelectQ otazky={otazky} setView={setView} view={view} />
        <SelectS strany={strany} setView={setView} view={view} />
      </div>
      {selected.length === 0 && <div className="text-center my-4">Tento subjekt na otázky Českého rozhlasu neodpověděl</div>}
      {selected.length > 0 && <div>
        <h1 className="text-2xl sm:text-4xl font-bold text-center my-4">{otazky[view.otazka][1]}</h1>
        <div className="text-center my-2">
          <Badge variant="success">{`Shoda se Zelenou dohodou pro Evropu: ${view.otazka === 11 ? Math.round((selected.filter((odpoved) => odpoved[4] === "NE").length / selected.length) * 100) : Math.round((selected.filter((odpoved) => odpoved[4] === "ANO").length / selected.length) * 100)} %`}</Badge>
        </div>
        <div className="flex flex-wrap justify-evenly">
          {selected.map(respondent => {
            return <RespondentBox key={crypto.randomUUID()} respondent={respondent} strany={strany} kandidati={kandidati} reversed={view.otazka === 11} />
          })}
        </div>
      </div>}


    </div>
  )
}

export default App
