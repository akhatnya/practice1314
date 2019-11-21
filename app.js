const express = require('express');
const app = express();

const { Pool } = require('pg');

var DBconfig = {
    user: 'postgres',
    host: 'localhost',
    database: 'kek',
    password: 'postgres',
    port: 5432
};

const connection = new Pool(DBconfig);

app.get("/getSomeData", (request, response) => {
    connection.query("select * from todos",
        (err, res) => {
            if (err) {
                response.json(err);
            } else {
                response.json(res.rows);
            }
        });
});

app.get("/delete/:todoId", (request, response) => {
    connection.query(
        "delete from todos where id = $1",
        [ request.params.todoId ],
        (err, res) => {
            if (err) {
                response.json(err);
            } else {
                response.json({ message: "deleted successully" });
            }
        }
    );
});

app.listen(8080, () => { console.log("сервак запустился"); });
