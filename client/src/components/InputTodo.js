import React, { Fragment, useState } from "react";

const InputTodo = () => {
    // in [description, setDescription] description is the state, and set Description
    //is the only way to change the state, useState shows default value
    const [description, setDescription] = useState("default");
    
    // this function will let us submit our form to send data out
    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const body = { description };
            // fetch() by default creates a get request so we need to specify
            //that it is a post request, and what you will be sending will be JSON
            //data
            const response = await fetch("http://localhost:5000/todos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            window.location = "/";
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <Fragment>
            <h1 className="text-center mt-5">PERN todo list</h1>
            <form className="d-flex" onSubmit={onSubmitForm}>
            {/* e is for event, setDescription will set the value*/}
                <input
                    type="text"
                    className="form-control"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <button className="btn btn-success ml-3">Add</button>
            </form>
        </Fragment>
    );
};

export default InputTodo;
