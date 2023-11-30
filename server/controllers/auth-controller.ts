import { Request, Response } from "express"

const AuthService = require('../services/auth-service')

async function signIn(req: Request, res: Response){
    const login = req.query.login
    const password = req.query.password
    if(login && password){
        const result = await AuthService.signIn(login, password)
        if(!result){
            return res
                    .status(200)
                    .send({message: 'Авторизация прошла успешно.'});
        }else{
            return res
                    .status(500)
                    .send({message: result});
        }
    }else{
        return res
                .status(400)
                .send({message: 'Bad request'});
    }
}
async function signUp(req: Request, res: Response){
    if(req.body.user){
        const result = await AuthService.signUp(req.body.user);
        if(!result){
            return res
                    .status(200)
                    .send({message: 'User created.'})
        }else{
            return res
                    .status(500)
                    .send({message: result})
        }
    }else{
        return res
                .status(400)
                .send({message: 'Bad request'});
    }
}

module.exports = {
    signIn,
    signUp
}