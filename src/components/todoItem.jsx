import React, { useState } from "react";
import './todoItem.css';

function TodoItem({ addTask }) {
    const [task, setTask] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (task.trim() === "") return;

        try {
            const response = await fetch("http://localhost:5001/api/parse-task", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }, 
                body: JSON.stringify({ text: task })
            });

            const data = await response.json();

            const newTask = {
                title: data.title || task,
                dueDate: data.due_date || null,
            };

            addTask(newTask);
        } catch (err) {
            console.error("Error parsing task:", err);
            addTask({ title: task, dueDate: null });
        }

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