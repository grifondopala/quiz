import '../css/input_default.css'

export function InputDefault({value, setValue}: {value: string, setValue: (value: React.SetStateAction<string>) => void}){
    return(
        <div id={'input_div'}>
            <input value={value} onChange={(e) => setValue(e.target.value)}></input>
        </div>
    )
}