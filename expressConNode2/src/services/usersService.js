const express = require('express');
// const users = require('../data/users.data');
const getConn = require('../data/mysql');
const e = require('express');
const jwt = require('../utils/jwt');
const bcrypt = require('bcrypt');
const secure = require('../middlewares/secure');

class UsersService {
    constructor() {
        // this.users = users;
    }

    /**
     * 
     * create table users(
     * id int not null auto_incremental primary key,
     * user varchar(100) unique,
     * password varchar(120) not null,
     * active int(1) not null
     * )
     */

    async getUsers() {
        const conn = await getConn();
        const data = await conn.query('select * from users');

        return data;
    }


    async userById(id) {
        // const params = [id];
        const query = `select * from users where id = ${id}`;
        const conn = await getConn();
        const result = conn.query(query);
        if (result) {
            return result;
        } else {
            const err = new Error('Error: Wrong ID in users');
            err.status = 404;
            throw err;
            throw new Error('Error: Wrong ID in ' + type.toUpperCase());
            // res.status(404).send('Error: Wrong ID in ' + type.toUpperCase());
        }

    }
    async createUser(data, auth) {
        console.log(data)
        const { user, password, rol } = data;

        const hash = await bcrypt.hash(password, 5);
        //const password = data['password'];//Hacerle hasheo
        // const query = `insert into users (user,password,active) values(?,?,?)`;
        const query = `insert into users (user,password,active,rol) values('${user}','${hash}',1,'${rol}')`;
        const date = new Date();
        const unix = Math.floor(date.getTime() / 1000);
        // console.log(specificUnixTimestamp);
        const trigger = `insert into activity_log (description, active, status, create_by, time) VALUES ('Se creó el usuario: ${user}',1,'INSERT','${secure.create_by(auth)}',${unix})`;
        //const params = [data.user, data.password, 1];



        const conn = await getConn();
        // const result = await conn.query(query, params);
        const result = await conn.query(query);
        const resultTrigger = await conn.query(trigger);

        if (result) {
            console.log(result.insertId);
            return result;
        } else {
            return 0;
        }

        if (this.users[type]) {
            this.users[type].push(newUser);
            return JSON.stringify(newUser);
        } else {
            const err = new Error('Error: Type ' + type + ' doesn´t exist');
            err.status = 404;
            throw err;
            throw new Error('Error: Type ' + type + ' doesn´t exist');
            // res.status(404).send('Error: Type ' + type + ' doesn´t exist');
        }
    }
    async login(dataLog) {
        const conn = await getConn();
        let result = await conn.query(`SELECT id,user,password,active,rol from users WHERE user = ? AND active = 1`, [dataLog.user]);
        if (result[0]) {
            const { id, user, password, active, rol } = result[0];
            return bcrypt.compare(dataLog.password, password)
                .then(passIsOk => {
                    if (passIsOk === true || dataLog.password == password) {
                        const token = {
                            token: jwt.sign({ id, user, active, rol })
                        }
                        return { login: true, ...token };
                    } else {
                        let error = new Error('Wrong Credentials');
                        error.status = 400;
                        throw error;
                    }

                });
            const token = {
                token: jwt.sign({ id, user, password, active, rol })
            }
            return { login: true, ...token };
        } else {
            let error = new Error('Wrong Credentials dfsfdsfsfsf');
            error.status = 400;
            throw error;
            // alert('Error: ' + error);
        }
    }
}

module.exports = UsersService;