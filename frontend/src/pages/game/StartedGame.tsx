import { useEffect, useState } from "react"

export function StartedGame(){

    const [time, setTime] = useState<number>(10);

    useEffect(() => {
        let timer = setInterval(() => setTime((value) => value - 1), 1000);
        setTimeout(() => clearInterval(timer), 10000);
    }, [])

    return(
        <>
            <div id={'timer_container'} className={time > 0 ? 'timer_visible' : 'timer_hidden'}>
                <p>Игра начнется через</p>
                <p>{time} секунд.</p>
            </div>
        </>
    )
}