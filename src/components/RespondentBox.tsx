import { CircleUser } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

const getPartyName = (record: string[], format: string, strany: any[]) => {
    return strany.find((strana: { ESTRANA: string }) => parseInt(strana.ESTRANA) === parseInt(record[2]))[format]
}

const getPic = (record: string[], kandidati: string[]) => {
    return kandidati[Number(record[2])][3]

}


const RespondentBox = ({ respondent, strany, kandidati, reversed }: { respondent: string[], strany: any[], kandidati: string[], reversed: boolean }) => {

    return (
        <div key={crypto.randomUUID()} className="w-1/2 sm:w-1/3 lg:w-1/4 p-2">
            <div className="bg-white shadow-md rounded px-4 pt-2 pb-4 mb-4">
                <div className="flex justify-between items-start">
                    <h2 className="font-bold">{getPartyName(respondent, "ZKRATKAE30", strany)}</h2>
                    {reversed ? <Badge variant={respondent[4] === "ANO" ? "destructive" : respondent[4] === "NE" ? "success" : "outline"}>{respondent[4]}</Badge> : <Badge variant={respondent[4] === "ANO" ? "success" : respondent[4] === "NE" ? "destructive" : "outline"}>{respondent[4]}</Badge>}
                </div>
                <div className="flex gap-2 items-center my-2">
                    {getPic(respondent, kandidati) === "nopic" ? <CircleUser size={48} color='rgb(161 161 170)' /> : <img src={`/greendeal-anketa/${getPic(respondent, kandidati)}.jpg`} alt="pic" className="w-12 h-12 rounded-full" />}
                    <p className="text-zinc-600 text-sm">{respondent[0]}</p>
                </div>
                <div>
                    <p className="text-sm">{respondent[5]}</p>
                </div>
            </div>
        </div>
    )

};

export { RespondentBox }