import { Pool, QueryResult } from "pg";

function initTables(){
    const db = require('./connection')
    createUsersTable(db.pool)
}

function createUsersTable(db: Pool){
    const sql = `CREATE TABLE IF NOT EXISTS users (
        login varchar(255) NOT NULL,
        password varchar(255) NOT NULL,
        name varchar(255) NOT NULL
    );`
    db.query(sql, (err: Error, res: QueryResult) => {
        if(err){
            console.log(err);
            return
        }
        console.log('Таблица users создана.')
    })
}

module.exports = {
    initTables
}