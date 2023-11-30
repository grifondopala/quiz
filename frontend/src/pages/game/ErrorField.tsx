import { useEffect } from 'react'

import { useErrorInterface } from '../../hooks/useError';

import '../../css/error_field.css'

export function ErrorField({error}: {error: useErrorInterface}){

    useEffect(() => {
        if(!error.isShown) return;

        setTimeout(() => error.hideError(), 3000);

    }, [error.isShown]);

    return(
        <p className={error.isShown ? 'show_error' : 'hide_error'}>
            {error.text}
        </p>
    )
}