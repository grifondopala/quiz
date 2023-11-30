import { User } from "../models/user";
import { QueryResult } from 'pg'

async function signIn(login: string, password: string): Promise<string | null>{

    const db = require('../db/connection');

    function checkExistUser(): Promise<string | null>{
        const sql = `SELECT * FROM users WHERE login = $1 AND password = $2`
        return new Promise((resolve, _) => {
            db.pool.query(sql, [login, password], (err: Error, res: QueryResult) => {
                if(err){
                    resolve(err.message)
                }
                if(res.rowCount){
                    resolve(null)
                }
                resolve(null);
        })
    })}

    const err = await checkExistUser();

    return err;
}

async function signUp(user: User): Promise<string | null>{

    const db = require('../db/connection');

    function checkExistUser(): Promise<string | null>{
        const sql = `SELECT * FROM users WHERE login = $1`
        return new Promise((resolve, _) => {
            db.pool.query(sql, [user.login], (err: Error, res: QueryResult) => {
                if(err){
                    resolve(err.message)
                }
                if(res.rowCount){
                    resolve('Пользователь с таким логином уже зарегестрирован.');
                }
                resolve(null)
        })
    })}

    let err = await checkExistUser();
    
    if(err) return err;

    function createUser(): Promise<string | null>{
        const sql = `INSERT INTO users (login, password, name) VALUES ($1, $2, $3)`
        return new Promise((resolve, reject) => {
            db.pool.query(sql, [user.login, user.password, user.name], (err: Error, res: QueryResult) => {
                if(err){
                    resolve(err.message)
                }
                resolve(null)
            })
    })}

    return await createUser();
}

module.exports = {
    signUp,
    signIn
}