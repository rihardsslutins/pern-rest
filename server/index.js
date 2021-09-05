// requires the express library and the cors library
const express = require("express");
const cors = require("cors");

// takes the express library and runs it
const app = express();

//requires pool from db.js
const pool = require("./db");

// middleware
app.use(cors());
// allows us to get json data from req.body
app.use(express.json());

// ROUTES //
// create a todo, .post() creates data, req, res represents requests
//that we will get from the client side and responses that we will send
//back to the client side
app.post("/todos", async (req, res) => {
    try {
        // getting data from the client side
        // gets the description property from the req.body
        const { description } = req.body;
        // $1 is a placeholder, and the second param in query() is
        //what value that placeholder holds
        // to return back the data we use "RETURNING *"
        const newTodo = await pool.query(
            "INSERT INTO todo (description) VALUES($1) RETURNING *",
            [description]
        );
        res.json(newTodo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// get all todos
app.get("/todos", async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo");
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// get a todo
app.get("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);
        res.json(todo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// update a todo
app.put("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const updateTodo = await pool.query(
            "UPDATE todo SET description = $1 WHERE todo_id = $2",
            [description, id]
        );

        res.json("Todo was updated!");
    } catch (err) {
        console.error(err);
    }
});

//delete a todo
app.delete("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await pool.query(
            "DELETE FROM todo WHERE todo_id = $1",
            [id]
        );
        res.json("Todo was deleted!")
    } catch (err) {
        console.error(err);
    }
});
// checks if server has started on port:5000
app.listen(5000, () => {
    console.log("started on port:5000");
});
