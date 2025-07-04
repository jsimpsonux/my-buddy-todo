import React, { useState } from "react";
import './todoItem.css';

function TodoItem({ addTask }) {
    const [task, setTask] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        if (task.trim() === "") return;
        addTask(task);
        setTask("");
    };
    return (
        <>
        <form onSubmit={handleSubmit}>
            <h4>Add Task</h4>
            <input type="text" value={task} onChange={(e) => setTask(e.target.value)} />
            <button type="submit">Add</button>
        </form>
        </>
    );
}

export default TodoItem;