import { useState } from 'react'

import { SignIn } from './SignIn'
import { SignUp } from './SignUp'

import '../../css/auth.css'

export enum AuthStage{
    First,
    Login,
    Register
}

export function Auth(){

    const [stage, setStage] = useState(AuthStage.First)

    return(
        <div id={'auth_container'}>
            <SignIn stage={stage} setStage={setStage}/>
            <SignUp stage={stage} setStage={setStage}/>
        </div>
    )
}