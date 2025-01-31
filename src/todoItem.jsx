import React, { useState } from "react";

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
            <input type="text" value={task} onChange={(e) => setTask(e.target.value)} />
            <button type="submit">Add</button>
        </form>
        </>
    );
}

export default TodoItem;