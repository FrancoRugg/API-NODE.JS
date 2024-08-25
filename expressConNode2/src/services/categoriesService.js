const express = require('express');
const users = require('../data/users.data');
const getConn = require('../data/mysql');
const secure = require('../middlewares/secure');

class CategoriesService {
    constructor() {
        this.users = users;
    }
    //Hacer funciones asincronas
    /**
     * 
     * create table categories(
     * id int not null auto_increment primary key,
     * description varchar(50),
     * productId int not null key,
     * active int(1) not null
     * )
     * 
     * --/
     * create trigger insert_categories_aud after insert on categories
     * for each row
     * begin
     *  insert into activity_log (description,productId,active,status,create_by)
     * values(new.description,new.productId,new.active,'INSERT',user_logued(capturar log de la session));
     * end;
     * /
     * --/
     * create trigger update_categories_aud after update on categories
     * for each row
     * begin
     *  insert into activity_log (description,productId,active,status,create_by)
     * values(old.description,old.productId,old.active,'UPDATE',user_logued(capturar log de la session));
     * end;
     * /
     * --/
     * create trigger delete_categories_aud after delete on categories
     * for each row
     * begin
     *  insert into activity_log (description,productId,active,status,create_by)
     * values(old.description,old.productId,old.active,'DELETE',user_logued(capturar log de la session));
     * end;
     * /
     */

    async getCategories() {
        const conn = await getConn();
        const query = await conn.query('select * from categories as c inner join activity_log as cl on cl.category = c.description where cl.productId is null;');
        // return new Promise(resolve,reject) => {
        //     setTimeout(()=>{
        //         resolve(this.users)
        //     }, 2000)
        // }
        return query;

        return this.users;
    }
    async getCategoryById(id) {
        const conn = await getConn();
        const query = `select * from categories as c inner join activity_log as cl on cl.category = c.description where c.id = ${id} and cl.productId is null;`;
        // params = [id];
        const result = await conn.query(query);

        if (result) {
            return result;
        } else {
            const err = new Error('Error: Wrong Category ID');
            err.status = 404;
            throw err;
            throw new Error('Error: Wrong ID in ' + type.toUpperCase());
            // res.status(404).send('Error: Wrong ID in ' + type.toUpperCase());
        }
    }

    async createCategory(data, auth) {
        const conn = await getConn();
        const { description } = data;
        const query = `insert into categories (description,active) values('${description}',1);`;
        const result = await conn.query(query);

        const date = new Date();
        const unix = Math.floor(date.getTime() / 1000);
        const trigger = `insert into activity_log (description,category,active,status,create_by,time) VALUES ('Se creó la categoria: ${description}','${description}',1,'INSERT','${secure.create_by(auth)}',${unix})`;
        const resultTrigger = await conn.query(trigger);

        if (result) {
            // console.log(result.insertId);
            return result;
        } else {
            return 0;
            const err = new Error('Error: Type ' + type + ' doesn´t exist');
            err.status = 404;
            throw err;
            throw new Error('Error: Type ' + type + ' doesn´t exist');
            // res.status(404).send('Error: Type ' + type + ' doesn´t exist');
        }
    }
    async updateCategory(data, auth) {
        const conn = await getConn();
        const { description, active, id } = data;
        console.log(data);
        const query = `update categories set description = '${description}',active = ${active} where id = ${id};`;
        const result = await conn.query(query);
        console.log(query);

        const date = new Date();
        const unix = Math.floor(date.getTime() / 1000);
        if (result) {
            const trigger = `insert into activity_log (description,category,active,status,create_by,time) VALUES ('Se actualizó la categoria: ${description}','${description}',${active},'UPDATE','${secure.create_by(auth)}',${unix})`;
            const resultTrigger = await conn.query(trigger);
            // console.log(result.insertId);
            return result;
        } else {
            return 0;
            const err = new Error('Error: Type ' + type + ' doesn´t exist');
            err.status = 404;
            throw err;
            throw new Error('Error: Type ' + type + ' doesn´t exist');
            // res.status(404).send('Error: Type ' + type + ' doesn´t exist');
        }
    }
    async deleteCategory(id, auth) {
        const conn = await getConn();
        const query = `delete * from categories where id = ${id};`;
        const result = await conn.query(query);


        const date = new Date();
        const unix = Math.floor(date.getTime() / 1000);
        const trigger = `insert into activity_log (description,active,status,create_by,time) VALUES ('Se eliminó la categoria con id: ${id}',1,'DELETE','${secure.create_by(auth)}',${unix})`;
        const resultTrigger = await conn.query(trigger);
        if (result) {
            console.log(result.insertId);
            return result;
        } else {
            return 0;
            const err = new Error('Error: Type ' + type + ' doesn´t exist');
            err.status = 404;
            throw err;
            throw new Error('Error: Type ' + type + ' doesn´t exist');
            // res.status(404).send('Error: Type ' + type + ' doesn´t exist');
        }
    }
}

module.exports = CategoriesService;