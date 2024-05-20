import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

type View = {
    otazka: number,
    strany: number[]
}


const SelectQ = ({ otazky, setView }: { otazky: string[], setView: any }) => {

    const handleSelectChange = (value: string) => {
        console.log(value);
        setView((oldView: View) => ({ ...oldView, otazka: parseInt(value) }));
    }

    const otazkyClean = otazky.slice(1);

    return (
        <Select onValueChange={handleSelectChange}>
            <SelectTrigger className="max-w-full md: max-w-[50%]">
                <SelectValue placeholder="Vyberte si téma" />
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
    )
}

export { SelectQ }