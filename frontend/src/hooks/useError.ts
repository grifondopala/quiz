import { useState } from 'react'

export interface useErrorInterface{
    text: string,
    isShown: boolean,
    showError: (error: string) => void,
    hideError: () => void;
}

export function useError(): useErrorInterface{

    const [text, setText] = useState<string>("");
    const [isShown, setIsShown] = useState<boolean>(false);
    
    function showError(error: string){
        setText(error);
        setIsShown(true);
    }

    function hideError(){
        setIsShown(false);
    }

    return {
        text,
        isShown,
        showError,
        hideError
    }

}