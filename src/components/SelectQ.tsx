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


const SelectQ = ({ otazky, setView, view }: { otazky: string[], setView: any, view: View }) => {

    const handleSelectChange = (value: string) => {
        setView((oldView: View) => ({ ...oldView, otazka: parseInt(value) }));
    }

    const otazkyClean = [["0", "", "všechna témata"], ...otazky.slice(1)];

    return (
        <div className="w-full">
            <Label>Téma</Label>
            <Select onValueChange={handleSelectChange} defaultValue={view.otazka.toString()}>
                <SelectTrigger>
                    <SelectValue placeholder="Vyberte téma" />
                </SelectTrigger>
                <SelectContent>
                    {otazkyClean.map((otazka) => (
                        <SelectItem
                            key={otazka[0]} value={otazka[0]}
                        >
                            {otazka[2]}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}

export { SelectQ }