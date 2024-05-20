import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Label } from "@/components/ui/label"

type View = {
    otazka: number,
    strany: number[]
}

type Strana = {
    typ: string;
    iri: string;
    ESTRANA: number;
    VSTRANA: number;
    NAZEVCELK: string;
    NAZEV_STRE: string;
    ZKRATKAE30: string;
    ZKRATKAE8: string;
    POCSTRVKO: number;
    SLOZENI: string;
    STAVREG: string;
    PLAT_STR: string;
    POCMANDCR: number;
    NAZEVPLNY: string;
};

type Strany = Strana[];

const SelectS = ({ strany, setView, view }: {
    strany: Strany, setView: any, view: View
}) => {

    const stranyClean = [{ ESTRANA: 0, ZKRATKAE30: "všechny strany" }, ...strany];

    const handleSelectChange = (value: string) => {
        const newStrana = parseInt(value);
        if (value === "0") {
            setView((oldView: View) => ({ ...oldView, strany: Array.from({ length: 30 }, (_, i) => i) }));
            return;
        }
        setView((oldView: View) => ({ ...oldView, strany: [newStrana] }));
    }


    return (
        <div className="w-full">
            <Label>Kandidující subjekt</Label>
            <Select onValueChange={handleSelectChange} defaultValue={view.strany.length === 1 ? view.strany[0].toString() : "0"}>
                <SelectTrigger>
                    <SelectValue placeholder="Vyberte téma" />
                </SelectTrigger>
                <SelectContent>
                    {stranyClean.map((strana) => (
                        <SelectItem
                            key={strana.ESTRANA.toString()} value={strana.ESTRANA.toString()}
                        >
                            {strana.ZKRATKAE30}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}

export { SelectS }