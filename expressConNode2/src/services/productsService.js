const express = require('express');
const users = require('../data/users.data');
const getConn = require('../data/mysql');
const secure = require('../middlewares/secure');


class ProductsService {
    constructor() {
        this.users = users;
    }
    //Hacer funciones asincronas
    /**
     * 
     * create table products(
     * id int not null auto_increment primary key key,
     * price int,
     * name varchar(100) unique,
     * description varchar(250),
     * category varchar(50),
     * active int(1) not null
     * )
     * create table activity_log(
     * id int not null auto_increment primary key,
     * price int,
     * productName varchar(100),
     * description varchar(250),
     * category varchar(50),
     * active int(1) not null,
     * productId int,
     * status varchar(250),
     * create_by varchar(100) 
     * )
     * --/
     * create trigger insert_products_aud after insert on products
     * for each row
     * begin
     *  insert into activity_log (price,productName,description,category,active,status,create_by)
     * values(new.price,new.name,new.description,new.category,new.active,'INSERT',user_logued(capturar log de la session));
     * end;
     * /
     * --/
     * create trigger update_products_aud after update on products
     * for each row
     * begin
     *  insert into activity_log (price,productName,description,category,active,status,create_by)
     * values(old.price,old.name,old.description,old.category,old.active,'UPDATE',user_logued(capturar log de la session));
     * end;
     * /
     * --/
     * create trigger delete_products_aud after delete on products
     * for each row
     * begin
     *  insert into activity_log (price,productName,description,category,active,status,create_by)
     * values(old.price,old.name,old.description,old.category,old,active,'DELETE',user_logued(capturar log de la session));
     * end;
     * /
     */

    async getProducts() {
        const conn = await getConn();
        const query = await conn.query('select * from products as p inner join activity_log as c on c.productId = p.id');

        return query;
        // return new Promise(resolve,reject) => {
        //     setTimeout(()=>{
        //         resolve(this.users)
        //     }, 2000)
        // }
        // return this.users;
    }
    async getType(id, type, order) {
        if (this.users[type]) {
            const result = JSON.stringify(this.users[type].sort((a, b) =>
                a.years - b.years
            )); // http://localhost:3000/users/admins?order=years para que ordene por edad.
            return result;
        }
        // else {
        const err = new Error('This code doesn´t exist');
        err.status = 404;
        throw err;
        throw new Error('This type doesn´t exist');
        // return res.status(404).send('This type doesn´t exist');
    }
    async getProductById(id) {
        const conn = await getConn();
        const query = `select * from products as p inner join activity_log as c on c.productId = p.id where p.id = ${id}`;
        // params = [id];
        const result = conn.query(query);

        if (result) {
            return result;
        } else {
            const err = new Error('Error: Wrong Product ID');
            err.status = 404;
            throw err;
            throw new Error('Error: Wrong ID in ' + type.toUpperCase());
            // res.status(404).send('Error: Wrong ID in ' + type.toUpperCase());
        }
    }

    async createProduct(data, auth) {
        const conn = await getConn();
        const { price, name, description, category } = data;
        const categoryExist = await conn.query(`select id from categories where description = '${category}'`);

        if (categoryExist !== '') {
            let idCategory = categoryExist[0].id;
            const query = `insert into products (price,name,description,category,active) values(${price},'${name}','${description}','${idCategory}',1);`;
            const result = await conn.query(query);

            const date = new Date();
            const unix = Math.floor(date.getTime() / 1000);
            // agregarle el result.insertId para ponerle que me traiga los logs del mismo

            if (result) {
                let productId = result.insertId;
                const trigger = `insert into activity_log (price,productId,productName,description,category,active,status,create_by,time) VALUES (${price},${productId},'${name}','Se creó el producto: ${name}','${category}',1,'INSERT','${secure.create_by(auth)}',${unix})`;
                const resultTrigger = await conn.query(trigger);
                return result;
            } else {
                return 0;
                const err = new Error('Error: Type ' + type + ' doesn´t exist');
                err.status = 404;
                throw err;
                throw new Error('Error: Type ' + type + ' doesn´t exist');
                // res.status(404).send('Error: Type ' + type + ' doesn´t exist');
            }
        } else {
            const err = new Error('Error: category ' + category + ' doesn´t exist');
            err.status = 404;
            throw err;
        }
    }
    async updateProduct(data, auth) {
        const conn = await getConn();
        const { price, name, description, category, active, id } = data;
        console.log(data);
        const categoryExist = await conn.query(`select id from categories where description = '${category}'`);
        if (categoryExist !== '') {
            // console.log(categoryExist);
            let idCategory = categoryExist[0].id;
            const query = `update products set price = ${price},name = '${name}',description = '${description}',category = '${idCategory}',active = ${active} where id = ${id};`;
            const result = await conn.query(query);
            console.log(query);

            const date = new Date();
            const unix = Math.floor(date.getTime() / 1000);
            if (result) {
                // console.log(result);
                // console.log(result.insertId);
                let productId = id;
                const trigger = `insert into activity_log (description,productId,category,active,status,create_by,time) VALUES ('Se actualizó el producto: ${description}',${productId},'${description}',${active},'UPDATE','${secure.create_by(auth)}',${unix})`;
                const resultTrigger = await conn.query(trigger);
                return result;
            } else {
                return 0;
            }
        } else {
            const err = new Error('Error: category ' + category + ' doesn´t exist');
            err.status = 404;
            throw err;
        }
    }
    async deleteProduct(id, auth) {
        const conn = await getConn();
        const query = `delete * from products where id = ${id};`;
        const result = await conn.query(query);

        const date = new Date();
        const unix = Math.floor(date.getTime() / 1000);
        const trigger = `insert into activity_log (description,active,status,create_by,time) VALUES ('Se eliminó el producto con id: ${id}',1,'DELETE','${secure.create_by(auth)}',${unix})`;
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

module.exports = ProductsService;